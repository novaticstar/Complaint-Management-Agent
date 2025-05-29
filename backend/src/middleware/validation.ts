import { Request, Response, NextFunction } from 'express';

export const validateComplaint = (req: Request, res: Response, next: NextFunction): void => {
  const { name, email, complaint } = req.body;

  // Check if all required fields are present
  if (!name || !email || !complaint) {
    res.status(400).json({
      error: 'Missing required fields',
      required: ['name', 'email', 'complaint']
    });
    return;
  }

  // Validate name
  if (typeof name !== 'string' || name.trim().length < 2) {
    res.status(400).json({
      error: 'Name must be a string with at least 2 characters'
    });
    return;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (typeof email !== 'string' || !emailRegex.test(email.trim())) {
    res.status(400).json({
      error: 'Please provide a valid email address'
    });
    return;
  }

  // Validate complaint
  if (typeof complaint !== 'string' || complaint.trim().length < 10) {
    res.status(400).json({
      error: 'Complaint must be a string with at least 10 characters'
    });
    return;
  }

  // Validate lengths
  if (name.trim().length > 100) {
    res.status(400).json({
      error: 'Name must be less than 100 characters'
    });
    return;
  }

  if (email.trim().length > 255) {
    res.status(400).json({
      error: 'Email must be less than 255 characters'
    });
    return;
  }

  if (complaint.trim().length > 2000) {
    res.status(400).json({
      error: 'Complaint must be less than 2000 characters'
    });
    return;
  }

  next();
};