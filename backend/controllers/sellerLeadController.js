const SellerLead = require('../models/SellerLead');

// Public: business owner submits interest to sell
exports.submitSellerLead = async (req, res) => {
  try {
    const { name, email, phone, businessName, businessType, city, askingPrice, message } =
      req.body;

    if (!name?.trim() || !email?.trim() || !phone?.trim()) {
      return res.status(400).json({ message: 'Name, email and phone are required' });
    }

    const lead = await SellerLead.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      businessName: businessName?.trim() || '',
      businessType: businessType?.trim() || '',
      city: city?.trim() || '',
      askingPrice: askingPrice?.trim() || '',
      message: message?.trim() || '',
    });

    res.status(201).json({
      success: true,
      message: 'Request submitted successfully. Our team will contact you soon.',
      lead: {
        id: lead._id,
        name: lead.name,
        email: lead.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: list all seller leads
exports.getSellerLeads = async (req, res) => {
  try {
    // Migrate any legacy "Closed" leads to "Rejected"
    const leads = (await SellerLead.find().sort('-createdAt')).map((lead) => {
      const doc = lead.toObject();
      if (doc.status === 'Closed') doc.status = 'Rejected';
      return doc;
    });

    res.status(200).json({
      success: true,
      count: leads.length,
      leads,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: update lead status / notes
exports.updateSellerLead = async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    const updates = {};

    if (status) {
      const allowed = ['New', 'Contacted', 'Onboarded', 'Rejected'];
      if (!allowed.includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }
      updates.status = status;
    }

    if (adminNotes !== undefined) {
      updates.adminNotes = adminNotes;
    }

    const lead = await SellerLead.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!lead) {
      return res.status(404).json({ message: 'Seller lead not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Lead updated successfully',
      lead,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
