import { Router } from 'express';
import {
  getEnquiries,
  getEnquiryById,
  createEnquiry,
  updateEnquiry,
  deleteEnquiry
} from '../controllers/enquiryController';
import { validateEnquiry } from '../middleware/validation';

const router = Router();

router.get('/', getEnquiries);
router.get('/:id', getEnquiryById);
router.post('/', validateEnquiry, createEnquiry);
router.put('/:id', updateEnquiry);
router.patch('/:id', updateEnquiry);
router.delete('/:id', deleteEnquiry);

export default router;