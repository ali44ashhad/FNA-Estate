import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { DashboardSidebar } from '../components/DashboardSidebar';
import { Loading } from '../components/Loading';

export const BuyerDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('favorites');
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [savedSearches, setSavedSearches] = useState([]);
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    loadBuyerData();
  }, []);

  const loadBuyerData = async () => {
    setLoading(true);
    // Simulated data - replace with actual API calls
    setFavorites([
      { id: 1, title: '3 BHK Apartment', price: '₹45 Lakhs', location: 'Mumbai', image: '🏢' },
      { id: 2, title: '2 BHK Villa', price: '₹60 Lakhs', location: 'Bangalore', image: '🏠' },
    ]);
    setSavedSearches([
      { id: 1, name: 'Mumbai Apartments', filters: '2-3 BHK, ₹30-50L' },
      { id: 2, name: 'Bangalore Villas', filters: '3+ BHK, ₹50-80L' },
    ]);
    setEnquiries([
      { id: 1, property: 'Luxury Apartment', seller: 'John Doe', date: '2025-12-24', status: 'Pending' },
      { id: 2, property: 'Modern Villa', seller: 'Jane Smith', date: '2025-12-20', status: 'Responded' },
    ]);
    setLoading(false);
  };

  if (loading) return <Loading />;

  const sidebarItems = [
    {
      items: [
        { label: 'Dashboard', path: '/buyer/dashboard', icon: '📊', onClick: () => setActiveTab('favorites') },
        { label: 'Favorites', path: '/buyer/dashboard', icon: '❤️', onClick: () => setActiveTab('favorites') },
        { label: 'Saved Searches', path: '/buyer/dashboard', icon: '📌', onClick: () => setActiveTab('searches') },
        { label: 'My Enquiries', path: '/buyer/dashboard', icon: '💬', onClick: () => setActiveTab('enquiries') },
        { label: 'Profile', path: '/user/dashboard', icon: '👤' },
        { label: 'Logout', path: '/', icon: '🚪', onClick: () => logout() },
      ],
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <Helmet>
        <title>Buyer Dashboard | FNAEstate</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="hidden md:block w-64">
        <DashboardSidebar items={sidebarItems} />
      </div>

      <main className="flex-1 overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome back, {user?.name}! 👋</h1>
          <p className="text-gray-600">Manage your favorite properties, saved searches, and enquiries.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="text-3xl font-bold text-purple-600">2</div>
            <p className="text-gray-600 mt-2">Favorite Properties</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="text-3xl font-bold text-pink-600">2</div>
            <p className="text-gray-600 mt-2">Saved Searches</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="text-3xl font-bold text-blue-600">2</div>
            <p className="text-gray-600 mt-2">Active Enquiries</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="text-3xl font-bold text-green-600">1</div>
            <p className="text-gray-600 mt-2">Seller Responses</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200 flex">
            {['favorites', 'searches', 'enquiries'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                  activeTab === tab
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* Favorites Tab */}
            {activeTab === 'favorites' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold mb-4">Your Favorite Properties</h3>
                {favorites.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {favorites.map((prop) => (
                      <div key={prop.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                        <div className="text-5xl mb-3">{prop.image}</div>
                        <h4 className="text-lg font-bold">{prop.title}</h4>
                        <p className="text-gray-600">{prop.location}</p>
                        <p className="text-2xl font-bold text-purple-600 mt-2">{prop.price}</p>
                        <button className="mt-4 w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition-colors">
                          View Details
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No favorite properties yet.</p>
                )}
              </div>
            )}

            {/* Saved Searches Tab */}
            {activeTab === 'searches' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold mb-4">Saved Searches</h3>
                {savedSearches.length > 0 ? (
                  <div className="space-y-3">
                    {savedSearches.map((search) => (
                      <div key={search.id} className="border rounded-lg p-4 flex justify-between items-center hover:shadow-lg transition-shadow">
                        <div>
                          <h4 className="font-bold">{search.name}</h4>
                          <p className="text-gray-600 text-sm">{search.filters}</p>
                        </div>
                        <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors">
                          View Results
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No saved searches yet.</p>
                )}
              </div>
            )}

            {/* Enquiries Tab */}
            {activeTab === 'enquiries' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold mb-4">Your Enquiries</h3>
                {enquiries.length > 0 ? (
                  <div className="space-y-3">
                    {enquiries.map((enq) => (
                      <div key={enq.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-bold">{enq.property}</h4>
                            <p className="text-gray-600 text-sm">Seller: {enq.seller}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            enq.status === 'Responded' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {enq.status}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">Enquiry Date: {enq.date}</p>
                        <button className="mt-3 text-purple-600 hover:text-purple-800 font-semibold">
                          View Message →
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No enquiries yet.</p>
                )}
              </div>
            )}
          </div>
        </div>
        </div>
      </main>
    </div>
  );
};
