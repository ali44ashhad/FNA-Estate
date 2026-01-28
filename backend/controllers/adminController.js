const User = require('../models/User');
const Property = require('../models/Property');
const Seller = require('../models/Seller');
const Enquiry = require('../models/Enquiry');
const { generateToken } = require('../config/jwt');

// Onboard a new seller
exports.onboardSeller = async (req, res) => {
  try {
    const { name, email, phone, password, companyName, companyDescription, registrationNumber, businessType, websiteUrl, officeAddress } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create seller user
    const sellerUser = new User({
      name,
      email,
      phone,
      password,
      role: 'seller',
      isActive: true,
    });

    await sellerUser.save();

    // Create seller profile
    const seller = new Seller({
      userId: sellerUser._id,
      companyName,
      companyDescription,
      registrationNumber,
      businessType,
      websiteUrl,
      officeAddress,
      onboardedBy: req.user.id,
      isActive: true,
    });

    await seller.save();

    res.status(201).json({
      success: true,
      message: 'Seller onboarded successfully',
      seller: {
        id: sellerUser._id,
        name: sellerUser.name,
        email: sellerUser.email,
        companyName: seller.companyName,
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

// Get all sellers
exports.getSellers = async (req, res) => {
  try {
    const sellers = await Seller.find().populate('userId', 'name email phone isActive');

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
    const seller = await Seller.findById(req.params.id).populate('userId');

    if (!seller) {
      return res.status(404).json({ message: 'Seller not found' });
    }

    seller.isActive = !seller.isActive;
    await seller.save();

    // Also update user status
    const user = await User.findByIdAndUpdate(seller.userId._id, { isActive: seller.isActive });

    res.status(200).json({
      success: true,
      message: `Seller ${seller.isActive ? 'activated' : 'deactivated'} successfully`,
      seller,
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
    const totalSellers = await Seller.countDocuments({ isActive: true });
    const activeSellers = await Seller.countDocuments({ isActive: true });
    const totalUsers = await User.countDocuments({ role: 'user' });
    
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
        totalBuyers: totalUsers,
        totalEnquiries,
        totalRevenue,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
