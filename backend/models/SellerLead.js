const mongoose = require('mongoose');

const SellerLeadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Please provide a phone number'],
      trim: true,
    },
    businessName: {
      type: String,
      trim: true,
    },
    businessType: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    askingPrice: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Onboarded', 'Rejected'],
      default: 'New',
    },
    adminNotes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SellerLead', SellerLeadSchema);
