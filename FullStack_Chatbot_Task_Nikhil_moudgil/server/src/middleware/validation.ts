import { Request, Response, NextFunction } from 'express';

export const validateEnquiryPayload = (req: Request, res: Response, next: NextFunction) => {
  const { name, email, phone, userType, serviceOrCourse, message } = req.body;
  const errors: string[] = [];

  // Validate Name
  if (!name || typeof name !== 'string' || !name.trim()) {
    errors.push('Full Name is required.');
  }

  // Validate Email Format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
    errors.push('A valid email address is required.');
  }

  // Validate Phone (Strips spaces/hyphens to verify at least 10 digits)
  const cleanPhone = typeof phone === 'string' ? phone.replace(/[\s-]/g, '') : '';
  const phoneDigitsOnly = cleanPhone.replace(/\+/g, '');
  if (!cleanPhone || phoneDigitsOnly.length < 10 || !/^\+?\d+$/.test(cleanPhone)) {
    errors.push('A valid phone number (minimum 10 digits) is required.');
  }

  // Validate User Type Enum
  const validUserTypes = ['Customer', 'Student', 'Other'];
  if (userType && !validUserTypes.includes(userType)) {
    errors.push(`userType must be one of: ${validUserTypes.join(', ')}.`);
  }

  // Validate Service / Course Selection
  if (!serviceOrCourse || typeof serviceOrCourse !== 'string' || !serviceOrCourse.trim()) {
    errors.push('Service or Course selection is required.');
  }

  // Validate Message Body
  if (!message || typeof message !== 'string' || !message.trim()) {
    errors.push('Message is required.');
  }

  // Return Bad Request (400) if any field validation fails
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed.',
      errors
    });
  }

  next();
};