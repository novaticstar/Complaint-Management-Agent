import type { Complaint, CreateComplaintRequest, ApiResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiError extends Error {
  status?: number;
  
  constructor(message: string, status?: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new ApiError(errorData.error || `HTTP ${response.status}`, response.status);
  }
  return response.json();
}

export async function fetchComplaints(): Promise<Complaint[]> {
  const response = await fetch(`${API_BASE_URL}/complaints`);
  const data: ApiResponse<Complaint[]> = await handleResponse(response);
  return data.data || [];
}

export async function createComplaint(complaint: CreateComplaintRequest): Promise<Complaint> {
  const response = await fetch(`${API_BASE_URL}/complaints`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(complaint),
  });
  const data: ApiResponse<Complaint> = await handleResponse(response);
  
  if (!data.data) {
    throw new ApiError('No data returned from server');
  }
  
  return data.data;
}

export async function updateComplaintStatus(id: string, status: string): Promise<Complaint> {
  const response = await fetch(`${API_BASE_URL}/complaints/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });
  const data: ApiResponse<Complaint> = await handleResponse(response);
  
  if (!data.data) {
    throw new ApiError('No data returned from server');
  }
  
  return data.data;
}

export async function deleteComplaint(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/complaints/${id}`, {
    method: 'DELETE',
  });
  await handleResponse(response);
}