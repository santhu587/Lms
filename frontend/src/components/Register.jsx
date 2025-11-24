import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { theme, commonStyles } from '../theme';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'student',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!formData.username || !formData.email || !formData.password || !formData.role) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }

      if (formData.password.length < 8) {
        setError('Password must be at least 8 characters long');
        setLoading(false);
        return;
      }

      const result = await register(formData);
      
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.backgroundPattern}></div>
      <div style={styles.content}>
        <div style={styles.logoSection}>
          <div style={styles.logo}>
            <span style={styles.logoIcon}>📚</span>
            <span style={styles.logoText}>MyLearn</span>
          </div>
          <h1 style={styles.welcomeTitle}>Join MyLearn Today!</h1>
          <p style={styles.welcomeText}>
            Start your learning journey and unlock unlimited knowledge. 
            Create your account in seconds and begin exploring courses.
          </p>
          <div style={styles.benefits}>
            <div style={styles.benefit}>
              <span style={styles.benefitIcon}>✓</span>
              <span>Free to get started</span>
            </div>
            <div style={styles.benefit}>
              <span style={styles.benefitIcon}>✓</span>
              <span>Access to all courses</span>
            </div>
            <div style={styles.benefit}>
              <span style={styles.benefitIcon}>✓</span>
              <span>Track your progress</span>
            </div>
          </div>
        </div>
        <div style={styles.card}>
          <h2 style={styles.title}>Create Account</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            {error && <div style={commonStyles.error}>{error}</div>}
            
            <div style={styles.inputGroup}>
              <label style={commonStyles.label}>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                style={styles.input}
                placeholder="Choose a username"
                onFocus={(e) => e.target.style.borderColor = theme.colors.primary}
                onBlur={(e) => e.target.style.borderColor = theme.colors.grayLight}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={commonStyles.label}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={styles.input}
                placeholder="Enter your email"
                onFocus={(e) => e.target.style.borderColor = theme.colors.primary}
                onBlur={(e) => e.target.style.borderColor = theme.colors.grayLight}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={commonStyles.label}>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                style={styles.input}
                placeholder="Choose a password (min 8 characters)"
                onFocus={(e) => e.target.style.borderColor = theme.colors.primary}
                onBlur={(e) => e.target.style.borderColor = theme.colors.grayLight}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={commonStyles.label}>I want to</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                style={styles.select}
                onFocus={(e) => e.target.style.borderColor = theme.colors.primary}
                onBlur={(e) => e.target.style.borderColor = theme.colors.grayLight}
              >
                <option value="student">Learn as a Student</option>
                <option value="lecturer">Teach as a Lecturer</option>
              </select>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              style={{
                ...commonStyles.button.success,
                ...styles.button,
                opacity: loading ? 0.7 : 1,
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = theme.shadows.lg;
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = theme.shadows.md;
              }}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>

            <div style={styles.footer}>
              <p style={styles.footerText}>
                Already have an account?{' '}
                <Link to="/login" style={styles.link}>
                  Sign in here
                </Link>
              </p>
              <Link to="/" style={styles.backLink}>
                ← Back to Home
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.gradients.secondary,
    position: 'relative',
    overflow: 'hidden',
    padding: theme.spacing.xl,
  },
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)',
    zIndex: 0,
  },
  content: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: theme.spacing['3xl'],
    maxWidth: '1000px',
    width: '100%',
    zIndex: 1,
    position: 'relative',
  },
  logoSection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    color: theme.colors.white,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: theme.spacing.xl,
  },
  logoIcon: {
    fontSize: theme.typography.fontSize['4xl'],
  },
  logoText: {
    textShadow: '0 2px 4px rgba(0,0,0,0.2)',
  },
  welcomeTitle: {
    fontSize: theme.typography.fontSize['5xl'],
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: theme.spacing.md,
    lineHeight: 1.2,
  },
  welcomeText: {
    fontSize: theme.typography.fontSize.xl,
    opacity: 0.9,
    lineHeight: 1.6,
    marginBottom: theme.spacing.xl,
  },
  benefits: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
  },
  benefit: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
    fontSize: theme.typography.fontSize.lg,
  },
  benefitIcon: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255,255,255,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: theme.typography.fontWeight.bold,
  },
  card: {
    ...commonStyles.card,
    maxWidth: '500px',
    width: '100%',
  },
  title: {
    ...commonStyles.title,
    fontSize: theme.typography.fontSize['3xl'],
    textAlign: 'center',
    background: theme.gradients.secondary,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: theme.spacing.lg,
  },
  input: {
    ...commonStyles.input,
  },
  select: {
    ...commonStyles.input,
    cursor: 'pointer',
  },
  button: {
    width: '100%',
    marginTop: theme.spacing.md,
  },
  footer: {
    marginTop: theme.spacing.xl,
    textAlign: 'center',
  },
  footerText: {
    color: theme.colors.gray,
    fontSize: theme.typography.fontSize.sm,
    marginBottom: theme.spacing.md,
  },
  link: {
    color: theme.colors.secondary,
    textDecoration: 'none',
    fontWeight: theme.typography.fontWeight.semibold,
  },
  backLink: {
    color: theme.colors.gray,
    textDecoration: 'none',
    fontSize: theme.typography.fontSize.sm,
    display: 'inline-block',
    marginTop: theme.spacing.sm,
  },
};

export default Register;

