-- Complaint Management System Database Setup
-- Run this SQL in your Supabase SQL Editor

-- Create complaints table
CREATE TABLE IF NOT EXISTS complaints (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  complaint TEXT NOT NULL,
  status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Resolved')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_complaints_status ON complaints(status);
CREATE INDEX IF NOT EXISTS idx_complaints_created_at ON complaints(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_complaints_email ON complaints(email);

-- Enable Row Level Security (RLS)
ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;

-- Create policies to allow operations
-- Note: In production, you should restrict these policies based on user authentication

-- Allow read access to all users
CREATE POLICY IF NOT EXISTS "Allow read access" ON complaints
  FOR SELECT USING (true);

-- Allow insert access to all users (for complaint submission)
CREATE POLICY IF NOT EXISTS "Allow insert access" ON complaints
  FOR INSERT WITH CHECK (true);

-- Allow update access to all users (for admin operations)
CREATE POLICY IF NOT EXISTS "Allow update access" ON complaints
  FOR UPDATE USING (true);

-- Allow delete access to all users (for admin operations)
CREATE POLICY IF NOT EXISTS "Allow delete access" ON complaints
  FOR DELETE USING (true);

-- Insert some sample data for testing
INSERT INTO complaints (name, email, complaint, status) VALUES
  ('John Doe', 'john@example.com', 'The product I received was damaged and unusable. I would like a replacement or refund.', 'Pending'),
  ('Jane Smith', 'jane@example.com', 'Customer service was unhelpful when I tried to resolve my billing issue. Very disappointed.', 'Resolved'),
  ('Bob Johnson', 'bob@example.com', 'Website is very slow and crashes frequently. This needs to be fixed urgently.', 'Pending'),
  ('Alice Brown', 'alice@example.com', 'Delivery was delayed by over a week without any notification. Poor communication.', 'Resolved')
ON CONFLICT (id) DO NOTHING;
