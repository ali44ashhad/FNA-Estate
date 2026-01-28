const mongoose = require('mongoose');

const SellerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    companyDescription: String,
    registrationNumber: String,
    businessType: String,
    websiteUrl: String,
    officeAddress: String,
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    totalListings: {
      type: Number,
      default: 0,
    },
    approvedListings: {
      type: Number,
      default: 0,
    },
    onboardedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Seller', SellerSchema);
