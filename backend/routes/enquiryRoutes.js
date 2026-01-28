const express = require('express');
const {
  createEnquiry,
  getEnquiries,
  updateEnquiryStatus,
} = require('../controllers/enquiryController');
const { auth, requireRole } = require('../middleware/auth');

const router = express.Router();

// Create enquiry (User - can be guest)
router.post('/', createEnquiry);

// Admin routes
router.get('/', auth, requireRole('admin'), getEnquiries);
router.patch('/:id', auth, requireRole('admin'), updateEnquiryStatus);

module.exports = router;
