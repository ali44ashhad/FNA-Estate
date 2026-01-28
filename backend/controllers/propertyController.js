const Property = require('../models/Property');
const Enquiry = require('../models/Enquiry');

// Get all approved properties (for public view)
exports.getApprovedProperties = async (req, res) => {
  try {
    const { 
      city, 
      locality, 
      propertyType, 
      listingType,
      minPrice, 
      maxPrice, 
      bedrooms,
      bathrooms,
      furnished,
      sort 
    } = req.query;

    let filter = { status: 'Approved', isActive: true };

    // Location filters
    if (city) filter['location.city'] = new RegExp(city, 'i');
    if (locality) filter['location.locality'] = new RegExp(locality, 'i');
    
    // Property type filter
    if (propertyType) filter.propertyType = propertyType;
    
    // Listing type filter
    if (listingType) filter.listingType = listingType;
    
    // Price range filter
    if (minPrice || maxPrice) {
      filter['pricing.finalPrice'] = {};
      if (minPrice) filter['pricing.finalPrice'].$gte = parseInt(minPrice);
      if (maxPrice) filter['pricing.finalPrice'].$lte = parseInt(maxPrice);
    }
    
    // Bedrooms filter
    if (bedrooms) {
      filter['propertyDetails.bedrooms'] = { $gte: parseInt(bedrooms) };
    }
    
    // Bathrooms filter
    if (bathrooms) {
      filter['propertyDetails.bathrooms'] = { $gte: parseInt(bathrooms) };
    }
    
    // Furnishing filter
    if (furnished) {
      if (furnished === 'fully') {
        filter['propertyDetails.furnishingStatus'] = 'Furnished';
      } else if (furnished === 'semi') {
        filter['propertyDetails.furnishingStatus'] = 'Semi-Furnished';
      } else if (furnished === 'unfurnished') {
        filter['propertyDetails.furnishingStatus'] = 'Unfurnished';
      }
    }

    let query = Property.find(filter).populate('createdBy', 'name email');

    // Sort options
    if (sort) {
      switch(sort) {
        case 'price-low':
          query = query.sort('pricing.finalPrice');
          break;
        case 'price-high':
          query = query.sort('-pricing.finalPrice');
          break;
        case 'size-high':
          query = query.sort('-propertyDetails.builtUpArea');
          break;
        case 'newest':
        default:
          query = query.sort('-createdAt');
      }
    } else {
      query = query.sort('-createdAt');
    }

    const properties = await query;

    res.status(200).json({
      success: true,
      count: properties.length,
      properties,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get property statistics
exports.getPropertyStats = async (req, res) => {
  try {
    const totalProperties = await Property.countDocuments({ status: 'Approved', isActive: true });
    const cities = await Property.distinct('location.city', { status: 'Approved', isActive: true });
    const totalValue = await Property.aggregate([
      { $match: { status: 'Approved', isActive: true } },
      { $group: { _id: null, total: { $sum: '$pricing.finalPrice' } } }
    ]);
    
    res.status(200).json({
      success: true,
      stats: {
        totalProperties,
        totalCities: cities.length,
        totalValue: totalValue[0]?.total || 0,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single property details
exports.getPropertyDetails = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('createdBy', 'name email');

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.status(200).json({
      success: true,
      property,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create property listing (Seller)
exports.createProperty = async (req, res) => {
  try {
    const { title, description, propertyType, listingType, location, pricing, propertyDetails, amenities, media } = req.body;

    const property = new Property({
      title,
      description,
      propertyType,
      listingType,
      location,
      pricing: {
        ...pricing,
        finalPrice: pricing.basePrice,
      },
      propertyDetails,
      amenities,
      media,
      createdBy: req.user.id,
      status: 'Pending Approval',
    });

    await property.save();

    res.status(201).json({
      success: true,
      message: 'Property listing created successfully and sent for approval',
      property,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get seller's properties
exports.getSellerProperties = async (req, res) => {
  try {
    const properties = await Property.find({ createdBy: req.user.id }).populate('createdBy', 'name');

    res.status(200).json({
      success: true,
      count: properties.length,
      properties,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Edit property (Seller - only draft or rejected)
exports.editProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    if (property.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to edit this property' });
    }

    if (!['Draft', 'Rejected'].includes(property.status)) {
      return res.status(400).json({ message: 'Can only edit draft or rejected listings' });
    }

    const updates = req.body;
    Object.keys(updates).forEach((key) => {
      if (key !== 'pricing' || key !== 'status') {
        property[key] = updates[key];
      } else if (key === 'pricing') {
        property.pricing = { ...property.pricing, ...updates.pricing };
      }
    });

    property.status = 'Pending Approval';
    await property.save();

    res.status(200).json({
      success: true,
      message: 'Property updated and resubmitted for approval',
      property,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
