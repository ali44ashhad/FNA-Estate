/**
 * Category-wise Add Listing field config.
 * Shared: title, category, listing type, description, photos, location, asking price.
 * Per-type: propertyDetails / financials / businessDetails / amenities.
 */

export const CATEGORY_GROUPS = {
  foodRetail: ['Restaurant', 'Cafe', 'Shop', 'Running Business'],
  hotel: ['Hotel'],
  pg: ['Pg'],
  office: ['Office'],
  industrial: ['Factory', 'Warehouse', 'Industrial'],
};

export const getCategoryGroup = (propertyType) => {
  for (const [group, types] of Object.entries(CATEGORY_GROUPS)) {
    if (types.includes(propertyType)) return group;
  }
  return 'foodRetail';
};

/** Space / premises fields shown for each group */
export const SPACE_FIELDS_BY_GROUP = {
  foodRetail: [
    { key: 'builtUpArea', label: 'Built-up Area (sqft)', type: 'number', required: true, section: 'propertyDetails' },
    { key: 'bathrooms', label: 'Washrooms', type: 'number', required: true, section: 'propertyDetails', min: 0 },
    {
      key: 'furnishingStatus',
      label: 'Furnishing',
      type: 'select',
      required: true,
      section: 'propertyDetails',
      options: ['Furnished', 'Semi-Furnished', 'Unfurnished'],
    },
    { key: 'floorNumber', label: 'Floor Number', type: 'text', required: false, section: 'propertyDetails' },
    { key: 'seatingCapacity', label: 'Seating Capacity', type: 'number', required: true, section: 'businessDetails', min: 0 },
    {
      key: 'inventoryIncluded',
      label: 'Stock / Inventory Included?',
      type: 'boolean',
      required: true,
      section: 'businessDetails',
    },
  ],
  hotel: [
    { key: 'builtUpArea', label: 'Built-up Area (sqft)', type: 'number', required: true, section: 'propertyDetails' },
    { key: 'roomsCount', label: 'Number of Rooms *', type: 'number', required: true, section: 'businessDetails', min: 1 },
    { key: 'bathrooms', label: 'Washrooms', type: 'number', required: true, section: 'propertyDetails', min: 1 },
    {
      key: 'hotelType',
      label: 'Hotel Type',
      type: 'select',
      required: true,
      section: 'businessDetails',
      options: ['Budget', 'Business', 'Boutique', 'Resort', 'Guest House'],
    },
    {
      key: 'occupancyPercent',
      label: 'Avg. Occupancy (%)',
      type: 'number',
      required: true,
      section: 'businessDetails',
      min: 0,
      max: 100,
    },
    {
      key: 'furnishingStatus',
      label: 'Furnishing',
      type: 'select',
      required: true,
      section: 'propertyDetails',
      options: ['Furnished', 'Semi-Furnished', 'Unfurnished'],
    },
    { key: 'totalFloors', label: 'Total Floors', type: 'text', required: false, section: 'propertyDetails' },
  ],
  pg: [
    { key: 'builtUpArea', label: 'Built-up Area (sqft)', type: 'number', required: true, section: 'propertyDetails' },
    { key: 'bedsCount', label: 'Total Beds', type: 'number', required: true, section: 'businessDetails', min: 1 },
    { key: 'roomsCount', label: 'Total Rooms', type: 'number', required: true, section: 'businessDetails', min: 1 },
    {
      key: 'genderType',
      label: 'PG Type',
      type: 'select',
      required: true,
      section: 'businessDetails',
      options: ['Boys', 'Girls', 'Co-ed'],
    },
    { key: 'rentPerBed', label: 'Rent per Bed (₹ / month)', type: 'number', required: true, section: 'businessDetails', min: 0 },
    {
      key: 'occupancyPercent',
      label: 'Current Occupancy (%)',
      type: 'number',
      required: true,
      section: 'businessDetails',
      min: 0,
      max: 100,
    },
    {
      key: 'furnishingStatus',
      label: 'Furnishing',
      type: 'select',
      required: true,
      section: 'propertyDetails',
      options: ['Furnished', 'Semi-Furnished', 'Unfurnished'],
    },
    { key: 'bathrooms', label: 'Washrooms', type: 'number', required: true, section: 'propertyDetails', min: 1 },
  ],
  office: [
    { key: 'builtUpArea', label: 'Built-up / Carpet Area (sqft)', type: 'number', required: true, section: 'propertyDetails' },
    { key: 'workstations', label: 'Workstations / Seats', type: 'number', required: true, section: 'businessDetails', min: 0 },
    { key: 'cabins', label: 'Cabins', type: 'number', required: true, section: 'businessDetails', min: 0 },
    { key: 'bathrooms', label: 'Washrooms', type: 'number', required: true, section: 'propertyDetails', min: 0 },
    { key: 'floorNumber', label: 'Floor Number', type: 'text', required: true, section: 'propertyDetails' },
    { key: 'totalFloors', label: 'Total Floors in Building', type: 'text', required: false, section: 'propertyDetails' },
    {
      key: 'furnishingStatus',
      label: 'Furnishing',
      type: 'select',
      required: true,
      section: 'propertyDetails',
      options: ['Furnished', 'Semi-Furnished', 'Unfurnished'],
    },
  ],
  industrial: [
    { key: 'plotArea', label: 'Plot Area (sqft)', type: 'number', required: true, section: 'businessDetails', min: 0 },
    { key: 'builtUpArea', label: 'Built-up / Shed Area (sqft)', type: 'number', required: true, section: 'propertyDetails' },
    { key: 'powerLoadKva', label: 'Power Load (kVA)', type: 'number', required: true, section: 'businessDetails', min: 0 },
    { key: 'ceilingHeight', label: 'Ceiling / Shed Height (ft)', type: 'number', required: false, section: 'businessDetails', min: 0 },
    {
      key: 'loadingDock',
      label: 'Loading Dock / Bay Available?',
      type: 'boolean',
      required: true,
      section: 'businessDetails',
    },
    {
      key: 'machineryIncluded',
      label: 'Machinery / Equipment Included?',
      type: 'boolean',
      required: true,
      section: 'businessDetails',
    },
    { key: 'bathrooms', label: 'Washrooms', type: 'number', required: false, section: 'propertyDetails', min: 0 },
  ],
};

