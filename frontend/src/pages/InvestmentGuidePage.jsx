import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  BarChart3,
  CheckCircle,
  Phone,
  ArrowRight,
  DollarSign,
  MapPin,
  Calendar,
  Award
} from 'lucide-react';

export const InvestmentGuidePage = () => {
  const guides = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Market Analysis',
      description: 'Comprehensive market trends and investment opportunities',
      features: ['Price trends', 'ROI analysis', 'Market forecasts', 'Location insights']
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: 'Investment Strategies',
      description: 'Expert strategies for property investment success',
      features: ['Buy vs rent analysis', 'Portfolio diversification', 'Tax benefits', 'Exit strategies']
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: 'Location Intelligence',
      description: 'Data-driven insights on best investment locations',
      features: ['Growth potential', 'Infrastructure analysis', 'Demand forecasting', 'Risk assessment']
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Financial Planning',
      description: 'Complete financial planning for property investments',
      features: ['Budget planning', 'Loan optimization', 'Cash flow analysis', 'Wealth building']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <Helmet>
        <title>Property Investment Guide | Real Estate Investment Tips | FNAEstate</title>
        <meta name="description" content="Comprehensive property investment guide with market analysis, investment strategies, location insights, and ROI calculations. Expert tips for successful real estate investment in India." />
        <meta name="keywords" content="property investment guide, real estate investment, property investment tips, ROI calculation, property investment strategies, real estate market analysis, property investment advice" />
        <link rel="canonical" href="https://fnaestate.com/investment-guide" />
        <meta property="og:title" content="Property Investment Guide | FNAEstate" />
        <meta property="og:description" content="Comprehensive property investment guide with market analysis and investment strategies." />
        <meta property="og:url" content="https://fnaestate.com/investment-guide" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Property Investment Guide | FNAEstate" />
        <meta name="twitter:description" content="Comprehensive property investment guide with market analysis." />
      </Helmet>
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-24 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-2 rounded-lg">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-medium text-slate-300">INVESTMENT GUIDANCE</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Investment Guide
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-300">
              For Smart Investors
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
            Expert guidance and insights to make informed property investment decisions and maximize your returns.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Investment <span className="text-amber-600">Resources</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {guides.map((guide, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-slate-200 p-8 hover:shadow-2xl hover:border-amber-200 transition-all duration-300"
            >
              <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 mb-6">
                <div className="text-white">{guide.icon}</div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">{guide.title}</h3>
              <p className="text-slate-600 mb-6">{guide.description}</p>
              <ul className="space-y-2">
                {guide.features.map((feature, idx) => (
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
          <h2 className="text-4xl font-bold mb-6">Start Your Investment Journey</h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Get personalized investment advice from our experts
          </p>
          <Link
            to="/contact"
            className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all inline-flex items-center gap-3 group"
          >
            <Phone className="w-5 h-5" />
            Get Investment Advice
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};
