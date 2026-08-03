import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { DashboardSidebar } from '../../components/DashboardSidebar';
import { useAuth } from '../../context/AuthContext';

export const AdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarItems = [
    {
      title: 'Admin Panel',
      items: [
        { label: 'Dashboard', icon: '📊', path: '/admin/dashboard', onClick: () => navigate('/admin/dashboard') },
        { label: 'All Listings', icon: '🏠', path: '/admin/listings', onClick: () => navigate('/admin/listings') },
        { label: 'Add Listing', icon: '➕', path: '/admin/listings/new', onClick: () => navigate('/admin/listings/new') },
        { label: 'Sellers', icon: '👥', path: '/admin/sellers', onClick: () => navigate('/admin/sellers') },
        { label: 'Seller Requests', icon: '📝', path: '/admin/seller-leads', onClick: () => navigate('/admin/seller-leads') },
        { label: 'Users', icon: '👤', path: '/admin/users', onClick: () => navigate('/admin/users') },
        { label: 'Approve Listings', icon: '✅', path: '/admin/pending', onClick: () => navigate('/admin/pending') },
        { label: 'Recent Enquiries', icon: '📧', path: '/admin/enquiries', onClick: () => navigate('/admin/enquiries') },
        { label: 'Profile', icon: '👤', path: '/admin/profile', onClick: () => navigate('/admin/profile') },
      ],
    },
    {
      title: 'Management',
      items: [
        { label: 'Onboard Seller', icon: '➕👤', path: '/admin/sellers/onboard', onClick: () => navigate('/admin/sellers/onboard') },
        { label: 'Logout', icon: '🚪', onClick: () => logout(), danger: true },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen bg-white">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="hidden lg:block">
        <DashboardSidebar items={sidebarItems} />
      </div>
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
