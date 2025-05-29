import { z } from 'zod';

export const createComplaintSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Invalid email address'),
  complaint: z.string().min(10, 'Complaint must be at least 10 characters long').max(1000, 'Complaint must be less than 1000 characters'),
});

export const updateComplaintSchema = z.object({
  status: z.enum(['Pending', 'Resolved'], {
    required_error: 'Status is required',
    invalid_type_error: 'Status must be either Pending or Resolved',
  }),
});

export const complaintIdSchema = z.string().uuid('Invalid complaint ID format');
