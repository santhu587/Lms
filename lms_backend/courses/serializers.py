from rest_framework import serializers
from .models import Course, Enrollment, CourseContent, LearningProgress, Category
from accounts.models import User

class CategorySerializer(serializers.ModelSerializer):
    courses_count = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'icon', 'courses_count', 'created_at']
        read_only_fields = ['created_at', 'courses_count']

    def get_courses_count(self, obj):
        return obj.courses.filter(is_published=True).count()


class CourseSerializer(serializers.ModelSerializer):
    lecturer_name = serializers.CharField(source='lecturer.username', read_only=True)
    lecturer_email = serializers.CharField(source='lecturer.email', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_icon = serializers.CharField(source='category.icon', read_only=True)
    is_enrolled = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = ['id', 'title', 'description', 'price', 'category', 'category_name', 'category_icon',
                  'difficulty', 'duration_hours', 'students_count', 'lecturer', 'lecturer_name', 
                  'lecturer_email', 'created_at', 'updated_at', 'is_published', 'thumbnail_url', 'is_enrolled']
        read_only_fields = ['lecturer', 'created_at', 'updated_at', 'is_enrolled', 'students_count']

    def get_is_enrolled(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated and request.user.role == 'student':
            return Enrollment.objects.filter(student=request.user, course=obj).exists()
        return False

    def create(self, validated_data):
        # Set the lecturer to the current user
        validated_data['lecturer'] = self.context['request'].user
        return super().create(validated_data)


class EnrollmentSerializer(serializers.ModelSerializer):
    course_title = serializers.CharField(source='course.title', read_only=True)
    course_description = serializers.CharField(source='course.description', read_only=True)
    course_thumbnail = serializers.URLField(source='course.thumbnail_url', read_only=True)
    student_name = serializers.CharField(source='student.username', read_only=True)

    class Meta:
        model = Enrollment
        fields = ['id', 'student', 'student_name', 'course', 'course_title', 'course_description', 
                  'course_thumbnail', 'enrolled_at']
        read_only_fields = ['student', 'enrolled_at']


class CourseContentSerializer(serializers.ModelSerializer):
    course_title = serializers.CharField(source='course.title', read_only=True)
    is_completed = serializers.SerializerMethodField()

    class Meta:
        model = CourseContent
        fields = ['id', 'course', 'course_title', 'title', 'description', 'content_type', 
                  'video_url', 'file_url', 'content_text', 'order', 'created_at', 'updated_at', 'is_completed']
        read_only_fields = ['course', 'created_at', 'updated_at', 'is_completed']
    
    def get_is_completed(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated and request.user.role == 'student':
            progress = LearningProgress.objects.filter(
                student=request.user,
                content=obj,
                completed=True
            ).first()
            return progress is not None
        return False
    
    def validate(self, data):
        """Validate that required fields are provided based on content_type"""
        content_type = data.get('content_type')
        
        if content_type == 'video':
            if not data.get('video_url'):
                raise serializers.ValidationError({
                    'video_url': 'Video URL is required for video content'
                })
        elif content_type == 'pdf':
            if not data.get('file_url'):
                raise serializers.ValidationError({
                    'file_url': 'File URL is required for PDF content'
                })
        elif content_type == 'text':
            if not data.get('content_text'):
                raise serializers.ValidationError({
                    'content_text': 'Text content is required for text content'
                })
        
        # Convert empty strings to None for optional fields
        if 'video_url' in data and data['video_url'] == '':
            data['video_url'] = None
        if 'file_url' in data and data['file_url'] == '':
            data['file_url'] = None
        if 'content_text' in data and data['content_text'] == '':
            data['content_text'] = None
        
        return data


class LearningProgressSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.username', read_only=True)
    content_title = serializers.CharField(source='content.title', read_only=True)
    course_title = serializers.CharField(source='content.course.title', read_only=True)
    course_id = serializers.IntegerField(source='content.course.id', read_only=True)

    class Meta:
        model = LearningProgress
        fields = ['id', 'student', 'student_name', 'content', 'content_title', 'course_id', 
                  'course_title', 'completed', 'completed_at', 'created_at', 'updated_at']
        read_only_fields = ['student', 'completed_at', 'created_at', 'updated_at']


class CourseProgressSerializer(serializers.Serializer):
    """Serializer for course progress summary"""
    course_id = serializers.IntegerField()
    course_title = serializers.CharField()
    total_content = serializers.IntegerField()
    completed_content = serializers.IntegerField()
    progress_percentage = serializers.FloatField()
    student_name = serializers.CharField()
    student_id = serializers.IntegerField()

