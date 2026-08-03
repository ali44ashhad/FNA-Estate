import {
  BedDouble,
  Briefcase,
  Coffee,
  Cog,
  Factory,
  Hotel,
  ShoppingBag,
  TrendingUp,
  Utensils,
  Warehouse,
} from 'lucide-react';
import { getCategoryGroup } from './listingForm';

export const FALLBACK_LISTING_IMAGE =
  'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop';

export const BUSINESS_CATEGORY_LABELS = {
  Restaurant: 'Restaurants & Cafes',
  Cafe: 'Restaurants & Cafes',
  Shop: 'Retail Shops',
  Office: 'Service Businesses',
  Hotel: 'Hospitality',
  Factory: 'Manufacturing',
  Warehouse: 'Warehousing',
  Industrial: 'Industrial Units',
  Pg: 'PG & Hostels',
  'Running Business': 'Running Business',
};

export const BUSINESS_CATEGORIES = [
  { value: 'Restaurant', label: 'Restaurants', icon: Utensils },
  { value: 'Cafe', label: 'Cafes', icon: Coffee },
  { value: 'Shop', label: 'Retail Shops', icon: ShoppingBag },
  { value: 'Office', label: 'Service Offices', icon: Briefcase },
  { value: 'Hotel', label: 'Hotels', icon: Hotel },
  { value: 'Factory', label: 'Manufacturing', icon: Factory },
  { value: 'Warehouse', label: 'Warehousing', icon: Warehouse },
  { value: 'Industrial', label: 'Industrial Units', icon: Cog },
  { value: 'Pg', label: 'PG & Hostels', icon: BedDouble },
  { value: 'Running Business', label: 'Running Business', icon: TrendingUp },
];

export const TRICITY_LOCATIONS = ['Chandigarh', 'Mohali', 'Panchkula', 'Zirakpur', 'Kharar'];

export const INVESTMENT_RANGES = [
  { label: 'Under ₹10 Lakhs', value: '0-1000000' },
  { label: '₹10 - 25 Lakhs', value: '1000000-2500000' },
  { label: '₹25 - 50 Lakhs', value: '2500000-5000000' },
  { label: '₹50 Lakhs - 1 Cr', value: '5000000-10000000' },
  { label: '₹1 Cr & above', value: '10000000-' },
];

export const PROFIT_RANGES = [
  { label: 'Under ₹50K', value: '50000' },
  { label: '₹50K - 1 Lakh', value: '100000' },
  { label: '₹1 - 2 Lakhs', value: '200000' },
  { label: '₹2 Lakhs & above', value: '200001' },
];

