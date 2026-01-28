import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { adminService } from '../services/api';
import { DashboardSidebar } from '../components/DashboardSidebar';
import { Loading } from '../components/Loading';
import { useAuth } from '../context/AuthContext';
import { 
  TrendingUp,
  Home,
  Users,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  MoreVertical,
  UserPlus,
  LogOut,
  Shield,
  BarChart3,
  FileText,
  AlertCircle,
  DollarSign,
  MapPin,
  Calendar,
  Mail,
  Phone,
  Lock,
  Search,
  Filter,
  Download,
  RefreshCw,
  ChevronRight
} from 'lucide-react';

export const AdminDashboard = () => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('stats');
  const [stats, setStats] = useState({
    totalProperties: 0,
    approvedProperties: 0,
    pendingProperties: 0,
    totalSellers: 0,
    activeSellers: 0,
    totalBuyers: 0,
    totalEnquiries: 0,
    totalRevenue: 0,
  });
  const [pendingProperties, setPendingProperties] = useState([]);
  const [allProperties, setAllProperties] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showSellerForm, setShowSellerForm] = useState(false);
  const [sellerFormData, setSellerFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError('');
      const [statsRes, pendingRes, sellersRes, allPropsRes, enquiriesRes] = await Promise.all([
        adminService.getDashboardStats(),
        adminService.getPendingProperties(),
        adminService.getSellers(),
        adminService.getAllProperties(),
        adminService.getRecentEnquiries(),
      ]);
      
      // Set stats from API
      if (statsRes.data.stats) {
        setStats(statsRes.data.stats);
      }
      
      // Set properties
      setPendingProperties(pendingRes.data.properties || []);
      setAllProperties(allPropsRes.data.properties || []);
      
      // Set sellers - map the data structure correctly
      const sellersData = (sellersRes.data.sellers || []).map(seller => ({
        _id: seller._id,
        name: seller.userId?.name || seller.name || 'N/A',
        email: seller.userId?.email || seller.email || 'N/A',
        phone: seller.userId?.phone || seller.phone || 'N/A',
        isActive: seller.isActive !== undefined ? seller.isActive : (seller.userId?.isActive !== undefined ? seller.userId.isActive : true),
        createdAt: seller.createdAt || seller.userId?.createdAt,
      }));
      setSellers(sellersData);
      
      // Set enquiries - map the data structure correctly
      const enquiriesData = (enquiriesRes.data.enquiries || []).map(enquiry => ({
        _id: enquiry._id,
        name: enquiry.contactInfo?.name || enquiry.userId?.name || 'N/A',
        email: enquiry.contactInfo?.email || enquiry.userId?.email || 'N/A',
        phone: enquiry.contactInfo?.phone || enquiry.userId?.phone || 'N/A',
        message: enquiry.contactInfo?.message || enquiry.message || '',
        propertyTitle: enquiry.propertyId?.title || 'N/A',
        createdAt: enquiry.createdAt,
        status: enquiry.status || 'New',
      }));
      setRecentEnquiries(enquiriesData);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load dashboard data');
      console.error('Dashboard load error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveProperty = async (id) => {
    try {
      await adminService.approveProperty(id, { finalPrice: 0 });
      loadDashboard();
    } catch (err) {
      setError('Failed to approve property');
    }
  };

  const handleRejectProperty = async (id) => {
    try {
      await adminService.rejectProperty(id, { rejectionReason: 'Does not meet our quality standards' });
      loadDashboard();
    } catch (err) {
      setError('Failed to reject property');
    }
  };

  const handleSellerFormChange = (e) => {
    const { name, value } = e.target;
    setSellerFormData({ ...sellerFormData, [name]: value });
  };

  const handleOnboardSeller = async (e) => {
    e.preventDefault();
    try {
      await adminService.onboardSeller(sellerFormData);
      setShowSellerForm(false);
      setSellerFormData({ name: '', email: '', phone: '', password: '' });
      loadDashboard();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to onboard seller');
    }
  };

  const handleToggleSeller = async (id) => {
    try {
      await adminService.toggleSellerStatus(id);
      loadDashboard();
    } catch (err) {
      setError('Failed to update seller status');
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const sidebarItems = [
    {
      title: 'Admin Panel',
      items: [
        { 
          label: 'Dashboard', 
          icon: <BarChart3 className="w-5 h-5" />, 
          onClick: () => setActiveTab('stats'),
          active: activeTab === 'stats'
        },
        { 
          label: 'All Properties', 
          icon: <Home className="w-5 h-5" />, 
          onClick: () => setActiveTab('allProperties'),
          active: activeTab === 'allProperties'
        },
        { 
          label: 'Sellers', 
          icon: <Users className="w-5 h-5" />, 
          onClick: () => setActiveTab('sellers'),
          active: activeTab === 'sellers'
        },
        { 
          label: 'Approve Properties', 
          icon: <CheckCircle className="w-5 h-5" />, 
          onClick: () => setActiveTab('pending'),
          active: activeTab === 'pending'
        },
        { 
          label: 'Recent Enquiries', 
          icon: <Mail className="w-5 h-5" />, 
          onClick: () => setActiveTab('enquiries'),
          active: activeTab === 'enquiries'
        },
      ],
    },
    {
      title: 'Management',
      items: [
        { 
          label: 'Onboard Seller', 
          icon: <UserPlus className="w-5 h-5" />, 
          onClick: () => setActiveTab('onboard'),
          active: activeTab === 'onboard'
        },
        { 
          label: 'Logout', 
          icon: <LogOut className="w-5 h-5" />, 
          onClick: () => logout(),
          danger: true
        },
      ],
    },
  ];

  const filteredProperties = allProperties.filter(prop =>
    prop.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prop.location?.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prop.location?.locality?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prop.propertyType?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loading />;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Helmet>
        <title>Admin Dashboard | FNAEstate</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      {/* Sidebar */}
      <div className="hidden lg:block w-72">
        <div className="sticky top-0 h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-slate-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">FNAEstate</h1>
                <p className="text-sm text-slate-300">Admin Dashboard</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="p-4 space-y-1">
            {sidebarItems.map((group, groupIndex) => (
              <div key={groupIndex} className="mb-6">
                {group.title && (
                  <h3 className="text-xs uppercase text-slate-400 font-semibold px-4 mb-3">
                    {group.title}
                  </h3>
                )}
                {group.items.map((item, itemIndex) => (
                  <button
                    key={itemIndex}
                    onClick={item.onClick}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      item.active
                        ? 'bg-gradient-to-r from-amber-500/20 to-amber-600/20 text-amber-200 border-l-4 border-amber-500'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    } ${item.danger ? 'hover:bg-red-500/20 hover:text-red-300' : ''}`}
                  >
                    {item.icon}
                    {item.label}
                    <ChevronRight className={`w-4 h-4 ml-auto ${item.active ? 'opacity-100' : 'opacity-0'}`} />
                  </button>
                ))}
              </div>
            ))}
          </div>

         
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-900">
                {activeTab === 'stats' && 'Dashboard Overview'}
                {activeTab === 'pending' && 'Property Approvals'}
                {activeTab === 'allProperties' && 'All Properties'}
                {activeTab === 'sellers' && 'Seller Management'}
                {activeTab === 'enquiries' && 'Recent Enquiries'}
                {activeTab === 'onboard' && 'Onboard New Seller'}
              </h1>
              <p className="text-slate-600 mt-2">
                {activeTab === 'stats' && 'Monitor platform performance and statistics'}
                {activeTab === 'pending' && 'Review and approve property listings'}
                {activeTab === 'allProperties' && 'Manage all property listings'}
                {activeTab === 'sellers' && 'Manage seller accounts and permissions'}
                {activeTab === 'enquiries' && 'View and manage property enquiries'}
                {activeTab === 'onboard' && 'Add new sellers to the platform'}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={loadDashboard}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-slate-700 font-medium"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
              <button 
                onClick={() => {}}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-xl hover:shadow-lg transition-all font-medium"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <span className="text-red-700 font-medium">{error}</span>
              </div>
              <button onClick={() => setError('')} className="text-red-500 hover:text-red-700">
                <XCircle className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Dashboard Stats */}
          {activeTab === 'stats' && (
            <div>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl">
                      <Home className="w-6 h-6 text-white" />
                    </div>
                    <TrendingUp className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div className="text-3xl font-bold text-slate-900">{stats.totalProperties}</div>
                  <p className="text-slate-600 mt-2">Total Properties</p>
                </div>

                <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <TrendingUp className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div className="text-3xl font-bold text-slate-900">{stats.approvedProperties}</div>
                  <p className="text-slate-600 mt-2">Approved Properties</p>
                </div>

                <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <TrendingUp className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div className="text-3xl font-bold text-slate-900">{stats.totalSellers}</div>
                  <p className="text-slate-600 mt-2">Total Sellers</p>
                </div>

                <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
                      <DollarSign className="w-6 h-6 text-white" />
                    </div>
                    <TrendingUp className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div className="text-3xl font-bold text-slate-900">{formatCurrency(stats.totalRevenue)}</div>
                  <p className="text-slate-600 mt-2">Total Revenue</p>
                </div>
              </div>

              {/* Secondary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow">
                  <div className="text-2xl font-bold text-slate-900 mb-2">{stats.pendingProperties}</div>
                  <p className="text-slate-600">Pending Approvals</p>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow">
                  <div className="text-2xl font-bold text-slate-900 mb-2">{stats.totalBuyers}</div>
                  <p className="text-slate-600">Registered Buyers</p>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow">
                  <div className="text-2xl font-bold text-slate-900 mb-2">{stats.totalEnquiries}</div>
                  <p className="text-slate-600">Total Enquiries</p>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white border border-slate-200 rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900">Recent Activity</h3>
                </div>
                <div className="divide-y divide-slate-200">
                  {recentEnquiries.length === 0 ? (
                    <div className="p-6 text-center text-slate-500">
                      No recent enquiries
                    </div>
                  ) : (
                    recentEnquiries.slice(0, 5).map((enquiry) => (
                      <div key={enquiry._id} className="p-6 hover:bg-slate-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-slate-900">{enquiry.name}</p>
                            <p className="text-sm text-slate-600">{enquiry.propertyTitle}</p>
                          </div>
                          <div className="text-sm text-slate-500">
                            {enquiry.createdAt ? new Date(enquiry.createdAt).toLocaleDateString() : 'N/A'}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Pending Properties */}
          {activeTab === 'pending' && (
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Pending Approvals ({pendingProperties.length})</h2>
                <p className="text-slate-600">Review and approve property listings</p>
              </div>

              {pendingProperties.length === 0 ? (
                <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-2xl p-12 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full mb-6">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">All Caught Up!</h3>
                  <p className="text-slate-600">No pending properties to review.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {pendingProperties.map((prop) => (
                    <div key={prop._id} className="bg-white border border-slate-200 rounded-2xl shadow-lg overflow-hidden">
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-xl font-bold text-slate-900 line-clamp-1">{prop.title}</h3>
                          <span className="text-xs px-3 py-1 bg-amber-100 text-amber-800 rounded-full font-semibold">
                            Pending
                          </span>
                        </div>
                        
                        <div className="space-y-3 mb-6">
                          <div className="flex items-center gap-2 text-slate-600">
                            <MapPin className="w-4 h-4" />
                            <span>{prop.location?.city || ''}, {prop.location?.locality || ''}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-600">
                            <Home className="w-4 h-4" />
                            <span>{prop.propertyType} • {prop.propertyDetails?.builtUpArea || 0} sq ft</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-600">
                            <Calendar className="w-4 h-4" />
                            <span>Listed {new Date(prop.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-6">
                          <div>
                            <p className="text-sm text-slate-500">Listed Price</p>
                            <p className="text-2xl font-bold text-slate-900">₹{prop.pricing?.basePrice?.toLocaleString() || 'N/A'}</p>
                          </div>
                          <button className="flex items-center gap-2 text-slate-600 hover:text-slate-900">
                            <Eye className="w-4 h-4" />
                            Preview
                          </button>
                        </div>

                        <div className="flex gap-3">
                          <button 
                            onClick={() => handleApproveProperty(prop._id)}
                            className="flex-1 group relative bg-gradient-to-r from-emerald-500 to-green-600 text-white py-3 rounded-xl font-semibold hover:shadow-xl transition-all overflow-hidden"
                          >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                              <CheckCircle className="w-5 h-5" />
                              Approve
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          </button>
                          <button 
                            onClick={() => handleRejectProperty(prop._id)}
                            className="flex-1 group relative bg-gradient-to-r from-red-500 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-xl transition-all overflow-hidden"
                          >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                              <XCircle className="w-5 h-5" />
                              Reject
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* All Properties */}
          {activeTab === 'allProperties' && (
            <div>
              <div className="mb-8">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">All Properties ({filteredProperties.length})</h2>
                    <p className="text-slate-600">Manage all property listings on the platform</p>
                  </div>
                  <div className="relative w-full lg:w-auto">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search properties..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-12 pr-4 py-2.5 w-full lg:w-80 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {filteredProperties.length === 0 ? (
                <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-2xl p-12 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-slate-500 to-slate-600 rounded-full mb-6">
                    <Home className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">No Properties Found</h3>
                  <p className="text-slate-600">Try adjusting your search terms</p>
                </div>
              ) : (
                <div className="bg-white border border-slate-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-200">
                          <th className="text-left p-6 text-sm font-semibold text-slate-900">Property</th>
                          <th className="text-left p-6 text-sm font-semibold text-slate-900">Location</th>
                          <th className="text-left p-6 text-sm font-semibold text-slate-900">Type</th>
                          <th className="text-left p-6 text-sm font-semibold text-slate-900">Price</th>
                          <th className="text-left p-6 text-sm font-semibold text-slate-900">Status</th>
                          <th className="text-left p-6 text-sm font-semibold text-slate-900">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {filteredProperties.map((prop) => (
                          <tr key={prop._id} className="hover:bg-slate-50 transition-colors">
                            <td className="p-6">
                              <div>
                                <p className="font-medium text-slate-900">{prop.title}</p>
                                <p className="text-sm text-slate-600">ID: {prop._id?.slice(-6)}</p>
                              </div>
                            </td>
                            <td className="p-6">
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-slate-400" />
                                <span className="text-slate-700">
                                  {prop.location?.city || ''}, {prop.location?.locality || ''}
                                </span>
                              </div>
                            </td>
                            <td className="p-6">
                              <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                                {prop.propertyType}
                              </span>
                            </td>
                            <td className="p-6">
                              <div className="text-lg font-bold text-slate-900">
                                ₹{prop.pricing?.finalPrice?.toLocaleString() || prop.pricing?.basePrice?.toLocaleString() || 'N/A'}
                              </div>
                            </td>
                            <td className="p-6">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                prop.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                                prop.status === 'Pending Approval' ? 'bg-amber-100 text-amber-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {prop.status}
                              </span>
                            </td>
                            <td className="p-6">
                              <div className="flex items-center gap-2">
                                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                  <Eye className="w-4 h-4 text-slate-600" />
                                </button>
                                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                  <Edit className="w-4 h-4 text-slate-600" />
                                </button>
                                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                  <MoreVertical className="w-4 h-4 text-slate-600" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Sellers Management */}
          {activeTab === 'sellers' && (
            <div>
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Seller Management ({sellers.length})</h2>
                  <p className="text-slate-600">Manage seller accounts and permissions</p>
                </div>
                <button 
                  onClick={() => setActiveTab('onboard')}
                  className="group relative bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl transition-all flex items-center gap-2"
                >
                  <UserPlus className="w-5 h-5" />
                  Onboard New Seller
                </button>
              </div>

              {sellers.length === 0 ? (
                <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-2xl p-12 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full mb-6">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">No Sellers Found</h3>
                  <p className="text-slate-600 mb-6">Start by onboarding your first seller</p>
                  <button 
                    onClick={() => setActiveTab('onboard')}
                    className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    Onboard Seller
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sellers.map((seller) => (
                    <div key={seller._id} className="bg-white border border-slate-200 rounded-2xl shadow-lg overflow-hidden">
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold">
                              {seller.name?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <h3 className="font-bold text-slate-900">{seller.name}</h3>
                              <p className="text-sm text-slate-600">Seller ID: {seller._id?.slice(-6)}</p>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            seller.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {seller.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>

                        <div className="space-y-3 mb-6">
                          <div className="flex items-center gap-2 text-slate-600">
                            <Mail className="w-4 h-4" />
                            <span className="text-sm">{seller.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-600">
                            <Phone className="w-4 h-4" />
                            <span className="text-sm">{seller.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-600">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">Joined {new Date(seller.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <button 
                          onClick={() => handleToggleSeller(seller._id)}
                          className={`w-full py-2.5 rounded-xl font-semibold transition-colors ${
                            seller.isActive 
                              ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                              : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                          }`}
                        >
                          {seller.isActive ? 'Deactivate Account' : 'Activate Account'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Onboard Seller */}
          {activeTab === 'onboard' && (
            <div>
              <div className="mb-8">
                <button 
                  onClick={() => setActiveTab('sellers')}
                  className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium mb-4"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  Back to Sellers
                </button>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Onboard New Seller</h2>
                <p className="text-slate-600">Add a new seller to the FNAEstate platform</p>
              </div>

              <div className="max-w-2xl mx-auto">
                <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-2xl shadow-xl p-8">
                  <form onSubmit={handleOnboardSeller}>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-bold text-slate-900 mb-3">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={sellerFormData.name}
                          onChange={handleSellerFormChange}
                          placeholder="Enter seller's full name"
                          required
                          className="w-full px-4 py-3.5 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-900 mb-3">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          value={sellerFormData.email}
                          onChange={handleSellerFormChange}
                          placeholder="seller@FNAEstate.com"
                          required
                          className="w-full px-4 py-3.5 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-900 mb-3">Phone Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={sellerFormData.phone}
                          onChange={handleSellerFormChange}
                          placeholder="+91 98765 43210"
                          required
                          className="w-full px-4 py-3.5 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-900 mb-3">Temporary Password *</label>
                        <input
                          type="password"
                          name="password"
                          value={sellerFormData.password}
                          onChange={handleSellerFormChange}
                          placeholder="Set a strong temporary password"
                          required
                          className="w-full px-4 py-3.5 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all bg-white"
                        />
                        <p className="text-sm text-slate-500 mt-2">Seller will be prompted to change this password on first login.</p>
                      </div>
                    </div>
                    <div className="mt-8 flex gap-3">
                      <button
                        type="submit"
                        className="flex-1 group relative bg-gradient-to-r from-amber-600 to-amber-700 text-white py-3.5 rounded-xl font-bold hover:shadow-xl transition-all overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-3">
                          <UserPlus className="w-5 h-5" />
                          Onboard Seller
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-700 to-amber-800 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab('sellers');
                          setSellerFormData({ name: '', email: '', phone: '', password: '' });
                        }}
                        className="flex-1 border-2 border-slate-300 text-slate-700 py-3.5 rounded-xl font-bold hover:bg-slate-50 transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* Recent Enquiries */}
          {activeTab === 'enquiries' && (
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Recent Enquiries ({recentEnquiries.length})</h2>
                <p className="text-slate-600">View and manage recent property enquiries</p>
              </div>

              {recentEnquiries.length === 0 ? (
                <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-2xl p-12 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mb-6">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">No Enquiries Yet</h3>
                  <p className="text-slate-600">Enquiries will appear here as they come in.</p>
                </div>
              ) : (
                <div className="bg-white border border-slate-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-200">
                          <th className="text-left p-6 text-sm font-semibold text-slate-900">Name</th>
                          <th className="text-left p-6 text-sm font-semibold text-slate-900">Property</th>
                          <th className="text-left p-6 text-sm font-semibold text-slate-900">Contact</th>
                          <th className="text-left p-6 text-sm font-semibold text-slate-900">Date</th>
                          <th className="text-left p-6 text-sm font-semibold text-slate-900">Status</th>
                          <th className="text-left p-6 text-sm font-semibold text-slate-900">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {recentEnquiries.map((enquiry) => (
                          <tr key={enquiry._id} className="hover:bg-slate-50 transition-colors">
                            <td className="p-6">
                              <div>
                                <p className="font-medium text-slate-900">{enquiry.name}</p>
                                <p className="text-sm text-slate-600">{enquiry.email}</p>
                              </div>
                            </td>
                            <td className="p-6">
                              <p className="text-slate-700">{enquiry.propertyTitle}</p>
                            </td>
                            <td className="p-6">
                              <div className="space-y-1">
                                <p className="text-slate-700">{enquiry.phone}</p>
                                {enquiry.message && (
                                  <p className="text-sm text-slate-600 truncate">{enquiry.message.substring(0, 30)}...</p>
                                )}
                              </div>
                            </td>
                            <td className="p-6">
                              <div className="text-slate-700">
                                {enquiry.createdAt ? new Date(enquiry.createdAt).toLocaleDateString() : 'N/A'}
                              </div>
                            </td>
                            <td className="p-6">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                enquiry.status === 'New' ? 'bg-amber-100 text-amber-800' :
                                enquiry.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                                enquiry.status === 'Closed' ? 'bg-emerald-100 text-emerald-800' :
                                'bg-slate-100 text-slate-800'
                              }`}>
                                {enquiry.status}
                              </span>
                            </td>
                            <td className="p-6">
                              <div className="flex items-center gap-2">
                                <button 
                                  onClick={() => {
                                    // TODO: Implement mark as read functionality
                                  }}
                                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium"
                                >
                                  Mark as Read
                                </button>
                                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                  <MoreVertical className="w-4 h-4 text-slate-600" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};