import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiRequest, getCourseStudentProgress } from '../services/api';

const StudentProgress = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [studentProgress, setStudentProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProgress();
  }, [courseId]);

  const fetchProgress = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getCourseStudentProgress(courseId);
      setCourse({
        id: response.course_id,
        title: response.course_title,
        total_content: response.total_content,
      });
      setStudentProgress(response.students || []);
    } catch (err) {
      const errorMessage = err.message || 'Failed to load student progress';
      setError(errorMessage);
      console.error('Error fetching student progress:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={styles.loading}>Loading student progress...</div>;
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
          <div>
            <h1 style={styles.courseTitle}>{course.title}</h1>
            <p style={styles.subtitle}>
              Student Progress Overview ({studentProgress.length} {studentProgress.length === 1 ? 'student' : 'students'})
            </p>
          </div>
        )}
      </div>

      {studentProgress.length === 0 ? (
        <div style={styles.empty}>
          <p>No students enrolled in this course yet.</p>
        </div>
      ) : (
        <div style={styles.progressList}>
          {studentProgress.map((student) => (
            <div key={student.student_id} style={styles.studentCard}>
              <div style={styles.studentHeader}>
                <div>
                  <h3 style={styles.studentName}>{student.student_name}</h3>
                  <p style={styles.studentEmail}>{student.student_email}</p>
                  <p style={styles.enrolledDate}>
                    Enrolled: {new Date(student.enrolled_at).toLocaleDateString()}
                  </p>
                </div>
                <div style={styles.progressSummary}>
                  <div style={styles.progressPercentage}>
                    {student.progress_percentage}%
                  </div>
                  <div style={styles.progressText}>
                    {student.completed_content} / {student.total_content} completed
                  </div>
                  <div style={styles.progressBar}>
                    <div
                      style={{
                        ...styles.progressFill,
                        width: `${student.progress_percentage}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div style={styles.contentProgress}>
                <h4 style={styles.contentProgressTitle}>Content Progress:</h4>
                <div style={styles.contentList}>
                  {student.content_progress.map((content) => (
                    <div
                      key={content.content_id}
                      style={{
                        ...styles.contentItem,
                        ...(content.completed ? styles.contentCompleted : {}),
                      }}
                    >
                      <span style={styles.contentTitle}>{content.content_title}</span>
                      {content.completed ? (
                        <span style={styles.completedBadge}>
                          ✓ Completed {content.completed_at && 
                            `on ${new Date(content.completed_at).toLocaleDateString()}`}
                        </span>
                      ) : (
                        <span style={styles.incompleteBadge}>Not completed</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    padding: '2rem',
  },
  header: {
    backgroundColor: 'white',
    padding: '1.5rem 2rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '2rem',
    borderRadius: '8px',
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
  subtitle: {
    color: '#666',
    marginTop: '0.5rem',
  },
  progressList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  studentCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '1.5rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  studentHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1.5rem',
    paddingBottom: '1.5rem',
    borderBottom: '1px solid #e0e0e0',
  },
  studentName: {
    margin: '0 0 0.5rem 0',
    color: '#333',
  },
  studentEmail: {
    color: '#666',
    fontSize: '0.9rem',
    margin: '0.25rem 0',
  },
  enrolledDate: {
    color: '#999',
    fontSize: '0.85rem',
    margin: '0.25rem 0',
  },
  progressSummary: {
    textAlign: 'right',
    minWidth: '200px',
  },
  progressPercentage: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: '0.5rem',
  },
  progressText: {
    color: '#666',
    fontSize: '0.9rem',
    marginBottom: '0.5rem',
  },
  progressBar: {
    width: '100%',
    height: '20px',
    backgroundColor: '#e0e0e0',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#28a745',
    transition: 'width 0.3s ease',
  },
  contentProgress: {
    marginTop: '1rem',
  },
  contentProgressTitle: {
    margin: '0 0 1rem 0',
    color: '#333',
    fontSize: '1.1rem',
  },
  contentList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  contentItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.75rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '4px',
  },
  contentCompleted: {
    backgroundColor: '#e8f5e9',
  },
  contentTitle: {
    color: '#333',
    fontWeight: '500',
  },
  completedBadge: {
    color: '#28a745',
    fontWeight: '500',
    fontSize: '0.9rem',
  },
  incompleteBadge: {
    color: '#999',
    fontSize: '0.9rem',
  },
  empty: {
    textAlign: 'center',
    padding: '3rem',
    backgroundColor: 'white',
    borderRadius: '8px',
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

export default StudentProgress;

