/**
 * Clears all listings + related enquiries, then seeds fresh Approved
 * listings created by the admin account (2–4 per category).
 *
 * Usage: node seedListings.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/database');
const User = require('./models/User');
const Property = require('./models/Property');
const Enquiry = require('./models/Enquiry');

const IMAGES = {
  restaurant: [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
    'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
  ],
  cafe: [
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800',
  ],
  shop: [
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
    'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=800',
    'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800',
  ],
  office: [
    'https://images.unsplash.com/photo-1497366216548-37526070144c?w=800',
    'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800',
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800',
  ],
  hotel: [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
    'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
  ],
  pg: [
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
  ],
  factory: [
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
    'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800',
    'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800',
  ],
  warehouse: [
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800',
    'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800',
    'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800',
  ],
  gym: [
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
    'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800',
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800',
  ],
  salon: [
    'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800',
    'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=800',
    'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d7?w=800',
  ],
};

const media = (key) => {
  const imgs = IMAGES[key] || IMAGES.shop;
  return { primaryImage: imgs[0], gallery: imgs.slice(1) };
};

const loc = (city, locality, fullAddress, state = 'Punjab') => ({
  country: 'India',
  state,
  city,
  locality,
  fullAddress,
});

const price = (amount) => ({
  basePrice: amount,
  finalPrice: amount,
  currency: 'INR',
});

const foodAmenities = {
  parking: true,
  powerBackup: true,
  waterSupply: true,
  security: true,
  ac: true,
  wifi: true,
  kitchen: true,
};

const officeAmenities = {
  parking: true,
  lift: true,
  powerBackup: true,
  security: true,
  ac: true,
  wifi: true,
  waterSupply: true,
};

const industrialAmenities = {
  parking: true,
  powerBackup: true,
  waterSupply: true,
  security: true,
  cctv: true,
  loadingBay: true,
  access24x7: true,
};

const buildListings = (adminId) => {
  const base = {
    createdBy: adminId,
    approvedBy: adminId,
    status: 'Approved',
    isActive: true,
    listingType: 'Sale',
    isVerified: true,
    isPremium: false,
    isHot: false,
  };

  return [
    // ——— Restaurant (3) ———
    {
      ...base,
      title: 'Running North Indian Restaurant in Sector 35, Chandigarh',
      description:
        'Well-established North Indian restaurant since 2018. Fully equipped kitchen, 45 covers, FSSAI & GST ready. Steady office + residential lunch/dinner crowd. Furniture, crockery and stock included.',
      propertyType: 'Restaurant',
      location: loc('Chandigarh', 'Sector 35', 'SCO 214, Sector 35-C, Chandigarh'),
      pricing: price(3500000),
      propertyDetails: {
        builtUpArea: 1200,
        bathrooms: 2,
        floorNumber: 'Ground',
        furnishingStatus: 'Furnished',
      },
      financials: {
        monthlySales: 850000,
        monthlyProfit: 180000,
        establishmentYear: 2018,
        staffCount: 8,
        reasonForSale: 'Owner relocating to another city',
      },
      businessDetails: {
        seatingCapacity: 45,
        inventoryIncluded: true,
        licensesIncluded: true,
      },
      amenities: { ...foodAmenities, outdoorSeating: false, liquorLicense: false },
      media: media('restaurant'),
    },
    {
      ...base,
      title: 'Fine Dining Restaurant with Bar — Sector 26, Chandigarh',
      description:
        'Premium multi-cuisine restaurant with liquor license, private dining and outdoor deck. Strong weekend bookings and corporate parties. Turnkey takeover with trained staff.',
      propertyType: 'Restaurant',
      location: loc('Chandigarh', 'Sector 26', 'SCO 48, Sector 26, Chandigarh'),
      pricing: price(12000000),
      propertyDetails: {
        builtUpArea: 3200,
        bathrooms: 4,
        floorNumber: 'Ground & 1st',
        furnishingStatus: 'Furnished',
      },
      financials: {
        monthlySales: 2200000,
        monthlyProfit: 450000,
        establishmentYear: 2015,
        staffCount: 18,
        reasonForSale: 'Expanding brand elsewhere; selling this unit',
      },
      businessDetails: {
        seatingCapacity: 90,
        inventoryIncluded: true,
        licensesIncluded: true,
      },
      amenities: { ...foodAmenities, outdoorSeating: true, liquorLicense: true, lift: true },
      media: media('restaurant'),
    },
    {
      ...base,
      listingType: 'Rent',
      title: 'Family Dhaba on Zirakpur Highway',
      description:
        'High-visibility highway dhaba with parking for 30+ cars. Busy truck and tourist traffic. Semi-furnished kitchen and seating ready to restart operations.',
      propertyType: 'Restaurant',
      location: loc('Zirakpur', 'Zirakpur Bypass', 'NH-7 Highway Stretch, Zirakpur'),
      pricing: price(65000),
      propertyDetails: {
        builtUpArea: 2800,
        bathrooms: 3,
        floorNumber: 'Ground',
        furnishingStatus: 'Semi-Furnished',
      },
      financials: {
        monthlySales: 950000,
        monthlyProfit: 160000,
        establishmentYear: 2016,
        staffCount: 10,
        reasonForSale: 'Lease transfer due to personal commitments',
      },
      businessDetails: {
        seatingCapacity: 80,
        inventoryIncluded: false,
        licensesIncluded: true,
      },
      amenities: { ...foodAmenities, outdoorSeating: true, parking: true },
      media: media('restaurant'),
    },

    // ——— Cafe (3) ———
    {
      ...base,
      title: 'Specialty Coffee Cafe in Sector 22, Chandigarh',
      description:
        'Instagram-friendly cafe with specialty coffee setup, pastry counter and loyal morning crowd. Espresso machine and furniture included.',
      propertyType: 'Cafe',
      location: loc('Chandigarh', 'Sector 22', 'SCO 89, Sector 22-B, Chandigarh'),
      pricing: price(4200000),
      propertyDetails: {
        builtUpArea: 950,
        bathrooms: 2,
        floorNumber: 'Ground',
        furnishingStatus: 'Furnished',
      },
      financials: {
        monthlySales: 520000,
        monthlyProfit: 110000,
        establishmentYear: 2019,
        staffCount: 6,
        reasonForSale: 'Moving abroad',
      },
      businessDetails: {
        seatingCapacity: 32,
        inventoryIncluded: true,
        licensesIncluded: true,
      },
      amenities: { ...foodAmenities, outdoorSeating: true },
      media: media('cafe'),
    },
    {
      ...base,
      title: 'Bakery Cafe in Phase 5, Mohali',
      description:
        'Combined bakery + cafe with in-house oven and display counters. Strong takeaway sales from nearby societies and offices.',
      propertyType: 'Cafe',
      location: loc('Mohali', 'Phase 5', 'SCO 34, Phase 5, Mohali'),
      pricing: price(3800000),
      propertyDetails: {
        builtUpArea: 1100,
        bathrooms: 2,
        floorNumber: 'Ground',
        furnishingStatus: 'Furnished',
      },
      financials: {
        monthlySales: 480000,
        monthlyProfit: 95000,
        establishmentYear: 2020,
        staffCount: 5,
        reasonForSale: 'Owner shifting to different business',
      },
      businessDetails: {
        seatingCapacity: 28,
        inventoryIncluded: true,
        licensesIncluded: true,
      },
      amenities: { ...foodAmenities },
      media: media('cafe'),
    },
    {
      ...base,
      listingType: 'Rent',
      title: 'Corner Cafe Space near Elante — Industrial Area',
      description:
        'Compact cafe unit near mall and IT offices. Ideal for quick-service coffee or cloud kitchen + seating hybrid.',
      propertyType: 'Cafe',
      location: loc('Chandigarh', 'Industrial Area Phase 1', 'Booth 12, near Elante Mall, Chandigarh'),
      pricing: price(38000),
      propertyDetails: {
        builtUpArea: 650,
        bathrooms: 1,
        floorNumber: 'Ground',
        furnishingStatus: 'Semi-Furnished',
      },
      financials: {
        monthlySales: 280000,
        monthlyProfit: 55000,
        establishmentYear: 2021,
        staffCount: 3,
        reasonForSale: 'Lease transfer',
      },
      businessDetails: {
        seatingCapacity: 18,
        inventoryIncluded: false,
        licensesIncluded: false,
      },
      amenities: { ...foodAmenities, kitchen: true },
      media: media('cafe'),
    },

    // ——— Shop (3) ———
    {
      ...base,
      title: 'Prime Retail Shop in Sector 17 Plaza, Chandigarh',
      description:
        'Ground-floor retail with heavy footfall in Sector 17. Suitable for fashion, gadgets or lifestyle brands. Excellent street visibility.',
      propertyType: 'Shop',
      location: loc('Chandigarh', 'Sector 17', 'Shop No. 23, Sector 17 Plaza, Chandigarh'),
      pricing: price(8500000),
      propertyDetails: {
        builtUpArea: 800,
        bathrooms: 1,
        floorNumber: 'Ground',
        furnishingStatus: 'Unfurnished',
      },
      financials: {
        monthlySales: 700000,
        monthlyProfit: 140000,
        establishmentYear: 2014,
        staffCount: 4,
        reasonForSale: 'Owner retiring',
      },
      businessDetails: {
        seatingCapacity: 0,
        inventoryIncluded: false,
        licensesIncluded: false,
      },
      amenities: {
        parking: true,
        lift: true,
        security: true,
        powerBackup: true,
        waterSupply: true,
        ac: true,
      },
      media: media('shop'),
    },
    {
      ...base,
      title: 'Corner Showroom in Phase 3B2, Mohali',
      description:
        'Corner SCO with dual-side visibility. Ideal for furniture, automobile accessories or brand showroom. Ample visitor parking.',
      propertyType: 'Shop',
      location: loc('Mohali', 'Phase 3B2', 'Corner SCO 56, Phase 3B2, Mohali'),
      pricing: price(5500000),
      propertyDetails: {
        builtUpArea: 1600,
        bathrooms: 2,
        floorNumber: 'Ground',
        furnishingStatus: 'Semi-Furnished',
      },
      financials: {
        monthlySales: 550000,
        monthlyProfit: 90000,
        establishmentYear: 2017,
        staffCount: 5,
        reasonForSale: 'Upsizing to larger premises',
      },
      businessDetails: {
        inventoryIncluded: true,
        licensesIncluded: true,
      },
      amenities: {
        parking: true,
        security: true,
        powerBackup: true,
        waterSupply: true,
        ac: true,
      },
      media: media('shop'),
    },
    {
      ...base,
      listingType: 'Rent',
      title: 'Retail Booth on Zirakpur Main Road',
      description:
        'Front-facing booth on busy Zirakpur stretch. Good for mobile store, pharmacy counter or QSR takeaway.',
      propertyType: 'Shop',
      location: loc('Zirakpur', 'Zirakpur Main', 'Booth 7, Zirakpur Main Road'),
      pricing: price(42000),
      propertyDetails: {
        builtUpArea: 450,
        bathrooms: 1,
        floorNumber: 'Ground',
        furnishingStatus: 'Unfurnished',
      },
      financials: {
        monthlySales: 320000,
        monthlyProfit: 60000,
        establishmentYear: 2019,
        staffCount: 2,
        reasonForSale: 'Lease available for transfer',
      },
      businessDetails: {
        inventoryIncluded: false,
        licensesIncluded: false,
      },
      amenities: {
        parking: true,
        security: true,
        powerBackup: true,
        waterSupply: true,
      },
      media: media('shop'),
    },

    // ——— Office (3) ———
    {
      ...base,
      listingType: 'Rent',
      title: 'Furnished Office in Sector 22, Chandigarh',
      description:
        'Ready-to-move office with workstations, meeting cabin and reception. Lift, parking and power backup. Ideal for IT / consulting firms.',
      propertyType: 'Office',
      location: loc('Chandigarh', 'Sector 22', 'SCO 45-47, Sector 22, Chandigarh'),
      pricing: price(85000),
      propertyDetails: {
        builtUpArea: 2800,
        bathrooms: 3,
        floorNumber: '2',
        totalFloors: '4',
        furnishingStatus: 'Furnished',
      },
      financials: {
        reasonForSale: 'Company downsizing headcount',
      },
      businessDetails: {
        workstations: 28,
        cabins: 3,
      },
      amenities: officeAmenities,
      media: media('office'),
    },
    {
      ...base,
      title: 'Corporate Office Floor in Phase 7, Mohali',
      description:
        'Entire floor office with open seating, 4 cabins, pantry and server room. Close to IT parks and airport road.',
      propertyType: 'Office',
      location: loc('Mohali', 'Phase 7', 'SCO 118, Phase 7, Mohali'),
      pricing: price(14500000),
      propertyDetails: {
        builtUpArea: 4200,
        bathrooms: 4,
        floorNumber: '3',
        totalFloors: '5',
        furnishingStatus: 'Semi-Furnished',
      },
      financials: {
        establishmentYear: 2016,
        staffCount: 40,
        reasonForSale: 'Relocating HQ',
      },
      businessDetails: {
        workstations: 45,
        cabins: 4,
      },
      amenities: officeAmenities,
      media: media('office'),
    },
    {
      ...base,
      listingType: 'Rent',
      title: 'Startup Studio Office near Kharar',
      description:
        'Compact furnished studio office for 8–12 people. High-speed internet ready, near Kharar bypass and residential catchments.',
      propertyType: 'Office',
      location: loc('Kharar', 'Kharar Main', '2nd Floor, Main Market, Kharar'),
      pricing: price(28000),
      propertyDetails: {
        builtUpArea: 900,
        bathrooms: 1,
        floorNumber: '2',
        totalFloors: '3',
        furnishingStatus: 'Furnished',
      },
      financials: {
        reasonForSale: 'Lease available',
      },
      businessDetails: {
        workstations: 10,
        cabins: 1,
      },
      amenities: { ...officeAmenities, lift: false },
      media: media('office'),
    },

    // ——— Hotel (3) ———
    {
      ...base,
      title: 'Boutique Hotel — 22 Rooms, Sector 43 Chandigarh',
      description:
        'Running boutique hotel with restaurant, banquet hall and 22 well-furnished rooms. Strong weekday corporate occupancy.',
      propertyType: 'Hotel',
      location: loc('Chandigarh', 'Sector 43', 'Hotel Aura, Sector 43, Chandigarh'),
      pricing: price(78000000),
      propertyDetails: {
        builtUpArea: 28000,
        bathrooms: 24,
        totalFloors: '4',
        furnishingStatus: 'Furnished',
      },
      financials: {
        monthlySales: 3500000,
        monthlyProfit: 700000,
        establishmentYear: 2012,
        staffCount: 28,
        reasonForSale: 'Promoters exiting hospitality',
      },
      businessDetails: {
        roomsCount: 22,
        hotelType: 'Boutique',
        occupancyPercent: 72,
      },
      amenities: {
        parking: true,
        lift: true,
        powerBackup: true,
        waterSupply: true,
        security: true,
        ac: true,
        wifi: true,
        kitchen: true,
        gym: false,
        swimmingPool: false,
      },
      media: media('hotel'),
    },
    {
      ...base,
      title: 'Business Hotel near Mohali Airport Road',
      description:
        '18-room business hotel with conference hall. High weekday occupancy from travellers and corporate guests.',
      propertyType: 'Hotel',
      location: loc('Mohali', 'Phase 1', 'Airport Road, Phase 1, Mohali'),
      pricing: price(45000000),
      propertyDetails: {
        builtUpArea: 16000,
        bathrooms: 20,
        totalFloors: '3',
        furnishingStatus: 'Furnished',
      },
      financials: {
        monthlySales: 2100000,
        monthlyProfit: 420000,
        establishmentYear: 2015,
        staffCount: 16,
        reasonForSale: 'Family settlement',
      },
      businessDetails: {
        roomsCount: 18,
        hotelType: 'Business',
        occupancyPercent: 68,
      },
      amenities: {
        parking: true,
        lift: true,
        powerBackup: true,
        waterSupply: true,
        security: true,
        ac: true,
        wifi: true,
        kitchen: true,
      },
      media: media('hotel'),
    },
    {
      ...base,
      listingType: 'Rent',
      title: 'Budget Guest House in Zirakpur',
      description:
        '12-room budget guest house on main road. Simple rooms, reception and mess. Suitable for first-time hotel operators.',
      propertyType: 'Hotel',
      location: loc('Zirakpur', 'Baltana', 'Guest House Lane, Baltana, Zirakpur'),
      pricing: price(125000),
      propertyDetails: {
        builtUpArea: 9000,
        bathrooms: 14,
        totalFloors: '3',
        furnishingStatus: 'Semi-Furnished',
      },
      financials: {
        monthlySales: 650000,
        monthlyProfit: 140000,
        establishmentYear: 2018,
        staffCount: 8,
        reasonForSale: 'Lease transfer',
      },
      businessDetails: {
        roomsCount: 12,
        hotelType: 'Guest House',
        occupancyPercent: 60,
      },
      amenities: {
        parking: true,
        powerBackup: true,
        waterSupply: true,
        security: true,
        wifi: true,
        kitchen: true,
      },
      media: media('hotel'),
    },

    // ——— Pg (3) ———
    {
      ...base,
      title: 'Boys PG — 40 Beds near Sector 15 Chandigarh',
      description:
        'Fully occupied boys PG with mess, laundry and Wi‑Fi. Strong demand from students and working professionals.',
      propertyType: 'Pg',
      location: loc('Chandigarh', 'Sector 15', 'House No. 312, Sector 15-A, Chandigarh'),
      pricing: price(9200000),
      propertyDetails: {
        builtUpArea: 4800,
        bathrooms: 10,
        furnishingStatus: 'Furnished',
      },
      financials: {
        monthlySales: 480000,
        monthlyProfit: 210000,
        establishmentYear: 2017,
        staffCount: 3,
        reasonForSale: 'Owner shifting city',
      },
      businessDetails: {
        bedsCount: 40,
        roomsCount: 16,
        genderType: 'Boys',
        rentPerBed: 9500,
        occupancyPercent: 95,
      },
      amenities: {
        parking: true,
        powerBackup: true,
        waterSupply: true,
        security: true,
        wifi: true,
        ac: true,
        attachedBathroom: true,
        messFacility: true,
        lift: false,
      },
      media: media('pg'),
    },
    {
      ...base,
      title: 'Girls PG with Mess — Phase 3B2 Mohali',
      description:
        'Secure girls PG with CCTV, warden and home-style meals. Near colleges and coaching hubs.',
      propertyType: 'Pg',
      location: loc('Mohali', 'Phase 3B2', 'House 214, Phase 3B2, Mohali'),
      pricing: price(7500000),
      propertyDetails: {
        builtUpArea: 3600,
        bathrooms: 8,
        furnishingStatus: 'Furnished',
      },
      financials: {
        monthlySales: 360000,
        monthlyProfit: 160000,
        establishmentYear: 2019,
        staffCount: 2,
        reasonForSale: 'Personal reasons',
      },
      businessDetails: {
        bedsCount: 28,
        roomsCount: 12,
        genderType: 'Girls',
        rentPerBed: 11000,
        occupancyPercent: 90,
      },
      amenities: {
        parking: true,
        powerBackup: true,
        waterSupply: true,
        security: true,
        wifi: true,
        ac: true,
        attachedBathroom: true,
        messFacility: true,
      },
      media: media('pg'),
    },
    {
      ...base,
      listingType: 'Rent',
      title: 'Co-ed Working Professionals PG — Kharar',
      description:
        'Modern co-ed PG for professionals near IT corridor. Attached baths, AC rooms and housekeeping.',
      propertyType: 'Pg',
      location: loc('Kharar', 'New Kharar', 'Near Landran Road, Kharar'),
      pricing: price(95000),
      propertyDetails: {
        builtUpArea: 4200,
        bathrooms: 12,
        furnishingStatus: 'Furnished',
      },
      financials: {
        monthlySales: 420000,
        monthlyProfit: 175000,
        establishmentYear: 2020,
        staffCount: 3,
        reasonForSale: 'Lease available for operators',
      },
      businessDetails: {
        bedsCount: 36,
        roomsCount: 14,
        genderType: 'Co-ed',
        rentPerBed: 10500,
        occupancyPercent: 85,
      },
      amenities: {
        parking: true,
        powerBackup: true,
        waterSupply: true,
        security: true,
        wifi: true,
        ac: true,
        attachedBathroom: true,
        messFacility: true,
        lift: true,
      },
      media: media('pg'),
    },

    // ——— Factory (2) ———
    {
      ...base,
      title: 'Manufacturing Unit — Industrial Area Phase 1, Chandigarh',
      description:
        'Running light manufacturing unit with 3-phase power, loading bay and office cabin. Suitable for packaging, assembly or fabrication.',
      propertyType: 'Factory',
      location: loc('Chandigarh', 'Industrial Area Phase 1', 'Plot 45, Industrial Area Phase 1, Chandigarh'),
      pricing: price(28000000),
      propertyDetails: {
        builtUpArea: 12000,
        bathrooms: 3,
        floorNumber: 'Ground',
        furnishingStatus: 'Unfurnished',
      },
      financials: {
        monthlySales: 1800000,
        monthlyProfit: 320000,
        establishmentYear: 2010,
        staffCount: 22,
        reasonForSale: 'Business consolidation',
      },
      businessDetails: {
        plotArea: 15000,
        powerLoadKva: 125,
        ceilingHeight: 22,
        loadingDock: true,
        machineryIncluded: true,
      },
      amenities: industrialAmenities,
      media: media('factory'),
    },
    {
      ...base,
      listingType: 'Rent',
      title: 'Factory Shed in Phase 7 Mohali Industrial Zone',
      description:
        'Clear-span shed with crane provision, truck parking and 24×7 access. Ideal for mid-size production setup.',
      propertyType: 'Factory',
      location: loc('Mohali', 'Phase 7', 'Industrial Pocket, Phase 7, Mohali'),
      pricing: price(175000),
      propertyDetails: {
        builtUpArea: 18000,
        bathrooms: 4,
        floorNumber: 'Ground',
        furnishingStatus: 'Unfurnished',
      },
      financials: {
        reasonForSale: 'Owner leasing vacant shed',
      },
      businessDetails: {
        plotArea: 22000,
        powerLoadKva: 200,
        ceilingHeight: 28,
        loadingDock: true,
        machineryIncluded: false,
      },
      amenities: industrialAmenities,
      media: media('factory'),
    },

    // ——— Warehouse (3) ———
    {
      ...base,
      title: 'Logistics Warehouse — Kharar Industrial Area',
      description:
        'High-ceiling warehouse with multiple loading bays and office mezzanine. Excellent highway connectivity for distribution.',
      propertyType: 'Warehouse',
      location: loc('Kharar', 'Kharar Industrial Area', 'Warehouse 12, Kharar Industrial Area'),
      pricing: price(19500000),
      propertyDetails: {
        builtUpArea: 22000,
        bathrooms: 2,
        floorNumber: 'Ground',
        furnishingStatus: 'Unfurnished',
      },
      financials: {
        reasonForSale: 'Investor exit',
      },
      businessDetails: {
        plotArea: 28000,
        powerLoadKva: 80,
        ceilingHeight: 32,
        loadingDock: true,
        machineryIncluded: false,
      },
      amenities: industrialAmenities,
      media: media('warehouse'),
    },
    {
      ...base,
      listingType: 'Rent',
      title: 'Modern Warehouse on Zirakpur Bypass',
      description:
        'RCC + PEB warehouse with dock levelers, CCTV and dedicated truck yard. Suitable for FMCG or e-commerce storage.',
      propertyType: 'Warehouse',
      location: loc('Zirakpur', 'Zirakpur Bypass', 'Warehouse Complex, Zirakpur Bypass'),
      pricing: price(220000),
      propertyDetails: {
        builtUpArea: 30000,
        bathrooms: 3,
        floorNumber: 'Ground',
        furnishingStatus: 'Unfurnished',
      },
      financials: {
        reasonForSale: 'Available on long lease',
      },
      businessDetails: {
        plotArea: 40000,
        powerLoadKva: 100,
        ceilingHeight: 36,
        loadingDock: true,
        machineryIncluded: false,
      },
      amenities: industrialAmenities,
      media: media('warehouse'),
    },
    {
      ...base,
      title: 'Compact Storage Warehouse — Baltana',
      description:
        'Mid-size warehouse for regional distributors. Easy access from NH and local markets.',
      propertyType: 'Warehouse',
      location: loc('Zirakpur', 'Baltana', 'Near Baltana Chowk, Zirakpur'),
      pricing: price(9800000),
      propertyDetails: {
        builtUpArea: 9000,
        bathrooms: 2,
        floorNumber: 'Ground',
        furnishingStatus: 'Unfurnished',
      },
      financials: {
        reasonForSale: 'Owner selling surplus asset',
      },
      businessDetails: {
        plotArea: 11000,
        powerLoadKva: 50,
        ceilingHeight: 24,
        loadingDock: true,
        machineryIncluded: false,
      },
      amenities: industrialAmenities,
      media: media('warehouse'),
    },

    // ——— Industrial (2) ———
    {
      ...base,
      title: 'Industrial Plot with Shed — Dera Bassi',
      description:
        'Industrial plot with existing shed, power load sanctioned and boundary wall. Ready for engineering or processing unit.',
      propertyType: 'Industrial',
      location: loc('Zirakpur', 'Dera Bassi', 'Industrial Pocket, Dera Bassi'),
      pricing: price(16000000),
      propertyDetails: {
        builtUpArea: 8000,
        bathrooms: 2,
        floorNumber: 'Ground',
        furnishingStatus: 'Unfurnished',
      },
      financials: {
        reasonForSale: 'Promoter shifting operations',
      },
      businessDetails: {
        plotArea: 20000,
        powerLoadKva: 150,
        ceilingHeight: 26,
        loadingDock: true,
        machineryIncluded: false,
      },
      amenities: industrialAmenities,
      media: media('factory'),
    },
    {
      ...base,
      listingType: 'Rent',
      title: 'Industrial Unit with Machinery — Kharar',
      description:
        'Running industrial unit with select machinery included. Suitable for light engineering continuation or fresh fit-out.',
      propertyType: 'Industrial',
      location: loc('Kharar', 'Kharar Industrial Area', 'Unit 8, Kharar Industrial Area'),
      pricing: price(140000),
      propertyDetails: {
        builtUpArea: 10000,
        bathrooms: 3,
        floorNumber: 'Ground',
        furnishingStatus: 'Unfurnished',
      },
      financials: {
        monthlySales: 900000,
        monthlyProfit: 150000,
        establishmentYear: 2013,
        staffCount: 12,
        reasonForSale: 'Lease with optional machinery',
      },
      businessDetails: {
        plotArea: 14000,
        powerLoadKva: 110,
        ceilingHeight: 24,
        loadingDock: true,
        machineryIncluded: true,
      },
      amenities: industrialAmenities,
      media: media('factory'),
    },

    // ——— Running Business (4) ———
    {
      ...base,
      title: 'Running Electronics Showroom — Sector 17 Chandigarh',
      description:
        'Established electronics retail with brand dealerships, trained staff and regular walk-ins. Inventory negotiable separately.',
      propertyType: 'Running Business',
      location: loc('Chandigarh', 'Sector 17', 'ElectroMart, Sector 17 Plaza, Chandigarh'),
      pricing: price(15000000),
      propertyDetails: {
        builtUpArea: 2400,
        bathrooms: 2,
        floorNumber: 'Ground & 1st',
        furnishingStatus: 'Furnished',
      },
      financials: {
        monthlySales: 2500000,
        monthlyProfit: 280000,
        establishmentYear: 2011,
        staffCount: 9,
        reasonForSale: 'Owner retiring',
      },
      businessDetails: {
        seatingCapacity: 0,
        inventoryIncluded: false,
        licensesIncluded: true,
      },
      amenities: {
        parking: true,
        lift: true,
        security: true,
        powerBackup: true,
        waterSupply: true,
        ac: true,
        wifi: true,
      },
      media: media('shop'),
    },
    {
      ...base,
      title: 'Running Pharmacy near Hospital — Phase 5 Mohali',
      description:
        'Licensed pharmacy with steady prescription flow from nearby clinics and hospital. Fixtures and cold storage included.',
      propertyType: 'Running Business',
      location: loc('Mohali', 'Phase 5', 'MediCare Pharmacy, Phase 5, Mohali'),
      pricing: price(3200000),
      propertyDetails: {
        builtUpArea: 550,
        bathrooms: 1,
        floorNumber: 'Ground',
        furnishingStatus: 'Furnished',
      },
      financials: {
        monthlySales: 900000,
        monthlyProfit: 120000,
        establishmentYear: 2016,
        staffCount: 3,
        reasonForSale: 'Family relocation',
      },
      businessDetails: {
        inventoryIncluded: true,
        licensesIncluded: true,
      },
      amenities: {
        parking: true,
        security: true,
        powerBackup: true,
        waterSupply: true,
        ac: true,
      },
      media: media('shop'),
    },
    {
      ...base,
      title: 'Fully Equipped Gym — Baltana, Zirakpur',
      description:
        'Running fitness centre with cardio, strength zone and lockers. Active membership base and trained trainers on payroll.',
      propertyType: 'Running Business',
      location: loc('Zirakpur', 'Baltana', 'FitZone Gym, Baltana, Zirakpur'),
      pricing: price(5800000),
      propertyDetails: {
        builtUpArea: 3500,
        bathrooms: 4,
        floorNumber: 'Ground',
        furnishingStatus: 'Furnished',
      },
      financials: {
        monthlySales: 450000,
        monthlyProfit: 160000,
        establishmentYear: 2018,
        staffCount: 6,
        reasonForSale: 'Promoter emigrating',
      },
      businessDetails: {
        inventoryIncluded: true,
        licensesIncluded: true,
      },
      amenities: {
        parking: true,
        powerBackup: true,
        waterSupply: true,
        security: true,
        ac: true,
        wifi: true,
        gym: true,
      },
      media: media('gym'),
    },
    {
      ...base,
      listingType: 'Rent',
      title: 'Running Beauty Salon — Kharar Main',
      description:
        'Established unisex salon with chairs, stations and regular clientele. Ready for takeover with existing staff option.',
      propertyType: 'Running Business',
      location: loc('Kharar', 'Kharar Main', 'Beauty Lounge, Kharar Main Market'),
      pricing: price(32000),
      propertyDetails: {
        builtUpArea: 900,
        bathrooms: 2,
        floorNumber: 'Ground',
        furnishingStatus: 'Furnished',
      },
      financials: {
        monthlySales: 280000,
        monthlyProfit: 90000,
        establishmentYear: 2019,
        staffCount: 5,
        reasonForSale: 'Lease transfer',
      },
      businessDetails: {
        inventoryIncluded: true,
        licensesIncluded: true,
      },
      amenities: {
        parking: true,
        powerBackup: true,
        waterSupply: true,
        security: true,
        ac: true,
        wifi: true,
      },
      media: media('salon'),
    },
  ];
};

const seedListings = async () => {
  try {
    await connectDB();

    const deletedProps = await Property.deleteMany({});
    const deletedEnquiries = await Enquiry.deleteMany({});
    console.log(`Removed ${deletedProps.deletedCount} old listings`);
    console.log(`Removed ${deletedEnquiries.deletedCount} old enquiries`);

    let admin = await User.findOne({ role: 'admin' });
    if (!admin) {
      admin = await User.create({
        name: 'Admin User',
        email: 'admin@udyammittar.com',
        phone: '+91-9876543210',
        password: 'admin123',
        role: 'admin',
        isActive: true,
      });
      console.log('Created admin: admin@udyammittar.com / admin123');
    } else {
      console.log(`Using existing admin: ${admin.email}`);
    }

    const listings = buildListings(admin._id);
    const created = await Property.insertMany(listings);

    const byType = created.reduce((acc, p) => {
      acc[p.propertyType] = (acc[p.propertyType] || 0) + 1;
      return acc;
    }, {});

    console.log(`\nSeeded ${created.length} Approved listings (createdBy admin)\n`);
    Object.entries(byType)
      .sort(([a], [b]) => a.localeCompare(b))
      .forEach(([type, count]) => console.log(`  ${type}: ${count}`));
    console.log('\nDone.\n');

    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  }
};

seedListings();
