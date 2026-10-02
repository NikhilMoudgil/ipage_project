export interface Enquiry {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  userType: 'Student' | 'Customer' | 'Other';
  serviceOrCourse: string;
  message: string;
  status: 'New' | 'Contacted' | 'In Progress' | 'Closed';
  createdAt?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  options?: string[];
  timestamp: Date;
}