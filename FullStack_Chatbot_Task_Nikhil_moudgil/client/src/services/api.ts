import type { Enquiry } from '../types';

const API_BASE_URL = 'http://localhost:5000/api/enquiries';

export const fetchEnquiries = async (userType?: string, search?: string) => {
  try {
    const params = new URLSearchParams();
    if (userType && userType !== 'All') params.append('userType', userType);
    if (search && search.trim()) params.append('search', search.trim());

    const response = await fetch(`${API_BASE_URL}?${params.toString()}`);
    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.message || 'Failed to fetch enquiries' };
    }

    return { success: true, data: data.data };
  } catch (error) {
    return { success: false, error: 'Network error connecting to backend server.' };
  }
};

export const submitEnquiry = async (formData: Omit<Enquiry, '_id' | 'status'>) => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMsg = Array.isArray(data.errors) ? data.errors.join(', ') : (data.message || 'Submission failed');
      return { success: false, error: errorMsg };
    }

    return { success: true, data: data.data };
  } catch (error) {
    return { success: false, error: 'Network error connecting to server.' };
  }
};

export const updateEnquiryStatus = async (id: string, status: Enquiry['status']) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });

    const data = await response.json();
    if (!response.ok) return { success: false, error: data.message };

    return { success: true, data: data.data };
  } catch (error) {
    return { success: false, error: 'Network error updating status.' };
  }
};

export const deleteEnquiry = async (id: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });
    const data = await response.json();

    if (!response.ok) return { success: false, error: data.message };

    return { success: true };
  } catch (error) {
    return { success: false, error: 'Network error deleting enquiry.' };
  }
};