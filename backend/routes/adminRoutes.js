const express = require('express');
const {
  onboardSeller,
  getPendingProperties,
  getAllProperties,
  approveProperty,
  rejectProperty,
  getSellers,
  toggleSellerStatus,
  getDashboardStats,
} = require('../controllers/adminController');
const { auth, requireRole } = require('../middleware/auth');

const router = express.Router();

// All routes require admin role
router.use(auth, requireRole('admin'));

// Seller management
router.post('/sellers/onboard', onboardSeller);
router.get('/sellers', getSellers);
router.patch('/sellers/:id/toggle-status', toggleSellerStatus);

// Property management
router.get('/properties/pending', getPendingProperties);
router.get('/properties', getAllProperties);
router.patch('/properties/:id/approve', approveProperty);
router.patch('/properties/:id/reject', rejectProperty);

// Dashboard
router.get('/stats', getDashboardStats);

module.exports = router;
