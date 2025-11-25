import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '../hooks/useMediaQuery';

const Home = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div style={styles.container}>
      {/* Navigation Bar */}
      <nav style={{...styles.navbar, ...(isMobile && styles.navbarMobile)}}>
        <div style={{...styles.navContent, ...(isMobile && styles.navContentMobile)}}>
          <div style={styles.logo}>
            <span style={styles.logoIcon}>📚</span>
            <span style={styles.logoText}>MyLearn</span>
          </div>
          <div style={styles.navButtons}>
            <button 
              onClick={() => navigate('/login')} 
              style={{...styles.loginButton, ...(isMobile && styles.loginButtonMobile)}}
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
              style={{...styles.registerButton, ...(isMobile && styles.registerButtonMobile)}}
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
      <section style={{...styles.hero, ...(isMobile && styles.heroMobile)}}>
        <div style={{...styles.heroContent, ...(isMobile && styles.heroContentMobile)}}>
          <h1 style={{...styles.heroTitle, ...(isMobile && styles.heroTitleMobile)}}>
            Learn Anything, Anytime, Anywhere
          </h1>
          <p style={{...styles.heroSubtitle, ...(isMobile && styles.heroSubtitleMobile)}}>
            Join thousands of students and instructors in our modern learning platform.
            Access courses, track your progress, and achieve your learning goals.
          </p>
          <div style={{...styles.heroButtons, ...(isMobile && styles.heroButtonsMobile)}}>
            <button 
              onClick={() => navigate('/register')} 
              style={{...styles.ctaButton, ...(isMobile && styles.ctaButtonMobile)}}
            >
              Start Learning Free
            </button>
            <button 
              onClick={() => navigate('/login')} 
              style={{...styles.secondaryButton, ...(isMobile && styles.secondaryButtonMobile)}}
            >
              Sign In
            </button>
          </div>
        </div>
        <div style={{...styles.heroImage, ...(isMobile && styles.heroImageMobile)}}>
          <div style={styles.illustration}>
            <div style={styles.icon1}>🎓</div>
            <div style={styles.icon2}>📖</div>
            <div style={styles.icon3}>💡</div>
            <div style={styles.icon4}>🏆</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{...styles.features, ...(isMobile && styles.featuresMobile)}}>
        <h2 style={{...styles.sectionTitle, ...(isMobile && styles.sectionTitleMobile)}}>Why Choose MyLearn?</h2>
        <div style={{...styles.featuresGrid, ...(isMobile && styles.featuresGridMobile)}}>
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
      <section style={{...styles.howItWorks, ...(isMobile && styles.howItWorksMobile)}}>
        <h2 style={{...styles.sectionTitle, ...(isMobile && styles.sectionTitleMobile)}}>How It Works</h2>
        <div style={{...styles.stepsContainer, ...(isMobile && styles.stepsContainerMobile)}}>
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
      <section style={{...styles.ctaSection, ...(isMobile && styles.ctaSectionMobile)}}>
        <div style={styles.ctaContent}>
          <h2 style={{...styles.ctaTitle, ...(isMobile && styles.ctaTitleMobile)}}>Ready to Start Your Learning Journey?</h2>
          <p style={{...styles.ctaText, ...(isMobile && styles.ctaTextMobile)}}>
            Join thousands of learners who are already advancing their skills with MyLearn.
          </p>
          <div style={{...styles.ctaButtons, ...(isMobile && styles.ctaButtonsMobile)}}>
            <button 
              onClick={() => navigate('/register')} 
              style={{...styles.ctaButtonLarge, ...(isMobile && styles.ctaButtonLargeMobile)}}
            >
              Get Started for Free
            </button>
            <button 
              onClick={() => navigate('/login')} 
              style={{...styles.secondaryButtonLarge, ...(isMobile && styles.secondaryButtonLargeMobile)}}
            >
              Already have an account? Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{...styles.footer, ...(isMobile && styles.footerMobile)}}>
        <div style={{...styles.footerContent, ...(isMobile && styles.footerContentMobile)}}>
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
        <div style={{...styles.footerBottom, ...(isMobile && styles.footerBottomMobile)}}>
          <div style={{...styles.footerBottomContent, ...(isMobile && styles.footerBottomContentMobile)}}>
            <p style={styles.copyright}>&copy; 2024 MyLearn™. All rights reserved.</p>
            <div style={{...styles.developerSection, ...(isMobile && styles.developerSectionMobile)}}>
              <p style={styles.developedBy}>Developed by</p>
              <p style={styles.developerName}>Santhosh Chandra</p>
            </div>
          </div>
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
  navbarMobile: {
    padding: '0.75rem 1rem',
  },
  navContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navContentMobile: {
    flexWrap: 'wrap',
    gap: '0.5rem',
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
    gap: '0.5rem',
    flexWrap: 'wrap',
  },
  loginButton: {
    padding: '0.75rem 1.25rem',
    backgroundColor: 'transparent',
    color: '#2563eb',
    border: '2px solid #2563eb',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    minHeight: '44px',
  },
  loginButtonMobile: {
    padding: '0.625rem 1rem',
    fontSize: '0.875rem',
    flex: '1 1 auto',
  },
  registerButton: {
    padding: '0.75rem 1.25rem',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(37, 99, 235, 0.3)',
    minHeight: '44px',
  },
  registerButtonMobile: {
    padding: '0.625rem 1rem',
    fontSize: '0.875rem',
    flex: '1 1 auto',
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
  heroMobile: {
    flexDirection: 'column',
    padding: '2rem 1rem',
    gap: '2rem',
    minHeight: 'auto',
  },
  heroContent: {
    flex: 1,
  },
  heroContentMobile: {
    width: '100%',
    textAlign: 'center',
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
  heroTitleMobile: {
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  heroSubtitle: {
    fontSize: '1.25rem',
    color: '#64748b',
    marginBottom: '2rem',
    lineHeight: '1.6',
  },
  heroSubtitleMobile: {
    fontSize: '1rem',
    marginBottom: '1.5rem',
  },
  heroButtons: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  heroButtonsMobile: {
    flexDirection: 'column',
    width: '100%',
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
    minHeight: '48px',
  },
  ctaButtonMobile: {
    width: '100%',
    padding: '0.875rem 1.5rem',
    fontSize: '1rem',
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
    minHeight: '48px',
  },
  secondaryButtonMobile: {
    width: '100%',
    padding: '0.875rem 1.5rem',
    fontSize: '1rem',
  },
  heroImage: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroImageMobile: {
    display: 'none',
  },
  illustration: {
    position: 'relative',
    width: '400px',
    height: '400px',
    '@media (max-width: 768px)': {
      width: '300px',
      height: '300px',
    },
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
  featuresMobile: {
    padding: '3rem 1rem',
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: '3rem',
  },
  sectionTitleMobile: {
    fontSize: '1.75rem',
    marginBottom: '2rem',
  },
  featuresGrid: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
  },
  featuresGridMobile: {
    gridTemplateColumns: '1fr',
    gap: '1.5rem',
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
  howItWorksMobile: {
    padding: '3rem 1rem',
  },
  stepsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginTop: '3rem',
  },
  stepsContainerMobile: {
    gridTemplateColumns: '1fr',
    gap: '1.5rem',
    marginTop: '2rem',
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
  ctaSectionMobile: {
    padding: '3rem 1rem',
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
  ctaTitleMobile: {
    fontSize: '1.75rem',
  },
  ctaText: {
    fontSize: '1.25rem',
    marginBottom: '2rem',
    opacity: 0.9,
  },
  ctaTextMobile: {
    fontSize: '1rem',
    marginBottom: '1.5rem',
  },
  ctaButtons: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  ctaButtonsMobile: {
    flexDirection: 'column',
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
    minHeight: '48px',
  },
  ctaButtonLargeMobile: {
    width: '100%',
    padding: '1rem 1.5rem',
    fontSize: '1rem',
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
    minHeight: '48px',
  },
  secondaryButtonLargeMobile: {
    width: '100%',
    padding: '1rem 1.5rem',
    fontSize: '1rem',
  },
  footer: {
    backgroundColor: '#1e293b',
    color: 'white',
    padding: '3rem 2rem 1rem',
  },
  footerMobile: {
    padding: '2rem 1rem 1rem',
  },
  footerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginBottom: '2rem',
  },
  footerContentMobile: {
    gridTemplateColumns: '1fr',
    gap: '1.5rem',
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
    color: '#cbd5e1',
  },
  footerBottomMobile: {
    paddingTop: '1.5rem',
  },
  footerBottomContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  copyright: {
    fontSize: '0.9rem',
    color: '#cbd5e1',
    margin: 0,
  },
  developerSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '0.25rem',
  },
  developedBy: {
    fontSize: '0.85rem',
    color: '#94a3b8',
    margin: 0,
    fontStyle: 'italic',
  },
  developerName: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#ffffff',
    margin: 0,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '0.5px',
  },
  // Mobile styles for footer bottom
  footerBottomContentMobile: {
    flexDirection: 'column',
    textAlign: 'center',
    gap: '1rem',
  },
  developerSectionMobile: {
    alignItems: 'center',
  },
};


export default Home;

