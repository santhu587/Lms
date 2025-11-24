import React, { useState, useEffect } from 'react';
import { theme, commonStyles } from '../theme';
import { apiRequest, getCategories } from '../services/api';

const CourseForm = ({ course, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    difficulty: 'beginner',
    duration_hours: 0,
    is_published: false,
    thumbnail_url: '',
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCategories();
    if (course) {
      setFormData({
        title: course.title || '',
        description: course.description || '',
        price: course.price || '',
        category: course.category || '',
        difficulty: course.difficulty || 'beginner',
        duration_hours: course.duration_hours || 0,
        is_published: course.is_published || false,
        thumbnail_url: course.thumbnail_url || '',
      });
    }
  }, [course]);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const url = course
        ? `/courses/${course.id}/`
        : '/courses/';
      const method = course ? 'PUT' : 'POST';

      // Prepare data - convert empty strings to null for optional fields
      const submitData = {
        ...formData,
        category: formData.category || null,
        duration_hours: parseInt(formData.duration_hours) || 0,
      };

      const response = await apiRequest(url, {
        method,
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        onSuccess();
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Failed to save course');
      }
    } catch (err) {
      setError('Error saving course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h2>{course ? 'Edit Course' : 'Create New Course'}</h2>
          <button 
            onClick={onClose} 
            style={styles.closeButton}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = theme.colors.grayLight;
              e.target.style.color = theme.colors.dark;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = theme.colors.gray;
            }}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {error && <div style={styles.error}>{error}</div>}

          <div style={styles.inputGroup}>
            <label style={styles.label}>Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="Course title"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="5"
              style={styles.textarea}
              placeholder="Course description"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Difficulty Level *</label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              required
              style={styles.input}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Duration (hours)</label>
            <input
              type="number"
              name="duration_hours"
              value={formData.duration_hours}
              onChange={handleChange}
              min="0"
              style={styles.input}
              placeholder="0"
            />
            <small style={styles.helpText}>
              Estimated total duration of the course in hours
            </small>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Price ($) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              style={styles.input}
              placeholder="0.00"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Thumbnail URL</label>
            <input
              type="url"
              name="thumbnail_url"
              value={formData.thumbnail_url}
              onChange={handleChange}
              style={styles.input}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div style={styles.checkboxGroup}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="is_published"
                checked={formData.is_published}
                onChange={handleChange}
                style={styles.checkbox}
              />
              Publish course
            </label>
          </div>

          <div style={styles.actions}>
            <button type="button" onClick={onClose} style={styles.cancelButton}>
              Cancel
            </button>
            <button type="submit" disabled={loading} style={styles.submitButton}>
              {loading ? 'Saving...' : course ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: theme.spacing.xl,
  },
  modal: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.xl,
    width: '100%',
    maxWidth: '600px',
    maxHeight: '90vh',
    overflow: 'auto',
    boxShadow: theme.shadows.xl,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.xl,
    borderBottom: `1px solid ${theme.colors.grayLight}`,
    background: theme.gradients.primary,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: theme.typography.fontSize['2xl'],
    cursor: 'pointer',
    color: theme.colors.gray,
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadius.md,
    transition: theme.transitions.normal,
  },
  form: {
    padding: theme.spacing.xl,
  },
  inputGroup: {
    marginBottom: theme.spacing.lg,
  },
  label: {
    ...commonStyles.label,
  },
  input: {
    ...commonStyles.input,
  },
  textarea: {
    ...commonStyles.input,
    fontFamily: theme.typography.fontFamily,
    resize: 'vertical',
    minHeight: '100px',
  },
  checkboxGroup: {
    marginBottom: theme.spacing.lg,
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    color: theme.colors.dark,
  },
  checkbox: {
    marginRight: theme.spacing.sm,
    width: '18px',
    height: '18px',
    cursor: 'pointer',
  },
  actions: {
    display: 'flex',
    gap: theme.spacing.md,
    justifyContent: 'flex-end',
    marginTop: theme.spacing.xl,
    paddingTop: theme.spacing.lg,
    borderTop: `1px solid ${theme.colors.grayLight}`,
  },
  cancelButton: {
    ...commonStyles.button.secondary,
    backgroundColor: theme.colors.gray,
    color: theme.colors.white,
    border: 'none',
  },
  submitButton: {
    ...commonStyles.button.primary,
  },
  error: {
    ...commonStyles.error,
  },
  helpText: {
    display: 'block',
    marginTop: theme.spacing.xs,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.gray,
    lineHeight: 1.5,
  },
  select: {
    ...commonStyles.input,
    cursor: 'pointer',
  },
};

export default CourseForm;

