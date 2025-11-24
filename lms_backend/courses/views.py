from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied, NotFound
from rest_framework.views import APIView
from django.db.models import Count, Q
from django.db.models.functions import Lower
from .models import Course, Enrollment, CourseContent, LearningProgress, Category
from .serializers import (
    CourseSerializer, EnrollmentSerializer, CourseContentSerializer,
    LearningProgressSerializer, CourseProgressSerializer, CategorySerializer
)
from accounts.models import User

class IsLecturer(permissions.BasePermission):
    """Custom permission to only allow lecturers to create/edit courses."""
    
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_authenticated and request.user.role == 'lecturer'

class CategoryListCreateView(generics.ListCreateAPIView):
    """List all categories or create new category (for lecturers)"""
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Return categories that have published courses
        return Category.objects.filter(courses__is_published=True).distinct()

    def perform_create(self, serializer):
        # Only lecturers can create categories
        if self.request.user.role != 'lecturer':
            raise PermissionDenied('Only lecturers can create categories')
        serializer.save()


class CourseListCreateView(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = Course.objects.all()
        
        # Base filtering by role
        if user.role == 'lecturer':
            queryset = queryset.filter(lecturer=user)
        else:
            queryset = queryset.filter(is_published=True)
        
        # Search functionality
        search_query = self.request.query_params.get('search', None)
        if search_query:
            queryset = queryset.filter(
                Q(title__icontains=search_query) |
                Q(description__icontains=search_query) |
                Q(category__name__icontains=search_query)
            )
        
        # Category filter
        category_id = self.request.query_params.get('category', None)
        if category_id:
            queryset = queryset.filter(category_id=category_id)
        
        # Difficulty filter
        difficulty = self.request.query_params.get('difficulty', None)
        if difficulty:
            queryset = queryset.filter(difficulty=difficulty)
        
        # Price range filter
        min_price = self.request.query_params.get('min_price', None)
        max_price = self.request.query_params.get('max_price', None)
        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)
        
        # Sort options
        sort_by = self.request.query_params.get('sort', '-created_at')
        if sort_by in ['price', '-price', 'title', '-title', 'created_at', '-created_at', 'students_count', '-students_count']:
            queryset = queryset.order_by(sort_by)
        
        return queryset.distinct()
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def perform_create(self, serializer):
        # Ensure only lecturers can create courses
        if self.request.user.role != 'lecturer':
            return Response(
                {'error': 'Only lecturers can create courses'},
                status=status.HTTP_403_FORBIDDEN
            )
        serializer.save(lecturer=self.request.user)

class CourseDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'lecturer':
            # Lecturers can only edit their own courses
            return Course.objects.filter(lecturer=user)
        else:
            # Students can only view published courses
            return Course.objects.filter(is_published=True)
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def perform_update(self, serializer):
        # Ensure only the course owner can update
        if serializer.instance.lecturer != self.request.user:
            return Response(
                {'error': 'You can only edit your own courses'},
                status=status.HTTP_403_FORBIDDEN
            )
        serializer.save()

    def perform_destroy(self, instance):
        # Ensure only the course owner can delete
        if instance.lecturer != self.request.user:
            return Response(
                {'error': 'You can only delete your own courses'},
                status=status.HTTP_403_FORBIDDEN
            )
        instance.delete()


class IsStudent(permissions.BasePermission):
    """Custom permission to only allow students."""
    
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'student'


