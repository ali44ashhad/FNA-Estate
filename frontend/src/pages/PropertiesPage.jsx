import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useSearchParams } from 'react-router-dom';
import { propertyService } from '../services/api';
import { PropertyCard } from '../components/PropertyCard';
import { Loading } from '../components/Loading';
import {
  BUSINESS_CATEGORIES,
  INVESTMENT_RANGES,
  PROFIT_RANGES,
  TRICITY_LOCATIONS,
  formatINR,
  getCategoryLabel,
} from '../utils/business';
import {
  Search,
  Filter,
  X,
  MapPin,
  Store,
  IndianRupee,
  Grid,
  List,
  ShieldCheck,
  Building2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Users,
  Handshake,
  TrendingUp,
} from 'lucide-react';

const PAGE_SIZE = 9;

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop';

const QUICK_FILTERS = [
  { key: 'Restaurant', label: 'Restaurants & Cafes', icon: Store },
  { key: 'Shop', label: 'Retail Shops', icon: Building2 },
  { key: 'Factory', label: 'Manufacturing', icon: TrendingUp },
  { key: 'Running Business', label: 'Running Business', icon: Handshake },
];

// Categories where room counts are meaningful; the rest are commercial spaces.
const ROOM_BASED_TYPES = ['Pg', 'Hotel'];

const EMPTY_FILTERS = {
  city: '',
  propertyType: '',
  listingType: '',
  minPrice: '',
  maxPrice: '',
  minProfit: '',
  bedrooms: '',
  bathrooms: '',
  furnished: '',
};

const inputClass =
  'w-full rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs text-slate-700 transition focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-100';

const FilterGroup = ({ icon: Icon, label, children }) => (
  <div>
    <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
      {Icon && <Icon className="h-3 w-3 text-slate-400" />}
      {label}
    </label>
    {children}
  </div>
);

const HeroStat = ({ icon: Icon, value, label }) => (
  <div className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white/80 px-4 py-3 shadow-sm backdrop-blur-sm">
    <span className="rounded-lg bg-brand-50 p-2 text-brand-700">
      <Icon className="h-4 w-4" />
    </span>
    <div>
      <div className="text-lg font-bold leading-none text-slate-900">{value}</div>
      <div className="mt-1 text-xs font-medium text-slate-500">{label}</div>
    </div>
  </div>
);

