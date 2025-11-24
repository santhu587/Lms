import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { theme, commonStyles } from '../theme';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { enrollInCourse } from '../services/api';

const CourseCard = ({ course, userRole, onEdit, onDelete, onEnroll }) => {
  const [enrolling, setEnrolling] = useState(false);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isEnrolled = course.is_enrolled;

  const handleBuy = async () => {
    if (enrolling) return;
    
    setEnrolling(true);
    try {
      await enrollInCourse(course.id);
      if (onEnroll) {
        onEnroll();
      }
      alert('Successfully enrolled in course!');
    } catch (error) {
      alert(error.message || 'Failed to enroll in course');
    } finally {
      setEnrolling(false);
    }
  };

  const handleStartLearning = () => {
    navigate(`/course/${course.id}/learn`);
  };

  return (
    <div 
      style={styles.card}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow = theme.shadows.xl;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = theme.shadows.lg;
      }}
    >
      {course.thumbnail_url ? (
        <div style={styles.thumbnailContainer}>
          <img src={course.thumbnail_url} alt={course.title} style={styles.thumbnail} />
          {course.is_published && (
            <div style={styles.badgeOverlay}>
              <span style={styles.badge}>Published</span>
            </div>
          )}
        </div>
      ) : (
        <div style={styles.thumbnailPlaceholder}>
          <span style={styles.placeholderIcon}>📚</span>
        </div>
      )}
      <div style={styles.content}>
        {course.category_name && (
          <div style={styles.categoryBadge}>
            <span style={styles.categoryIcon}>{course.category_icon || '📚'}</span>
            <span>{course.category_name}</span>
          </div>
        )}
        <h3 style={styles.title}>{course.title}</h3>
        <p style={styles.description}>
          {course.description.length > 120
            ? `${course.description.substring(0, 120)}...`
            : course.description}
        </p>
        <div style={{...styles.metaInfo, ...(isMobile && styles.metaInfoMobile)}}>
          {course.difficulty && (
            <span style={{
              ...styles.difficultyBadge,
              ...(course.difficulty === 'beginner' ? styles.difficultyBeginner : 
                  course.difficulty === 'intermediate' ? styles.difficultyIntermediate : 
                  styles.difficultyAdvanced)
            }}>
              {course.difficulty}
            </span>
          )}
          {course.duration_hours > 0 && (
            <span style={styles.duration}>
              ⏱️ {course.duration_hours}h
            </span>
          )}
          {course.students_count > 0 && (
            <span style={styles.studentsCount}>
              👥 {course.students_count} students
            </span>
          )}
        </div>
        <div style={styles.footer}>
          <div style={styles.priceContainer}>
            <span style={styles.priceLabel}>Price</span>
            <span style={styles.price}>${parseFloat(course.price).toFixed(2)}</span>
          </div>
          <div style={styles.meta}>
            <div style={styles.lecturer}>
              <span style={styles.lecturerIcon}>👨‍🏫</span>
              {course.lecturer_name}
            </div>
            {!course.is_published && (
              <span style={styles.badgeDraft}>Draft</span>
            )}
          </div>
        </div>
        {userRole === 'lecturer' && (
          <div style={styles.actions}>
            <button 
              onClick={() => navigate(`/course/${course.id}/learn`)} 
              style={styles.manageButton}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = theme.shadows.md;
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              Manage Content
            </button>
            <button 
              onClick={() => navigate(`/course/${course.id}/progress`)} 
              style={styles.progressButton}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = theme.shadows.md;
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              View Progress
            </button>
            <button 
              onClick={() => onEdit(course)} 
              style={styles.editButton}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = theme.shadows.md;
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              Edit
            </button>
            <button 
              onClick={() => onDelete(course.id)} 
              style={styles.deleteButton}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = theme.shadows.md;
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              Delete
            </button>
          </div>
        )}
        {userRole === 'student' && (
          <>
            {isEnrolled ? (
              <button 
                onClick={handleStartLearning} 
                style={styles.startButton}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = theme.shadows.primaryHover;
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = theme.shadows.primary;
                }}
              >
                Start Learning
              </button>
            ) : (
              <button 
                onClick={handleBuy} 
                style={styles.buyButton}
                disabled={enrolling}
                onMouseEnter={(e) => {
                  if (!enrolling) {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = theme.shadows.lg;
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = theme.shadows.md;
                }}
              >
                {enrolling ? 'Enrolling...' : 'Buy Course'}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.xl,
    boxShadow: theme.shadows.lg,
    overflow: 'hidden',
    transition: theme.transitions.normal,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  thumbnailContainer: {
    position: 'relative',
    width: '100%',
    height: '200px',
    overflow: 'hidden',
    backgroundColor: theme.colors.grayLighter,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: theme.transitions.normal,
  },
  thumbnailPlaceholder: {
    width: '100%',
    height: '200px',
    backgroundColor: theme.gradients.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderIcon: {
    fontSize: '4rem',
    opacity: 0.5,
  },
  badgeOverlay: {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm,
  },
  badge: {
    backgroundColor: theme.colors.success,
    color: theme.colors.white,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.borderRadius.full,
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.semibold,
    boxShadow: theme.shadows.md,
  },
  badgeDraft: {
    backgroundColor: theme.colors.warning,
    color: theme.colors.dark,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.borderRadius.full,
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  content: {
    padding: theme.spacing.lg,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  categoryBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: theme.spacing.xs,
    backgroundColor: theme.colors.grayLighter,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.borderRadius.full,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.dark,
    marginBottom: theme.spacing.sm,
    width: 'fit-content',
  },
  categoryIcon: {
    fontSize: theme.typography.fontSize.base,
  },
  title: {
    marginBottom: theme.spacing.sm,
    color: theme.colors.dark,
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.semibold,
    lineHeight: 1.3,
  },
  metaInfo: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
    marginBottom: theme.spacing.md,
  },
  difficultyBadge: {
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.borderRadius.full,
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.medium,
    textTransform: 'capitalize',
  },
  difficultyBeginner: {
    backgroundColor: '#d1fae5',
    color: '#065f46',
  },
  difficultyIntermediate: {
    backgroundColor: '#dbeafe',
    color: '#1e40af',
  },
  difficultyAdvanced: {
    backgroundColor: '#fee2e2',
    color: '#991b1b',
  },
  duration: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.gray,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  studentsCount: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.gray,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  description: {
    color: theme.colors.gray,
    marginBottom: theme.spacing.lg,
    lineHeight: 1.6,
    fontSize: theme.typography.fontSize.sm,
    flex: 1,
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    paddingTop: theme.spacing.md,
    borderTop: `1px solid ${theme.colors.grayLight}`,
  },
  priceContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  priceLabel: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.gray,
    marginBottom: theme.spacing.xs,
  },
  price: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
  },
  meta: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: theme.spacing.xs,
  },
  lecturer: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.gray,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  lecturerIcon: {
    fontSize: theme.typography.fontSize.base,
  },
  actions: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.md,
  },
  editButton: {
    ...commonStyles.button.primary,
    padding: theme.spacing.sm,
    fontSize: theme.typography.fontSize.sm,
  },
  deleteButton: {
    ...commonStyles.button.danger,
    padding: theme.spacing.sm,
    fontSize: theme.typography.fontSize.sm,
  },
  manageButton: {
    ...commonStyles.button.secondary,
    padding: theme.spacing.sm,
    fontSize: theme.typography.fontSize.sm,
    backgroundColor: theme.colors.info,
    color: theme.colors.white,
    border: 'none',
  },
  progressButton: {
    ...commonStyles.button.secondary,
    padding: theme.spacing.sm,
    fontSize: theme.typography.fontSize.sm,
    backgroundColor: theme.colors.secondary,
    color: theme.colors.white,
    border: 'none',
  },
  buyButton: {
    width: '100%',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.success,
    color: theme.colors.white,
    border: 'none',
    borderRadius: theme.borderRadius.md,
    cursor: 'pointer',
    marginTop: theme.spacing.md,
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
    transition: theme.transitions.normal,
    boxShadow: theme.shadows.md,
  },
  startButton: {
    width: '100%',
    padding: theme.spacing.md,
    background: theme.gradients.primary,
    color: theme.colors.white,
    border: 'none',
    borderRadius: theme.borderRadius.md,
    cursor: 'pointer',
    marginTop: theme.spacing.md,
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
    transition: theme.transitions.normal,
    boxShadow: theme.shadows.primary,
  },
  // Mobile styles
  metaInfoMobile: {
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
  },
};

export default CourseCard;

