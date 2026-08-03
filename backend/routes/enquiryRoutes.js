const express = require('express');
const {
  createEnquiry,
  getEnquiries,
  getMyEnquiries,
  updateEnquiryStatus,
} = require('../controllers/enquiryController');
const { auth, requireRole } = require('../middleware/auth');

const router = express.Router();

// Create enquiry (buyers and sellers — sellers cannot enquire on their own listings)
router.post('/', auth, requireRole('user', 'seller'), createEnquiry);

// Current user's enquiries
router.get('/mine', auth, getMyEnquiries);

// Admin routes
router.get('/', auth, requireRole('admin'), getEnquiries);
router.patch('/:id', auth, requireRole('admin'), updateEnquiryStatus);

module.exports = router;
