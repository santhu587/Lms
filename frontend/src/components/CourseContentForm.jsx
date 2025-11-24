import React, { useState, useEffect } from 'react';
import { theme, commonStyles } from '../theme';
import { createCourseContent, updateCourseContent } from '../services/api';
import { convertToYouTubeEmbed } from '../utils/youtube';

const CourseContentForm = ({ courseId, content, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content_type: 'video',
    video_url: '',
    file_url: '',
    content_text: '',
    order: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (content) {
      setFormData({
        title: content.title || '',
        description: content.description || '',
        content_type: content.content_type || 'video',
        video_url: content.video_url || '',
        file_url: content.file_url || '',
        content_text: content.content_text || '',
        order: content.order || 0,
      });
    }
  }, [content]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Prepare data - only include relevant fields based on content_type
      const submitData = {
        title: formData.title,
        description: formData.description,
        content_type: formData.content_type,
        order: parseInt(formData.order) || 0,
      };

      // Add content-specific fields
      if (formData.content_type === 'video') {
        // Convert YouTube URLs to embed format before saving
        const videoUrl = formData.video_url || null;
        submitData.video_url = videoUrl ? convertToYouTubeEmbed(videoUrl) : null;
      } else if (formData.content_type === 'pdf') {
        submitData.file_url = formData.file_url || null;
      } else if (formData.content_type === 'text') {
        submitData.content_text = formData.content_text || null;
      }

      let response;
      if (content) {
        // Update existing content
        response = await updateCourseContent(content.id, submitData);
      } else {
        // Create new content
        response = await createCourseContent(courseId, submitData);
      }

      if (response) {
        onSuccess();
      }
    } catch (err) {
      setError(err.message || 'Failed to save content');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h2>{content ? 'Edit Content' : 'Add Course Content'}</h2>
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
              placeholder="Content title"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              style={styles.textarea}
              placeholder="Content description"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Content Type *</label>
            <select
              name="content_type"
              value={formData.content_type}
              onChange={handleChange}
              required
              style={styles.select}
            >
              <option value="video">Video</option>
              <option value="pdf">PDF</option>
              <option value="text">Text</option>
            </select>
          </div>

          {formData.content_type === 'video' && (
            <div style={styles.inputGroup}>
              <label style={styles.label}>Video URL *</label>
              <input
                type="url"
                name="video_url"
                value={formData.video_url}
                onChange={handleChange}
                required
                style={styles.input}
                placeholder="https://www.youtube.com/watch?v=VIDEO_ID or https://youtu.be/VIDEO_ID"
              />
              <small style={styles.helpText}>
                Supports YouTube URLs (watch or youtu.be format). Will be automatically converted to embed format.
                <br />
                Examples:
                <br />
                • https://www.youtube.com/watch?v=dQw4w9WgXcQ
                <br />
                • https://youtu.be/dQw4w9WgXcQ
                <br />
                • https://www.youtube.com/embed/dQw4w9WgXcQ (already embed format)
              </small>
            </div>
          )}

          {formData.content_type === 'pdf' && (
            <div style={styles.inputGroup}>
              <label style={styles.label}>PDF URL *</label>
              <input
                type="url"
                name="file_url"
                value={formData.file_url}
                onChange={handleChange}
                required
                style={styles.input}
                placeholder="https://example.com/document.pdf"
              />
            </div>
          )}

          {formData.content_type === 'text' && (
            <div style={styles.inputGroup}>
              <label style={styles.label}>Text Content *</label>
              <textarea
                name="content_text"
                value={formData.content_text}
                onChange={handleChange}
                required
                rows="10"
                style={styles.textarea}
                placeholder="Enter text content here..."
              />
            </div>
          )}

          <div style={styles.inputGroup}>
            <label style={styles.label}>Order</label>
            <input
              type="number"
              name="order"
              value={formData.order}
              onChange={handleChange}
              min="0"
              style={styles.input}
              placeholder="0"
            />
            <small style={styles.helpText}>
              Lower numbers appear first in the course
            </small>
          </div>

          <div style={styles.actions}>
            <button type="button" onClick={onClose} style={styles.cancelButton}>
              Cancel
            </button>
            <button type="submit" disabled={loading} style={styles.submitButton}>
              {loading ? 'Saving...' : content ? 'Update' : 'Add Content'}
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
  select: {
    ...commonStyles.input,
    cursor: 'pointer',
  },
  helpText: {
    display: 'block',
    marginTop: theme.spacing.xs,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.gray,
    lineHeight: 1.5,
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
};

export default CourseContentForm;

