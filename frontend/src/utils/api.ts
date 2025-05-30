import type { Complaint, CreateComplaintRequest, User, LoginRequest } from '../types';

const API_BASE_URL = 'http://localhost:3001/api';

export const createComplaint = async (data: CreateComplaintRequest): Promise<Complaint> => {
  const response = await fetch(`${API_BASE_URL}/complaints`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create complaint');
  }
  
  const result = await response.json();
  return result.data;
};

export const fetchComplaints = async (): Promise<Complaint[]> => {
  const response = await fetch(`${API_BASE_URL}/complaints`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch complaints');
  }
  
  const result = await response.json();
  return result.data || [];
};

export const updateComplaintStatus = async (id: string, status: 'Pending' | 'Resolved'): Promise<Complaint> => {
  const response = await fetch(`${API_BASE_URL}/complaints/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update complaint status');
  }
  
  const result = await response.json();
  return result.data;
};

export const deleteComplaint = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/complaints/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete complaint');
  }
};

// Authentication functions
export const login = async (credentials: LoginRequest): Promise<User> => {
  // For now, simulate login with hardcoded admin credentials
  if (credentials.username === 'admin' && credentials.password === 'admin123') {
    const user: User = {
      id: '1',
      username: 'admin',
      email: 'admin@example.com',
      role: 'admin'
    };
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  } else {
    throw new Error('Invalid credentials');
  }
};

export const logout = (): void => {
  localStorage.removeItem('user');
};

export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch {
      localStorage.removeItem('user');
      return null;
    }
  }
  return null;
};