// API Service for communicating with Django backend
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Helper function to get stored tokens
const getTokens = () => {
  const accessToken = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');
  return { accessToken, refreshToken };
};

// Helper function to set tokens
const setTokens = (accessToken, refreshToken) => {
  localStorage.setItem('access_token', accessToken);
  localStorage.setItem('refresh_token', refreshToken);
};

// Helper function to remove tokens
const removeTokens = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};

// Make authenticated API request
export const apiRequest = async (endpoint, options = {}) => {
  const { accessToken } = getTokens();
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    // If token expired, try to refresh
    if (response.status === 401 && accessToken) {
      const refreshed = await refreshAccessToken();
      if (refreshed) {
        // Retry the original request with new token
        const newHeaders = {
          ...headers,
          'Authorization': `Bearer ${getTokens().accessToken}`,
        };
        return fetch(`${API_BASE_URL}${endpoint}`, {
          ...options,
          headers: newHeaders,
        });
      }
    }

    return response;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Refresh access token using refresh token
export const refreshAccessToken = async () => {
  const { refreshToken } = getTokens();
  
  if (!refreshToken) {
    return false;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (response.ok) {
      const data = await response.json();
      setTokens(data.access, refreshToken);
      return true;
    } else {
      // Refresh token expired, logout user
      removeTokens();
      return false;
    }
  } catch (error) {
    console.error('Token refresh failed:', error);
    removeTokens();
    return false;
  }
};

// Register new user
export const register = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/register/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const error = await response.json();
    // Handle validation errors
    if (error.username || error.email || error.password || error.role) {
      const errorMessages = [];
      if (error.username) {
        errorMessages.push(`Username: ${Array.isArray(error.username) ? error.username[0] : error.username}`);
      }
      if (error.email) {
        errorMessages.push(`Email: ${Array.isArray(error.email) ? error.email[0] : error.email}`);
      }
      if (error.password) {
        errorMessages.push(`Password: ${Array.isArray(error.password) ? error.password[0] : error.password}`);
      }
      if (error.role) {
        errorMessages.push(`Role: ${Array.isArray(error.role) ? error.role[0] : error.role}`);
      }
      throw new Error(errorMessages.join(', ') || 'Validation error');
    }
    throw new Error(error.detail || error.error || 'Registration failed');
  }

  return response.json();
};

// Login and get JWT tokens
export const login = async (username, password) => {
  const response = await fetch(`${API_BASE_URL}/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Login failed');
  }

  const data = await response.json();
  setTokens(data.access, data.refresh);
  return data;
};

// Logout (remove tokens)
export const logout = () => {
  removeTokens();
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getTokens().accessToken;
};

// Get current access token
export const getAccessToken = () => {
  return getTokens().accessToken;
};

// Decode JWT token to get user info
export const decodeToken = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
};

// Get current user info from token
export const getCurrentUser = () => {
  const { accessToken } = getTokens();
  if (!accessToken) return null;
  return decodeToken(accessToken);
};

// Enroll in a course
export const enrollInCourse = async (courseId) => {
  const response = await apiRequest(`/courses/${courseId}/enroll/`, {
    method: 'POST',
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to enroll in course');
  }
  
  return response.json();
};

// Get enrolled courses
export const getMyEnrollments = async () => {
  const response = await apiRequest('/enrollments/');
  
  if (!response.ok) {
    throw new Error('Failed to fetch enrollments');
  }
  
  return response.json();
};

// Get course content
export const getCourseContent = async (courseId) => {
  const response = await apiRequest(`/courses/${courseId}/contents/`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch course content');
  }
  
  return response.json();
};

// Create course content (for lecturers)
export const createCourseContent = async (courseId, contentData) => {
  const response = await apiRequest(`/courses/${courseId}/contents/`, {
    method: 'POST',
    body: JSON.stringify(contentData),
  });
  
  if (!response.ok) {
    const error = await response.json();
    // Handle validation errors
    if (error.video_url || error.file_url || error.content_text) {
      const errorMessages = Object.entries(error)
        .filter(([key]) => ['video_url', 'file_url', 'content_text'].includes(key))
        .map(([key, value]) => Array.isArray(value) ? value[0] : value)
        .join(', ');
      throw new Error(errorMessages || 'Validation error');
    }
    throw new Error(error.error || error.detail || 'Failed to create course content');
  }
  
  return response.json();
};

// Update course content (for lecturers)
export const updateCourseContent = async (contentId, contentData) => {
  const response = await apiRequest(`/contents/${contentId}/`, {
    method: 'PUT',
    body: JSON.stringify(contentData),
  });
  
  if (!response.ok) {
    const error = await response.json();
    // Handle validation errors
    if (error.video_url || error.file_url || error.content_text) {
      const errorMessages = Object.entries(error)
        .filter(([key]) => ['video_url', 'file_url', 'content_text'].includes(key))
        .map(([key, value]) => Array.isArray(value) ? value[0] : value)
        .join(', ');
      throw new Error(errorMessages || 'Validation error');
    }
    throw new Error(error.error || error.detail || 'Failed to update course content');
  }
  
  return response.json();
};

// Delete course content (for lecturers)
export const deleteCourseContent = async (contentId) => {
  const response = await apiRequest(`/contents/${contentId}/`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete course content');
  }
  
  return true;
};

// Mark content as complete/incomplete
export const markContentComplete = async (contentId) => {
  const response = await apiRequest(`/contents/${contentId}/complete/`, {
    method: 'POST',
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update progress');
  }
  
  return response.json();
};

// Get my progress for all enrolled courses
export const getMyProgress = async () => {
  const response = await apiRequest('/progress/');
  
  if (!response.ok) {
    throw new Error('Failed to fetch progress');
  }
  
  return response.json();
};

// Get student progress for a course (lecturers only)
export const getCourseStudentProgress = async (courseId) => {
  const response = await apiRequest(`/courses/${courseId}/student-progress/`);
  
  if (!response.ok) {
    const error = await response.json();
    const errorMessage = error.error || error.detail || 'Failed to fetch student progress';
    throw new Error(errorMessage);
  }
  
  return response.json();
};

// Get all categories
export const getCategories = async () => {
  const response = await apiRequest('/categories/');
  
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  
  return response.json();
};

// Create category (for lecturers)
export const createCategory = async (categoryData) => {
  const response = await apiRequest('/categories/', {
    method: 'POST',
    body: JSON.stringify(categoryData),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || error.detail || 'Failed to create category');
  }
  
  return response.json();
};

// Search courses with filters
export const searchCourses = async (filters = {}) => {
  const params = new URLSearchParams();
  
  if (filters.search) params.append('search', filters.search);
  if (filters.category) params.append('category', filters.category);
  if (filters.difficulty) params.append('difficulty', filters.difficulty);
  if (filters.min_price) params.append('min_price', filters.min_price);
  if (filters.max_price) params.append('max_price', filters.max_price);
  if (filters.sort) params.append('sort', filters.sort);
  
  const queryString = params.toString();
  const endpoint = queryString ? `/courses/?${queryString}` : '/courses/';
  
  const response = await apiRequest(endpoint);
  
  if (!response.ok) {
    throw new Error('Failed to search courses');
  }
  
  return response.json();
};