class EnrollmentView(APIView):
    permission_classes = [IsAuthenticated, IsStudent]
    
    def post(self, request, course_id):
        """Enroll student in a course"""
        try:
            course = Course.objects.get(id=course_id, is_published=True)
        except Course.DoesNotExist:
            return Response(
                {'error': 'Course not found or not published'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Check if already enrolled
        enrollment, created = Enrollment.objects.get_or_create(
            student=request.user,
            course=course
        )
        
        if created:
            # Update students count
            course.students_count = Enrollment.objects.filter(course=course).count()
            course.save()
            serializer = EnrollmentSerializer(enrollment)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(
                {'message': 'Already enrolled in this course'},
                status=status.HTTP_200_OK
            )


class MyEnrollmentsView(generics.ListAPIView):
    """List all courses enrolled by the current student"""
    serializer_class = EnrollmentSerializer
    permission_classes = [IsAuthenticated, IsStudent]
    
    def get_queryset(self):
        return Enrollment.objects.filter(student=self.request.user)


class CourseContentListCreateView(generics.ListCreateAPIView):
    """List or create course content (lecturers can create, enrolled students can view)"""
    serializer_class = CourseContentSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        course_id = self.kwargs.get('course_id')
        user = self.request.user
        
        # Lecturers can see all content for their courses
        if user.role == 'lecturer':
            return CourseContent.objects.filter(course_id=course_id, course__lecturer=user)
        
        # Students can only see content if enrolled
        elif user.role == 'student':
            is_enrolled = Enrollment.objects.filter(
                student=user,
                course_id=course_id
            ).exists()
            if is_enrolled:
                return CourseContent.objects.filter(course_id=course_id, course__is_published=True)
            else:
                return CourseContent.objects.none()
        
        return CourseContent.objects.none()
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context
    
    def perform_create(self, serializer):
        course_id = self.kwargs.get('course_id')
        user = self.request.user
        
        # Only lecturers can create content
        if user.role != 'lecturer':
            raise PermissionDenied('Only lecturers can create course content')
        
        try:
            course = Course.objects.get(id=course_id, lecturer=user)
        except Course.DoesNotExist:
            raise NotFound('Course not found or you are not the owner')
        
        serializer.save(course=course)


class CourseContentDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Get, update, or delete course content"""
    serializer_class = CourseContentSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        
        # Lecturers can manage their own course content
        if user.role == 'lecturer':
            return CourseContent.objects.filter(course__lecturer=user)
        
        # Students can view content if enrolled
        elif user.role == 'student':
            return CourseContent.objects.filter(
                course__enrollments__student=user,
                course__is_published=True
            )
        
        return CourseContent.objects.none()
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context
    
    def perform_update(self, serializer):
        # Only lecturers can update content
        if self.request.user.role != 'lecturer':
            raise PermissionDenied('Only lecturers can update course content')
        
        if serializer.instance.course.lecturer != self.request.user:
            raise PermissionDenied('You can only update content for your own courses')
        
        serializer.save()
    
    def perform_destroy(self, instance):
        # Only lecturers can delete content
        if self.request.user.role != 'lecturer':
            raise PermissionDenied('Only lecturers can delete course content')
        
        if instance.course.lecturer != self.request.user:
            raise PermissionDenied('You can only delete content for your own courses')
        
        instance.delete()


class MarkContentCompleteView(APIView):
    """Mark course content as completed by student"""
    permission_classes = [IsAuthenticated, IsStudent]
    
    def post(self, request, content_id):
        try:
            content = CourseContent.objects.get(id=content_id)
        except CourseContent.DoesNotExist:
            return Response(
                {'error': 'Content not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Check if student is enrolled in the course
        is_enrolled = Enrollment.objects.filter(
            student=request.user,
            course=content.course
        ).exists()
        
        if not is_enrolled:
            return Response(
                {'error': 'You must be enrolled in this course to mark content as complete'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        # Get or create progress record
        progress, created = LearningProgress.objects.get_or_create(
            student=request.user,
            content=content
        )
        
        # Toggle completion status
        progress.completed = not progress.completed
        progress.save()
        
        serializer = LearningProgressSerializer(progress)
        return Response(serializer.data, status=status.HTTP_200_OK)


class MyProgressView(generics.ListAPIView):
    """Get progress for all courses the student is enrolled in"""
    serializer_class = CourseProgressSerializer
    permission_classes = [IsAuthenticated, IsStudent]
    
    def get_queryset(self):
        user = self.request.user
        enrollments = Enrollment.objects.filter(student=user)
        
        progress_data = []
        for enrollment in enrollments:
            course = enrollment.course
            total_content = CourseContent.objects.filter(course=course).count()
            completed_content = LearningProgress.objects.filter(
                student=user,
                content__course=course,
                completed=True
            ).count()
            
            progress_percentage = (completed_content / total_content * 100) if total_content > 0 else 0
            
            progress_data.append({
                'course_id': course.id,
                'course_title': course.title,
                'total_content': total_content,
                'completed_content': completed_content,
                'progress_percentage': round(progress_percentage, 2),
                'student_name': user.username,
                'student_id': user.id,
            })
        
        return progress_data
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class CourseStudentProgressView(APIView):
    """Get progress of all students enrolled in a course (for lecturers)"""
    permission_classes = [IsAuthenticated]
    
    def get(self, request, course_id):
        user = request.user
        
        # Check if user is authenticated
        if not user.is_authenticated:
            return Response(
                {'error': 'Authentication required'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        # Refresh user from database to ensure we have the latest role
        try:
            user = User.objects.get(id=user.id)
        except User.DoesNotExist:
            return Response(
                {'error': 'User not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Only lecturers can view student progress
        if user.role != 'lecturer':
            return Response(
                {
                    'error': 'Only lecturers can view student progress',
                    'detail': f'Your role is: {user.role}. Lecturer role required.'
                },
                status=status.HTTP_403_FORBIDDEN
            )
        
        try:
            course = Course.objects.get(id=course_id, lecturer=user)
        except Course.DoesNotExist:
            return Response(
                {'error': 'Course not found or you are not the owner'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Get all enrollments for this course
        enrollments = Enrollment.objects.filter(course=course)
        total_content = CourseContent.objects.filter(course=course).count()
        
        student_progress = []
        for enrollment in enrollments:
            student = enrollment.student
            completed_content = LearningProgress.objects.filter(
                student=student,
                content__course=course,
                completed=True
            ).count()
            
            progress_percentage = (completed_content / total_content * 100) if total_content > 0 else 0
            
            # Get detailed progress for each content item
            content_progress = []
            contents = CourseContent.objects.filter(course=course).order_by('order', 'created_at')
            for content in contents:
                progress = LearningProgress.objects.filter(
                    student=student,
                    content=content,
                    completed=True
                ).first()
                content_progress.append({
                    'content_id': content.id,
                    'content_title': content.title,
                    'completed': progress is not None,
                    'completed_at': progress.completed_at if progress else None,
                })
            
            student_progress.append({
                'student_id': student.id,
                'student_name': student.username,
                'student_email': student.email,
                'enrolled_at': enrollment.enrolled_at,
                'total_content': total_content,
                'completed_content': completed_content,
                'progress_percentage': round(progress_percentage, 2),
                'content_progress': content_progress,
            })
        
        return Response({
            'course_id': course.id,
            'course_title': course.title,
            'total_content': total_content,
            'students': student_progress,
        })
