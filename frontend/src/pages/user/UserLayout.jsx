import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { DashboardSidebar } from '../../components/DashboardSidebar';
import { useAuth } from '../../context/AuthContext';

export const UserLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const sidebarItems = [
    {
      title: 'User Panel',
      items: [
        { label: 'Overview', icon: '📊', path: '/user/dashboard', onClick: () => navigate('/user/dashboard') },
        { label: 'Profile', icon: '👤', path: '/user/profile', onClick: () => navigate('/user/profile') },
        { label: 'My Enquiries', icon: '📧', path: '/user/enquiries', onClick: () => navigate('/user/enquiries') },
        { label: 'Saved Businesses', icon: '❤️', path: '/user/saved', onClick: () => navigate('/user/saved') },
      ],
    },
    {
      title: 'Explore',
      items: [
        { label: 'Browse Businesses', icon: '🏠', path: '/properties', onClick: () => navigate('/properties') },
        { label: 'Logout', icon: '🚪', onClick: () => logout(), danger: true },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen bg-white">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="hidden md:block">
        <DashboardSidebar items={sidebarItems} />
      </div>
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
