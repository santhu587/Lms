from django.contrib import admin
from .models import Course

# Register your models here.
@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'lecturer', 'price', 'is_published', 'created_at')
    list_filter = ('is_published', 'created_at', 'lecturer')
    search_fields = ('title', 'description', 'lecturer__username')
    readonly_fields = ('created_at', 'updated_at')
    ordering = ('-created_at',)
