import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { DashboardSidebar } from '../components/DashboardSidebar';
import { Loading } from '../components/Loading';
import {
  Eye,
  MessageSquare,
  Heart,
  Calendar,
  User,
  Shield,
  Settings,
  Bell,
  Edit,
  Lock,
  CheckCircle,
  Clock,
  Download
} from 'lucide-react';

export const UserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [profileEditing, setProfileEditing] = useState(false);

  const stats = [
    { label: 'Properties Viewed', value: '24', icon: <Eye className="w-6 h-6 text-blue-600" />, color: 'from-blue-50 to-blue-100' },
    { label: 'Enquiries Sent', value: '5', icon: <MessageSquare className="w-6 h-6 text-purple-600" />, color: 'from-purple-50 to-purple-100' },
    { label: 'Favorites Saved', value: '8', icon: <Heart className="w-6 h-6 text-rose-600" />, color: 'from-rose-50 to-rose-100' },
    { label: 'Account Age', value: '3 months', icon: <Calendar className="w-6 h-6 text-emerald-600" />, color: 'from-emerald-50 to-emerald-100' },
  ];

  const recentActivities = [
    { type: 'viewed', property: 'Luxury Apartment', date: '2 hours ago' },
    { type: 'enquired', property: 'Modern Villa', date: 'Yesterday' },
    { type: 'saved', property: '2 BHK Flat', date: '2 days ago' },
  ];

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    // API call would go here
    setTimeout(() => {
      setLoading(false);
      setProfileEditing(false);
    }, 1000);
  };

  if (loading) return <Loading />;

  const sidebarItems = [
    {
      items: [
        { label: 'Overview', path: '/user/dashboard', icon: '👤', onClick: () => setActiveTab('profile'), active: activeTab === 'profile' },
        { label: 'Security Settings', path: '/user/dashboard', icon: '🔐', onClick: () => setActiveTab('security'), active: activeTab === 'security' },
        { label: 'Preferences', path: '/user/dashboard', icon: '⚙️', onClick: () => setActiveTab('preferences'), active: activeTab === 'preferences' },
        { label: 'Notifications', path: '/user/dashboard', icon: '🔔', onClick: () => setActiveTab('notifications'), active: activeTab === 'notifications' },
        { label: 'Logout', path: '/', icon: '🚪', onClick: () => logout() },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <Helmet>
        <title>User Dashboard | FNAEstate</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      {/* Sidebar */}
      <div className="hidden md:block">
        <DashboardSidebar items={sidebarItems} title="User Dashboard" />
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header - Only show on Overview */}
        {activeTab === 'profile' && (
          <div className="bg-white border-b border-slate-200 p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">User Dashboard</h1>
                <p className="text-slate-600 mt-2">Manage your profile, preferences, and activity</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards - Only show on Overview */}
        {activeTab === 'profile' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 bg-gradient-to-r ${stat.color} rounded-xl`}>
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mb-2">{stat.value}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Main Content Area */}
            <div className="space-y-6">
              {/* Profile Tab */}
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                <div className="p-8">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">Personal Information</h2>
                      <p className="text-slate-600 mt-1">Manage your account details</p>
                    </div>
                    <button
                      onClick={() => setProfileEditing(!profileEditing)}
                      className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      {profileEditing ? 'Cancel' : 'Edit'}
                    </button>
                  </div>

                  {profileEditing ? (
                    <form onSubmit={handleUpdateProfile} className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-3">Full Name</label>
                        <input
                          type="text"
                          value={userData.name}
                          onChange={(e) => setUserData({...userData, name: e.target.value})}
                          className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-3">Email</label>
                        <input
                          type="email"
                          value={userData.email}
                          onChange={(e) => setUserData({...userData, email: e.target.value})}
                          className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-3">Phone</label>
                        <input
                          type="tel"
                          value={userData.phone}
                          onChange={(e) => setUserData({...userData, phone: e.target.value})}
                          className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-3 rounded-xl hover:shadow-xl transition-all font-semibold"
                      >
                        Save Changes
                      </button>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div className="border-b border-slate-200 pb-4">
                        <p className="text-slate-600 text-sm mb-1">Full Name</p>
                        <p className="font-semibold text-slate-900 text-lg">{userData.name}</p>
                      </div>
                      <div className="border-b border-slate-200 pb-4">
                        <p className="text-slate-600 text-sm mb-1">Email Address</p>
                        <p className="font-semibold text-slate-900 text-lg">{userData.email}</p>
                      </div>
                      <div className="border-b border-slate-200 pb-4">
                        <p className="text-slate-600 text-sm mb-1">Phone Number</p>
                        <p className="font-semibold text-slate-900 text-lg">{userData.phone || 'Not provided'}</p>
                      </div>
                      <div>
                        <p className="text-slate-600 text-sm mb-1">Account Type</p>
                        <span className="inline-block px-3 py-1 bg-gradient-to-r from-amber-50 to-amber-100 text-amber-800 rounded-full text-sm font-semibold capitalize">
                          {user?.role || 'user'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Security Settings</h1>
              <p className="text-slate-600">Manage your account security and privacy</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="p-8">
                <div className="space-y-4">
                  <div className="border-2 border-slate-200 rounded-xl p-6 flex justify-between items-center hover:border-amber-300 transition-colors">
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Change Password</h3>
                      <p className="text-slate-600 text-sm">Update your password regularly for better security</p>
                    </div>
                    <button className="px-6 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl hover:shadow-lg transition-all font-semibold">
                      Change
                    </button>
                  </div>
                  <div className="border-2 border-slate-200 rounded-xl p-6 flex justify-between items-center hover:border-amber-300 transition-colors">
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Two-Factor Authentication</h3>
                      <p className="text-slate-600 text-sm">Add extra security to your account</p>
                    </div>
                    <button className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl hover:shadow-lg transition-all font-semibold">
                      Enable
                    </button>
                  </div>
                  <div className="border-2 border-slate-200 rounded-xl p-6 flex justify-between items-center hover:border-amber-300 transition-colors">
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Active Sessions</h3>
                      <p className="text-slate-600 text-sm">Manage your logged in devices</p>
                    </div>
                    <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg transition-all font-semibold">
                      View
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Preferences Tab */}
        {activeTab === 'preferences' && (
          <div className="p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Preferences</h1>
              <p className="text-slate-600">Customize your account preferences</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="p-8">
                <div className="space-y-4">
                  <label className="flex items-center gap-4 p-4 border-2 border-slate-200 rounded-xl hover:border-amber-300 transition-colors cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-5 h-5 text-amber-600 rounded focus:ring-amber-500" />
                    <div>
                      <span className="font-semibold text-slate-900 block">Show my profile to other users</span>
                      <span className="text-sm text-slate-600">Allow others to view your public profile</span>
                    </div>
                  </label>
                  <label className="flex items-center gap-4 p-4 border-2 border-slate-200 rounded-xl hover:border-amber-300 transition-colors cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-5 h-5 text-amber-600 rounded focus:ring-amber-500" />
                    <div>
                      <span className="font-semibold text-slate-900 block">Allow sellers to contact me</span>
                      <span className="text-sm text-slate-600">Enable sellers to send you messages</span>
                    </div>
                  </label>
                  <label className="flex items-center gap-4 p-4 border-2 border-slate-200 rounded-xl hover:border-amber-300 transition-colors cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 text-amber-600 rounded focus:ring-amber-500" />
                    <div>
                      <span className="font-semibold text-slate-900 block">Make profile private</span>
                      <span className="text-sm text-slate-600">Hide your profile from public view</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Notification Preferences</h1>
              <p className="text-slate-600">Manage how you receive notifications</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="p-8">
                <div className="space-y-4 mb-8">
                  <label className="flex items-center gap-4 p-4 border-2 border-slate-200 rounded-xl hover:border-amber-300 transition-colors cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-5 h-5 text-amber-600 rounded focus:ring-amber-500" />
                    <div>
                      <span className="font-semibold text-slate-900 block">Email notifications for new properties</span>
                      <span className="text-sm text-slate-600">Get notified when new properties match your preferences</span>
                    </div>
                  </label>
                  <label className="flex items-center gap-4 p-4 border-2 border-slate-200 rounded-xl hover:border-amber-300 transition-colors cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-5 h-5 text-amber-600 rounded focus:ring-amber-500" />
                    <div>
                      <span className="font-semibold text-slate-900 block">SMS notifications for seller responses</span>
                      <span className="text-sm text-slate-600">Receive SMS when sellers respond to your enquiries</span>
                    </div>
                  </label>
                  <label className="flex items-center gap-4 p-4 border-2 border-slate-200 rounded-xl hover:border-amber-300 transition-colors cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 text-amber-600 rounded focus:ring-amber-500" />
                    <div>
                      <span className="font-semibold text-slate-900 block">Push notifications</span>
                      <span className="text-sm text-slate-600">Enable browser push notifications</span>
                    </div>
                  </label>
                  <label className="flex items-center gap-4 p-4 border-2 border-slate-200 rounded-xl hover:border-amber-300 transition-colors cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-5 h-5 text-amber-600 rounded focus:ring-amber-500" />
                    <div>
                      <span className="font-semibold text-slate-900 block">Marketing emails and offers</span>
                      <span className="text-sm text-slate-600">Receive promotional emails and special offers</span>
                    </div>
                  </label>
                </div>
                
                {/* Recent Activity Section */}
                <div className="pt-8 border-t border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">Recent Activity</h3>
                  <div className="space-y-3">
                    {recentActivities.map((activity, idx) => (
                      <div key={idx} className="border-2 border-slate-200 rounded-xl p-4 hover:border-amber-300 transition-colors">
                        <div className="flex items-center gap-3">
                          {activity.type === 'viewed' && <Eye className="w-5 h-5 text-blue-600" />}
                          {activity.type === 'enquired' && <MessageSquare className="w-5 h-5 text-purple-600" />}
                          {activity.type === 'saved' && <Heart className="w-5 h-5 text-rose-600" />}
                          <div className="flex-1">
                            <p className="font-semibold text-slate-900 capitalize">
                              {activity.type === 'viewed' && 'Viewed'} 
                              {activity.type === 'enquired' && 'Enquired'} 
                              {activity.type === 'saved' && 'Saved'} 
                              {' '}{activity.property}
                            </p>
                            <p className="text-slate-600 text-sm">{activity.date}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
