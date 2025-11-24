# LMS Frontend - React Application

This is the React frontend for the Learning Management System (LMS) backend.

## Features

- JWT Authentication (Login/Register)
- Protected Routes
- Token Management (Access & Refresh Tokens)
- API Integration with Django Backend

## Setup Instructions

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Start the development server:
```bash
npm start
```

The app will run on `http://localhost:3000`

## API Configuration

The API base URL is configured in `src/services/api.js`. By default, it points to:
- Backend: `http://localhost:8000/api`

Make sure your Django backend is running on port 8000.

## JWT Authentication Flow

1. **Login**: User logs in with username/password
   - Backend returns `access_token` and `refresh_token`
   - Tokens are stored in `localStorage`

2. **API Requests**: All authenticated requests include the access token in the Authorization header:
   ```
   Authorization: Bearer <access_token>
   ```

3. **Token Refresh**: If access token expires (401 error), the app automatically refreshes using the refresh token

4. **Logout**: Removes tokens from localStorage

## File Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Login.jsx          # Login component
│   │   └── Register.jsx       # Registration component
│   ├── context/
│   │   └── AuthContext.jsx     # Authentication context
│   ├── services/
│   │   └── api.js              # API service with JWT handling
│   ├── App.jsx                 # Main app component
│   ├── index.js                # Entry point
│   └── index.css               # Global styles
├── public/
│   └── index.html
└── package.json
```

## Usage Example

### Making Authenticated API Requests

```javascript
import { apiRequest } from './services/api';

// GET request
const response = await apiRequest('/some-endpoint/', {
  method: 'GET',
});

// POST request
const response = await apiRequest('/some-endpoint/', {
  method: 'POST',
  body: JSON.stringify({ data: 'value' }),
});
```

The `apiRequest` function automatically:
- Adds the Authorization header with the access token
- Refreshes the token if it expires
- Handles errors

