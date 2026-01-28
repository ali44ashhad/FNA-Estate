import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { propertyService } from '../services/api';
import { PropertyCard } from '../components/PropertyCard';
import { Loading } from '../components/Loading';
import { 
  Search, 
  Filter, 
  X, 
  MapPin, 
  Home, 
  DollarSign,
  Grid,
  List,
  Building2,
  Sparkles,
  ChevronDown,
} from 'lucide-react';

export const PropertiesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({ totalProperties: 0, totalCities: 0, totalValue: 0 });
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(true);
  const [filters, setFilters] = useState({
    city: searchParams.get('city') || '',
    propertyType: searchParams.get('propertyType') || '',
    listingType: searchParams.get('listingType') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    bedrooms: searchParams.get('bedrooms') || '',
    bathrooms: searchParams.get('bathrooms') || '',
    furnished: searchParams.get('furnished') || '',
  });

  const propertyTypes = [
    { value: 'Factory', label: 'Factory', icon: '🏭' },          
    { value: 'Warehouse', label: 'Warehouse', icon: '📦' },     
    { value: 'Office', label: 'Office', icon: '🏢' },           
    { value: 'Shop', label: 'Shop', icon: '🛍️' },               
    { value: 'Hotel', label: 'Hotel', icon: '🏨' },             
    { value: 'Industrial', label: 'Industrial', icon: '⚙️' },     
    { value: 'Cafe', label: 'Cafe', icon: '☕' },                
    { value: 'Restaurant', label: 'Restaurant', icon: '🍽️' },   
    { value: 'Pg', label: 'PG', icon: '🛏️' },                   
    { value: 'Running Business', label: 'Running Business', icon: '📈' }  
  ];

  // Fetch stats on mount
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

  // Fetch properties when filters or sort change
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');
        
        // Build filter object from URL params
        const filterParams = {};
        if (searchParams.get('city')) filterParams.city = searchParams.get('city');
        if (searchParams.get('propertyType')) filterParams.propertyType = searchParams.get('propertyType');
        if (searchParams.get('listingType')) filterParams.listingType = searchParams.get('listingType');
        if (searchParams.get('minPrice')) filterParams.minPrice = searchParams.get('minPrice');
        if (searchParams.get('maxPrice')) filterParams.maxPrice = searchParams.get('maxPrice');
        if (searchParams.get('bedrooms')) filterParams.bedrooms = searchParams.get('bedrooms');
        if (searchParams.get('bathrooms')) filterParams.bathrooms = searchParams.get('bathrooms');
        if (searchParams.get('furnished')) filterParams.furnished = searchParams.get('furnished');
        if (sortBy) filterParams.sort = sortBy;

        const res = await propertyService.getApprovedProperties(filterParams);
        setProperties(res.data.properties || []);
        setLoading(false);
      } catch (err) {
        setError('Failed to load properties. Please try again.');
        setLoading(false);
      }
    };
    fetchData();
  }, [searchParams, sortBy]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Build filter object from URL params
      const filterParams = {};
      if (searchParams.get('city')) filterParams.city = searchParams.get('city');
      if (searchParams.get('propertyType')) filterParams.propertyType = searchParams.get('propertyType');
      if (searchParams.get('listingType')) filterParams.listingType = searchParams.get('listingType');
      if (searchParams.get('minPrice')) filterParams.minPrice = searchParams.get('minPrice');
      if (searchParams.get('maxPrice')) filterParams.maxPrice = searchParams.get('maxPrice');
      if (searchParams.get('bedrooms')) filterParams.bedrooms = searchParams.get('bedrooms');
      if (searchParams.get('bathrooms')) filterParams.bathrooms = searchParams.get('bathrooms');
      if (searchParams.get('furnished')) filterParams.furnished = searchParams.get('furnished');
      if (sortBy) filterParams.sort = sortBy;

      const res = await propertyService.getApprovedProperties(filterParams);
      setProperties(res.data.properties || []);
      setLoading(false);
    } catch (err) {
      setError('Failed to load properties. Please try again.');
      setLoading(false);
    }
  };

  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();
    Object.keys(newFilters).forEach(key => {
      if (newFilters[key]) {
        params.set(key, newFilters[key]);
      }
    });
    if (sortBy && sortBy !== 'newest') {
      params.set('sort', sortBy);
    }
    setSearchParams(params);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  const handlePropertyTypeClick = (type) => {
    const newFilters = { ...filters, propertyType: filters.propertyType === type ? '' : type };
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  const handleApplyFilters = () => {
    updateURLParams(filters);
    if (window.innerWidth < 1024) {
      setShowFilters(false);
    }
  };

  const handleReset = () => {
    const emptyFilters = { 
      city: '', 
      propertyType: '', 
      listingType: '',
      minPrice: '', 
      maxPrice: '',
      bedrooms: '',
      bathrooms: '',
      furnished: '',
    };
    setFilters(emptyFilters);
    setSortBy('newest');
    setSearchParams({});
  };

  const handleQuickFilter = (type) => {
    const quickFilters = {
      commercial: { propertyType: 'Office', listingType: '' },
      industrial: { propertyType: 'Industrial', listingType: '' },
      retail: { propertyType: 'Shop', listingType: '' },
      hospitality: { propertyType: 'Hotel', listingType: '' },
    };
    
    if (quickFilters[type]) {
      const newFilters = { ...filters, ...quickFilters[type] };
      setFilters(newFilters);
      updateURLParams(newFilters);
    }
  };

  const formatCurrency = (amount) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)}Cr+`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L+`;
    }
    return `₹${(amount / 1000).toFixed(0)}K+`;
  };

  const sortedProperties = [...properties].sort((a, b) => {
    switch(sortBy) {
      case 'price-low':
        return a.pricing.finalPrice - b.pricing.finalPrice;
      case 'price-high':
        return b.pricing.finalPrice - a.pricing.finalPrice;
      case 'size-high':
        return (b.propertyDetails?.builtUpArea || 0) - (a.propertyDetails?.builtUpArea || 0);
      case 'newest':
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  // Generate dynamic SEO content based on filters
  const cityFilter = filters.city || searchParams.get('city') || '';
  const propertyTypeFilter = filters.propertyType || searchParams.get('propertyType') || '';
  const listingTypeFilter = filters.listingType || searchParams.get('listingType') || '';
  
  const seoTitle = cityFilter || propertyTypeFilter || listingTypeFilter
    ? `${propertyTypeFilter ? propertyTypeFilter + ' ' : ''}${listingTypeFilter ? listingTypeFilter + ' ' : ''}Properties${cityFilter ? ' in ' + cityFilter : ''} | FNAEstate`
    : 'Premium Properties for Sale & Rent | FNAEstate - Verified Listings';
  
  const seoDescription = cityFilter || propertyTypeFilter || listingTypeFilter
    ? `Find ${propertyTypeFilter ? propertyTypeFilter.toLowerCase() + ' ' : ''}${listingTypeFilter ? listingTypeFilter.toLowerCase() + ' ' : ''}properties${cityFilter ? ' in ' + cityFilter : ''}. Browse verified listings with detailed information, photos, and pricing.`
    : 'Browse premium properties for sale and rent across India. Factory, Warehouse, Office, Shop, Hotel, Industrial, Cafe, Restaurant, PG, and Running Business listings in Tricity (Chandigarh, Mohali, Kharar, Zirakpur).';

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={`${propertyTypeFilter || 'properties'} ${cityFilter || 'Chandigarh Mohali Kharar Zirakpur'} ${listingTypeFilter || 'sale rent'} real estate, verified listings, premium properties, Tricity properties`} />
        <link rel="canonical" href={`https://fnaestate.com/properties${searchParams.toString() ? '?' + searchParams.toString() : ''}`} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://fnaestate.com/properties${searchParams.toString() ? '?' + searchParams.toString() : ''}`} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:image" content="https://fnaestate.com/properties-og.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": seoTitle,
            "description": seoDescription,
            "numberOfItems": properties.length,
            "itemListElement": properties.slice(0, 10).map((property, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "RealEstateListing",
                "name": property.title,
                "url": `https://fnaestate.com/property/${property._id}`,
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": property.location?.city,
                  "addressRegion": "Punjab",
                  "addressCountry": "IN"
                },
                "price": property.pricing?.price,
                "priceCurrency": "INR"
              }
            }))
          })}
        </script>
      </Helmet>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Discover Your <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-300">
              Dream Property
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mb-10">
            Browse our curated collection of premium properties, each selected for quality, location, and value.
          </p>
          
          {/* Dynamic Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold text-amber-400">{stats.totalProperties || properties.length}+</div>
              <div className="text-sm text-slate-300">Premium Properties</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold text-amber-400">{stats.totalCities || 0}+</div>
              <div className="text-sm text-slate-300">Cities</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold text-amber-400">{formatCurrency(stats.totalValue || 0)}</div>
              <div className="text-sm text-slate-300">Transaction Value</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold text-amber-400">24/7</div>
              <div className="text-sm text-slate-300">Concierge Support</div>
            </div>
          </div>

          {/* Quick Filter Pills */}
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => handleQuickFilter('commercial')}
              className={`px-5 py-2.5 rounded-xl font-semibold transition-all hover:scale-105 flex items-center gap-2 ${
                filters.propertyType === 'Office' 
                  ? 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800' 
                  : 'bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20'
              }`}
            >
              <Building2 className="w-4 h-4" />
              Commercial Spaces
            </button>
            <button 
              onClick={() => handleQuickFilter('industrial')}
              className={`px-5 py-2.5 rounded-xl font-semibold transition-all hover:scale-105 ${
                filters.propertyType === 'Industrial' 
                  ? 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800' 
                  : 'bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20'
              }`}
            >
              Industrial Units
            </button>
            <button 
              onClick={() => handleQuickFilter('retail')}
              className={`px-5 py-2.5 rounded-xl font-semibold transition-all hover:scale-105 ${
                filters.propertyType === 'Shop' 
                  ? 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800' 
                  : 'bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20'
              }`}
            >
              Retail Shops
            </button>
            <button 
              onClick={() => handleQuickFilter('hospitality')}
              className={`px-5 py-2.5 rounded-xl font-semibold transition-all hover:scale-105 ${
                filters.propertyType === 'Hotel' 
                  ? 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800' 
                  : 'bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20'
              }`}
            >
              Hospitality
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 sticky top-24">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg">
                    <Filter className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Filters</h3>
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-600" />
                </button>
              </div>

              {/* Filter Groups */}
              <div className="space-y-8">
                {/* Listing Type Filter */}
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Home className="w-4 h-4 text-slate-500" />
                    Listing Type
                  </label>
                  <select
                    name="listingType"
                    value={filters.listingType}
                    onChange={handleFilterChange}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 transition bg-white"
                  >
                    <option value="">All Types</option>
                    <option value="Sale">For Sale</option>
                    <option value="Rent">For Rent</option>
                  </select>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-500" />
                    Location
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="city"
                      value={filters.city}
                      onChange={handleFilterChange}
                      onBlur={handleApplyFilters}
                      placeholder="Search city, area, or landmark"
                      className="w-full px-4 pl-12 py-3.5 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all bg-white"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  </div>
                </div>

                {/* Property Type Filter */}
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Home className="w-4 h-4 text-slate-500" />
                    Property Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {propertyTypes.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => handlePropertyTypeClick(type.value)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          filters.propertyType === type.value 
                            ? 'border-amber-500 bg-amber-50' 
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="text-lg mb-1">{type.icon}</div>
                        <div className="text-sm font-medium">{type.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-slate-500" />
                    Price Range
                  </label>
                  <div className="space-y-3">
                    <div className="relative">
                      <input
                        type="number"
                        name="minPrice"
                        value={filters.minPrice}
                        onChange={handleFilterChange}
                        onBlur={handleApplyFilters}
                        placeholder="Min price"
                        className="w-full px-4 pl-12 py-3.5 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all bg-white"
                      />
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">₹</span>
                    </div>
                    <div className="relative">
                      <input
                        type="number"
                        name="maxPrice"
                        value={filters.maxPrice}
                        onChange={handleFilterChange}
                        onBlur={handleApplyFilters}
                        placeholder="Max price"
                        className="w-full px-4 pl-12 py-3.5 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all bg-white"
                      />
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">₹</span>
                    </div>
                  </div>
                </div>

                {/* Additional Filters */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-2">Bedrooms</label>
                    <select
                      name="bedrooms"
                      value={filters.bedrooms}
                      onChange={handleFilterChange}
                      onBlur={handleApplyFilters}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 transition bg-white"
                    >
                      <option value="">Any</option>
                      {[1,2,3,4,5].map(num => (
                        <option key={num} value={num}>{num}+ Beds</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-2">Bathrooms</label>
                    <select
                      name="bathrooms"
                      value={filters.bathrooms}
                      onChange={handleFilterChange}
                      onBlur={handleApplyFilters}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 transition bg-white"
                    >
                      <option value="">Any</option>
                      {[1,2,3,4].map(num => (
                        <option key={num} value={num}>{num}+ Baths</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Furnishing Filter */}
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2">Furnishing</label>
                  <select
                    name="furnished"
                    value={filters.furnished}
                    onChange={handleFilterChange}
                    onBlur={handleApplyFilters}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 transition bg-white"
                  >
                    <option value="">Any</option>
                    <option value="fully">Fully Furnished</option>
                    <option value="semi">Semi Furnished</option>
                    <option value="unfurnished">Unfurnished</option>
                  </select>
                </div>

                {/* Action Buttons */}
                <div className="pt-6 border-t border-slate-200 space-y-3">
                  <button
                    onClick={handleApplyFilters}
                    className="w-full group relative bg-gradient-to-r from-amber-600 to-amber-700 text-white py-3.5 rounded-xl font-bold hover:shadow-xl transition-all overflow-hidden"
                  >
                    <div className="relative z-10 flex items-center justify-center gap-3">
                      <Search className="w-5 h-5" />
                      Search Properties
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-700 to-amber-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                  <button
                    onClick={handleReset}
                    className="w-full border-2 border-slate-300 text-slate-700 py-3.5 rounded-xl font-bold hover:bg-slate-50 hover:border-slate-400 transition-all"
                  >
                    Reset All Filters
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Top Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-3 bg-white px-5 py-3 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-slate-200"
                >
                  <Filter className="w-5 h-5" />
                  <span className="font-semibold">Filters</span>
                </button>
                <p className="text-slate-700 font-medium">
                  Showing <span className="font-bold text-amber-600">{sortedProperties.length}</span> premium properties
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* View Toggle */}
                <div className="flex bg-slate-100 p-1 rounded-xl">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow' : 'hover:bg-white/50'}`}
                  >
                    <Grid className="w-5 h-5 text-slate-700" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow' : 'hover:bg-white/50'}`}
                  >
                    <List className="w-5 h-5 text-slate-700" />
                  </button>
                </div>

                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value);
                      const params = new URLSearchParams(searchParams);
                      if (e.target.value !== 'newest') {
                        params.set('sort', e.target.value);
                      } else {
                        params.delete('sort');
                      }
                      setSearchParams(params);
                    }}
                    className="appearance-none pl-4 pr-12 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 transition font-semibold bg-white min-w-[180px] cursor-pointer"
                  >
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="size-high">Size: High to Low</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Properties Grid */}
            {loading ? (
              <div className="col-span-full">
                <Loading />
              </div>
            ) : error ? (
              <div className="bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-200 rounded-2xl p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full mb-4">
                  <X className="w-8 h-8 text-white" />
                </div>
                <p className="text-lg font-semibold text-red-800 mb-2">{error}</p>
                <p className="text-red-600">Please try refreshing the page or contact support.</p>
              </div>
            ) : sortedProperties.length === 0 ? (
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-12 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-6">
                  <Search className="w-10 h-10 text-white" />
                </div>
                <p className="text-2xl font-bold text-slate-900 mb-2">No Properties Found</p>
                <p className="text-slate-600 mb-6 max-w-md mx-auto">
                  Try adjusting your filters or explore our premium listings in different categories.
                </p>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  View All Properties
                </button>
              </div>
            ) : (
              <div className={`gap-8 ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2' : 'space-y-8'}`}>
                {sortedProperties.map((property) => (
                  <PropertyCard key={property._id} property={property} viewMode={viewMode} />
                ))}
              </div>
            )}

            {/* Results Info */}
            {!loading && sortedProperties.length > 0 && (
              <div className="mt-12 pt-8 border-t border-slate-200">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <p className="text-slate-600">
                    Showing <span className="font-bold text-slate-900">{Math.min(sortedProperties.length, 12)}</span> of{' '}
                    <span className="font-bold text-slate-900">{sortedProperties.length}</span> premium properties
                  </p>
                  <div className="flex items-center gap-4">
                    <button className="px-6 py-3 bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2">
                      <Building2 className="w-5 h-5" />
                      Request Concierge
                    </button>
                  </div>
                </div>
              </div> 
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
