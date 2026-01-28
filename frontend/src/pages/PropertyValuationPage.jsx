import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Calculator,
  FileText,
  CheckCircle,
  Phone,
  ArrowRight,
  Award,
  Shield,
  TrendingUp
} from 'lucide-react';

export const PropertyValuationPage = () => {
  const services = [
    {
      icon: <Calculator className="w-8 h-8" />,
      title: 'Property Valuation',
      description: 'Accurate property valuation for buying, selling, or insurance',
      features: ['Market value assessment', 'Detailed reports', 'RERA compliant', 'Quick turnaround']
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Legal Documentation',
      description: 'Complete documentation support for property transactions',
      features: ['Title verification', 'Document review', 'Legal compliance', 'Registration support']
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Due Diligence',
      description: 'Comprehensive property due diligence services',
      features: ['Title search', 'Encumbrance check', 'Legal opinion', 'Risk assessment']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <Helmet>
        <title>Property Valuation Services | Accurate Property Assessment | FNAEstate</title>
        <meta name="description" content="Get accurate property valuation for buying, selling, or insurance. RERA compliant property assessment with detailed reports. Expert valuation services for residential and commercial properties." />
        <meta name="keywords" content="property valuation, property assessment, property price evaluation, real estate valuation, property appraisal, property value, RERA valuation, property inspection" />
        <link rel="canonical" href="https://fnaestate.com/services/valuation" />
        <meta property="og:title" content="Property Valuation Services | FNAEstate" />
        <meta property="og:description" content="Accurate property valuation with RERA compliant reports for buying, selling, or insurance." />
        <meta property="og:url" content="https://fnaestate.com/services/valuation" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Property Valuation Services | FNAEstate" />
        <meta name="twitter:description" content="Accurate property valuation with RERA compliant reports." />
      </Helmet>
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-24 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-2 rounded-lg">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-medium text-slate-300">PROFESSIONAL VALUATION</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Property Valuation
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-300">
              Services
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
            Get accurate property valuations from certified valuers. Trusted by banks, investors, and property owners.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Our <span className="text-amber-600">Valuation Services</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-slate-200 p-8 hover:shadow-2xl hover:border-amber-200 transition-all duration-300"
            >
              <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 mb-6">
                <div className="text-white">{service.icon}</div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">{service.title}</h3>
              <p className="text-slate-600 mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-slate-700">
                    <CheckCircle className="w-4 h-4 text-amber-600" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Get Your Property Valued</h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Professional valuation services with certified valuers
          </p>
          <Link
            to="/contact"
            className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all inline-flex items-center gap-3 group"
          >
            <Phone className="w-5 h-5" />
            Request Valuation
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};
