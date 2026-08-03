const User = require('../models/User');
const Property = require('../models/Property');

// Get current user's saved listings
exports.getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: 'wishlist',
      populate: { path: 'createdBy', select: 'name companyName' },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const properties = (user.wishlist || []).filter(Boolean);

    res.status(200).json({
      success: true,
      count: properties.length,
      properties,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get only the saved listing ids (lightweight, used to render heart state)
exports.getWishlistIds = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('wishlist');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      propertyIds: (user.wishlist || []).map((id) => id.toString()),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a listing to wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const { propertyId } = req.params;

    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    if (property.createdBy?.toString() === req.user.id) {
      return res.status(400).json({ message: 'You cannot save your own listing' });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $addToSet: { wishlist: propertyId } },
      { new: true }
    ).select('wishlist');

    res.status(200).json({
      success: true,
      message: 'Listing saved',
      propertyIds: user.wishlist.map((id) => id.toString()),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove a listing from wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    const { propertyId } = req.params;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { wishlist: propertyId } },
      { new: true }
    ).select('wishlist');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Listing removed from saved',
      propertyIds: user.wishlist.map((id) => id.toString()),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