/** Financial / business health — required for operating businesses */
export const FINANCIAL_FIELDS_BY_GROUP = {
  foodRetail: [
    { key: 'monthlySales', label: 'Monthly Sales (₹)', type: 'number', required: true },
    { key: 'monthlyProfit', label: 'Monthly Profit (₹)', type: 'number', required: true },
    { key: 'establishmentYear', label: 'Year Established', type: 'number', required: true, min: 1950, max: new Date().getFullYear() },
    { key: 'staffCount', label: 'Staff Count', type: 'number', required: true, min: 0 },
    { key: 'reasonForSale', label: 'Reason for Sale / Lease', type: 'text', required: true },
    {
      key: 'licensesIncluded',
      label: 'Licenses / Goodwill Included?',
      type: 'boolean',
      required: true,
      section: 'businessDetails',
    },
  ],
  hotel: [
    { key: 'monthlySales', label: 'Monthly Revenue (₹)', type: 'number', required: true },
    { key: 'monthlyProfit', label: 'Monthly Profit (₹)', type: 'number', required: true },
    { key: 'establishmentYear', label: 'Year Established', type: 'number', required: true, min: 1950, max: new Date().getFullYear() },
    { key: 'staffCount', label: 'Staff Count', type: 'number', required: true, min: 0 },
    { key: 'reasonForSale', label: 'Reason for Sale / Lease', type: 'text', required: true },
  ],
  pg: [
    { key: 'monthlySales', label: 'Monthly Collection (₹)', type: 'number', required: true },
    { key: 'monthlyProfit', label: 'Monthly Profit (₹)', type: 'number', required: true },
    { key: 'establishmentYear', label: 'Year Established', type: 'number', required: false, min: 1950, max: new Date().getFullYear() },
    { key: 'staffCount', label: 'Caretaker / Staff Count', type: 'number', required: false, min: 0 },
    { key: 'reasonForSale', label: 'Reason for Sale / Lease', type: 'text', required: true },
  ],
  office: [
    { key: 'monthlySales', label: 'Monthly Revenue (₹) — if running business', type: 'number', required: false },
    { key: 'monthlyProfit', label: 'Monthly Profit (₹)', type: 'number', required: false },
    { key: 'establishmentYear', label: 'Year Established', type: 'number', required: false, min: 1950, max: new Date().getFullYear() },
    { key: 'staffCount', label: 'Current Staff / Capacity', type: 'number', required: false, min: 0 },
    { key: 'reasonForSale', label: 'Reason for Sale / Lease', type: 'text', required: true },
  ],
  industrial: [
    { key: 'monthlySales', label: 'Monthly Sales / Revenue (₹)', type: 'number', required: false },
    { key: 'monthlyProfit', label: 'Monthly Profit (₹)', type: 'number', required: false },
    { key: 'establishmentYear', label: 'Year Established', type: 'number', required: false, min: 1950, max: new Date().getFullYear() },
    { key: 'staffCount', label: 'Staff Count', type: 'number', required: false, min: 0 },
    { key: 'reasonForSale', label: 'Reason for Sale / Lease', type: 'text', required: true },
  ],
};

