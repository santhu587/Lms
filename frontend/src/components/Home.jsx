import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* Navigation Bar */}
      <nav style={styles.navbar}>
        <div style={styles.navContent}>
          <div style={styles.logo}>
            <span style={styles.logoIcon}>📚</span>
            <span style={styles.logoText}>MyLearn</span>
          </div>
          <div style={styles.navButtons}>
            <button 
              onClick={() => navigate('/login')} 
              style={styles.loginButton}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#2563eb';
                e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#2563eb';
              }}
            >
              Login
            </button>
            <button 
              onClick={() => navigate('/register')} 
              style={styles.registerButton}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 2px 8px rgba(37, 99, 235, 0.3)';
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            Learn Anything, Anytime, Anywhere
          </h1>
          <p style={styles.heroSubtitle}>
            Join thousands of students and instructors in our modern learning platform.
            Access courses, track your progress, and achieve your learning goals.
          </p>
          <div style={styles.heroButtons}>
            <button 
              onClick={() => navigate('/register')} 
              style={styles.ctaButton}
            >
              Start Learning Free
            </button>
            <button 
              onClick={() => navigate('/login')} 
              style={styles.secondaryButton}
            >
              Sign In
            </button>
          </div>
        </div>
        <div style={styles.heroImage}>
          <div style={styles.illustration}>
            <div style={styles.icon1}>🎓</div>
            <div style={styles.icon2}>📖</div>
            <div style={styles.icon3}>💡</div>
            <div style={styles.icon4}>🏆</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.features}>
        <h2 style={styles.sectionTitle}>Why Choose MyLearn?</h2>
        <div style={styles.featuresGrid}>
          <div 
            style={styles.featureCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            }}
          >
            <div style={styles.featureIcon}>🎯</div>
            <h3 style={styles.featureTitle}>Interactive Learning</h3>
            <p style={styles.featureText}>
              Engage with video lessons, PDFs, and interactive content designed to enhance your learning experience.
            </p>
          </div>
          <div 
            style={styles.featureCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            }}
          >
            <div style={styles.featureIcon}>📊</div>
            <h3 style={styles.featureTitle}>Track Progress</h3>
            <p style={styles.featureText}>
              Monitor your learning journey with detailed progress tracking and completion certificates.
            </p>
          </div>
          <div 
            style={styles.featureCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            }}
          >
            <div style={styles.featureIcon}>👨‍🏫</div>
            <h3 style={styles.featureTitle}>Expert Instructors</h3>
            <p style={styles.featureText}>
              Learn from experienced lecturers who create comprehensive courses tailored to your needs.
            </p>
          </div>
          <div 
            style={styles.featureCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            }}
          >
            <div style={styles.featureIcon}>🚀</div>
            <h3 style={styles.featureTitle}>Learn at Your Pace</h3>
            <p style={styles.featureText}>
              Study whenever and wherever you want. No deadlines, no pressure - just pure learning.
            </p>
          </div>
          <div 
            style={styles.featureCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            }}
          >
            <div style={styles.featureIcon}>💼</div>
            <h3 style={styles.featureTitle}>Build Your Skills</h3>
            <p style={styles.featureText}>
              Acquire new skills and knowledge that will help you advance in your career and personal growth.
            </p>
          </div>
          <div 
            style={styles.featureCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            }}
          >
            <div style={styles.featureIcon}>🌐</div>
            <h3 style={styles.featureTitle}>Accessible Everywhere</h3>
            <p style={styles.featureText}>
              Access your courses from any device - desktop, tablet, or mobile. Learn on the go!
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section style={styles.howItWorks}>
        <h2 style={styles.sectionTitle}>How It Works</h2>
        <div style={styles.stepsContainer}>
          <div style={styles.step}>
            <div style={styles.stepNumber}>1</div>
            <h3 style={styles.stepTitle}>Sign Up</h3>
            <p style={styles.stepText}>
              Create your free account as a student or instructor in just a few seconds.
            </p>
          </div>
          <div style={styles.step}>
            <div style={styles.stepNumber}>2</div>
            <h3 style={styles.stepTitle}>Explore Courses</h3>
            <p style={styles.stepText}>
              Browse through hundreds of courses or create your own as an instructor.
            </p>
          </div>
          <div style={styles.step}>
            <div style={styles.stepNumber}>3</div>
            <h3 style={styles.stepTitle}>Start Learning</h3>
            <p style={styles.stepText}>
              Enroll in courses, watch videos, read materials, and track your progress.
            </p>
          </div>
          <div style={styles.step}>
            <div style={styles.stepNumber}>4</div>
            <h3 style={styles.stepTitle}>Achieve Goals</h3>
            <p style={styles.stepText}>
              Complete courses, earn certificates, and build your knowledge base.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>Ready to Start Your Learning Journey?</h2>
          <p style={styles.ctaText}>
            Join thousands of learners who are already advancing their skills with MyLearn.
          </p>
          <div style={styles.ctaButtons}>
            <button 
              onClick={() => navigate('/register')} 
              style={styles.ctaButtonLarge}
            >
              Get Started for Free
            </button>
            <button 
              onClick={() => navigate('/login')} 
              style={styles.secondaryButtonLarge}
            >
              Already have an account? Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerSection}>
            <h4 style={styles.footerTitle}>MyLearn</h4>
            <p style={styles.footerText}>
              Your modern learning platform for success.
            </p>
          </div>
          <div style={styles.footerSection}>
            <h4 style={styles.footerTitle}>Quick Links</h4>
            <div style={styles.footerLinks}>
              <button onClick={() => navigate('/login')} style={styles.footerLink}>Login</button>
              <button onClick={() => navigate('/register')} style={styles.footerLink}>Register</button>
            </div>
          </div>
          <div style={styles.footerSection}>
            <h4 style={styles.footerTitle}>Features</h4>
            <p style={styles.footerText}>Interactive Courses</p>
            <p style={styles.footerText}>Progress Tracking</p>
            <p style={styles.footerText}>Expert Instructors</p>
          </div>
        </div>
        <div style={styles.footerBottom}>
          <p>&copy; 2024 MyLearn. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#ffffff',
  },
  navbar: {
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    padding: '1rem 2rem',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  navContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#2563eb',
  },
  logoIcon: {
    fontSize: '2rem',
  },
  logoText: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  navButtons: {
    display: 'flex',
    gap: '1rem',
  },
  loginButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: 'transparent',
    color: '#2563eb',
    border: '2px solid #2563eb',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  registerButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(37, 99, 235, 0.3)',
  },
  hero: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '4rem 2rem',
    display: 'flex',
    alignItems: 'center',
    gap: '4rem',
    minHeight: '80vh',
  },
  heroContent: {
    flex: 1,
  },
  heroTitle: {
    fontSize: '3.5rem',
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: '1.5rem',
    lineHeight: '1.2',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  heroSubtitle: {
    fontSize: '1.25rem',
    color: '#64748b',
    marginBottom: '2rem',
    lineHeight: '1.6',
  },
  heroButtons: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  ctaButton: {
    padding: '1rem 2rem',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 14px 0 rgba(37, 99, 235, 0.39)',
  },
  secondaryButton: {
    padding: '1rem 2rem',
    backgroundColor: 'transparent',
    color: '#2563eb',
    border: '2px solid #2563eb',
    borderRadius: '12px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  heroImage: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustration: {
    position: 'relative',
    width: '400px',
    height: '400px',
  },
  icon1: {
    position: 'absolute',
    top: '10%',
    left: '20%',
    fontSize: '4rem',
    animation: 'float 3s ease-in-out infinite',
  },
  icon2: {
    position: 'absolute',
    top: '50%',
    right: '10%',
    fontSize: '4rem',
    animation: 'float 3s ease-in-out infinite 0.5s',
  },
  icon3: {
    position: 'absolute',
    bottom: '20%',
    left: '10%',
    fontSize: '4rem',
    animation: 'float 3s ease-in-out infinite 1s',
  },
  icon4: {
    position: 'absolute',
    top: '30%',
    right: '30%',
    fontSize: '4rem',
    animation: 'float 3s ease-in-out infinite 1.5s',
  },
  features: {
    backgroundColor: '#f8fafc',
    padding: '5rem 2rem',
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: '3rem',
  },
  featuresGrid: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
  },
  featureCard: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '16px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    textAlign: 'center',
    transition: 'transform 0.3s ease',
  },
  featureIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  featureTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '1rem',
  },
  featureText: {
    color: '#64748b',
    lineHeight: '1.6',
  },
  howItWorks: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '5rem 2rem',
  },
  stepsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginTop: '3rem',
  },
  step: {
    textAlign: 'center',
    padding: '2rem',
  },
  stepNumber: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: '#2563eb',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    margin: '0 auto 1.5rem',
  },
  stepTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '1rem',
  },
  stepText: {
    color: '#64748b',
    lineHeight: '1.6',
  },
  ctaSection: {
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '5rem 2rem',
    textAlign: 'center',
    color: 'white',
  },
  ctaContent: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  ctaTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  ctaText: {
    fontSize: '1.25rem',
    marginBottom: '2rem',
    opacity: 0.9,
  },
  ctaButtons: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  ctaButtonLarge: {
    padding: '1.25rem 2.5rem',
    backgroundColor: 'white',
    color: '#667eea',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  secondaryButtonLarge: {
    padding: '1.25rem 2.5rem',
    backgroundColor: 'transparent',
    color: 'white',
    border: '2px solid white',
    borderRadius: '12px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  footer: {
    backgroundColor: '#1e293b',
    color: 'white',
    padding: '3rem 2rem 1rem',
  },
  footerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginBottom: '2rem',
  },
  footerSection: {
    marginBottom: '1rem',
  },
  footerTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginBottom: '1rem',
  },
  footerText: {
    color: '#cbd5e1',
    marginBottom: '0.5rem',
  },
  footerLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  footerLink: {
    backgroundColor: 'transparent',
    color: '#cbd5e1',
    border: 'none',
    textAlign: 'left',
    cursor: 'pointer',
    padding: '0.25rem 0',
    fontSize: '1rem',
  },
  footerBottom: {
    maxWidth: '1200px',
    margin: '0 auto',
    paddingTop: '2rem',
    borderTop: '1px solid #334155',
    textAlign: 'center',
    color: '#cbd5e1',
  },
};


export default Home;

