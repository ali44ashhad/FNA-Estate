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
seedDatabase();
