import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { propertyService } from '../services/api';
import { Loading } from '../components/Loading';
import { SaveButton } from '../components/SaveButton';
import {
  BUSINESS_CATEGORIES,
  FALLBACK_LISTING_IMAGE,
  INVESTMENT_RANGES,
  PROFIT_RANGES,
  TRICITY_LOCATIONS,
  getCategoryLabel,
  getListingBadge,
  getListingBadgeTone,
  getListingImage,
  getListingPrice,
  getListingStats,
} from '../utils/business';
import {
  Search,
  MapPin,
  ShieldCheck,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Check,
  Store,
  ShoppingBag,
  Stethoscope,
  Factory,
  Briefcase,
  Users,
  Lock,
  Headphones,
  ClipboardList,
  Handshake,
  Building2,
  BadgeCheck,
  TrendingUp,
  IndianRupee,
  Tag,
  LayoutGrid,
} from 'lucide-react';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop';

const BUSINESS_TYPES = [
  { label: 'For Sale', value: 'Sale' },
  { label: 'For Lease', value: 'Rent' },
];

const POPULAR_CATEGORIES = [
  { label: 'Restaurants & Cafes', icon: Store, type: 'Restaurant' },
  { label: 'Retail Shops', icon: ShoppingBag, type: 'Shop' },
  { label: 'Clinics & Pharmacy', icon: Stethoscope, type: 'Running Business' },
  { label: 'Manufacturing', icon: Factory, type: 'Factory' },
  { label: 'Franchise Opportunities', icon: Tag, type: 'Running Business' },
  { label: 'Service Businesses', icon: Briefcase, type: 'Office' },
];

const TRUST_POINTS = [
  { icon: ShieldCheck, title: 'Verified Listings', text: 'Every listing is manually verified' },
  { icon: Users, title: 'Local Network', text: 'Deep roots in Tricity business community' },
  { icon: Lock, title: 'Confidential Deals', text: 'Your privacy is our top priority' },
  { icon: Headphones, title: 'Expert Guidance', text: 'Get help from industry experts' },
];

const STEPS = [
  {
    icon: ClipboardList,
    title: 'List Your Business',
    text: "Share key details about your business. We'll verify & list it.",
  },
  {
    icon: Search,
    title: 'Find the Right Match',
    text: 'Buyers explore verified businesses that fit their goals.',
  },
  {
    icon: Handshake,
    title: 'Connect & Close',
    text: 'Connect securely, negotiate & complete the deal.',
  },
];

const STATS = [
  { icon: Store, value: '450+', label: 'Active Listings' },
  { icon: BadgeCheck, value: '950+', label: 'Verified Sellers' },
  { icon: MapPin, value: '3', label: 'Cities Covered', sub: 'Chandigarh, Mohali, Panchkula' },
  { icon: Handshake, value: '120+', label: 'Successful Deals' },
];

const SELLER_BENEFITS = [
  { icon: Users, label: 'Reach Local Buyers' },
  { icon: TrendingUp, label: 'Get Better Value' },
  { icon: ShieldCheck, label: 'Safe & Secure Process' },
];

