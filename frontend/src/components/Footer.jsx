import React from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  Building2,
  Shield,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
} from 'lucide-react';

export const Footer = () => {
  const quickLinks = [
    { label: 'Home Page', path: '/' },
    { label: 'About Company', path: '/about-us' },
    { label: 'Restaurants & Cafes', path: '/properties?propertyType=Restaurant' },
    { label: 'Retail Shops', path: '/properties?propertyType=Shop' },
    { label: 'PG Accommodation', path: '/properties?propertyType=Pg' },
    { label: 'Running Business', path: '/properties?propertyType=Running Business' },
  ];

  const services = [
    { label: 'Loan Assistance', path: '/services/loan-assistance' },
    { label: 'Business Consultation', path: '/services/consultation' },
    { label: 'Business Management', path: '/services/management' },
    { label: 'Investment Guide', path: '/investment-guide' },
    { label: 'Business Valuation', path: '/services/valuation' },
    { label: 'Legal Assistance', path: '/services/legal' },
  ];

  const legal = [
    { label: 'Privacy Policy', path: '/privacy-policy' },
    { label: 'Terms of Service', path: '/terms-of-service' },
    { label: 'Cookie Policy', path: '/cookie-policy' },
    { label: 'Disclaimer', path: '/disclaimer' },
    { label: 'GDPR Compliance', path: '/gdpr' },
    { label: 'Equal Opportunity Policy', path: '/fair-housing' },
  ];

  const socialLinks = [
    { platform: 'Facebook', icon: Facebook, color: 'hover:text-[#1877F2]' },
    { platform: 'Twitter', icon: Twitter, color: 'hover:text-[#1DA1F2]' },
    { platform: 'Instagram', icon: Instagram, color: 'hover:text-[#E4405F]' },
    { platform: 'LinkedIn', icon: Linkedin, color: 'hover:text-[#0A66C2]' },
    { platform: 'YouTube', icon: Youtube, color: 'hover:text-[#FF0000]' },
  ];

  return (
    <footer className="border-t border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 text-white">
      <div className="mx-auto max-w-8xl px-4 py-12 lg:px-8 lg:py-14">
        <div className="mb-12 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-brand-gradient p-2">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight">Udyam Mittar</span>
                <p className="text-[11px] font-medium text-slate-400">Buy. Sell. Grow. Locally.</p>
              </div>
            </div>

            <p className="max-w-md text-sm leading-relaxed text-slate-400">
              Tricity's trusted business exchange platform, connecting local buyers and sellers of
              running businesses across Chandigarh, Mohali & Panchkula.
            </p>

            {/* Social */}
            <div>
              <h4 className="mb-3 text-sm font-semibold text-slate-200">Connect With Us</h4>
              <div className="flex gap-3">
                {socialLinks.map(({ platform, icon: Icon, color }) => (
                  <a
                    key={platform}
                    href="#"
                    aria-label={platform}
                    className={`flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-slate-400 transition-colors hover:bg-slate-700 ${color}`}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
            <div>
              <h4 className="mb-4 flex items-center gap-2 border-b border-slate-800 pb-2 text-sm font-semibold text-slate-200">
                <Home className="h-4 w-4 text-brand-400" />
                Quick Links
              </h4>
              <ul className="space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-sm text-slate-400 transition-colors hover:text-brand-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4 flex items-center gap-2 border-b border-slate-800 pb-2 text-sm font-semibold text-slate-200">
                <Building2 className="h-4 w-4 text-brand-400" />
                Our Services
              </h4>
              <ul className="space-y-2.5">
                {services.map((service) => (
                  <li key={service.label}>
                    <Link
                      to={service.path}
                      className="text-sm text-slate-400 transition-colors hover:text-brand-300"
                    >
                      {service.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4 flex items-center gap-2 border-b border-slate-800 pb-2 text-sm font-semibold text-slate-200">
                <Shield className="h-4 w-4 text-brand-400" />
                Legal
              </h4>
              <ul className="space-y-2.5">
                {legal.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.path}
                      className="text-sm text-slate-400 transition-colors hover:text-brand-300"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Udyam Mittar. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
