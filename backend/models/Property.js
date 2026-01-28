const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a property title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
    },
    propertyType: {
      type: String,
      enum: ['Factory', 'Warehouse', 'Office', 'Shop', 'Hotel', 'Industrial', 'Cafe', 'Restaurant', 'Pg', 'Running Business'],
      required: true,
    },
    listingType: {
      type: String,
      enum: ['Sale', 'Rent'],
      default: 'Sale',
    },
    location: {
      country: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      locality: {
        type: String,
        required: true,
      },
      fullAddress: {
        type: String,
        required: true,
      },
      coordinates: {
        latitude: Number,
        longitude: Number,
      },
    },
    pricing: {
      basePrice: {
        type: Number,
        required: [true, 'Please provide a base price'],
      },
      finalPrice: {
        type: Number,
        required: [true, 'Please provide a final price'],
      },
      currency: {
        type: String,
        default: 'INR',
      },
      maintenanceCharges: Number,
      offers: String,
    },
    propertyDetails: {
      builtUpArea: {
        type: Number,
        required: true,
      },
      carpetArea: Number,
      bedrooms: {
        type: Number,
        required: true,
      },
      bathrooms: {
        type: Number,
        required: true,
      },
      floorNumber: String,
      totalFloors: String,
      furnishingStatus: {
        type: String,
        enum: ['Furnished', 'Semi-Furnished', 'Unfurnished'],
        default: 'Unfurnished',
      },
      ageOfProperty: String,
      facingDirection: String,
    },
    amenities: {
      parking: Boolean,
      lift: Boolean,
      security: Boolean,
      powerBackup: Boolean,
      waterSupply: Boolean,
      gym: Boolean,
      swimmingPool: Boolean,
      other: [String],
    },
    media: {
      primaryImage: String,
      gallery: [String],
      videoUrl: String,
    },
    status: {
      type: String,
      enum: ['Draft', 'Pending Approval', 'Approved', 'Rejected'],
      default: 'Draft',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    rejectionReason: String,
    adminNotes: String,
    isActive: {
      type: Boolean,
      default: true,
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

module.exports = mongoose.model('Property', PropertySchema);
