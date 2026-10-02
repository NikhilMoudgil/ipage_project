import { Enquiry } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const fetchEnquiries = async (userType?: string, search?: string) => {
  const params = new URLSearchParams();
  if (userType && userType !== 'All') params.append('userType', userType);
  if (search) params.append('search', search);

  const response = await fetch(`${API_BASE_URL}/enquiries?${params.toString()}`);
  return response.json();
};

export const submitEnquiry = async (data: Omit<Enquiry, '_id' | 'status'>) => {
  const response = await fetch(`${API_BASE_URL}/enquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const updateEnquiryStatus = async (id: string, status: Enquiry['status']) => {
  const response = await fetch(`${API_BASE_URL}/enquiries/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  return response.json();
};

export const deleteEnquiry = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/enquiries/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};