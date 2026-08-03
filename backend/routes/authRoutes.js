const express = require('express');
const {
  registerUser,
  loginUser,
  getCurrentUser,
  updateProfile,
  changePassword,
  getPlatformContact,
} = require('../controllers/authController');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/contact', getPlatformContact);
router.get('/me', auth, getCurrentUser);
router.patch('/me', auth, updateProfile);
router.patch('/me/password', auth, changePassword);

module.exports = router;
