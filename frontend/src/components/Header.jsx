import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import {
  Menu,
  X,
  User,
  LogOut,
  LayoutDashboard,
  Heart,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

const CATEGORIES = [
  { label: 'Restaurants & Cafes', value: 'Restaurant' },
  { label: 'Retail Shops', value: 'Shop' },
  { label: 'Office Spaces', value: 'Office' },
  { label: 'Hotels & Hospitality', value: 'Hotel' },
  { label: 'Manufacturing', value: 'Factory' },
  { label: 'Warehousing', value: 'Warehouse' },
  { label: 'PG & Hostels', value: 'Pg' },
  { label: 'Running Business', value: 'Running Business' },
];

export const Header = () => {
  const { user, logout } = useAuth();
  const { savedCount } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setUserMenuOpen(false);
  };

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 120);
      return;
    }

    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Buy Business', path: '/properties' },
    { label: 'Sell Business', path: '/sell-business' },
    { label: 'Categories', dropdown: true },
    { label: 'How It Works', sectionId: 'how-it-works' },
    { label: 'Success Stories', sectionId: 'success-stories' },
    { label: 'Contact', path: '/about-us' },
  ];

  const dashboardPath =
    user?.role === 'seller'
      ? '/seller/dashboard'
      : user?.role === 'admin'
        ? '/admin/dashboard'
        : '/user/dashboard';

  const savedPath =
    user?.role === 'seller' ? '/seller/saved' : user?.role === 'admin' ? dashboardPath : '/user/saved';

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto max-w-8xl px-4 lg:px-8">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-2.5">
            <span className="rounded-lg bg-brand-gradient p-2 text-white transition-transform group-hover:scale-105">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-lg font-bold tracking-tight text-brand-800">
                Udyam Mittar
              </span>
              <span className="mt-1 text-[11px] font-medium text-slate-500">
                Buy. Sell. Grow. Locally.
              </span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <ul className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <li key={item.label} className="relative">
                {item.dropdown ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setCategoriesOpen(!categoriesOpen)}
                      onBlur={() => setTimeout(() => setCategoriesOpen(false), 150)}
                      className="flex items-center gap-1 text-sm font-medium text-slate-700 transition-colors hover:text-brand-700"
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${categoriesOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {categoriesOpen && (
                      <div className="absolute left-0 z-50 mt-3 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white py-1.5 shadow-xl shadow-slate-900/10">
                        {CATEGORIES.map((category) => (
                          <Link
                            key={category.value}
                            to={`/properties?propertyType=${encodeURIComponent(category.value)}`}
                            className="block px-4 py-2.5 text-sm text-slate-700 transition-colors hover:bg-brand-50 hover:text-brand-800"
                          >
                            {category.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : item.sectionId ? (
                  <button
                    type="button"
                    onClick={() => scrollToSection(item.sectionId)}
                    className="text-sm font-medium text-slate-700 transition-colors hover:text-brand-700"
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    className={`text-sm font-medium transition-colors hover:text-brand-700 ${
                      isActive(item.path) ? 'text-brand-800' : 'text-slate-700'
                    }`}
                  >
                    {item.label}
                    {isActive(item.path) && (
                      <span className="mt-1 block h-0.5 rounded-full bg-brand-gradient" />
                    )}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Desktop actions */}
          <div className="hidden items-center gap-4 lg:flex">
            {user?.role !== 'admin' && (
              <Link
                to={user ? savedPath : '/login'}
                className="flex items-center gap-1.5 text-sm font-medium text-slate-600 transition-colors hover:text-brand-700"
              >
                <Heart className="h-4 w-4" />
                Saved
                {savedCount > 0 && (
                  <span className="rounded-full bg-brand-gradient px-1.5 py-0.5 text-[10px] font-bold text-white">
                    {savedCount}
                  </span>
                )}
              </Link>
            )}

            {user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 transition-colors hover:border-slate-300 hover:shadow-sm"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-gradient">
                    <User className="h-4 w-4 text-white" />
                  </span>
                  <span className="text-left">
                    <span className="block text-sm font-semibold text-slate-900">
                      {user.name || user.email?.split('@')[0]}
                    </span>
                    <span className="block text-[11px] capitalize text-slate-500">{user.role}</span>
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-400 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 z-50 mt-2 w-60 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10">
                    <div className="border-b border-slate-100 p-4">
                      <div className="text-sm font-semibold text-slate-900">
                        {user.name || 'Welcome'}
                      </div>
                      <div className="truncate text-sm text-slate-500">{user.email}</div>
                    </div>
                    <div className="p-2">
                      <Link
                        to={dashboardPath}
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-slate-700 transition-colors hover:bg-brand-50 hover:text-brand-800"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                      </Link>
                    </div>
                    <div className="border-t border-slate-100 p-2">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-red-600 transition-colors hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/register"
                className="group inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-95"
              >
                List Your Business
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label="Toggle navigation"
            className="rounded-lg p-2 transition-colors hover:bg-slate-100 lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-slate-700" />
            ) : (
              <Menu className="h-6 w-6 text-slate-700" />
            )}
          </button>
        </div>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="border-t border-slate-100 pb-6 pt-4 lg:hidden">
            <div className="space-y-1">
              {navItems.map((item) =>
                item.sectionId ? (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => scrollToSection(item.sectionId)}
                    className="block w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-brand-50 hover:text-brand-800"
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    key={item.label}
                    to={item.dropdown ? '/properties' : item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-brand-50 hover:text-brand-800"
                  >
                    {item.label}
                  </Link>
                )
              )}

              {user ? (
                <>
                  <Link
                    to={dashboardPath}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-brand-50 hover:text-brand-800"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                  >
                    <User className="h-4 w-4" />
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-xl bg-brand-gradient px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-95"
                  >
                    List Your Business
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
