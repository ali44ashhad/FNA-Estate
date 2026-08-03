import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { DashboardSidebar } from '../../components/DashboardSidebar';
import { useAuth } from '../../context/AuthContext';

export const SellerLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarItems = [
    {
      title: 'Seller Panel',
      items: [
        { label: 'Dashboard Overview', icon: '📊', path: '/seller/dashboard', onClick: () => navigate('/seller/dashboard') },
        { label: 'Add New Listing', icon: '➕', path: '/seller/listings/new', onClick: () => navigate('/seller/listings/new') },
        { label: 'Active Listings', icon: '✅', path: '/seller/listings?status=active', onClick: () => navigate('/seller/listings?status=active') },
        { label: 'Pending Approval', icon: '⏳', path: '/seller/listings?status=pending', onClick: () => navigate('/seller/listings?status=pending') },
        { label: 'Saved Businesses', icon: '❤️', path: '/seller/saved', onClick: () => navigate('/seller/saved') },
        { label: 'My Enquiries', icon: '📧', path: '/seller/enquiries', onClick: () => navigate('/seller/enquiries') },
        { label: 'Profile', icon: '👤', path: '/seller/profile', onClick: () => navigate('/seller/profile') },
        { label: 'Logout', icon: '🚪', onClick: () => logout(), danger: true },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen bg-white">
      <Helmet><meta name="robots" content="noindex, nofollow" /></Helmet>
      <div className="hidden md:block">
        <DashboardSidebar items={sidebarItems} />
      </div>
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
