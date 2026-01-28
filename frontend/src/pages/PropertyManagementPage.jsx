import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Building2,
  Shield,
  CheckCircle,
  Phone,
  ArrowRight,
  Wrench,
  Users,
  DollarSign,
  Calendar,
  FileText
} from 'lucide-react';

export const PropertyManagementPage = () => {
  const services = [
    {
      icon: <Building2 className="w-8 h-8" />,
      title: 'Property Maintenance',
      description: 'Complete maintenance and repair services for your property',
      features: ['24/7 maintenance support', 'Regular inspections', 'Vendor management', 'Emergency repairs']
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: 'Rent Collection',
      description: 'Efficient rent collection and financial management',
      features: ['Automated reminders', 'Online payment gateway', 'Financial reporting', 'Tax documentation']
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Tenant Management',
      description: 'Professional tenant screening and relationship management',
      features: ['Tenant verification', 'Lease management', 'Dispute resolution', 'Vacancy management']
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Legal Compliance',
      description: 'Ensure your property meets all legal requirements',
      features: ['RERA compliance', 'Documentation', 'Legal support', 'Regulatory updates']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <Helmet>
        <title>Property Management Services | Complete Property Care | FNAEstate</title>
        <meta name="description" content="Professional property management services including maintenance, rent collection, tenant management, and financial reporting. 24/7 support for property owners. Trusted property management solutions." />
        <meta name="keywords" content="property management, property maintenance, rent collection, tenant management, property care, property services, real estate management, property management company" />
        <link rel="canonical" href="https://fnaestate.com/services/management" />
        <meta property="og:title" content="Property Management Services | FNAEstate" />
        <meta property="og:description" content="Professional property management including maintenance, rent collection, and tenant management." />
        <meta property="og:url" content="https://fnaestate.com/services/management" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Property Management Services | FNAEstate" />
        <meta name="twitter:description" content="Professional property management including maintenance and rent collection." />
      </Helmet>
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-24 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-2 rounded-lg">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-medium text-slate-300">PROFESSIONAL PROPERTY MANAGEMENT</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Property Management
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-300">
              Services
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
            Comprehensive property management solutions to maximize your investment returns and minimize your hassle.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Our <span className="text-amber-600">Management Services</span>
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
          <h2 className="text-4xl font-bold mb-6">Get Professional Property Management</h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Let us handle all aspects of your property management
          </p>
          <Link
            to="/contact"
            className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all inline-flex items-center gap-3 group"
          >
            <Phone className="w-5 h-5" />
            Contact Us
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};
