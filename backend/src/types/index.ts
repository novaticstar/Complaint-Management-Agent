export interface Complaint {
  id: string;
  name: string;
  email: string;
  complaint: string;
  status: 'Pending' | 'Resolved';
  created_at: string;
}

export interface CreateComplaintRequest {
  name: string;
  email: string;
  complaint: string;
}

export interface UpdateComplaintRequest {
  status: 'Pending' | 'Resolved';
}
