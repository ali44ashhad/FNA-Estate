const express = require('express');
const {
  getWishlist,
  getWishlistIds,
  addToWishlist,
  removeFromWishlist,
} = require('../controllers/wishlistController');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Any authenticated account (user or seller) can save listings
router.use(auth);

router.get('/', getWishlist);
router.get('/ids', getWishlistIds);
router.post('/:propertyId', addToWishlist);
router.delete('/:propertyId', removeFromWishlist);

module.exports = router;
