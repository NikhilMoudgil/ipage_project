import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

export const validateEnquiry = (req: Request, res: Response, next: NextFunction) => {
  const { name, email, phone, userType, serviceOrCourse, message } = req.body;

  if (!name || !email || !phone || !serviceOrCourse || !message) {
    return res.status(400).json({ success: false, message: 'All required fields must be filled.' });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email address format.' });
  }

  if (!validator.isMobilePhone(phone, 'any')) {
    return res.status(400).json({ success: false, message: 'Invalid phone number format.' });
  }

  if (userType && !['Student', 'Customer', 'Other'].includes(userType)) {
    return res.status(400).json({ success: false, message: 'Invalid user type specified.' });
  }

  next();
};