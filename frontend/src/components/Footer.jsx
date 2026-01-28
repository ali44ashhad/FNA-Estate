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
    { label: 'Factory Units', path: '/properties?type=Factory' },
    { label: 'Warehouse Space', path: '/properties?type=Warehouse' },
    { label: 'PG Accommodation', path: '/properties?type=Pg' },
    { label: 'Running Business', path: '/properties?type=Running Business' },
  ];
  

  const services = [
    { label: 'Loan Assistance', path: '/services/loan-assistance' },
    { label: 'Property Consultation', path: '/services/consultation' },
    { label: 'Property Management', path: '/services/management' },
    { label: 'Investment Guide', path: '/investment-guide' },
    { label: 'Property Valuation', path: '/services/valuation' },
    { label: 'Legal Assistance', path: '/services/legal' },
  ];
  

  const legal = [
    { label: 'Privacy Policy', path: '/privacy-policy' },
    { label: 'Terms of Service', path: '/terms-of-service' },
    { label: 'Cookie Policy', path: '/cookie-policy' },
    { label: 'Disclaimer', path: '/disclaimer' },
    { label: 'GDPR Compliance', path: '/gdpr' },
    { label: 'Fair Housing Policy', path: '/fair-housing' },
   
  ];

  const socialLinks = [
    { platform: 'Facebook', icon: <Facebook />, color: 'hover:text-[#1877F2]' },
    { platform: 'Twitter', icon: <Twitter />, color: 'hover:text-[#1DA1F2]' },
    { platform: 'Instagram', icon: <Instagram />, color: 'hover:text-[#E4405F]' },
    { platform: 'LinkedIn', icon: <Linkedin />, color: 'hover:text-[#0A66C2]' },
    { platform: 'YouTube', icon: <Youtube />, color: 'hover:text-[#FF0000]' },
  ];

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 border-t-2 border-slate-800 text-white">
      <div className="max-w-8xl mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">

          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-amber-500 p-2 rounded-xl">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold">FNAEstate</span>
                <p className="text-sm text-slate-400">Luxury Real Estate</p>
              </div>
            </div>

            <p className="text-slate-300 max-w-md">
              TriCity's premier luxury real estate platform connecting discerning
              clients with exceptional properties.
            </p>

            {/* Social */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href="#"
                    aria-label={social.platform}
                    className={`w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 ${social.color} hover:bg-slate-700 transition`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6 pb-2 border-b border-slate-800 flex items-center gap-2">
                <Home className="w-5 h-5 text-amber-400" />
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-slate-400 hover:text-amber-400 text-sm transition"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-6 pb-2 border-b flex gap-2 items-center border-slate-800">
              <Building2 className="w-5 h-5 text-amber-400" />
                Premium Services
              </h4>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.label}>
                    <Link
                      to={service.path}
                      className="text-slate-400 hover:text-amber-400 text-sm transition"
                    >
                      {service.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-lg font-semibold mb-6 pb-2 border-b border-slate-800 flex items-center gap-2">
                <Shield className="w-5 h-5 text-amber-400" />
                Legal
              </h4>
              <ul className="space-y-3">
                {legal.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.path}
                      className="text-slate-400 hover:text-amber-400 text-sm transition"
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
        <div className="pt-8 border-t border-slate-800 text-center text-slate-400 text-sm">
          © {new Date().getFullYear()} FNAEstate. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
