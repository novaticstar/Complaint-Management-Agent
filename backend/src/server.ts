import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables FIRST
dotenv.config();

console.log('🔧 Loading environment variables...');
console.log('Working directory:', process.cwd());
console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? 'Set ✓' : 'Missing ✗');
console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY ? 'Set ✓' : 'Missing ✗');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://your-domain.com' 
    : 'http://localhost:5173',
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Root route - shows API info
app.get('/', (req, res) => {
  res.json({
    message: 'Complaint Management API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/api/health',
      complaints: '/api/complaints',
      docs: 'Available endpoints: GET /api/complaints, POST /api/complaints, PATCH /api/complaints/:id, DELETE /api/complaints/:id'
    },
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Simple test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

console.log('📝 About to import complaints routes...');

// Import routes after basic setup
try {
  const complaintsRoutes = require('./routes/complaints').default;
  app.use('/api/complaints', complaintsRoutes);
  console.log('✅ Complaints routes loaded successfully');
} catch (error) {
  console.error('❌ Error loading complaints routes:', error);
}

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 CORS origin: ${process.env.NODE_ENV === 'production' ? 'https://your-domain.com' : 'http://localhost:5173'}`);
  console.log(`🔗 Try these URLs:`);
  console.log(`   - http://localhost:${PORT}/ (API info)`);
  console.log(`   - http://localhost:${PORT}/api/health (health check)`);
  console.log(`   - http://localhost:${PORT}/api/complaints (complaints API)`);
});