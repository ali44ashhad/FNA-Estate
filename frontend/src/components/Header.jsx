import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Home,
  Building2,
  Star,
  Menu,
  X,
  User,
  LogOut,
  LayoutDashboard,
  Shield,
  Search,
  Phone,
  ChevronDown,
  Globe
} from 'lucide-react';

export const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [propertiesMenuOpen, setPropertiesMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setUserMenuOpen(false);
  };

  const navItems = [
    { label: 'Home', path: '/', icon: <Home className="w-4 h-4" /> },
    {
      label: 'Properties',
      path: '/properties',
      icon: <Building2 className="w-4 h-4" />,
       
    },
   
    { label: 'Features', path: '/features', icon: <Shield className="w-4 h-4" /> },
    
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-slate-200/50 shadow-lg sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-4 lg:px-8">
      
        {/* Main Header */}
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-2 rounded-xl group-hover:scale-105 transition-transform">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-slate-900 tracking-tight">FNAEstate</span>
              <span className="text-xs text-slate-500 font-medium">Luxury Real Estate</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <ul className="flex gap-8 items-center">
              {navItems.map((item) => (
                <li key={item.label} className="relative group">
                  {item.submenu ? (
                    <>
                      <button
                        onClick={() => setPropertiesMenuOpen(!propertiesMenuOpen)}
                        className="flex items-center gap-2 text-slate-700 hover:text-amber-600 font-medium transition-colors group"
                      >
                        {item.icon}
                        {item.label}
                        <ChevronDown className={`w-4 h-4 transition-transform ${propertiesMenuOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {propertiesMenuOpen && (
                        <div className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden animate-slideDown">
                          {item.submenu.map((subitem) => (
                            <Link
                              key={subitem.label}
                              to={subitem.path}
                              className="flex items-center gap-3 px-4 py-3 hover:bg-amber-50 text-slate-700 hover:text-amber-700 transition-colors border-b border-slate-100 last:border-0"
                            >
                              <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
                              {subitem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      className="flex items-center gap-2 text-slate-700 hover:text-amber-600 font-medium transition-colors group"
                    >
                      {item.icon}
                      {item.label}
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-amber-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            {/* Search */}
            {/* <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search properties..."
                className="pl-12 pr-4 py-2.5 w-64 border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all bg-white"
              />
            </div> */}

            {/* Auth Buttons */}
            {!user ? (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="text-slate-700 hover:text-amber-600 font-medium transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Get Started
                </Link>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-xl hover:shadow-md transition-all group"
                >
                  <div className="w-9 h-9 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-slate-900">
                      {user.name || user.email?.split('@')[0]}
                    </div>
                    <div className="text-xs text-slate-500 capitalize">{user.role}</div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden animate-slideDown">
                    <div className="p-4 border-b border-slate-100">
                      <div className="font-semibold text-slate-900">{user.name || 'Welcome'}</div>
                      <div className="text-sm text-slate-500">{user.email}</div>
                    </div>
                    
                    <div className="p-2">
                      <Link
                        to={
                          user.role === 'seller' ? '/seller/dashboard' :
                          user.role === 'admin' ? '/admin/dashboard' :
                          '/user/dashboard'
                        }
                        className="flex items-center gap-3 px-4 py-3 hover:bg-amber-50 rounded-lg text-slate-700 hover:text-amber-700 transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <LayoutDashboard className="w-5 h-5" />
                        Dashboard
                      </Link>
                      
                      
                      
                      {user.role === 'user' && (
                        <Link
                          to="/saved"
                          className="flex items-center gap-3 px-4 py-3 hover:bg-amber-50 rounded-lg text-slate-700 hover:text-amber-700 transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <Star className="w-5 h-5" />
                          Saved Properties
                        </Link>
                      )}
                      
                     
                    </div>
                    
                    <div className="p-2 border-t border-slate-100">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 hover:bg-red-50 rounded-lg text-red-600 hover:text-red-700 transition-colors"
                      >
                        <LogOut className="w-5 h-5" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-slate-700" />
            ) : (
              <Menu className="w-6 h-6 text-slate-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 pt-4 pb-6 animate-slideDown">
            {/* <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search properties..."
                  className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500 bg-white"
                />
              </div>
            </div> */}

            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-amber-50 text-slate-700 hover:text-amber-700 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
              
              {user ? (
                <>
                  <Link
                    to={
                      user.role === 'seller' ? '/seller/dashboard' :
                      user.role === 'admin' ? '/admin/dashboard' :
                      '/user/dashboard'
                    }
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-amber-50 text-slate-700 hover:text-amber-700 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <LayoutDashboard className="w-5 h-5" />
                    Dashboard
                  </Link>
                  
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-amber-50 text-slate-700 hover:text-amber-700 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="w-5 h-5" />
                    Profile
                  </Link>
                  
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="w-5 h-5" />
                    Sign In
                  </Link>
                  
                  <Link
                    to="/register"
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 text-white hover:shadow-md transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
            
            <div className="mt-6 pt-6 border-t border-slate-200">
              <a href="tel:+919876543210" className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-50 text-slate-700 font-medium">
                <Phone className="w-5 h-5" />
                Call Premium Support
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};