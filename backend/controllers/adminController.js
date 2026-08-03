const User = require('../models/User');
const Property = require('../models/Property');
const Enquiry = require('../models/Enquiry');
const SellerLead = require('../models/SellerLead');
const { generateToken } = require('../config/jwt');

// Onboard a new seller
exports.onboardSeller = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      companyName,
      companyDescription,
      businessType,
      officeAddress,
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const sellerUser = await User.create({
      name,
      email,
      phone,
      password,
      role: 'seller',
      isActive: true,
      companyName,
      companyDescription,
      businessType,
      officeAddress,
      onboardedBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: 'Seller onboarded successfully',
      seller: {
        _id: sellerUser._id,
        name: sellerUser.name,
        email: sellerUser.email,
        phone: sellerUser.phone,
        companyName: sellerUser.companyName,
        isActive: sellerUser.isActive,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all pending property approvals
exports.getPendingProperties = async (req, res) => {
  try {
    const properties = await Property.find({ status: 'Pending Approval' }).populate('createdBy', 'name email');

    res.status(200).json({
      success: true,
      count: properties.length,
      properties,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Approve property listing
exports.approveProperty = async (req, res) => {
  try {
    const { finalPrice, adminNotes } = req.body;

    const property = await Property.findByIdAndUpdate(
      req.params.id,
      {
        status: 'Approved',
        approvedBy: req.user.id,
        'pricing.finalPrice': finalPrice || undefined,
        adminNotes,
      },
      { new: true }
    ).populate('createdBy', 'name email');

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Property approved successfully',
      property,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reject property listing
exports.rejectProperty = async (req, res) => {
  try {
    const { rejectionReason, adminNotes } = req.body;

    const property = await Property.findByIdAndUpdate(
      req.params.id,
      {
        status: 'Rejected',
        rejectionReason,
        adminNotes,
      },
      { new: true }
    ).populate('createdBy', 'name email');

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Property rejected',
      property,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: edit any listing (typically pending) before approve/reject
exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    const {
      title,
      description,
      propertyType,
      listingType,
      location,
      pricing,
      propertyDetails,
      financials,
      businessDetails,
      amenities,
      media,
      sellerId,
      status,
      isVerified,
      isPremium,
      isHot,
    } = req.body;

    if (title !== undefined) property.title = title;
    if (description !== undefined) property.description = description;
    if (propertyType !== undefined) property.propertyType = propertyType;
    if (listingType !== undefined) property.listingType = listingType;
    if (location !== undefined) property.location = { ...property.location?.toObject?.() || property.location, ...location };
    if (pricing !== undefined) {
      property.pricing = {
        ...property.pricing?.toObject?.() || property.pricing,
        ...pricing,
        finalPrice: pricing.finalPrice ?? pricing.basePrice ?? property.pricing?.finalPrice,
      };
    }
    if (propertyDetails !== undefined) {
      property.propertyDetails = {
        ...property.propertyDetails?.toObject?.() || property.propertyDetails,
        ...propertyDetails,
      };
    }
    if (financials !== undefined) {
      property.financials = {
        ...property.financials?.toObject?.() || property.financials,
        ...financials,
      };
    }
    if (businessDetails !== undefined) {
      property.businessDetails = {
        ...property.businessDetails?.toObject?.() || property.businessDetails,
        ...businessDetails,
      };
    }
    if (amenities !== undefined) {
      property.amenities = {
        ...property.amenities?.toObject?.() || property.amenities,
        ...amenities,
      };
    }
    if (media !== undefined) {
      property.media = {
        ...property.media?.toObject?.() || property.media,
        ...media,
      };
    }

    if (sellerId) {
      const seller = await User.findOne({ _id: sellerId, role: 'seller' });
      if (!seller) {
        return res.status(400).json({ message: 'Selected seller not found' });
      }
      property.createdBy = seller._id;
    }

    // Keep pending by default when editing for approval; allow optional status override
    if (status && ['Pending Approval', 'Approved', 'Rejected', 'Sold'].includes(status)) {
      property.status = status;
      if (status === 'Approved') {
        property.approvedBy = req.user.id;
      }
    }

    if (isVerified !== undefined) property.isVerified = Boolean(isVerified);
    if (isPremium !== undefined) property.isPremium = Boolean(isPremium);
    if (isHot !== undefined) property.isHot = Boolean(isHot);

    property.updatedAt = new Date();
    await property.save();

    const populated = await Property.findById(property._id).populate('createdBy', 'name email');

    res.status(200).json({
      success: true,
      message: 'Listing updated successfully',
      property: populated,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all sellers
exports.getSellers = async (req, res) => {
  try {
    const sellers = await User.find({ role: 'seller' }).sort('-createdAt');

    res.status(200).json({
      success: true,
      count: sellers.length,
      sellers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Deactivate/activate seller
exports.toggleSellerStatus = async (req, res) => {
  try {
    const seller = await User.findOne({ _id: req.params.id, role: 'seller' });

    if (!seller) {
      return res.status(404).json({ message: 'Seller not found' });
    }

    seller.isActive = !seller.isActive;
    await seller.save();

    res.status(200).json({
      success: true,
      message: `Seller ${seller.isActive ? 'activated' : 'deactivated'} successfully`,
      seller,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all regular users (role: user)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'user' }).sort('-createdAt');

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Deactivate/activate user
exports.toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id, role: 'user' });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.status(200).json({
      success: true,
      message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully`,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all properties (Admin)
exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find()
      .populate('createdBy', 'name email')
      .populate('approvedBy', 'name')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: properties.length,
      properties,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get dashboard statistics
exports.getDashboardStats = async (req, res) => {
  try {
    const totalListings = await Property.countDocuments({ status: 'Approved' });
    const pendingListings = await Property.countDocuments({ status: 'Pending Approval' });
    const totalEnquiries = await Enquiry.countDocuments();
    const totalSellers = await User.countDocuments({ role: 'seller' });
    const activeSellers = await User.countDocuments({ role: 'seller', isActive: true });
    const totalUsers = await User.countDocuments({ role: 'user' });
    const newSellerLeads = await SellerLead.countDocuments({ status: 'New' });

    // Calculate total revenue from approved properties
    const revenueResult = await Property.aggregate([
      { $match: { status: 'Approved' } },
      { $group: { _id: null, total: { $sum: '$pricing.finalPrice' } } }
    ]);
    const totalRevenue = revenueResult[0]?.total || 0;

    res.status(200).json({
      success: true,
      stats: {
        totalProperties: totalListings,
        approvedProperties: totalListings,
        pendingProperties: pendingListings,
        totalSellers,
        activeSellers,
        totalUsers,
        totalEnquiries,
        newSellerLeads,
        totalRevenue,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
