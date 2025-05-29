import { z } from 'zod';

export const complaintSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Invalid email address'),
  complaint: z.string().min(10, 'Complaint must be at least 10 characters long').max(1000, 'Complaint must be less than 1000 characters'),
});

export type ComplaintFormData = z.infer<typeof complaintSchema>;
