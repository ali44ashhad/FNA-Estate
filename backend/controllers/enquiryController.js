const Enquiry = require('../models/Enquiry');
const Property = require('../models/Property');

// Create enquiry
exports.createEnquiry = async (req, res) => {
  try {
    const { propertyId, contactInfo } = req.body;

    // Verify property exists
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Sellers (and buyers) may enquire — but never on their own listing
    if (property.createdBy?.toString() === req.user.id) {
      return res.status(400).json({
        message: 'You cannot send an enquiry on your own listing',
      });
    }

    if (property.status === 'Sold' || property.isActive === false) {
      return res.status(400).json({
        message: 'This listing is sold or no longer available for enquiries',
      });
    }

    if (property.status !== 'Approved') {
      return res.status(400).json({
        message: 'This listing is not open for enquiries',
      });
    }

    const enquiry = new Enquiry({
      propertyId,
      userId: req.user.id,
      contactInfo,
      status: 'New',
    });

    await enquiry.save();

    res.status(201).json({
      success: true,
      message: 'Your enquiry has been sent. Our team will contact you soon.',
      enquiry,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all enquiries (Admin only)
exports.getEnquiries = async (req, res) => {
  try {
    const { status, propertyId } = req.query;

    let filter = {};
    if (status) filter.status = status;
    if (propertyId) filter.propertyId = propertyId;

    const enquiries = await Enquiry.find(filter)
      .populate('propertyId', 'title pricing')
      .populate('userId', 'name email phone');

    res.status(200).json({
      success: true,
      count: enquiries.length,
      enquiries,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get current user's own enquiries
exports.getMyEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find({ userId: req.user.id })
      .populate('propertyId', 'title location pricing status')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: enquiries.length,
      enquiries,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update enquiry status (Admin only)
exports.updateEnquiryStatus = async (req, res) => {
  try {
    const { status, adminNotes } = req.body;

    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status, adminNotes },
      { new: true }
    )
      .populate('propertyId', 'title')
      .populate('userId', 'name email phone');

    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Enquiry updated successfully',
      enquiry,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
