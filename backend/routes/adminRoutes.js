const express = require('express');
const {
  onboardSeller,
  getPendingProperties,
  getAllProperties,
  approveProperty,
  rejectProperty,
  updateProperty,
  getSellers,
  toggleSellerStatus,
  getUsers,
  toggleUserStatus,
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

// User management
router.get('/users', getUsers);
router.patch('/users/:id/toggle-status', toggleUserStatus);

// Property management
router.get('/properties/pending', getPendingProperties);
router.get('/properties', getAllProperties);
router.put('/properties/:id', updateProperty);
router.patch('/properties/:id', updateProperty);
router.patch('/properties/:id/approve', approveProperty);
router.patch('/properties/:id/reject', rejectProperty);

// Dashboard
router.get('/stats', getDashboardStats);

module.exports = router;
