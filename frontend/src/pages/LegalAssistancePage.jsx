import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Scale,
  FileText,
  CheckCircle,
  Phone,
  ArrowRight,
  Shield,
  Users,
  Gavel
} from 'lucide-react';

export const LegalAssistancePage = () => {
  const services = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Documentation',
      description: 'Complete legal documentation for property transactions',
      features: ['Sale agreements', 'Lease documents', 'Power of attorney', 'Title verification']
    },
    {
      icon: <Scale className="w-8 h-8" />,
      title: 'Legal Consultation',
      description: 'Expert legal advice for property matters',
      features: ['Property law advice', 'Dispute resolution', 'Contract review', 'Compliance guidance']
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Due Diligence',
      description: 'Comprehensive legal due diligence services',
      features: ['Title search', 'Encumbrance check', 'Legal opinion', 'Risk assessment']
    },
    {
      icon: <Gavel className="w-8 h-8" />,
      title: 'Litigation Support',
      description: 'Legal representation for property disputes',
      features: ['Court representation', 'Mediation services', 'Arbitration support', 'Settlement negotiation']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <Helmet>
        <title>Legal Assistance for Property Transactions | Real Estate Legal Services | FNAEstate</title>
        <meta name="description" content="Expert legal assistance for property transactions including documentation, title verification, due diligence, and dispute resolution. Complete legal support for buying, selling, or leasing properties." />
        <meta name="keywords" content="property legal services, real estate lawyer, property documentation, title verification, property due diligence, property legal advice, real estate legal assistance, property law" />
        <link rel="canonical" href="https://fnaestate.com/services/legal" />
        <meta property="og:title" content="Legal Assistance for Property Transactions | FNAEstate" />
        <meta property="og:description" content="Expert legal assistance including documentation, title verification, and due diligence." />
        <meta property="og:url" content="https://fnaestate.com/services/legal" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Legal Assistance for Property Transactions | FNAEstate" />
        <meta name="twitter:description" content="Expert legal assistance including documentation and title verification." />
      </Helmet>
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-24 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-2 rounded-lg">
              <Scale className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-medium text-slate-300">LEGAL SERVICES</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Legal Assistance
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-300">
              For Property Matters
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
            Expert legal support for all your property-related legal needs. Trusted by thousands of property owners and investors.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Our <span className="text-amber-600">Legal Services</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
          <h2 className="text-4xl font-bold mb-6">Need Legal Assistance?</h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Consult with our expert legal team for all property-related matters
          </p>
          <Link
            to="/contact"
            className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all inline-flex items-center gap-3 group"
          >
            <Phone className="w-5 h-5" />
            Consult Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};
