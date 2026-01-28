import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  MessageSquare,
  Users,
  CheckCircle,
  Phone,
  ArrowRight,
  Home,
  Building2,
  TrendingUp,
  Award,
  Calendar,
  MapPin
} from 'lucide-react';

export const PropertyConsultationPage = () => {
  const services = [
    {
      icon: <Home className="w-8 h-8" />,
      title: 'Property Selection Guidance',
      description: 'Expert advice on choosing the right property based on your needs and budget',
      features: ['Location analysis', 'Budget planning', 'Property comparison', 'Investment potential']
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: 'Market Analysis & Insights',
      description: 'Comprehensive market research and trend analysis for informed decisions',
      features: ['Price trends', 'Market forecasts', 'Area development plans', 'ROI projections']
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Investment Strategy',
      description: 'Personalized investment strategies tailored to your financial goals',
      features: ['Portfolio planning', 'Risk assessment', 'Exit strategies', 'Tax optimization']
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Buyer-Seller Consultation',
      description: 'Professional consultation for both buyers and sellers',
      features: ['Pricing strategy', 'Negotiation support', 'Transaction guidance', 'Documentation help']
    }
  ];

  const consultationTypes = [
    { type: 'Residential Properties', count: '500+' },
    { type: 'Commercial Spaces', count: '200+' },
    { type: 'Investment Properties', count: '300+' },
    { type: 'Satisfied Clients', count: '1000+' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <Helmet>
        <title>Property Consultation Services | Expert Real Estate Advice | FNAEstate</title>
        <meta name="description" content="Get expert property consultation services including property selection guidance, market analysis, investment advice, and location insights. Make informed property decisions with our experienced consultants." />
        <meta name="keywords" content="property consultation, real estate consultation, property advisor, property investment advice, market analysis, property selection, real estate consultant, property guidance" />
        <link rel="canonical" href="https://fnaestate.com/services/consultation" />
        <meta property="og:title" content="Property Consultation Services | FNAEstate" />
        <meta property="og:description" content="Expert property consultation including selection guidance, market analysis, and investment advice." />
        <meta property="og:url" content="https://fnaestate.com/services/consultation" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Property Consultation Services | FNAEstate" />
        <meta name="twitter:description" content="Expert property consultation including selection guidance and market analysis." />
      </Helmet>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-24 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-2 rounded-lg">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-medium text-slate-300">EXPERT PROPERTY CONSULTATION</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Property Consultation
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-300">
              Services
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
            Get expert guidance from our experienced property consultants. Make informed decisions with personalized advice tailored to your needs.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Our <span className="text-amber-600">Consultation Services</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Comprehensive property consultation solutions for buyers, sellers, and investors
          </p>
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

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-slate-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Our <span className="text-amber-600">Track Record</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {consultationTypes.map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl p-6 mb-4 inline-block">
                  <Award className="w-8 h-8 text-white mx-auto" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-2">{item.count}</div>
                <div className="text-slate-600">{item.type}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(251,191,36,0.1),transparent_50%)]"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-6">
              Get Expert Property Consultation
            </h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Schedule a free consultation with our property experts today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-3 group"
              >
                <Phone className="w-5 h-5" />
                Book Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="tel:+919876543210"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl font-semibold hover:bg-white/20 transition-all hover:scale-105"
              >
                Call: +91 98765 43210
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
