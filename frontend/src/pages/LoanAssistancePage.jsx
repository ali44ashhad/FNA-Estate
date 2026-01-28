import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  DollarSign,
  TrendingUp,
  Shield,
  CheckCircle,
  FileText,
  Phone,
  Mail,
  ArrowRight,
  Building2,
  Award,
  Clock,
  Users,
  BarChart3,
  CreditCard
} from 'lucide-react';

export const LoanAssistancePage = () => {
  const services = [
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: 'Home Loan Processing',
      description: 'End-to-end assistance for home loans with competitive interest rates',
      features: ['Pre-approved loans', 'Low interest rates', 'Quick processing', 'Flexible EMI options']
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: 'Commercial Property Loans',
      description: 'Specialized financing solutions for commercial real estate investments',
      features: ['Business loans', 'Property investment loans', 'Construction finance', 'Refinancing options']
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: 'Loan Comparison & Analysis',
      description: 'Compare multiple loan offers and choose the best option for your needs',
      features: ['Multiple bank options', 'Rate comparison', 'EMI calculator', 'Expert advice']
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Documentation Support',
      description: 'Complete assistance with loan documentation and verification',
      features: ['Document preparation', 'Verification support', 'Legal compliance', 'Fast-track processing']
    }
  ];

  const benefits = [
    'Pre-approved loan offers from top banks',
    'Interest rates starting from 8.5% p.a.',
    'Loan amount up to 90% of property value',
    'Flexible repayment tenure up to 30 years',
    'Zero processing fees on select loans',
    'Dedicated relationship manager'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <Helmet>
        <title>Loan Assistance for Property Purchase | Home Loan Services | FNAEstate</title>
        <meta name="description" content="Get expert home loan assistance with competitive interest rates, quick processing, and flexible EMI options. Pre-approved loans for residential and commercial properties. Trusted by thousands of property buyers." />
        <meta name="keywords" content="home loan, property loan, home loan assistance, mortgage loan, pre-approved loan, low interest rate home loan, property financing, real estate loan, loan processing" />
        <link rel="canonical" href="https://fnaestate.com/services/loan-assistance" />
        <meta property="og:title" content="Loan Assistance for Property Purchase | FNAEstate" />
        <meta property="og:description" content="Expert home loan assistance with competitive rates and quick processing. Pre-approved loans for residential and commercial properties." />
        <meta property="og:url" content="https://fnaestate.com/services/loan-assistance" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Loan Assistance for Property Purchase | FNAEstate" />
        <meta name="twitter:description" content="Expert home loan assistance with competitive rates and quick processing." />
      </Helmet>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-24 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-2 rounded-lg">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-medium text-slate-300">PREMIUM FINANCING SOLUTIONS</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Loan Assistance
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-300">
              Made Simple
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
            Expert guidance and support for all your property financing needs. Get the best loan deals from top banks with minimal hassle.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Our <span className="text-amber-600">Loan Services</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Comprehensive financing solutions tailored to your property investment goals
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

      {/* Benefits Section */}
      <div className="bg-gradient-to-r from-slate-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Why Choose Our <span className="text-amber-600">Loan Assistance</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-2 rounded-lg">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-slate-700 font-medium">{benefit}</p>
                </div>
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
              Ready to Get Your Loan?
            </h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Contact our loan experts today and get pre-approved in 24 hours
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-3 group"
              >
                <Phone className="w-5 h-5" />
                Get Loan Assistance
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