export const PropertiesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({ totalProperties: 0, totalCities: 0, totalValue: 0 });
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(true);
  const [currentPage, setCurrentPage] = useState(
    Math.max(1, Number(searchParams.get('page')) || 1)
  );
  const [filters, setFilters] = useState({
    city: searchParams.get('city') || '',
    propertyType: searchParams.get('propertyType') || '',
    listingType: searchParams.get('listingType') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    minProfit: searchParams.get('minProfit') || '',
    bedrooms: searchParams.get('bedrooms') || '',
    bathrooms: searchParams.get('bathrooms') || '',
    furnished: searchParams.get('furnished') || '',
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await propertyService.getPropertyStats();
        setStats(res.data.stats);
      } catch (err) {
        console.error('Failed to load stats:', err);
      }
    };
    fetchStats();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');

        const filterParams = {};
        Object.keys(EMPTY_FILTERS).forEach((key) => {
          const value = searchParams.get(key);
          if (value) filterParams[key] = value;
        });
        if (sortBy) filterParams.sort = sortBy;

        const res = await propertyService.getApprovedProperties(filterParams);
        setProperties(res.data.properties || []);
      } catch (err) {
        setError('Failed to load businesses. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchParams, sortBy]);

  // Keep page state in sync with the URL (back/forward, shared links).
  useEffect(() => {
    const pageFromUrl = Math.max(1, Number(searchParams.get('page')) || 1);
    setCurrentPage((prev) => (prev === pageFromUrl ? prev : pageFromUrl));
  }, [searchParams]);

  const updateURLParams = (newFilters, page = 1) => {
    const params = new URLSearchParams();
    Object.keys(newFilters).forEach((key) => {
      if (newFilters[key]) params.set(key, newFilters[key]);
    });
    if (sortBy && sortBy !== 'newest') params.set('sort', sortBy);
    if (page > 1) params.set('page', String(page));
    setCurrentPage(page);
    setSearchParams(params);
  };

  const applyFilters = (newFilters) => {
    setFilters(newFilters);
    updateURLParams(newFilters, 1);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    applyFilters({ ...filters, [name]: value });
  };

  const handleCategoryClick = (type) => {
    applyFilters({
      ...filters,
      propertyType: filters.propertyType === type ? '' : type,
    });
  };

  const handleInvestmentRange = (value) => {
    const [min = '', max = ''] = value ? value.split('-') : ['', ''];
    applyFilters({ ...filters, minPrice: min, maxPrice: max });
  };

  const handleApplyFilters = () => {
    updateURLParams(filters, 1);
    if (window.innerWidth < 1024) setShowFilters(false);
  };

  const handleReset = () => {
    setFilters(EMPTY_FILTERS);
    setSortBy('newest');
    setCurrentPage(1);
    setSearchParams({});
  };

  const goToPage = (page) => {
    const next = Math.max(1, page);
    setCurrentPage(next);
    const params = new URLSearchParams(searchParams);
    if (next > 1) params.set('page', String(next));
    else params.delete('page');
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeInvestmentRange =
    filters.minPrice || filters.maxPrice ? `${filters.minPrice}-${filters.maxPrice}` : '';

  const showRoomFilters = ROOM_BASED_TYPES.includes(filters.propertyType);

  const sortedProperties = [...properties].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return (a.pricing?.finalPrice || 0) - (b.pricing?.finalPrice || 0);
      case 'price-high':
        return (b.pricing?.finalPrice || 0) - (a.pricing?.finalPrice || 0);
      case 'size-high':
        return (b.propertyDetails?.builtUpArea || 0) - (a.propertyDetails?.builtUpArea || 0);
      case 'newest':
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  const totalPages = Math.max(1, Math.ceil(sortedProperties.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const pageStart = (safePage - 1) * PAGE_SIZE;
  const paginatedProperties = sortedProperties.slice(pageStart, pageStart + PAGE_SIZE);
  const showingFrom = sortedProperties.length === 0 ? 0 : pageStart + 1;
  const showingTo = Math.min(pageStart + PAGE_SIZE, sortedProperties.length);

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = new Set([1, totalPages, safePage, safePage - 1, safePage + 1]);
    return [...pages]
      .filter((page) => page >= 1 && page <= totalPages)
      .sort((a, b) => a - b);
  };
  const cityFilter = filters.city;
  const categoryFilter = filters.propertyType;
  const categoryLabel = categoryFilter ? getCategoryLabel(categoryFilter) : '';

  const seoTitle =
    cityFilter || categoryFilter
      ? `${categoryLabel || 'Businesses'} for Sale${cityFilter ? ' in ' + cityFilter : ''} | Udyam Mittar`
      : 'Running Businesses for Sale in Tricity | Udyam Mittar';

  const seoDescription =
    cityFilter || categoryFilter
      ? `Browse verified ${(categoryLabel || 'business').toLowerCase()} opportunities${cityFilter ? ' in ' + cityFilter : ''}. Real financials, confidential deals and expert guidance from Udyam Mittar.`
      : 'Browse verified running businesses for sale across Chandigarh, Mohali, Panchkula and Zirakpur. Restaurants, retail shops, manufacturing units, PGs and more on Udyam Mittar.';

  return (
    <div className="min-h-screen bg-slate-50">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta
          name="keywords"
          content={`${categoryLabel || 'business for sale'} ${cityFilter || 'Chandigarh Mohali Panchkula Zirakpur'}, buy business Tricity, running business for sale, Udyam Mittar`}
        />
        <link
          rel="canonical"
          href={`https://udyammittar.com/properties${searchParams.toString() ? '?' + searchParams.toString() : ''}`}
        />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:site_name" content="Udyam Mittar" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: seoTitle,
            description: seoDescription,
            numberOfItems: properties.length,
            itemListElement: properties.slice(0, 10).map((property, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'Product',
                name: property.title,
                url: `https://udyammittar.com/property/${property._id}`,
                category: getCategoryLabel(property.propertyType),
                offers: {
                  '@type': 'Offer',
                  price: property.pricing?.finalPrice,
                  priceCurrency: 'INR',
                },
              },
            })),
          })}
        </script>
      </Helmet>

      {/* Hero */}
      <div className="relative border-b border-slate-100">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={HERO_IMAGE}
            alt="Modern city skyline"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-14 lg:px-8 lg:py-20">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-xs font-semibold text-brand-800">
              <ShieldCheck className="h-4 w-4" />
              Every listing is manually verified
            </span>

            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Browse Running Businesses{' '}
              <span className="text-brand-800">in Tricity</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
              Explore verified businesses for sale across Chandigarh, Mohali, Panchkula and Zirakpur,
              with transparent pricing and confidential deal support.
            </p>
          </div>

          {/* Stats */}
          <div className="mt-8 grid max-w-4xl grid-cols-2 gap-3 md:grid-cols-4">
            <HeroStat
              icon={Store}
              value={`${stats.totalProperties || properties.length}+`}
              label="Active Listings"
            />
            <HeroStat icon={MapPin} value={`${stats.totalCities || 0}`} label="Cities Covered" />
            <HeroStat
              icon={IndianRupee}
              value={formatINR(stats.totalValue) || '—'}
              label="Listed Value"
            />
            <HeroStat icon={Users} value="950+" label="Verified Sellers" />
          </div>

          {/* Quick category pills */}
          <div className="mt-6 flex flex-wrap gap-3">
            {QUICK_FILTERS.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                type="button"
                onClick={() => handleCategoryClick(key)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold shadow-sm transition-all ${
                  filters.propertyType === key
                    ? 'bg-brand-gradient text-white'
                    : 'border border-slate-200 bg-white text-slate-800 hover:border-brand-600 hover:text-brand-700'
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
            <div className="sticky top-24 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-brand-50 p-1.5 text-brand-700">
                    <Filter className="h-3.5 w-3.5" />
                  </span>
                  <h2 className="text-[15px] font-semibold text-slate-900">Filters</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setShowFilters(false)}
                  className="rounded-md p-1.5 transition-colors hover:bg-slate-100 lg:hidden"
                >
                  <X className="h-4 w-4 text-slate-500" />
                </button>
              </div>

              <div className="space-y-4">
                <FilterGroup icon={MapPin} label="Location">
                  <select
                    name="city"
                    value={filters.city}
                    onChange={handleFilterChange}
                    className={inputClass}
                  >
                    <option value="">All Tricity</option>
                    {TRICITY_LOCATIONS.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </FilterGroup>

                <FilterGroup icon={Store} label="Business Category">
                  <div className="grid grid-cols-3 gap-1.5">
                    {BUSINESS_CATEGORIES.map(({ value, label, icon: Icon }) => {
                      const active = filters.propertyType === value;
                      return (
                        <button
                          key={value}
                          type="button"
                          onClick={() => handleCategoryClick(value)}
                          className={`flex flex-col items-center gap-1 rounded-lg border px-1 py-2 text-center transition-colors ${
                            active
                              ? 'border-brand-500 bg-brand-50'
                              : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          <span
                            className={`rounded-md p-1 ${
                              active ? 'bg-white text-brand-700' : 'bg-slate-50 text-slate-500'
                            }`}
                          >
                            <Icon className="h-3.5 w-3.5" />
                          </span>
                          <span className="text-[9px] font-medium leading-tight text-slate-600">
                            {label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </FilterGroup>

                <FilterGroup icon={IndianRupee} label="Investment Range">
                  <select
                    value={activeInvestmentRange}
                    onChange={(e) => handleInvestmentRange(e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Any Range</option>
                    {INVESTMENT_RANGES.map((range) => (
                      <option key={range.value} value={range.value}>
                        {range.label}
                      </option>
                    ))}
                  </select>

                  <div className="mt-2 grid grid-cols-2 gap-1.5">
                    <input
                      type="number"
                      name="minPrice"
                      value={filters.minPrice}
                      onChange={handleFilterChange}
                      onBlur={handleApplyFilters}
                      placeholder="Min ₹"
                      className={inputClass}
                    />
                    <input
                      type="number"
                      name="maxPrice"
                      value={filters.maxPrice}
                      onChange={handleFilterChange}
                      onBlur={handleApplyFilters}
                      placeholder="Max ₹"
                      className={inputClass}
                    />
                  </div>
                </FilterGroup>

                <FilterGroup icon={TrendingUp} label="Monthly Profit">
                  <select
                    name="minProfit"
                    value={filters.minProfit}
                    onChange={handleFilterChange}
                    className={inputClass}
                  >
                    <option value="">Any Range</option>
                    {PROFIT_RANGES.map((range) => (
                      <option key={range.value} value={range.value}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                </FilterGroup>

                <FilterGroup icon={Building2} label="Business Type">
                  <select
                    name="listingType"
                    value={filters.listingType}
                    onChange={handleFilterChange}
                    className={inputClass}
                  >
                    <option value="">All Types</option>
                    <option value="Sale">For Sale</option>
                    <option value="Rent">For Lease</option>
                  </select>
                </FilterGroup>

                <FilterGroup label="Furnishing">
                  <select
                    name="furnished"
                    value={filters.furnished}
                    onChange={handleFilterChange}
                    className={inputClass}
                  >
                    <option value="">Any</option>
                    <option value="fully">Fully Furnished</option>
                    <option value="semi">Semi Furnished</option>
                    <option value="unfurnished">Unfurnished</option>
                  </select>
                </FilterGroup>

                {showRoomFilters && (
                  <div className="grid grid-cols-2 gap-2">
                    <FilterGroup label="Rooms">
                      <select
                        name="bedrooms"
                        value={filters.bedrooms}
                        onChange={handleFilterChange}
                        className={inputClass}
                      >
                        <option value="">Any</option>
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>
                            {num}+
                          </option>
                        ))}
                      </select>
                    </FilterGroup>
                    <FilterGroup label="Washrooms">
                      <select
                        name="bathrooms"
                        value={filters.bathrooms}
                        onChange={handleFilterChange}
                        className={inputClass}
                      >
                        <option value="">Any</option>
                        {[1, 2, 3, 4].map((num) => (
                          <option key={num} value={num}>
                            {num}+
                          </option>
                        ))}
                      </select>
                    </FilterGroup>
                  </div>
                )}

                <div className="space-y-2 border-t border-slate-100 pt-4">
                  <button
                    type="button"
                    onClick={handleApplyFilters}
                    className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-brand-gradient py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-95"
                  >
                    <Search className="h-3.5 w-3.5" />
                    Search Businesses
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="w-full rounded-lg border border-slate-200 py-2.5 text-xs font-medium text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50"
                  >
                    Reset All Filters
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <div className="mb-5 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-sm lg:hidden"
                >
                  <Filter className="h-3.5 w-3.5" />
                  Filters
                </button>
                <p className="text-xs text-slate-500">
                  Showing{' '}
                  <span className="font-semibold text-slate-800">
                    {showingFrom}-{showingTo}
                  </span>{' '}
                  of{' '}
                  <span className="font-semibold text-slate-800">{sortedProperties.length}</span>{' '}
                  verified {sortedProperties.length === 1 ? 'business' : 'businesses'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex rounded-lg bg-slate-100 p-0.5">
                  <button
                    type="button"
                    aria-label="Grid view"
                    onClick={() => setViewMode('grid')}
                    className={`rounded-md p-1.5 transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-white/60'}`}
                  >
                    <Grid className="h-3.5 w-3.5 text-slate-600" />
                  </button>
                  <button
                    type="button"
                    aria-label="List view"
                    onClick={() => setViewMode('list')}
                    className={`rounded-md p-1.5 transition-all ${viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-white/60'}`}
                  >
                    <List className="h-3.5 w-3.5 text-slate-600" />
                  </button>
                </div>

                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value);
                      setCurrentPage(1);
                      const params = new URLSearchParams(searchParams);
                      if (e.target.value !== 'newest') {
                        params.set('sort', e.target.value);
                      } else {
                        params.delete('sort');
                      }
                      params.delete('page');
                      setSearchParams(params);
                    }}
                    className="min-w-[160px] cursor-pointer appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-8 text-xs font-medium text-slate-700 transition focus:border-brand-500 focus:outline-none"
                  >
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="size-high">Size: High to Low</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                </div>
              </div>
            </div>

            {loading ? (
              <Loading />
            ) : error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
                <span className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-red-500">
                  <X className="h-7 w-7 text-white" />
                </span>
                <p className="text-lg font-semibold text-red-800">{error}</p>
                <p className="mt-1 text-sm text-red-600">
                  Please refresh the page or contact support.
                </p>
              </div>
            ) : sortedProperties.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
                <span className="mx-auto mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-50">
                  <Search className="h-8 w-8 text-brand-700" />
                </span>
                <p className="text-xl font-bold text-slate-900">No Businesses Found</p>
                <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
                  Try adjusting your filters or explore other categories across Tricity.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-6 rounded-xl bg-brand-gradient px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-gradient"
                >
                  View All Businesses
                </button>
              </div>
            ) : (
              <>
                <div
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3'
                      : 'space-y-6'
                  }
                >
                  {paginatedProperties.map((property) => (
                    <PropertyCard key={property._id} property={property} viewMode={viewMode} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-4 sm:flex-row">
                    <p className="text-sm text-slate-600">
                      Page <span className="font-bold text-brand-700">{safePage}</span> of{' '}
                      <span className="font-bold text-slate-900">{totalPages}</span>
                    </p>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        disabled={safePage <= 1}
                        onClick={() => goToPage(safePage - 1)}
                        className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-300 hover:text-brand-700 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Prev
                      </button>

                      {getPageNumbers().map((page, index, arr) => {
                        const showEllipsis = index > 0 && page - arr[index - 1] > 1;
                        return (
                          <React.Fragment key={page}>
                            {showEllipsis && (
                              <span className="px-1 text-slate-400">…</span>
                            )}
                            <button
                              type="button"
                              onClick={() => goToPage(page)}
                              className={`min-w-10 rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
                                page === safePage
                                  ? 'bg-brand-gradient text-white'
                                  : 'border border-slate-200 text-slate-700 hover:border-brand-300 hover:text-brand-700'
                              }`}
                            >
                              {page}
                            </button>
                          </React.Fragment>
                        );
                      })}

                      <button
                        type="button"
                        disabled={safePage >= totalPages}
                        onClick={() => goToPage(safePage + 1)}
                        className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-300 hover:text-brand-700 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Next
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            {!loading && sortedProperties.length > 0 && (
              <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl bg-brand-gradient px-6 py-6 text-white md:flex-row">
                <div>
                  <h2 className="text-lg font-bold">Not finding the right business?</h2>
                  <p className="mt-1 text-sm text-brand-100">
                    Tell our experts what you're looking for and we'll match you with verified
                    sellers.
                  </p>
                </div>
                <Link
                  to="/services/consultation"
                  className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-brand-800 transition-transform hover:scale-[1.02]"
                >
                  <Handshake className="h-4 w-4" />
                  Get Guidance
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
