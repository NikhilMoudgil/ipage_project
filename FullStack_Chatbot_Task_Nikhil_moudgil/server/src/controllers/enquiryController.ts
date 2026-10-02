import { Request, Response } from 'express';
import Enquiry from '../models/Enquiry';

// GET /api/enquiries - Fetch all enquiries with optional search & filtering
export const getEnquiries = async (req: Request, res: Response) => {
  try {
    const { userType, search } = req.query;
    let query: any = {};

    if (userType && userType !== 'All') {
      query.userType = userType;
    }

    if (search) {
      const searchRegex = new RegExp(search as string, 'i');
      query.$or = [
        { name: searchRegex },
        { email: searchRegex },
        { phone: searchRegex },
        { serviceOrCourse: searchRegex }
      ];
    }

    const enquiries = await Enquiry.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: enquiries.length, data: enquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error retrieving enquiries.' });
  }
};

// GET /api/enquiries/:id - Fetch single enquiry by ID
export const getEnquiryById = async (req: Request, res: Response) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found.' });
    }
    res.status(200).json({ success: true, data: enquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error or invalid enquiry ID format.' });
  }
};

// POST /api/enquiries - Create a new enquiry
export const createEnquiry = async (req: Request, res: Response) => {
  try {
    const enquiry = await Enquiry.create(req.body);
    res.status(201).json({ success: true, message: 'Enquiry submitted successfully!', data: enquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create enquiry.' });
  }
};

// PUT/PATCH /api/enquiries/:id - Update enquiry status or details
export const updateEnquiry = async (req: Request, res: Response) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found.' });
    }
    res.status(200).json({ success: true, message: 'Enquiry updated successfully.', data: enquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error updating enquiry.' });
  }
};

// DELETE /api/enquiries/:id - Delete enquiry
export const deleteEnquiry = async (req: Request, res: Response) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found.' });
    }
    res.status(200).json({ success: true, message: 'Enquiry deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error deleting enquiry.' });
  }
};