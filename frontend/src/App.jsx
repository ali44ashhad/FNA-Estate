import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ReturnToTop } from './components/ReturnToTop';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { PropertiesPage } from './pages/PropertiesPage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { SellBusinessPage } from './pages/SellBusinessPage';
import { FeaturesPage } from './pages/FeaturesPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsOfServicePage } from './pages/TermsOfServicePage';
import { CookiePolicyPage } from './pages/CookiePolicyPage';
import { LoanAssistancePage } from './pages/LoanAssistancePage';
import { PropertyConsultationPage } from './pages/PropertyConsultationPage';
import { PropertyManagementPage } from './pages/PropertyManagementPage';
import { InvestmentGuidePage } from './pages/InvestmentGuidePage';
import { PropertyValuationPage } from './pages/PropertyValuationPage';
import { LegalAssistancePage } from './pages/LegalAssistancePage';
import { DisclaimerPage } from './pages/DisclaimerPage';
import { GDPRCompliancePage } from './pages/GDPRCompliancePage';
import { FairHousingPolicyPage } from './pages/FairHousingPolicyPage';

import { AdminLayout } from './pages/admin/AdminLayout';
import { StatsPage } from './pages/admin/StatsPage';
import { PendingApprovalsPage } from './pages/admin/PendingApprovalsPage';
import { AllListingsPage } from './pages/admin/AllListingsPage';
import { SellersPage } from './pages/admin/SellersPage';
import { OnboardSellerPage } from './pages/admin/OnboardSellerPage';
import { SellerLeadsPage } from './pages/admin/SellerLeadsPage';
import { UsersPage } from './pages/admin/UsersPage';
import { EnquiriesPage } from './pages/admin/EnquiriesPage';

import { SellerLayout } from './pages/seller/SellerLayout';
import { SellerOverviewPage } from './pages/seller/OverviewPage';
import { SellerListingsPage } from './pages/seller/ListingsPage';
import { AddListingPage } from './pages/seller/AddListingPage';

import { UserLayout } from './pages/user/UserLayout';
import { UserOverviewPage } from './pages/user/OverviewPage';
import { ProfilePage } from './pages/user/ProfilePage';
import { MyEnquiriesPage } from './pages/user/MyEnquiriesPage';

import { SavedListingsPage } from './pages/shared/SavedListingsPage';

import './index.css';

const SellerRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="spinner"></div>;
  if (!user || user.role !== 'seller') return <Navigate to="/login" />;
  return children;
};

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="spinner"></div>;
  if (!user || user.role !== 'admin') return <Navigate to="/login" />;
  return children;
};

const UserRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="spinner"></div>;
  if (!user) return <Navigate to="/login" />;
  return children;
};

const RegularUserRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="spinner"></div>;
  if (!user || user.role !== 'user') return <Navigate to="/login" />;
  return children;
};

const ProfileRedirect = () => {
  const { user, loading } = useAuth();
  if (loading) return <div className="spinner"></div>;
  if (!user) return <Navigate to="/login" />;
  if (user.role === 'admin') return <Navigate to="/admin/profile" />;
  if (user.role === 'seller') return <Navigate to="/seller/profile" />;
  return <Navigate to="/user/profile" />;
};

function AppContent() {
  const { loading } = useAuth();
  if (loading) return <div className="spinner"></div>;

  return (
    <Router>
      <WishlistProvider>
        <ScrollToTop />
        <Header />
        <main>
          <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/property/:id" element={<PropertyDetailPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          <Route path="/cookie-policy" element={<CookiePolicyPage />} />
          <Route path="/disclaimer" element={<DisclaimerPage />} />
          <Route path="/gdpr" element={<GDPRCompliancePage />} />
          <Route path="/fair-housing" element={<FairHousingPolicyPage />} />

          <Route path="/services/loan-assistance" element={<LoanAssistancePage />} />
          <Route path="/services/consultation" element={<PropertyConsultationPage />} />
          <Route path="/services/management" element={<PropertyManagementPage />} />
          <Route path="/services/valuation" element={<PropertyValuationPage />} />
          <Route path="/services/legal" element={<LegalAssistancePage />} />
          <Route path="/investment-guide" element={<InvestmentGuidePage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/sell-business" element={<SellBusinessPage />} />

          <Route path="/profile" element={<UserRoute><ProfileRedirect /></UserRoute>} />

          {/* Admin nested routes */}
          <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<StatsPage />} />
            <Route path="listings" element={<AllListingsPage />} />
            <Route path="listings/new" element={<AddListingPage />} />
            <Route path="listings/:id/edit" element={<AddListingPage />} />
            <Route path="sellers" element={<SellersPage />} />
            <Route path="sellers/onboard" element={<OnboardSellerPage />} />
            <Route path="seller-leads" element={<SellerLeadsPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="pending" element={<PendingApprovalsPage />} />
            <Route path="enquiries" element={<EnquiriesPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          {/* Seller nested routes */}
          <Route path="/seller" element={<SellerRoute><SellerLayout /></SellerRoute>}>
            <Route index element={<Navigate to="/seller/dashboard" replace />} />
            <Route path="dashboard" element={<SellerOverviewPage />} />
            <Route path="listings" element={<SellerListingsPage />} />
            <Route path="listings/new" element={<AddListingPage />} />
            <Route path="saved" element={<SavedListingsPage />} />
            <Route path="enquiries" element={<MyEnquiriesPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          {/* User nested routes */}
          <Route path="/user" element={<RegularUserRoute><UserLayout /></RegularUserRoute>}>
            <Route index element={<Navigate to="/user/dashboard" replace />} />
            <Route path="dashboard" element={<UserOverviewPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="enquiries" element={<MyEnquiriesPage />} />
            <Route path="saved" element={<SavedListingsPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
        <ReturnToTop />
      </WishlistProvider>
    </Router>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
