import { Schema, model, Document } from 'mongoose';

export interface IEnquiry extends Document {
  name: string;
  email: string;
  phone: string;
  userType: 'Student' | 'Customer' | 'Other';
  serviceOrCourse: string;
  message: string;
  status: 'New' | 'Contacted' | 'In Progress' | 'Closed';
  createdAt: Date;
}

const EnquirySchema = new Schema<IEnquiry>({
  name: { type: String, required: [true, 'Name is required'], trim: true },
  email: { type: String, required: [true, 'Email is required'], lowercase: true, trim: true },
  phone: { type: String, required: [true, 'Phone number is required'], trim: true },
  userType: { 
    type: String, 
    enum: ['Student', 'Customer', 'Other'], 
    default: 'Customer' 
  },
  serviceOrCourse: { type: String, required: [true, 'Service/Course preference is required'] },
  message: { type: String, required: [true, 'Message is required'] },
  status: { 
    type: String, 
    enum: ['New', 'Contacted', 'In Progress', 'Closed'], 
    default: 'New' 
  },
  createdAt: { type: Date, default: Date.now }
});

export default model<IEnquiry>('Enquiry', EnquirySchema);