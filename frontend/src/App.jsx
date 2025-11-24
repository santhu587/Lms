import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { theme, commonStyles } from './theme';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import CourseList from './components/CourseList';
import CourseLearning from './components/CourseLearning';
import StudentProgress from './components/StudentProgress';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div style={styles.loading}>
        <div style={styles.loader}>
          <div style={styles.spinner}></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Dashboard Component (example protected route)
const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div style={styles.dashboard}>
      <nav style={styles.navbar}>
        <div style={styles.navContent}>
          <div style={styles.brand}>
            <span style={styles.brandIcon}>📚</span>
            <span style={styles.brandText}>MyLearn</span>
          </div>
          <div style={styles.userSection}>
            <div style={styles.userInfo}>
              <span style={styles.userName}>{user?.username}</span>
              <span style={styles.userRole}>{user?.role || 'student'}</span>
            </div>
            <button 
              onClick={logout} 
              style={styles.logoutButton}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = theme.colors.dangerDark;
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = theme.colors.danger;
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <div style={styles.dashboardContent}>
        <div style={styles.welcomeSection}>
          <h1 style={styles.welcomeTitle}>
            Welcome back, {user?.username}! 👋
          </h1>
          <p style={styles.welcomeSubtitle}>
            {user?.role === 'lecturer' 
              ? 'Manage your courses and track student progress'
              : 'Continue your learning journey and explore new courses'}
          </p>
        </div>
        <CourseList userRole={user?.role || 'student'} />
      </div>
    </div>
  );
};

// Course Learning Component
const CourseLearningPage = () => {
  const { user } = useAuth();
  return <CourseLearning userRole={user?.role || 'student'} />;
};

// Student Progress Component (for lecturers)
const StudentProgressPage = () => {
  return <StudentProgress />;
};

// Main App Component
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/course/:courseId/learn"
            element={
              <ProtectedRoute>
                <CourseLearningPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/course/:courseId/progress"
            element={
              <ProtectedRoute>
                <StudentProgressPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

const styles = {
  dashboard: {
    minHeight: '100vh',
    backgroundColor: theme.colors.background,
  },
  navbar: {
    backgroundColor: theme.colors.white,
    boxShadow: theme.shadows.md,
    padding: `${theme.spacing.md} ${theme.spacing.xl}`,
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  navContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.bold,
    background: theme.gradients.primary,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  brandIcon: {
    fontSize: theme.typography.fontSize['3xl'],
  },
  brandText: {
    fontFamily: theme.typography.fontFamily,
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.lg,
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  userName: {
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.dark,
    fontSize: theme.typography.fontSize.base,
  },
  userRole: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.gray,
    textTransform: 'capitalize',
  },
  logoutButton: {
    ...commonStyles.button.danger,
    transition: theme.transitions.normal,
  },
  dashboardContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: theme.spacing.xl,
  },
  welcomeSection: {
    marginBottom: theme.spacing['2xl'],
    padding: theme.spacing.xl,
    background: theme.gradients.primary,
    borderRadius: theme.borderRadius.xl,
    color: theme.colors.white,
  },
  welcomeTitle: {
    fontSize: theme.typography.fontSize['4xl'],
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: theme.spacing.sm,
  },
  welcomeSubtitle: {
    fontSize: theme.typography.fontSize.lg,
    opacity: 0.9,
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: theme.colors.background,
  },
  loader: {
    textAlign: 'center',
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: `4px solid ${theme.colors.grayLight}`,
    borderTop: `4px solid ${theme.colors.primary}`,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 1rem',
  },
};

// Add spinner animation
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
if (!document.head.querySelector('style[data-spinner]')) {
  styleSheet.setAttribute('data-spinner', 'true');
  document.head.appendChild(styleSheet);
}

export default App;

