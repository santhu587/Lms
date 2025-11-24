import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { theme, commonStyles } from '../theme';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(username, password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Login failed. Please check your credentials.');
    }
    
    setLoading(false);
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
          <h1 style={styles.welcomeTitle}>Welcome Back!</h1>
          <p style={styles.welcomeText}>Sign in to continue your learning journey</p>
        </div>
        <div style={styles.card}>
          <h2 style={styles.title}>Sign In</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            {error && <div style={commonStyles.error}>{error}</div>}
            
            <div style={styles.inputGroup}>
              <label style={commonStyles.label}>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={styles.input}
                placeholder="Enter your username"
                onFocus={(e) => e.target.style.borderColor = theme.colors.primary}
                onBlur={(e) => e.target.style.borderColor = theme.colors.grayLight}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={commonStyles.label}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={styles.input}
                placeholder="Enter your password"
                onFocus={(e) => e.target.style.borderColor = theme.colors.primary}
                onBlur={(e) => e.target.style.borderColor = theme.colors.grayLight}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              style={{
                ...commonStyles.button.primary,
                ...styles.button,
                opacity: loading ? 0.7 : 1,
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = theme.shadows.primaryHover;
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = theme.shadows.primary;
              }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            <div style={styles.footer}>
              <p style={styles.footerText}>
                Don't have an account?{' '}
                <Link to="/register" style={styles.link}>
                  Sign up here
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
    background: theme.gradients.primary,
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
  },
  card: {
    ...commonStyles.card,
    maxWidth: '450px',
    width: '100%',
  },
  title: {
    ...commonStyles.title,
    fontSize: theme.typography.fontSize['3xl'],
    textAlign: 'center',
    background: theme.gradients.primary,
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
    ':focus': {
      outline: 'none',
      borderColor: theme.colors.primary,
      boxShadow: `0 0 0 3px ${theme.colors.primary}20`,
    },
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
    color: theme.colors.primary,
    textDecoration: 'none',
    fontWeight: theme.typography.fontWeight.semibold,
    ':hover': {
      textDecoration: 'underline',
    },
  },
  backLink: {
    color: theme.colors.gray,
    textDecoration: 'none',
    fontSize: theme.typography.fontSize.sm,
    display: 'inline-block',
    marginTop: theme.spacing.sm,
    ':hover': {
      color: theme.colors.primary,
    },
  },
};

export default Login;

