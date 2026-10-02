import { Schema, model, Document } from 'mongoose';

export interface IEnquiry extends Document {
  name: string;
  email: string;
  phone: string;
  userType: 'Customer' | 'Student' | 'Other';
  serviceOrCourse: string;
  message: string;
  status: 'New' | 'Contacted' | 'In Progress' | 'Closed';
  createdAt: Date;
}

const enquirySchema = new Schema<IEnquiry>(
  {
    name: { type: String, required: [true, 'Name is required'], trim: true },
    email: { type: String, required: [true, 'Email is required'], trim: true, lowercase: true },
    phone: { type: String, required: [true, 'Phone number is required'], trim: true },
    userType: { 
      type: String, 
      enum: ['Customer', 'Student', 'Other'], 
      default: 'Customer' 
    },
    serviceOrCourse: { type: String, required: [true, 'Service or course selection is required'], trim: true },
    message: { type: String, required: [true, 'Message is required'], trim: true },
    status: { 
      type: String, 
      enum: ['New', 'Contacted', 'In Progress', 'Closed'], 
      default: 'New' 
    }
  },
  { timestamps: true }
);

export default model<IEnquiry>('Enquiry', enquirySchema);