import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { propertyService } from '../services/api';
import { DashboardSidebar } from '../components/DashboardSidebar';
import { Loading } from '../components/Loading';
import { useAuth } from '../context/AuthContext';
import {
  PlusCircle,
  TrendingUp,
  Eye,
  MessageSquare,
  DollarSign,
  BarChart3,
  Filter,
  Search,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
  MoreVertical,
  Upload,
  MapPin,
  Home,
  Building2,
  Target,
  Award,
  Calendar,
  Download,
  Share2,
  ArrowRight,
  ChevronDown
} from 'lucide-react';

export const SellerDashboard = () => {
  const { user, logout } = useAuth();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [stats, setStats] = useState({
    totalProperties: 0,
    approved: 0,
    pending: 0,
    totalViews: 0,
    enquiries: 0
  });
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    propertyType: 'luxury-apartment',
    listingType: 'sale',
    category: 'premium',
    location: {
      country: 'India',
      state: '',
      city: '',
      locality: '',
      fullAddress: '',
      landmark: '',
      pincode: ''
    },
    pricing: {
      basePrice: '',
      currency: 'INR',
      pricePerSqft: '',
      maintenanceCharges: '',
      bookingAmount: ''
    },
    propertyDetails: {
      builtUpArea: '',
      carpetArea: '',
      bedrooms: '',
      bathrooms: '',
      balconies: '',
      furnishingStatus: 'luxury',
      floorNumber: '',
      totalFloors: '',
      ageOfConstruction: '',
      facingDirection: 'north'
    },
    amenities: {
      parking: false,
      lift: false,
      security: false,
      powerBackup: false,
      waterSupply: false,
      gym: false,
      swimmingPool: false,
      clubhouse: false,
      childrensPlayArea: false,
      garden: false,
      concierge: false,
      valetParking: false,
      smartHome: false,
      homeTheater: false,
      wineCellar: false
    },
    features: [],
    virtualTour: '',
    documents: []
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    calculateStats();
  }, [properties]);

  const fetchProperties = async () => {
    try {
      const res = await propertyService.getSellerProperties();
      setProperties(res.data.properties);
      setLoading(false);
    } catch (err) {
      setError('Failed to load properties');
      setLoading(false);
    }
  };

  const calculateStats = () => {
    const total = properties.length;
    const approved = properties.filter(p => p.status === 'Approved').length;
    const pending = properties.filter(p => p.status === 'Pending Approval').length;
    const totalViews = properties.reduce((sum, p) => sum + (p.views || 0), 0);
    const enquiries = properties.reduce((sum, p) => sum + (p.enquiries || 0), 0);
    
    setStats({
      totalProperties: total,
      approved,
      pending,
      totalViews,
      enquiries
    });
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleNestedChange = (section, field, value) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [field]: value,
      },
    });
  };

  const handleAmenityChange = (amenity) => {
    setFormData({
      ...formData,
      amenities: {
        ...formData.amenities,
        [amenity]: !formData.amenities[amenity]
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await propertyService.createProperty(formData);
      setShowForm(false);
      setActiveTab('all');
      setFormData({
        title: '',
        description: '',
        propertyType: 'luxury-apartment',
        listingType: 'sale',
        category: 'premium',
        location: { country: 'India', state: '', city: '', locality: '', fullAddress: '', landmark: '', pincode: '' },
        pricing: { basePrice: '', currency: 'INR', pricePerSqft: '', maintenanceCharges: '', bookingAmount: '' },
        propertyDetails: { builtUpArea: '', carpetArea: '', bedrooms: '', bathrooms: '', balconies: '', 
                          furnishingStatus: 'luxury', floorNumber: '', totalFloors: '', ageOfConstruction: '', facingDirection: 'north' },
        amenities: { parking: false, lift: false, security: false, powerBackup: false, waterSupply: false, 
                    gym: false, swimmingPool: false, clubhouse: false, childrensPlayArea: false, garden: false,
                    concierge: false, valetParking: false, smartHome: false, homeTheater: false, wineCellar: false },
        features: [],
        virtualTour: '',
        documents: []
      });
      fetchProperties();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create property');
    }
  };

  const getStatusBadge = (status) => {
    const config = {
      'Draft': { color: 'bg-slate-600', icon: <Clock className="w-4 h-4" /> },
      'Pending Approval': { color: 'bg-amber-500', icon: <Clock className="w-4 h-4" /> },
      'Approved': { color: 'bg-emerald-600', icon: <CheckCircle className="w-4 h-4" /> },
      'Rejected': { color: 'bg-red-600', icon: <XCircle className="w-4 h-4" /> },
      'Sold': { color: 'bg-purple-600', icon: <DollarSign className="w-4 h-4" /> },
      'Rented': { color: 'bg-blue-600', icon: <Home className="w-4 h-4" /> }
    };
    
    const { color, icon } = config[status] || config['Draft'];
    
    return (
      <span className={`${color} text-white px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2`}>
        {icon}
        {status}
      </span>
    );
  };

  const filteredProperties = properties.filter(property => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return property.status === 'Approved';
    if (activeTab === 'pending') return property.status === 'Pending Approval';
    if (activeTab === 'draft') return property.status === 'Draft';
    return true;
  });

  const sidebarItems = [
    {
      items: [
        { label: 'Dashboard Overview', path: '/seller/dashboard', icon: '📊', onClick: () => { setActiveTab('all'); setShowForm(false); }, active: activeTab === 'all' && !showForm },
        { label: 'Add Premium Listing', path: '#', icon: '➕', onClick: () => { setShowForm(true); setActiveTab('all'); }, active: showForm },
        { label: 'Active Listings', path: '/seller/dashboard', icon: '✅', onClick: () => { setActiveTab('active'); setShowForm(false); }, active: activeTab === 'active' && !showForm },
        { label: 'Pending Approval', path: '/seller/dashboard', icon: '⏳', onClick: () => { setActiveTab('pending'); setShowForm(false); }, active: activeTab === 'pending' && !showForm },
        { label: 'Drafts', path: '/seller/dashboard', icon: '📝', onClick: () => { setActiveTab('draft'); setShowForm(false); }, active: activeTab === 'draft' && !showForm },
        { label: 'Logout', path: '/', icon: '🚪', onClick: () => logout() },
      ],
    },
  ];

  const propertyTypes = [
    { value: 'luxury-apartment', label: 'Luxury Apartment' },
    { value: 'penthouse', label: 'Penthouse' },
    { value: 'villa', label: 'Villa' },
    { value: 'farmhouse', label: 'Farmhouse' },
    { value: 'bungalow', label: 'Bungalow' },
    { value: 'commercial', label: 'Commercial Space' },
    { value: 'plot', label: 'Premium Plot' }
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <Helmet>
        <title>Seller Dashboard | FNAEstate</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      {/* Sidebar */}
      <div className="hidden md:block">
        <DashboardSidebar items={sidebarItems} title="Seller Dashboard" />
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header - Only show on Dashboard Overview */}
        {activeTab === 'all' && !showForm && (
          <div className="bg-white border-b border-slate-200 p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Premium Seller Dashboard</h1>
                <p className="text-slate-600 mt-2">Manage your luxury property listings and performance</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </button>
                <button 
                  onClick={() => setShowForm(true)}
                  className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <PlusCircle className="w-5 h-5" />
                  Add Listing
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards - Only show on Dashboard Overview */}
        {activeTab === 'all' && !showForm && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
                    <Home className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium px-3 py-1 bg-green-50 text-green-700 rounded-full">
                    +12%
                  </span>
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-2">{stats.totalProperties}</div>
                <div className="text-sm text-slate-600">Total Properties</div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl">
                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-2">{stats.approved}</div>
                <div className="text-sm text-slate-600">Active Listings</div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl">
                    <Eye className="w-6 h-6 text-amber-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-2">{stats.totalViews.toLocaleString()}</div>
                <div className="text-sm text-slate-600">Total Views</div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl">
                    <MessageSquare className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-2">{stats.enquiries}</div>
                <div className="text-sm text-slate-600">Enquiries</div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-r from-rose-50 to-rose-100 rounded-xl">
                    <BarChart3 className="w-6 h-6 text-rose-600" />
                  </div>
                  <span className="text-sm font-medium px-3 py-1 bg-green-50 text-green-700 rounded-full">
                    +24%
                  </span>
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-2">4.9★</div>
                <div className="text-sm text-slate-600">Average Rating</div>
              </div>
            </div>
          </div>
        )}


          {/* Add Property Form */}
          {showForm && (
            <div className="p-6">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 mb-8 overflow-hidden">
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Create Premium Property Listing</h2>
                    <p className="text-slate-600">List your luxury property with premium features</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setActiveTab('all');
                    }}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <XCircle className="w-6 h-6 text-slate-500" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Basic Information */}
                  <div className="border-b border-slate-200 pb-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-2 rounded-lg">
                        <Home className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">Basic Information</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold mb-3 text-slate-700">Property Title *</label>
                        <input 
                          type="text" 
                          name="title" 
                          value={formData.title} 
                          onChange={handleFormChange} 
                          required 
                          placeholder="Luxury 3 BHK Penthouse with City View"
                          className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold mb-3 text-slate-700">Property Type *</label>
                        <select 
                          name="propertyType" 
                          value={formData.propertyType} 
                          onChange={handleFormChange} 
                          className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                        >
                          {propertyTypes.map(type => (
                            <option key={type.value} value={type.value}>{type.label}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="lg:col-span-2">
                        <label className="block text-sm font-semibold mb-3 text-slate-700">Premium Description *</label>
                        <textarea 
                          name="description" 
                          value={formData.description} 
                          onChange={handleFormChange} 
                          required 
                          rows="4"
                          placeholder="Describe your luxury property with premium features, amenities, and unique selling points..."
                          className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="border-b border-slate-200 pb-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 rounded-lg">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">Location Details</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold mb-3 text-slate-700">City *</label>
                        <input
                          type="text"
                          value={formData.location.city}
                          onChange={(e) => handleNestedChange('location', 'city', e.target.value)}
                          required
                          placeholder="Mumbai"
                          className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold mb-3 text-slate-700">Locality *</label>
                        <input
                          type="text"
                          value={formData.location.locality}
                          onChange={(e) => handleNestedChange('location', 'locality', e.target.value)}
                          required
                          placeholder="Bandra West"
                          className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                        />
                      </div>
                      
                      <div className="lg:col-span-2">
                        <label className="block text-sm font-semibold mb-3 text-slate-700">Full Address *</label>
                        <input
                          type="text"
                          value={formData.location.fullAddress}
                          onChange={(e) => handleNestedChange('location', 'fullAddress', e.target.value)}
                          required
                          placeholder="Complete address including landmark"
                          className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Pricing & Details */}
                  <div className="border-b border-slate-200 pb-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-2 rounded-lg">
                        <DollarSign className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">Pricing & Property Details</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-semibold mb-3 text-slate-700">Base Price (₹) *</label>
                        <input
                          type="number"
                          value={formData.pricing.basePrice}
                          onChange={(e) => handleNestedChange('pricing', 'basePrice', e.target.value)}
                          required
                          placeholder="4,50,00,000"
                          className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold mb-3 text-slate-700">Built-up Area (sqft) *</label>
                        <input
                          type="number"
                          value={formData.propertyDetails.builtUpArea}
                          onChange={(e) => handleNestedChange('propertyDetails', 'builtUpArea', e.target.value)}
                          required
                          placeholder="2800"
                          className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold mb-3 text-slate-700">Bedrooms *</label>
                        <select
                          value={formData.propertyDetails.bedrooms}
                          onChange={(e) => handleNestedChange('propertyDetails', 'bedrooms', e.target.value)}
                          required
                          className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                        >
                          <option value="">Select</option>
                          <option value="1">1 BHK</option>
                          <option value="2">2 BHK</option>
                          <option value="3">3 BHK</option>
                          <option value="4">4 BHK</option>
                          <option value="5+">5+ BHK</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Premium Amenities */}
                  <div className="pb-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-2 rounded-lg">
                        <Award className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">Premium Amenities</h3>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {Object.keys(formData.amenities).map((amenity) => (
                        <label key={amenity} className="flex items-center gap-3 p-4 border border-slate-300 rounded-xl hover:bg-slate-50 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.amenities[amenity]}
                            onChange={() => handleAmenityChange(amenity)}
                            className="w-5 h-5 text-amber-600 rounded focus:ring-amber-500"
                          />
                          <span className="font-medium text-slate-700 capitalize">{amenity.replace(/([A-Z])/g, ' $1').trim()}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setActiveTab('all');
                      }}
                      className="px-8 py-3 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl hover:shadow-xl hover:scale-105 transition-all font-semibold flex items-center gap-3"
                    >
                      <Upload className="w-5 h-5" />
                      Submit for Premium Review
                    </button>
                  </div>
                </form>
              </div>
            </div>
            </div>
          )}

          {/* Properties List - Show on all tabs except when form is open */}
          {!showForm && (
            <div className="p-6">
              {loading ? (
              <Loading />
            ) : filteredProperties.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-slate-200">
                <div className="w-20 h-20 bg-gradient-to-r from-amber-50 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Home className="w-10 h-10 text-amber-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">No Properties Found</h3>
                <p className="text-slate-600 mb-8">Start by adding your first premium property listing</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="px-8 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl hover:shadow-xl hover:scale-105 transition-all font-semibold flex items-center gap-3 mx-auto"
                >
                  <PlusCircle className="w-5 h-5" />
                  Create First Listing
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredProperties.map((property) => (
                  <div key={property._id} className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden group hover:shadow-xl transition-all">
                    {/* Property Header */}
                    <div className="p-6 border-b border-slate-100">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-amber-700 transition-colors">
                            {property.title}
                          </h3>
                          <div className="flex items-center gap-2 text-slate-600 mb-2">
                            <MapPin className="w-4 h-4" />
                            <span>{property.location.locality}, {property.location.city}</span>
                          </div>
                        </div>
                        {getStatusBadge(property.status)}
                      </div>
                      
                      <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                          <Home className="w-4 h-4 text-slate-500" />
                          <span>{property.propertyDetails.bedrooms} BHK</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-slate-500" />
                          <span>{property.propertyDetails.builtUpArea} sqft</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-slate-500" />
                          <span className="font-bold text-slate-900">₹{property.pricing.basePrice.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Property Stats */}
                    <div className="p-6">
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center p-3 bg-slate-50 rounded-lg">
                          <div className="text-lg font-bold text-slate-900">{property.views || 0}</div>
                          <div className="text-xs text-slate-600">Views</div>
                        </div>
                        <div className="text-center p-3 bg-slate-50 rounded-lg">
                          <div className="text-lg font-bold text-slate-900">{property.enquiries || 0}</div>
                          <div className="text-xs text-slate-600">Enquiries</div>
                        </div>
                        <div className="text-center p-3 bg-slate-50 rounded-lg">
                          <div className="text-lg font-bold text-slate-900">{property.shortlisted || 0}</div>
                          <div className="text-xs text-slate-600">Shortlisted</div>
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-slate-600">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">Listed {new Date(property.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                            <Eye className="w-5 h-5 text-slate-600" />
                          </button>
                          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                            <Edit className="w-5 h-5 text-slate-600" />
                          </button>
                          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                            <Share2 className="w-5 h-5 text-slate-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            </div>
          )}
      </main>
    </div>
  );
};