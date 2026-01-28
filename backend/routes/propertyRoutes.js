const express = require('express');
const {
  getApprovedProperties,
  getPropertyStats,
  getPropertyDetails,
  createProperty,
  getSellerProperties,
  editProperty,
} = require('../controllers/propertyController');
const { auth, requireRole } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/stats', getPropertyStats);
router.get('/', getApprovedProperties);
router.get('/:id', getPropertyDetails);

// Seller routes
router.post('/', auth, requireRole('seller'), createProperty);
router.get('/seller/my-properties', auth, requireRole('seller'), getSellerProperties);
router.put('/:id', auth, requireRole('seller'), editProperty);

module.exports = router;
