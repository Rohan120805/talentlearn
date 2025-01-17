import dotenv from 'dotenv';
dotenv.config(); // Ensure this is at the top

import express from 'express';
import session from 'express-session';
import cors from 'cors'; // Import cors
import path from 'path';
import passport from 'passport'; // Import passport
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
import internshipRoutes from './routes/internship.js';
import adminInternshipRoutes from './routes/adminInternship.js'; // Import admin internship routes
import moduleRoutes from './routes/module.js'; // Import module routes
import adminModuleRoutes from './routes/adminModule.js'; // Import admin module routes

const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cors()); // Use cors

app.use(session({
  secret: process.env.SESSION_SECRET || 'default_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set secure to true if using HTTPS
}));
app.use(passport.initialize()); // Initialize passport
app.use(passport.session()); // Use passport session

app.use('/auth', authRoutes);
app.use('/internships', internshipRoutes);
app.use('/admin/auth/internships', adminInternshipRoutes); // Use admin routes for internships
app.use('/modules', moduleRoutes); // Use module routes
app.use('/admin/auth/modules', adminModuleRoutes); // Use admin routes for modules

console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('SESSION_SECRET:', process.env.SESSION_SECRET);
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET);

// Serve static files from the React app
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server started on http://localhost:${PORT}`);
});