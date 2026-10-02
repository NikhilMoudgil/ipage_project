import { Router } from 'express';
import {
  getEnquiries,
  getEnquiryById,
  createEnquiry,
  updateEnquiry,
  deleteEnquiry
} from '../controllers/enquiryController';
import { validateEnquiryPayload } from '../middleware/validation';

const router = Router();

// Base collection routes (/api/enquiries)
router.route('/')
  .get(getEnquiries)
  .post(validateEnquiryPayload, createEnquiry);

// Individual resource routes (/api/enquiries/:id)
router.route('/:id')
  .get(getEnquiryById)
  .patch(updateEnquiry)
  .put(updateEnquiry)
  .delete(deleteEnquiry);

export default router;