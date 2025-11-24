from django.urls import path
from .views import (
    CourseListCreateView, 
    CourseDetailView,
    EnrollmentView,
    MyEnrollmentsView,
    CourseContentListCreateView,
    CourseContentDetailView,
    MarkContentCompleteView,
    MyProgressView,
    CourseStudentProgressView,
    CategoryListCreateView
)

urlpatterns = [
    path('categories/', CategoryListCreateView.as_view(), name='category-list-create'),
    path('courses/', CourseListCreateView.as_view(), name='course-list-create'),
    path('courses/<int:pk>/', CourseDetailView.as_view(), name='course-detail'),
    path('courses/<int:course_id>/enroll/', EnrollmentView.as_view(), name='enroll-course'),
    path('enrollments/', MyEnrollmentsView.as_view(), name='my-enrollments'),
    path('courses/<int:course_id>/contents/', CourseContentListCreateView.as_view(), name='course-content-list-create'),
    path('contents/<int:pk>/', CourseContentDetailView.as_view(), name='course-content-detail'),
    path('contents/<int:content_id>/complete/', MarkContentCompleteView.as_view(), name='mark-content-complete'),
    path('progress/', MyProgressView.as_view(), name='my-progress'),
    path('courses/<int:course_id>/student-progress/', CourseStudentProgressView.as_view(), name='course-student-progress'),
]