export const AMENITIES_BY_GROUP = {
  foodRetail: [
    { key: 'parking', label: 'Parking' },
    { key: 'powerBackup', label: 'Power Backup' },
    { key: 'waterSupply', label: 'Water Supply' },
    { key: 'security', label: 'Security / CCTV' },
    { key: 'ac', label: 'AC' },
    { key: 'wifi', label: 'Wi‑Fi' },
    { key: 'kitchen', label: 'Kitchen' },
    { key: 'outdoorSeating', label: 'Outdoor Seating' },
    { key: 'liquorLicense', label: 'Liquor License' },
    { key: 'lift', label: 'Lift' },
  ],
  hotel: [
    { key: 'parking', label: 'Parking' },
    { key: 'powerBackup', label: 'Power Backup' },
    { key: 'waterSupply', label: 'Water Supply' },
    { key: 'security', label: 'Security / CCTV' },
    { key: 'ac', label: 'AC' },
    { key: 'wifi', label: 'Wi‑Fi' },
    { key: 'lift', label: 'Lift' },
    { key: 'gym', label: 'Gym' },
    { key: 'swimmingPool', label: 'Swimming Pool' },
    { key: 'kitchen', label: 'Restaurant / Kitchen' },
  ],
  pg: [
    { key: 'parking', label: 'Parking' },
    { key: 'powerBackup', label: 'Power Backup' },
    { key: 'waterSupply', label: 'Water Supply' },
    { key: 'security', label: 'Security / CCTV' },
    { key: 'wifi', label: 'Wi‑Fi' },
    { key: 'ac', label: 'AC' },
    { key: 'attachedBathroom', label: 'Attached Bathroom' },
    { key: 'messFacility', label: 'Mess / Food' },
    { key: 'lift', label: 'Lift' },
    { key: 'gym', label: 'Gym' },
  ],
  office: [
    { key: 'parking', label: 'Parking' },
    { key: 'lift', label: 'Lift' },
    { key: 'powerBackup', label: 'Power Backup' },
    { key: 'security', label: 'Security / CCTV' },
    { key: 'ac', label: 'Central / Split AC' },
    { key: 'wifi', label: 'Wi‑Fi Ready' },
    { key: 'waterSupply', label: 'Water Supply' },
  ],
  industrial: [
    { key: 'parking', label: 'Parking / Truck Parking' },
    { key: 'powerBackup', label: 'Power Backup' },
    { key: 'waterSupply', label: 'Water Supply' },
    { key: 'security', label: 'Security / CCTV' },
    { key: 'cctv', label: 'CCTV Surveillance' },
    { key: 'loadingBay', label: 'Loading Bay' },
    { key: 'access24x7', label: '24×7 Access' },
  ],
};

export const emptyAmenities = () => ({
  parking: false,
  lift: false,
  security: false,
  powerBackup: false,
  waterSupply: false,
  gym: false,
  swimmingPool: false,
  kitchen: false,
  outdoorSeating: false,
  liquorLicense: false,
  cctv: false,
  loadingBay: false,
  access24x7: false,
  ac: false,
  wifi: false,
  attachedBathroom: false,
  messFacility: false,
});

export const emptyFinancials = () => ({
  monthlySales: '',
  monthlyProfit: '',
  establishmentYear: '',
  staffCount: '',
  reasonForSale: '',
});

export const emptyBusinessDetails = () => ({
  seatingCapacity: '',
  inventoryIncluded: false,
  roomsCount: '',
  bedsCount: '',
  genderType: '',
  rentPerBed: '',
  occupancyPercent: '',
  hotelType: '',
  workstations: '',
  cabins: '',
  powerLoadKva: '',
  plotArea: '',
  ceilingHeight: '',
  loadingDock: false,
  machineryIncluded: false,
  licensesIncluded: false,
});

export const emptyPropertyDetails = () => ({
  builtUpArea: '',
  carpetArea: '',
  bedrooms: '0',
  bathrooms: '',
  floorNumber: '',
  totalFloors: '',
  furnishingStatus: 'Unfurnished',
  ageOfProperty: '',
  facingDirection: '',
});

export const groupSectionTitle = (group) => {
  const map = {
    foodRetail: 'Space & Operations',
    hotel: 'Hotel Details',
    pg: 'PG / Hostel Details',
    office: 'Office Space Details',
    industrial: 'Industrial / Warehouse Details',
  };
  return map[group] || 'Business Details';
};

export const toNumberOrUndefined = (value) => {
  if (value === '' || value === null || value === undefined) return undefined;
  const n = Number(value);
  return Number.isNaN(n) ? undefined : n;
};