const SAMPLE_BUSINESSES = [
  {
    id: 'sample-cafe',
    badge: 'Premium Listing',
    badgeTone: 'brand',
    category: 'Restaurants & Cafes',
    title: 'Cafe in Sector 17',
    price: '₹35.00 Lakhs',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop',
    stats: [
      { label: 'Monthly Sales', value: '₹6.5 Lakhs' },
      { label: 'Monthly Profit', value: '₹1.25 Lakhs' },
      { label: 'Seating', value: '42' },
      { label: 'Area', value: '1,200 sq.ft' },
    ],
  },
  {
    id: 'sample-boutique',
    badge: 'Verified Listing',
    badgeTone: 'brand',
    category: 'Retail Shops',
    title: 'Boutique Store in Mohali',
    price: '₹22.00 Lakhs',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop',
    stats: [
      { label: 'Monthly Sales', value: '₹3.2 Lakhs' },
      { label: 'Monthly Profit', value: '₹65K' },
      { label: 'Seating', value: '—' },
      { label: 'Area', value: '850 sq.ft' },
    ],
  },
  {
    id: 'sample-pharmacy',
    badge: 'Hot Opportunity',
    badgeTone: 'amber',
    category: 'Clinics & Pharmacy',
    title: 'Pharmacy in Panchkula',
    price: '₹28.00 Lakhs',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=1200&auto=format&fit=crop',
    stats: [
      { label: 'Monthly Sales', value: '₹5.1 Lakhs' },
      { label: 'Monthly Profit', value: '₹90K' },
      { label: 'Seating', value: '—' },
      { label: 'Area', value: '600 sq.ft' },
    ],
  },
  {
    id: 'sample-salon',
    badge: 'High Profit',
    badgeTone: 'brand',
    category: 'Service Businesses',
    title: 'Profitable Salon in Zirakpur',
    price: '₹18.50 Lakhs',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200&auto=format&fit=crop',
    stats: [
      { label: 'Monthly Sales', value: '₹2.8 Lakhs' },
      { label: 'Monthly Profit', value: '₹70K' },
      { label: 'Seating', value: '8' },
      { label: 'Area', value: '450 sq.ft' },
    ],
  },
];

const toBusinessCard = (property) => ({
  id: property._id,
  propertyId: property._id,
  ownerId: property.createdBy?._id || property.createdBy,
  to: `/property/${property._id}`,
  badge: getListingBadge(property),
  badgeTone: getListingBadgeTone(property),
  category: getCategoryLabel(property.propertyType),
  title: property.title,
  price: getListingPrice(property),
  image: getListingImage(property),
  stats: getListingStats(property),
  listingType: property.listingType,
});

