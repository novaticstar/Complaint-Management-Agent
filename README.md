# Complaint Management Agent

A full-stack complaint management system built with React, TypeScript, Node.js, Express, and Supabase.

## 🚀 Features

### Client Side
- User-friendly complaint submission form
- Client-side form validation
- Success confirmation after submission
- Responsive design with Tailwind CSS

### Admin Side
- Internal dashboard for managing complaints
- View all complaints with status tracking
- Toggle complaint status (Pending/Resolved)
- Filter complaints by status
- Delete complaints functionality

### Backend API
- RESTful API with Express.js
- Input validation and error handling
- Supabase integration for data persistence
- CORS support for frontend communication

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js, TypeScript
- **Database**: Supabase (PostgreSQL)
- **Validation**: Zod (backend), React Hook Form (frontend)

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account and project

## 🚀 Quick Start Guide

### Prerequisites Check
Before starting, make sure you have:
- ✅ Node.js v18+ installed
- ✅ A Supabase account and project created
- ✅ Git installed (optional, for cloning)

### 5-Minute Setup
1. **Clone & Install**
   ```bash
   git clone <repository-url>
   cd complaint-management-agent
   npm run install:all
   ```

2. **Setup Environment**
   - Copy the environment variables from the setup section above
   - Update `backend/.env` with your Supabase service key

3. **Setup Database**
   - Run the SQL in `database/setup.sql` in your Supabase SQL Editor

4. **Start the Application**
   ```bash
   npm run dev
   ```

5. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001
   - Submit complaints at: http://localhost:5173
   - Admin dashboard: http://localhost:5173/admin

### Test the System
1. Go to http://localhost:5173
2. Fill out and submit a complaint
3. Navigate to http://localhost:5173/admin
4. See your complaint listed and try changing its status

## 🔧 Setup Instructions

### 1. Clone the repository
```bash
git clone <repository-url>
cd complaint-management-agent
```

### 2. Install dependencies
```bash
npm run install:all
```

### 3. Environment Setup

#### Frontend Environment
Create `frontend/.env`:
```
VITE_SUPABASE_URL=your link here
VITE_SUPABASE_ANON_KEY=your key here
VITE_API_BASE_URL=http://localhost:3001
```

#### Backend Environment
Create `backend/.env`:
```
SUPABASE_URL=your link here
SUPABASE_SERVICE_KEY=your_service_key_here
PORT=3001
```

### 4. Database Setup

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Open the SQL Editor
3. Copy and paste the contents of `database/setup.sql`
4. Click "Run" to create the tables and sample data

**Important**: You'll need to get your Supabase Service Key (not the anon key) for the backend:
- Go to Project Settings → API
- Copy the `service_role` key (keep this secret!)
- Update `backend/.env` with your service key

### 5. Run the application

```bash
# Run both frontend and backend concurrently
npm run dev

# Or run them separately:
# Frontend (http://localhost:5173)
npm run dev:frontend

# Backend (http://localhost:3001)
npm run dev:backend
```

## 📁 Project Structure

```
complaint-management-agent/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── utils/          # Utilities and Supabase client
│   │   ├── types/          # TypeScript type definitions
│   │   └── hooks/          # Custom React hooks
│   ├── public/
│   └── package.json
├── backend/                 # Node.js backend
│   ├── src/
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Express middleware
│   │   ├── utils/          # Utilities and Supabase client
│   │   └── types/          # TypeScript type definitions
│   └── package.json
└── README.md
```

## 🌐 API Endpoints

- `POST /api/complaints` - Submit a new complaint
- `GET /api/complaints` - Get all complaints
- `PATCH /api/complaints/:id` - Update complaint status
- `DELETE /api/complaints/:id` - Delete a complaint

## 🎯 Usage

### Submit a Complaint
1. Navigate to the home page
2. Fill out the complaint form with your name, email, and complaint details
3. Click "Submit Complaint"
4. Receive confirmation of successful submission

