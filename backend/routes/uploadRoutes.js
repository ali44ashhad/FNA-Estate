const express = require('express');
const { uploadImages } = require('../controllers/uploadController');
const { auth, requireRole } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// Seller uploads listing images to Cloudinary
router.post(
  '/images',
  auth,
  requireRole('seller', 'admin'),
  upload.array('images', 10),
  uploadImages
);

module.exports = router;