const FilterSelect = ({
  icon: Icon,
  label,
  name,
  value,
  options,
  placeholder,
  open,
  onToggle,
  onChange,
}) => {
  const rootRef = useRef(null);
  const selected = options.find((opt) => opt.value === value);
  const display = selected?.label || placeholder;

  useEffect(() => {
    if (!open) return undefined;
    const handleOutside = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) onToggle(false);
    };
    const handleKey = (e) => {
      if (e.key === 'Escape') onToggle(false);
    };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open, onToggle]);

  return (
    <div ref={rootRef} className="relative min-w-max flex-1">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => onToggle(!open)}
        className="flex w-full items-center gap-2.5 px-3 py-3 text-left transition-colors hover:bg-slate-50/80 lg:px-3.5"
      >
        <span className="shrink-0 rounded-lg bg-slate-50 p-2 text-slate-500">
          <Icon className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            {label}
          </div>
          <div className="mt-0.5 flex items-center gap-1.5">
            <span className="whitespace-nowrap text-sm font-medium text-slate-800">{display}</span>
            <ChevronDown
              className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${
                open ? 'rotate-180' : ''
              }`}
            />
          </div>
        </div>
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute left-0 top-[calc(100%+6px)] z-50 min-w-full overflow-hidden rounded-xl border border-slate-200 bg-white py-1.5 shadow-xl shadow-slate-900/10"
        >
          <div className="max-h-60 overflow-y-auto overscroll-contain">
            {options.map((opt) => {
              const active = value === opt.value;
              return (
                <button
                  key={opt.value || '__empty'}
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    onChange({ target: { name, value: opt.value } });
                    onToggle(false);
                  }}
                  className={`flex w-full items-center justify-between gap-3 whitespace-nowrap px-4 py-2.5 text-left text-sm transition-colors ${
                    active
                      ? 'bg-brand-50 font-semibold text-brand-800'
                      : 'font-medium text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{opt.label}</span>
                  {active && <Check className="h-4 w-4 shrink-0 text-brand-700" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const BusinessCard = ({ business }) => {
  const detailLink = business.to || '/properties';
  const badgeClass =
    business.badgeTone === 'amber'
      ? 'bg-amber-500 text-white'
      : business.badgeTone === 'sold'
        ? 'bg-slate-800 text-white'
        : 'bg-brand-gradient text-white';

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow duration-300 hover:shadow-md">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={business.image}
          alt={business.title}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = FALLBACK_LISTING_IMAGE;
          }}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span
          className={`absolute left-3 top-3 inline-flex items-center rounded-md px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${badgeClass}`}
        >
          {business.badge}
        </span>
        {business.propertyId && (
          <span className="absolute right-3 top-3">
            <SaveButton propertyId={business.propertyId} ownerId={business.ownerId} />
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-4 py-3.5">
        <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
          {business.category}
        </p>

        <h3 className="mt-1.5 truncate text-base font-semibold leading-snug text-slate-900">
          {business.title}
        </h3>

        <p className="mt-1 text-base font-semibold tabular-nums text-slate-900">
          {business.price}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-slate-100 pt-3 text-xs text-slate-500">
          {business.stats.map((stat, index) => (
            <React.Fragment key={stat.label}>
              {index > 0 && <span className="text-slate-300">·</span>}
              <span>
                <span className="text-slate-400">{stat.label}: </span>
                <span className="font-medium text-slate-700">{stat.value}</span>
              </span>
            </React.Fragment>
          ))}
        </div>

        <div className="mt-auto grid grid-cols-2 gap-2.5 pt-4">
          <Link
            to={detailLink}
            className="rounded-lg border border-slate-200 py-2.5 text-center text-sm font-medium text-slate-600 transition-colors hover:border-brand-500 hover:text-brand-700"
          >
            View Details
          </Link>
          <Link
            to={detailLink}
            className="flex items-center justify-center gap-1.5 rounded-lg bg-brand-gradient py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-95"
          >
            <Handshake className="h-4 w-4" />
            Connect
          </Link>
        </div>
      </div>
    </article>
  );
};

export const HomePage = () => {
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFilter, setOpenFilter] = useState(null);
  const [filters, setFilters] = useState({
    city: '',
    propertyType: '',
    investment: '',
    profit: '',
    listingType: '',
  });

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await propertyService.getApprovedProperties({});
        const list = res?.data?.properties || [];
        setBusinesses(list.slice(0, 4).map(toBusinessCard));
      } catch {
        setBusinesses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const toggleFilter = (name) => (nextOpen) => {
    setOpenFilter(nextOpen ? name : null);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setOpenFilter(null);
    const params = new URLSearchParams();

    if (filters.city) params.set('city', filters.city);
    if (filters.propertyType) params.set('propertyType', filters.propertyType);
    if (filters.listingType) params.set('listingType', filters.listingType);
    if (filters.profit) params.set('minProfit', filters.profit);

    if (filters.investment) {
      const [min, max] = filters.investment.split('-');
      if (min) params.set('minPrice', min);
      if (max) params.set('maxPrice', max);
    }

    navigate(`/properties?${params.toString()}`);
  };

  const featured = businesses.length > 0 ? businesses : SAMPLE_BUSINESSES;

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Udyam Mittar - Buy &amp; Sell Running Businesses in Tricity</title>
        <meta
          name="description"
          content="Udyam Mittar connects local buyers and sellers to discover, list and grow established businesses in Chandigarh, Mohali & Panchkula. Verified listings, confidential deals and expert guidance."
        />
        <meta
          name="keywords"
          content="buy business Chandigarh, sell business Mohali, running business for sale Panchkula, Tricity business exchange, franchise opportunities Chandigarh, business broker Tricity"
        />
        <link rel="canonical" href="https://udyammittar.com/" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://udyammittar.com/" />
        <meta property="og:title" content="Udyam Mittar - Buy & Sell Running Businesses in Tricity" />
        <meta
          property="og:description"
          content="Discover, list and grow established businesses in Chandigarh, Mohali & Panchkula."
        />
        <meta property="og:site_name" content="Udyam Mittar" />
        <meta property="og:locale" content="en_IN" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Udyam Mittar - Tricity's Business Exchange Platform" />
        <meta
          name="twitter:description"
          content="Buy and sell running businesses in Chandigarh, Mohali & Panchkula."
        />

        <meta name="robots" content="index, follow" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Udyam Mittar',
            slogan: 'Buy. Sell. Grow. Locally.',
            description:
              'Tricity business exchange platform for buying and selling running businesses.',
            url: 'https://udyammittar.com',
            areaServed: ['Chandigarh', 'Mohali', 'Panchkula', 'Zirakpur'],
          })}
        </script>
      </Helmet>

      {/* Hero */}
      <section className="relative z-10 overflow-visible">
        <div className="relative">
          <div className="absolute inset-0 overflow-hidden">
            <img src={HERO_IMAGE} alt="Tricity skyline" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-14 lg:px-8 lg:pb-28 lg:pt-20">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-xs font-semibold text-brand-800">
                <ShieldCheck className="h-4 w-4" />
                Tricity's Trusted Business Exchange Platform
              </span>

              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Buy &amp; Sell
                <span className="mt-1 block text-brand-700">Running Businesses in Tricity</span>
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600">
                Udyam Mittar connects local buyers and sellers to discover, list and grow
                established businesses in Chandigarh, Mohali &amp; Panchkula.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/properties"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gradient px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-amber-500/25 transition-opacity hover:opacity-95"
                >
                  Explore Businesses
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/sell-business"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-500 hover:text-brand-700"
                >
                  <Store className="h-4 w-4 text-brand-700" />
                  Sell Your Business
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className="relative z-20 mx-auto -mt-12 max-w-7xl px-4 lg:-mt-14 lg:px-8">
          <form
            onSubmit={handleSearch}
            className="overflow-visible rounded-2xl border border-slate-200 bg-white p-3 shadow-xl lg:flex lg:items-stretch lg:gap-2"
          >
            <div className="grid flex-1 grid-cols-1 divide-y divide-slate-100 sm:grid-cols-2 sm:divide-y-0 lg:flex lg:divide-x">
              <FilterSelect
                icon={MapPin}
                label="Location"
                name="city"
                value={filters.city}
                placeholder="All Tricity"
                options={[
                  { value: '', label: 'All Tricity' },
                  ...TRICITY_LOCATIONS.map((city) => ({ value: city, label: city })),
                ]}
                open={openFilter === 'city'}
                onToggle={toggleFilter('city')}
                onChange={handleChange}
              />

              <FilterSelect
                icon={LayoutGrid}
                label="Business Category"
                name="propertyType"
                value={filters.propertyType}
                placeholder="All Categories"
                options={[
                  { value: '', label: 'All Categories' },
                  ...BUSINESS_CATEGORIES.map((cat) => ({
                    value: cat.value,
                    label: cat.label,
                  })),
                ]}
                open={openFilter === 'propertyType'}
                onToggle={toggleFilter('propertyType')}
                onChange={handleChange}
              />

              <FilterSelect
                icon={IndianRupee}
                label="Investment Range"
                name="investment"
                value={filters.investment}
                placeholder="Any Range"
                options={[
                  { value: '', label: 'Any Range' },
                  ...INVESTMENT_RANGES.map((range) => ({
                    value: range.value,
                    label: range.label,
                  })),
                ]}
                open={openFilter === 'investment'}
                onToggle={toggleFilter('investment')}
                onChange={handleChange}
              />

              <FilterSelect
                icon={TrendingUp}
                label="Monthly Profit"
                name="profit"
                value={filters.profit}
                placeholder="Any Range"
                options={[
                  { value: '', label: 'Any Range' },
                  ...PROFIT_RANGES.map((range) => ({
                    value: range.value,
                    label: range.label,
                  })),
                ]}
                open={openFilter === 'profit'}
                onToggle={toggleFilter('profit')}
                onChange={handleChange}
              />

              <FilterSelect
                icon={Building2}
                label="Business Type"
                name="listingType"
                value={filters.listingType}
                placeholder="All Types"
                options={[
                  { value: '', label: 'All Types' },
                  ...BUSINESS_TYPES.map((type) => ({
                    value: type.value,
                    label: type.label,
                  })),
                ]}
                open={openFilter === 'listingType'}
                onToggle={toggleFilter('listingType')}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="mt-3 flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-brand-gradient px-6 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-95 lg:mt-0 lg:w-auto"
            >
              <Search className="h-4 w-4" />
              Search Businesses
            </button>
          </form>
        </div>
      </section>

      {/* Featured businesses */}
      <section className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold text-slate-900 lg:text-3xl">
            Featured Business Opportunities
          </h2>
          <Link
            to="/properties"
            className="group inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-800"
          >
            View All Businesses
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        )}
      </section>

      {/* Popular categories + trust points */}
      <section className="mx-auto max-w-7xl px-4 pb-14 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-bold text-slate-900">Popular Categories</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {POPULAR_CATEGORIES.map(({ label, icon: Icon, type }) => (
                <Link
                  key={label}
                  to={`/properties?propertyType=${encodeURIComponent(type)}`}
                  className="group flex flex-col items-center gap-2 rounded-xl border border-slate-200 px-3 py-4 text-center transition-colors hover:border-slate-300 hover:bg-slate-50"
                >
                  <span className="rounded-lg bg-slate-50 p-2 text-slate-500 transition-colors group-hover:bg-white group-hover:text-brand-700">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-xs font-semibold leading-snug text-slate-700">{label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid h-full grid-cols-1 gap-4 sm:grid-cols-2">
              {TRUST_POINTS.map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex items-start gap-3">
                  <span className="shrink-0 rounded-lg bg-slate-50 p-2.5 text-slate-500">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
                    <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="mx-auto max-w-7xl px-4 pb-14 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div className="grid gap-6 lg:grid-cols-[200px_minmax(0,1fr)] lg:items-center">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">How It Works</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  Simple steps to buy or sell your running business in Tricity.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-3">
                {STEPS.map(({ icon: Icon, title, text }, index) => (
                  <div key={title} className="relative flex gap-3">
                    <div className="flex shrink-0 flex-col items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-gradient text-xs font-bold text-white">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-slate-500">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-center rounded-xl bg-slate-50 p-5">
              <h3 className="text-base font-semibold text-slate-900">New to Business Buying?</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                Let our experts help you find the perfect opportunity.
              </p>
              <Link
                to="/services/consultation"
                className="group mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
              >
                Get Guidance
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="success-stories" className="mx-auto max-w-7xl px-4 pb-8 lg:px-8">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-amber-400/40 text-white lg:grid-cols-4">
          {STATS.map(({ icon: Icon, value, label, sub }) => (
            <div
              key={label}
              className="flex items-center gap-3 bg-brand-gradient px-5 py-5 sm:px-6 sm:py-6"
            >
              <span className="rounded-lg bg-white/10 p-2.5">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <div className="text-2xl font-bold leading-none tabular-nums">{value}</div>
                <div className="mt-1 text-sm font-medium text-amber-100">{label}</div>
                {sub && <div className="text-[11px] text-amber-200">{sub}</div>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Seller CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-16 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-brand-gradient px-6 py-8 text-white lg:px-10">
          <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-amber-400/30 to-transparent" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-5">
              <span className="hidden shrink-0 rounded-xl bg-white/10 p-4 sm:block">
                <Handshake className="h-8 w-8" />
              </span>
              <div>
                <h2 className="text-2xl font-bold lg:text-3xl">
                  Are You Looking to Sell Your Business?
                </h2>
                <p className="mt-2 max-w-xl text-sm text-brand-100">
                  List your business with Udyam Mittar and connect with serious, verified buyers in
                  Tricity.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start gap-5 lg:flex-row lg:items-center">
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {SELLER_BENEFITS.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-2 text-xs font-medium text-brand-50">
                    <Icon className="h-4 w-4 text-brand-200" />
                    {label}
                  </li>
                ))}
              </ul>

              <Link
                to="/sell-business"
                className="group inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-brand-800 shadow-lg transition-opacity hover:opacity-95"
              >
                Sell Your Business
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
