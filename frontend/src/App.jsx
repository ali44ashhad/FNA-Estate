import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ReturnToTop } from './components/ReturnToTop';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { PropertiesPage } from './pages/PropertiesPage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { SellerDashboard } from './pages/SellerDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { BuyerDashboard } from './pages/BuyerDashboard';
import { UserDashboard } from './pages/UserDashboard';
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
import './index.css';

// Protected route for sellers
const SellerRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="spinner"></div>;
  if (!user || user.role !== 'seller') {
    return <Navigate to="/login" />;
  }

  return children;
};

// Protected route for admin
const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="spinner"></div>;
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  return children;
};

// Protected route for buyer
const BuyerRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="spinner"></div>;
  if (!user || user.role !== 'user') {
    return <Navigate to="/login" />;
  }

  return children;
};

// Protected route for any authenticated user
const UserRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="spinner"></div>;
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

// Profile redirect based on user role
const ProfileRedirect = () => {
  const { user, loading } = useAuth();

  if (loading) return <div className="spinner"></div>;
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Redirect to appropriate dashboard based on role
  if (user.role === 'admin') {
    return <Navigate to="/admin/dashboard" />;
  } else if (user.role === 'seller') {
    return <Navigate to="/seller/dashboard" />;
  } else {
    return <Navigate to="/user/dashboard" />;
  }
};

function AppContent() {
  const { loading } = useAuth();

  if (loading) {
    return <div className="spinner"></div>;
  }

  return (
    <Router>
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
          
          {/* Service Pages */}
          <Route path="/services/loan-assistance" element={<LoanAssistancePage />} />
          <Route path="/services/consultation" element={<PropertyConsultationPage />} />
          <Route path="/services/management" element={<PropertyManagementPage />} />
          <Route path="/services/valuation" element={<PropertyValuationPage />} />
          <Route path="/services/legal" element={<LegalAssistancePage />} />
          <Route path="/investment-guide" element={<InvestmentGuidePage />} />
          
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Profile Route - Redirects to appropriate dashboard */}
          <Route
            path="/profile"
            element={
              <UserRoute>
                <ProfileRedirect />
              </UserRoute>
            }
          />

          {/* Buyer Routes */}
          <Route
            path="/buyer/dashboard"
            element={
              <BuyerRoute>
                <BuyerDashboard />
              </BuyerRoute>
            }
          />

          {/* User Routes */}
          <Route
            path="/user/dashboard"
            element={
              <UserRoute>
                <UserDashboard />
              </UserRoute>
            }
          />

          {/* Seller Routes */}
          <Route
            path="/seller/dashboard"
            element={
              <SellerRoute>
                <SellerDashboard />
              </SellerRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
      <ReturnToTop />
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
