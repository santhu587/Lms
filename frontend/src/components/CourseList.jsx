import React, { useState, useEffect } from 'react';
import { searchCourses, getCategories, apiRequest } from '../services/api';
import { theme, commonStyles } from '../theme';
import { useMediaQuery } from '../hooks/useMediaQuery';
import CourseCard from './CourseCard';
import CourseForm from './CourseForm';

const CourseList = ({ userRole }) => {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [sortBy, setSortBy] = useState('-created_at');

  useEffect(() => {
    fetchCategories();
    // Initial fetch on mount
    fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Debounce search and filter changes
    const timer = setTimeout(() => {
      fetchCourses();
    }, 300);
    
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, selectedCategory, selectedDifficulty, sortBy]);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const filters = {
        search: searchQuery || undefined,
        category: selectedCategory || undefined,
        difficulty: selectedDifficulty || undefined,
        sort: sortBy,
      };
      
      const data = await searchCourses(filters);
      setCourses(data);
      setError('');
    } catch (err) {
      setError('Error loading courses');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingCourse(null);
    setShowForm(true);
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setShowForm(true);
  };

  const handleDelete = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course?')) {
      return;
    }

    try {
      const response = await apiRequest(`/courses/${courseId}/`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCourses(courses.filter(course => course.id !== courseId));
      } else {
        const error = await response.json();
        alert(error.detail || 'Failed to delete course');
      }
    } catch (err) {
      alert('Error deleting course');
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingCourse(null);
    fetchCourses();
    fetchCategories();
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedDifficulty('');
    setSortBy('-created_at');
  };

  if (loading) {
    return (
      <div style={styles.loading}>
        <div style={styles.spinner}></div>
        <p>Loading courses...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>
            {userRole === 'lecturer' ? 'My Courses' : 'Available Courses'}
          </h2>
          <p style={styles.subtitle}>
            {userRole === 'lecturer' 
              ? 'Create and manage your courses'
              : 'Explore and enroll in courses to start learning'}
          </p>
        </div>
        {userRole === 'lecturer' && (
          <button 
            onClick={handleCreate} 
            style={styles.createButton}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = theme.shadows.primaryHover;
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = theme.shadows.primary;
            }}
          >
            <span style={styles.plusIcon}>+</span>
            Create New Course
          </button>
        )}
      </div>

      {/* Search and Filters Section */}
      {userRole === 'student' && (
        <div style={{...styles.filtersSection, ...(isMobile && styles.filtersSectionMobile)}}>
          <div style={styles.searchBar}>
            <span style={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder={isMobile ? "Search courses..." : "Search courses by title, description, or category..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.searchInput}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                style={styles.clearButton}
              >
                ×
              </button>
            )}
          </div>

          <div style={{...styles.filtersRow, ...(isMobile && styles.filtersRowMobile)}}>
            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={styles.filterSelect}
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icon} {cat.name} ({cat.courses_count})
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Difficulty</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                style={styles.filterSelect}
              >
                <option value="">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={styles.filterSelect}
              >
                <option value="-created_at">Newest First</option>
                <option value="created_at">Oldest First</option>
                <option value="-students_count">Most Popular</option>
                <option value="price">Price: Low to High</option>
                <option value="-price">Price: High to Low</option>
                <option value="title">Title: A-Z</option>
                <option value="-title">Title: Z-A</option>
              </select>
            </div>

            {(searchQuery || selectedCategory || selectedDifficulty) && (
              <button 
                onClick={handleClearFilters}
                style={styles.clearFiltersButton}
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      )}

      {error && <div style={commonStyles.error}>{error}</div>}

      {showForm && (
        <CourseForm
          course={editingCourse}
          onClose={handleFormClose}
          onSuccess={handleFormClose}
        />
      )}

      {courses.length > 0 && (
        <div style={styles.resultsCount}>
          <span style={styles.resultsText}>
            {courses.length} {courses.length === 1 ? 'course' : 'courses'} found
            {(searchQuery || selectedCategory || selectedDifficulty) && ' matching your filters'}
          </span>
        </div>
      )}

      {courses.length === 0 ? (
        <div style={styles.empty}>
          <div style={styles.emptyIcon}>📚</div>
          <h3 style={styles.emptyTitle}>
            {searchQuery || selectedCategory || selectedDifficulty
              ? 'No courses match your filters'
              : 'No courses available'}
          </h3>
          <p style={styles.emptyText}>
            {searchQuery || selectedCategory || selectedDifficulty
              ? 'Try adjusting your search or filters to find more courses.'
              : userRole === 'lecturer' 
                ? 'Create your first course to get started!'
                : 'Check back later for new courses.'}
          </p>
          {(searchQuery || selectedCategory || selectedDifficulty) && (
            <button 
              onClick={handleClearFilters}
              style={styles.clearFiltersButton}
            >
              Clear All Filters
            </button>
          )}
        </div>
      ) : (
        <div style={{...styles.courseGrid, ...(isMobile && styles.courseGridMobile)}}>
          {courses.map(course => (
            <CourseCard
              key={course.id}
              course={course}
              userRole={userRole}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onEnroll={fetchCourses}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing['2xl'],
    flexWrap: 'wrap',
    gap: theme.spacing.lg,
  },
  title: {
    fontSize: theme.typography.fontSize['3xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.dark,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.gray,
  },
  createButton: {
    ...commonStyles.button.primary,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
    transition: theme.transitions.normal,
  },
  plusIcon: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
  },
  courseGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: theme.spacing.xl,
  },
  loading: {
    textAlign: 'center',
    padding: theme.spacing['3xl'],
    color: theme.colors.gray,
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: `4px solid ${theme.colors.grayLight}`,
    borderTop: `4px solid ${theme.colors.primary}`,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 1rem',
  },
  empty: {
    textAlign: 'center',
    padding: theme.spacing['3xl'],
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.xl,
    boxShadow: theme.shadows.md,
  },
  emptyIcon: {
    fontSize: '4rem',
    marginBottom: theme.spacing.md,
  },
  emptyTitle: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.dark,
    marginBottom: theme.spacing.sm,
  },
  emptyText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.gray,
  },
  filtersSection: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
    boxShadow: theme.shadows.md,
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
    position: 'relative',
  },
  searchIcon: {
    fontSize: theme.typography.fontSize.xl,
    position: 'absolute',
    left: theme.spacing.md,
    zIndex: 1,
  },
  searchInput: {
    ...commonStyles.input,
    paddingLeft: '3rem',
    fontSize: theme.typography.fontSize.base,
  },
  clearButton: {
    position: 'absolute',
    right: theme.spacing.md,
    background: 'none',
    border: 'none',
    fontSize: theme.typography.fontSize['2xl'],
    color: theme.colors.gray,
    cursor: 'pointer',
    padding: 0,
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filtersRow: {
    display: 'flex',
    gap: theme.spacing.md,
    flexWrap: 'wrap',
    alignItems: 'flex-end',
  },
  filterGroup: {
    flex: 1,
    minWidth: '150px',
  },
  filterLabel: {
    ...commonStyles.label,
    marginBottom: theme.spacing.xs,
  },
  filterSelect: {
    ...commonStyles.input,
    cursor: 'pointer',
  },
  clearFiltersButton: {
    ...commonStyles.button.secondary,
    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
    fontSize: theme.typography.fontSize.sm,
    alignSelf: 'flex-end',
  },
  resultsCount: {
    marginBottom: theme.spacing.lg,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    boxShadow: theme.shadows.sm,
  },
  resultsText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.gray,
    fontWeight: theme.typography.fontWeight.medium,
  },
  filtersSectionMobile: {
    padding: theme.spacing.md,
  },
  filtersRowMobile: {
    flexDirection: 'column',
    gap: theme.spacing.md,
  },
  courseGridMobile: {
    gridTemplateColumns: '1fr',
    gap: theme.spacing.lg,
  },
};

export default CourseList;