### Admin Dashboard
1. Navigate to `/admin`
2. View all complaints in a table format
3. Use the status toggle to mark complaints as resolved
4. Filter complaints by status using the dropdown
5. Delete complaints using the delete button

## 🔄 Assumptions and Tradeoffs

### Assumptions
- Single-tenant application (no user authentication for simplicity)
- Admin access is not protected (in production, would require authentication)
- Email validation is basic (in production, would verify email deliverability)
- Complaints are public data (no sensitive information handling)

### Tradeoffs
- **Simplicity vs Security**: Chose simplicity for the demo, but production would need proper authentication/authorization
- **Client vs Server Validation**: Implemented both for better UX and security
- **Real-time vs Polling**: Used standard HTTP requests instead of real-time updates for simplicity
- **Monorepo vs Separate Repos**: Chose monorepo for easier development and submission

## 🚀 Future Improvements

### With More Time
1. **Authentication & Authorization**
   - User accounts for complaint tracking
   - Admin role-based access control
   - JWT-based authentication

2. **Enhanced Features**
   - File attachment support for complaints
   - Email notifications for status updates
   - Complaint categories and priority levels
   - Advanced filtering and search
   - Bulk operations for admin

3. **Technical Improvements**
   - Real-time updates using WebSockets or Server-Sent Events
   - API rate limiting and throttling
   - Comprehensive error logging and monitoring
   - Automated testing (unit, integration, e2e)
   - CI/CD pipeline setup

4. **User Experience**
   - Advanced form validation with field-level feedback
   - Complaint status tracking for users
   - Admin analytics dashboard
   - Mobile-first responsive design
   - Accessibility improvements (WCAG compliance)

5. **Performance & Scalability**
   - Implement pagination for large datasets
   - Add caching layer (Redis)
   - Database query optimization
   - CDN for static assets
   - Horizontal scaling considerations

6. **Production Readiness**
   - Environment-specific configurations
   - Security headers and HTTPS enforcement
   - API documentation with Swagger/OpenAPI
   - Database migrations and versioning
   - Monitoring and alerting setup

## 🐛 Known Issues

- Admin dashboard is not password-protected
- No email verification for complaint submissions
- Limited to basic CRUD operations

## 🔧 Troubleshooting

### Common Issues

#### Frontend Issues
- **Tailwind classes not working**: Make sure Tailwind is properly configured and the dev server is restarted
- **API calls failing**: Check that the backend is running on port 3001 and CORS is configured
- **React Router not working**: Ensure all routes are properly defined in App.tsx

#### Backend Issues
- **Supabase connection errors**: Verify your Supabase URL and service key in `.env`
- **CORS errors**: Check that your frontend URL is in the CORS whitelist
- **TypeScript compilation errors**: Run `npm run build` to see detailed error messages

#### Database Issues
- **Table not found**: Make sure you ran the SQL setup script in Supabase
- **Permission denied**: Check that RLS policies are correctly configured
- **UUID errors**: Ensure your Supabase project has the UUID extension enabled

### Performance Tips
- Enable database indexes for better query performance
- Use pagination for large datasets in production
- Implement caching for frequently accessed data
- Optimize bundle size with code splitting

## 🌐 Production Deployment

### Frontend Deployment (Vercel/Netlify)
1. Build the frontend: `cd frontend && npm run build`
2. Deploy the `dist` folder to your hosting service
3. Update environment variables with production URLs
4. Configure routing for SPA (Single Page Application)

### Backend Deployment (Railway/Heroku/DigitalOcean)
1. Build the backend: `cd backend && npm run build`
2. Deploy using your preferred service
3. Set environment variables in production
4. Update CORS settings with your production frontend URL

### Environment Variables for Production
```bash
# Frontend (.env.production)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_BASE_URL=https://your-backend-domain.com

# Backend (.env.production)
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_supabase_service_key
PORT=3001
NODE_ENV=production
```

### Security Considerations for Production
- Use HTTPS for all communications
- Implement rate limiting on API endpoints
- Add input sanitization and validation
- Set up proper error logging and monitoring
- Use environment-specific Supabase keys
- Implement proper authentication and authorization
```
