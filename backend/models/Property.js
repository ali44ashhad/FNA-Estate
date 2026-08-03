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
      enum: [
        'Factory',
        'Warehouse',
        'Office',
        'Shop',
        'Hotel',
        'Industrial',
        'Cafe',
        'Restaurant',
        'Pg',
        'Running Business',
      ],
      required: true,
    },
    listingType: {
      type: String,
      enum: ['Sale', 'Rent'],
      default: 'Sale',
    },
    location: {
      country: { type: String, required: true },
      state: { type: String, required: true },
      city: { type: String, required: true },
      locality: { type: String, required: true },
      fullAddress: { type: String, required: true },
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
      currency: { type: String, default: 'INR' },
      maintenanceCharges: Number,
      offers: String,
    },
    // Shared space / premises details (category form may omit unused ones)
    propertyDetails: {
      builtUpArea: Number,
      carpetArea: Number,
      bedrooms: { type: Number, default: 0 },
      bathrooms: { type: Number, default: 0 },
      floorNumber: String,
      totalFloors: String,
      furnishingStatus: {
        type: String,
        enum: ['Furnished', 'Semi-Furnished', 'Unfurnished', ''],
        default: 'Unfurnished',
      },
      ageOfProperty: String,
      facingDirection: String,
    },
    // Revenue / business health — shown on cards when present
    financials: {
      monthlySales: Number,
      monthlyProfit: Number,
      establishmentYear: Number,
      staffCount: Number,
      reasonForSale: String,
    },
    // Category-specific operational details
    businessDetails: {
      seatingCapacity: Number,
      inventoryIncluded: Boolean,
      roomsCount: Number,
      bedsCount: Number,
      genderType: {
        type: String,
        enum: ['Boys', 'Girls', 'Co-ed', ''],
        default: '',
      },
      rentPerBed: Number,
      occupancyPercent: Number,
      hotelType: String,
      workstations: Number,
      cabins: Number,
      powerLoadKva: Number,
      plotArea: Number,
      ceilingHeight: Number,
      loadingDock: Boolean,
      machineryIncluded: Boolean,
      licensesIncluded: Boolean,
    },
    amenities: {
      parking: Boolean,
      lift: Boolean,
      security: Boolean,
      powerBackup: Boolean,
      waterSupply: Boolean,
      gym: Boolean,
      swimmingPool: Boolean,
      kitchen: Boolean,
      outdoorSeating: Boolean,
      liquorLicense: Boolean,
      cctv: Boolean,
      loadingBay: Boolean,
      access24x7: Boolean,
      ac: Boolean,
      wifi: Boolean,
      attachedBathroom: Boolean,
      messFacility: Boolean,
      other: [String],
    },
    media: {
      primaryImage: String,
      gallery: [String],
      videoUrl: String,
    },
    status: {
      type: String,
      enum: ['Pending Approval', 'Approved', 'Rejected', 'Sold'],
      default: 'Pending Approval',
    },
    // Marketing badges — controlled by admin (not auto from price)
    isVerified: {
      type: Boolean,
      default: true,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    isHot: {
      type: Boolean,
      default: false,
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
