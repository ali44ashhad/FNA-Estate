const express = require('express');
const {
  submitSellerLead,
  getSellerLeads,
  updateSellerLead,
} = require('../controllers/sellerLeadController');
const { auth, requireRole } = require('../middleware/auth');

const router = express.Router();

// Public form submission — no login required
router.post('/', submitSellerLead);

// Admin only
router.get('/', auth, requireRole('admin'), getSellerLeads);
router.patch('/:id', auth, requireRole('admin'), updateSellerLead);

module.exports = router;
