import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiRequest, getCourseContent, deleteCourseContent, markContentComplete } from '../services/api';
import CourseContentForm from './CourseContentForm';
import { convertToYouTubeEmbed } from '../utils/youtube';

const CourseLearning = ({ userRole }) => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedContent, setSelectedContent] = useState(null);
  const [showContentForm, setShowContentForm] = useState(false);
  const [editingContent, setEditingContent] = useState(null);
  const [courseProgress, setCourseProgress] = useState({ completed: 0, total: 0, percentage: 0 });

  useEffect(() => {
    fetchCourseData();
    fetchContents();
  }, [courseId]);


  const fetchCourseData = async () => {
    try {
      const response = await apiRequest(`/courses/${courseId}/`);
      if (response.ok) {
        const data = await response.json();
        setCourse(data);
        // Lecturers can always access their own courses
        if (userRole === 'lecturer' && data.lecturer_name) {
          // Allow access for lecturers
        } else if (userRole === 'student' && !data.is_enrolled) {
          setError('You must enroll in this course to access the content');
          return;
        }
      } else {
        setError('Failed to load course');
      }
    } catch (err) {
      setError('Error loading course');
    }
  };

  const fetchContents = async () => {
    try {
      setLoading(true);
      const data = await getCourseContent(courseId);
      setContents(data);
      if (data.length > 0) {
        // If we have a selected content, update it with fresh data
        if (selectedContent) {
          const updated = data.find(c => c.id === selectedContent.id);
          setSelectedContent(updated || data[0]);
        } else {
          setSelectedContent(data[0]);
        }
      }
      // Calculate progress after contents are loaded
      if (userRole === 'student' && data.length > 0) {
        const total = data.length;
        const completed = data.filter(content => content.is_completed).length;
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
        setCourseProgress({ completed, total, percentage });
      }
    } catch (err) {
      setError(err.message || 'Failed to load course content');
    } finally {
      setLoading(false);
    }
  };

  const handleAddContent = () => {
    setEditingContent(null);
    setShowContentForm(true);
  };

  const handleEditContent = (content) => {
    setEditingContent(content);
    setShowContentForm(true);
  };

  const handleDeleteContent = async (contentId) => {
    if (!window.confirm('Are you sure you want to delete this content?')) {
      return;
    }

    try {
      await deleteCourseContent(contentId);
      fetchContents();
      if (selectedContent?.id === contentId) {
        setSelectedContent(null);
      }
    } catch (err) {
      alert(err.message || 'Failed to delete content');
    }
  };

  const handleContentFormClose = () => {
    setShowContentForm(false);
    setEditingContent(null);
    fetchContents();
  };

  const handleMarkComplete = async () => {
    if (!selectedContent) return;

    try {
      await markContentComplete(selectedContent.id);
      // Refresh contents to get updated completion status
      await fetchContents();
    } catch (err) {
      alert(err.message || 'Failed to update progress');
    }
  };

  if (loading) {
    return <div style={styles.loading}>Loading course content...</div>;
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.error}>{error}</div>
        <button onClick={() => navigate('/dashboard')} style={styles.backButton}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={() => navigate('/dashboard')} style={styles.backButton}>
          ← Back to Courses
        </button>
        {course && (
          <div style={styles.headerContent}>
            <div>
              <h1 style={styles.courseTitle}>{course.title}</h1>
              <p style={styles.courseDescription}>{course.description}</p>
            </div>
            {userRole === 'student' && courseProgress.total > 0 && (
              <div style={styles.progressBarContainer}>
                <div style={styles.progressInfo}>
                  <span style={styles.progressText}>
                    Progress: {courseProgress.completed}/{courseProgress.total} ({courseProgress.percentage}%)
                  </span>
                </div>
                <div style={styles.progressBar}>
                  <div 
                    style={{
                      ...styles.progressFill,
                      width: `${courseProgress.percentage}%`
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div style={styles.mainContent}>
        <div style={styles.sidebar}>
          <div style={styles.sidebarHeader}>
            <h3 style={styles.sidebarTitle}>Course Content</h3>
            {userRole === 'lecturer' && (
              <button onClick={handleAddContent} style={styles.addButton}>
                + Add
              </button>
            )}
          </div>
          {contents.length === 0 ? (
            <div style={styles.emptyContent}>No content available yet</div>
          ) : (
            <div style={styles.contentList}>
              {contents.map((content, index) => (
                <div
                  key={content.id}
                  style={{
                    ...styles.contentItemWrapper,
                  }}
                >
                  <div
                    onClick={() => setSelectedContent(content)}
                    style={{
                      ...styles.contentItem,
                      ...(selectedContent?.id === content.id ? styles.contentItemActive : {}),
                    }}
                  >
                    <div style={styles.contentItemHeader}>
                      <span style={styles.contentNumber}>{index + 1}</span>
                      <span style={styles.contentTypeBadge}>{content.content_type}</span>
                      {userRole === 'student' && content.is_completed && (
                        <span style={styles.completedIcon}>✓</span>
                      )}
                    </div>
                    <div style={styles.contentItemTitle}>{content.title}</div>
                  </div>
                  {userRole === 'lecturer' && (
                    <div style={styles.contentActions}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditContent(content);
                        }}
                        style={styles.editContentButton}
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteContent(content.id);
                        }}
                        style={styles.deleteContentButton}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={styles.contentViewer}>
          {selectedContent ? (
            <div>
              <h2 style={styles.contentTitle}>{selectedContent.title}</h2>
              {selectedContent.description && (
                <p style={styles.contentDescription}>{selectedContent.description}</p>
              )}

              {selectedContent.content_type === 'video' && selectedContent.video_url && (
                <div style={styles.videoContainer}>
                  <iframe
                    src={convertToYouTubeEmbed(selectedContent.video_url)}
                    title={selectedContent.title}
                    style={styles.video}
                    allowFullScreen
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                </div>
              )}

              {selectedContent.content_type === 'pdf' && selectedContent.file_url && (
                <div style={styles.pdfContainer}>
                  <iframe
                    src={selectedContent.file_url}
                    title={selectedContent.title}
                    style={styles.pdf}
                  />
                  <a
                    href={selectedContent.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.downloadLink}
                  >
                    Download PDF
                  </a>
                </div>
              )}

              {selectedContent.content_type === 'text' && selectedContent.content_text && (
                <div style={styles.textContainer}>
                  <pre style={styles.textContent}>{selectedContent.content_text}</pre>
                </div>
              )}

              {!selectedContent.video_url && 
               !selectedContent.file_url && 
               !selectedContent.content_text && (
                <div style={styles.emptyContent}>
                  Content not available yet
                </div>
              )}

              {userRole === 'student' && selectedContent && (
                <div style={styles.completionSection}>
                  <button
                    onClick={handleMarkComplete}
                    style={{
                      ...styles.completeButton,
                      ...(selectedContent.is_completed ? styles.completedButton : {})
                    }}
                  >
                    {selectedContent.is_completed ? '✓ Completed' : 'Mark as Complete'}
                  </button>
                  {selectedContent.is_completed && (
                    <span style={styles.completedBadge}>✓ You've completed this content</span>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div style={styles.emptyContent}>
              Select content from the sidebar to start learning
            </div>
          )}
        </div>
      </div>

      {showContentForm && (
        <CourseContentForm
          courseId={courseId}
          content={editingContent}
          onClose={handleContentFormClose}
          onSuccess={handleContentFormClose}
        />
      )}
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: 'white',
    padding: '1.5rem 2rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '2rem',
  },
  headerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    gap: '2rem',
  },
  progressBarContainer: {
    minWidth: '300px',
  },
  progressInfo: {
    marginBottom: '0.5rem',
  },
  progressText: {
    fontSize: '0.9rem',
    color: '#666',
    fontWeight: '500',
  },
  progressBar: {
    width: '100%',
    height: '24px',
    backgroundColor: '#e0e0e0',
    borderRadius: '12px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#28a745',
    transition: 'width 0.3s ease',
  },
  backButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '1rem',
    fontSize: '0.9rem',
  },
  courseTitle: {
    margin: '0.5rem 0',
    color: '#333',
  },
  courseDescription: {
    color: '#666',
    marginTop: '0.5rem',
  },
  mainContent: {
    display: 'flex',
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 2rem',
    gap: '2rem',
  },
  sidebar: {
    width: '300px',
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '1.5rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    height: 'fit-content',
    maxHeight: 'calc(100vh - 200px)',
    overflowY: 'auto',
  },
  sidebarHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  sidebarTitle: {
    marginTop: 0,
    marginBottom: 0,
    color: '#333',
  },
  addButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  contentItemWrapper: {
    marginBottom: '0.5rem',
  },
  contentList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  contentItem: {
    padding: '1rem',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  contentItemActive: {
    backgroundColor: '#e3f2fd',
    borderColor: '#2196f3',
  },
  contentItemHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem',
  },
  contentNumber: {
    fontWeight: 'bold',
    color: '#666',
  },
  contentTypeBadge: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '0.2rem 0.5rem',
    borderRadius: '4px',
    fontSize: '0.75rem',
    textTransform: 'uppercase',
  },
  contentItemTitle: {
    color: '#333',
    fontSize: '0.9rem',
  },
  contentActions: {
    display: 'flex',
    gap: '0.5rem',
    marginTop: '0.5rem',
    paddingTop: '0.5rem',
    borderTop: '1px solid #e0e0e0',
  },
  editContentButton: {
    flex: 1,
    padding: '0.4rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.8rem',
  },
  deleteContentButton: {
    flex: 1,
    padding: '0.4rem',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.8rem',
  },
  completionSection: {
    marginTop: '2rem',
    padding: '1.5rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    alignItems: 'flex-start',
  },
  completeButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
  },
  completedButton: {
    backgroundColor: '#28a745',
  },
  completedBadge: {
    color: '#28a745',
    fontWeight: '500',
    fontSize: '0.9rem',
  },
  completedIcon: {
    color: '#28a745',
    fontWeight: 'bold',
    marginLeft: '0.5rem',
  },
  contentViewer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '2rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  contentTitle: {
    marginTop: 0,
    color: '#333',
  },
  contentDescription: {
    color: '#666',
    marginBottom: '2rem',
  },
  videoContainer: {
    position: 'relative',
    paddingBottom: '56.25%',
    height: 0,
    overflow: 'hidden',
    marginBottom: '1rem',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  pdfContainer: {
    marginBottom: '1rem',
  },
  pdf: {
    width: '100%',
    height: '600px',
    border: '1px solid #e0e0e0',
  },
  downloadLink: {
    display: 'inline-block',
    marginTop: '1rem',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px',
  },
  textContainer: {
    backgroundColor: '#f8f9fa',
    padding: '1.5rem',
    borderRadius: '4px',
    marginBottom: '1rem',
  },
  textContent: {
    whiteSpace: 'pre-wrap',
    fontFamily: 'inherit',
    lineHeight: '1.6',
    color: '#333',
    margin: 0,
  },
  emptyContent: {
    textAlign: 'center',
    padding: '3rem',
    color: '#666',
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    fontSize: '1.2rem',
  },
  error: {
    backgroundColor: '#fee',
    color: '#c33',
    padding: '1rem',
    borderRadius: '4px',
    marginBottom: '1rem',
  },
};

export default CourseLearning;