export const formatINR = (amount) => {
  if (typeof amount !== 'number' || Number.isNaN(amount)) return null;
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} Lakhs`;
  if (amount >= 1000) return `₹${Math.round(amount / 1000)}K`;
  return `₹${amount.toLocaleString('en-IN')}`;
};

export const getCategoryLabel = (propertyType) =>
  BUSINESS_CATEGORY_LABELS[propertyType] || propertyType || 'Business';

export const getListingLocation = (property) =>
  [property?.location?.locality, property?.location?.city].filter(Boolean).join(', ') || 'Tricity';

export const getListingImage = (property) =>
  property?.media?.primaryImage || FALLBACK_LISTING_IMAGE;

export const getListingPrice = (property) =>
  formatINR(property?.pricing?.finalPrice ?? property?.pricing?.basePrice) || 'Price on request';

const yesNo = (value) => {
  if (value == null) return null;
  return value ? 'Yes' : 'No';
};

const areaValue = (sqft) =>
  typeof sqft === 'number' && !Number.isNaN(sqft)
    ? `${sqft.toLocaleString('en-IN')} sq.ft`
    : null;

const pushStat = (list, label, value) => {
  if (value == null || value === '') return;
  list.push({ label, value: String(value) });
};

/**
 * Compact stats for listing cards (max 4), category-aware. No location.
 */
export const getListingStats = (property) => {
  const group = getCategoryGroup(property?.propertyType);
  const fin = property?.financials || {};
  const bd = property?.businessDetails || {};
  const pd = property?.propertyDetails || {};
  const stats = [];

  if (group === 'foodRetail') {
    pushStat(stats, 'Monthly Sales', formatINR(fin.monthlySales));
    pushStat(stats, 'Monthly Profit', formatINR(fin.monthlyProfit));
    pushStat(stats, 'Seating', bd.seatingCapacity != null ? String(bd.seatingCapacity) : null);
    pushStat(stats, 'Area', areaValue(pd.builtUpArea));
  } else if (group === 'hotel') {
    pushStat(stats, 'Monthly Revenue', formatINR(fin.monthlySales));
    pushStat(stats, 'Monthly Profit', formatINR(fin.monthlyProfit));
    pushStat(stats, 'Rooms', bd.roomsCount != null ? String(bd.roomsCount) : null);
    pushStat(
      stats,
      'Occupancy',
      bd.occupancyPercent != null ? `${bd.occupancyPercent}%` : null
    );
  } else if (group === 'pg') {
    pushStat(stats, 'Monthly Collection', formatINR(fin.monthlySales));
    pushStat(stats, 'Monthly Profit', formatINR(fin.monthlyProfit));
    pushStat(stats, 'Beds', bd.bedsCount != null ? String(bd.bedsCount) : null);
    pushStat(stats, 'Rent / Bed', formatINR(bd.rentPerBed));
  } else if (group === 'office') {
    pushStat(stats, 'Area', areaValue(pd.builtUpArea));
    pushStat(stats, 'Seats', bd.workstations != null ? String(bd.workstations) : null);
    pushStat(stats, 'Cabins', bd.cabins != null ? String(bd.cabins) : null);
    pushStat(stats, 'Furnishing', pd.furnishingStatus || null);
  } else if (group === 'industrial') {
    pushStat(stats, 'Plot Area', areaValue(bd.plotArea));
    pushStat(stats, 'Built-up', areaValue(pd.builtUpArea));
    pushStat(
      stats,
      'Power',
      bd.powerLoadKva != null ? `${bd.powerLoadKva} kVA` : null
    );
    pushStat(stats, 'Machinery', yesNo(bd.machineryIncluded));
  }

  // Fallbacks so older listings still show something useful
  if (stats.length === 0) {
    pushStat(stats, 'Monthly Sales', formatINR(fin.monthlySales));
    pushStat(stats, 'Monthly Profit', formatINR(fin.monthlyProfit));
    pushStat(stats, 'Area', areaValue(pd.builtUpArea));
    pushStat(
      stats,
      'Type',
      property?.listingType === 'Rent' ? 'For Lease' : 'For Sale'
    );
  }

  return stats.slice(0, 4);
};

/**
 * Full highlight rows for property detail (no location fields).
 */
export const getListingHighlights = (property) => {
  const fin = property?.financials || {};
  const bd = property?.businessDetails || {};
  const pd = property?.propertyDetails || {};
  const items = [];

  pushStat(items, 'Monthly Sales / Revenue', formatINR(fin.monthlySales));
  pushStat(items, 'Monthly Profit', formatINR(fin.monthlyProfit));
  pushStat(
    items,
    'Year Established',
    fin.establishmentYear != null ? String(fin.establishmentYear) : null
  );
  pushStat(items, 'Staff Count', fin.staffCount != null ? String(fin.staffCount) : null);
  pushStat(items, 'Reason for Sale', fin.reasonForSale || null);

  pushStat(items, 'Built-up Area', areaValue(pd.builtUpArea));
  pushStat(items, 'Carpet Area', areaValue(pd.carpetArea));
  pushStat(
    items,
    'Washrooms',
    pd.bathrooms != null && pd.bathrooms > 0 ? String(pd.bathrooms) : null
  );
  pushStat(items, 'Furnishing', pd.furnishingStatus || null);
  pushStat(items, 'Floor', pd.floorNumber || null);
  pushStat(items, 'Total Floors', pd.totalFloors || null);

  pushStat(
    items,
    'Seating Capacity',
    bd.seatingCapacity != null ? String(bd.seatingCapacity) : null
  );
  pushStat(items, 'Inventory Included', yesNo(bd.inventoryIncluded));
  pushStat(items, 'Licenses Included', yesNo(bd.licensesIncluded));

  pushStat(items, 'Hotel Type', bd.hotelType || null);
  pushStat(items, 'Rooms', bd.roomsCount != null ? String(bd.roomsCount) : null);
  pushStat(items, 'Beds', bd.bedsCount != null ? String(bd.bedsCount) : null);
  pushStat(items, 'PG Type', bd.genderType || null);
  pushStat(items, 'Rent per Bed', formatINR(bd.rentPerBed));
  pushStat(
    items,
    'Occupancy',
    bd.occupancyPercent != null ? `${bd.occupancyPercent}%` : null
  );

  pushStat(
    items,
    'Workstations / Seats',
    bd.workstations != null ? String(bd.workstations) : null
  );
  pushStat(items, 'Cabins', bd.cabins != null ? String(bd.cabins) : null);

  pushStat(items, 'Plot Area', areaValue(bd.plotArea));
  pushStat(
    items,
    'Power Load',
    bd.powerLoadKva != null ? `${bd.powerLoadKva} kVA` : null
  );
  pushStat(
    items,
    'Ceiling Height',
    bd.ceilingHeight != null ? `${bd.ceilingHeight} ft` : null
  );
  pushStat(items, 'Loading Dock', yesNo(bd.loadingDock));
  pushStat(items, 'Machinery Included', yesNo(bd.machineryIncluded));

  pushStat(
    items,
    'Listing Type',
    property?.listingType === 'Rent' ? 'For Lease' : 'For Sale'
  );
  pushStat(
    items,
    'Availability',
    property?.status === 'Sold'
      ? 'Sold'
      : property?.isActive === false
        ? 'Unavailable'
        : 'Available'
  );

  return items;
};

/** Badge priority: Sold > Hot > Premium > Verified */
export const getListingBadges = (property) => {
  if (property?.status === 'Sold') {
    return [{ label: 'Sold', tone: 'sold' }];
  }

  const badges = [];
  if (property?.isHot) badges.push({ label: 'Hot Opportunity', tone: 'amber' });
  if (property?.isPremium) badges.push({ label: 'Premium Listing', tone: 'brand' });
  if (property?.isVerified !== false) badges.push({ label: 'Verified Listing', tone: 'brand' });

  if (badges.length === 0) {
    badges.push({ label: 'Verified Listing', tone: 'brand' });
  }
  return badges;
};

/** Primary badge for cards (first by priority) */
export const getListingBadge = (property) => getListingBadges(property)[0]?.label || 'Verified Listing';

export const getListingBadgeTone = (property) =>
  getListingBadges(property)[0]?.tone || 'brand';
