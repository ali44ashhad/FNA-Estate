import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  Home, 
  Search, 
  Shield, 
  TrendingUp, 
  Smartphone, 
  Users,
  FileText,
  CreditCard,
  MapPin,
  Star,
  Target,
  Globe
} from 'lucide-react';

export const FeaturesPage = () => {
  const features = [
    {
      icon: <Search className="w-8 h-8" />,
      title: 'Intelligent Property Search',
      description: 'AI-powered search with smart filters for location, budget, amenities, and lifestyle preferences.',
      details: ['AI Recommendations', 'Map-based Search', '3D Virtual Tours', 'Neighborhood Insights']
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Market Intelligence',
      description: 'Real-time market analytics, price trends, and investment potential assessments.',
      details: ['Price Trend Analysis', 'ROI Calculator', 'Market Forecasts', 'Comparative Market Analysis']
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Secure Transactions',
      description: 'End-to-end encrypted transactions with escrow services and legal verification.',
      details: ['Escrow Services', 'Legal Verification', 'Fraud Protection', 'Document Security']
    },
    {
      icon: <Home className="w-8 h-8" />,
      title: 'Premium Listings',
      description: 'Exclusive verified properties with professional photography and detailed inspections.',
      details: ['Professional Photography', '360° Virtual Tours', 'Property Inspection Reports', 'Developer Verified']
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: 'Mobile Experience',
      description: 'Seamless mobile experience with AR view and instant notifications.',
      details: ['AR Property View', 'Instant Alerts', 'Mobile Document Signing', 'Offline Access']
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Dedicated Concierge',
      description: 'Personal property consultant and dedicated support throughout your journey.',
      details: ['Personal Consultant', 'Site Visits Coordination', 'Negotiation Support', 'Post-sale Assistance']
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Smart Matching',
      description: 'AI-driven property matching based on your preferences, behavior, and budget.',
      details: ['Behavioral Analysis', 'Preference Learning', 'Price Drop Alerts', 'Personalized Recommendations']
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: 'Verified Reviews',
      description: 'Authentic reviews from verified buyers and transparent seller ratings.',
      details: ['Transaction-based Reviews', 'Photo Verification', 'Detailed Ratings', 'Community Feedback']
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Digital Documentation',
      description: 'Complete digital paperwork with e-signature and legal assistance.',
      details: ['E-Signature Ready', 'Legal Document Templates', 'Progress Tracking', 'Secure Cloud Storage']
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: 'Flexible Financing',
      description: 'Multiple payment options with partnerships across major banks and NBFCs.',
      details: ['Bank Tie-ups', 'EMI Options', 'Loan Assistance', 'Down Payment Plans']
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: 'Pan-India Presence',
      description: 'Extensive network covering metros, tier 2/3 cities, and emerging locations.',
      details: ['50+ Cities', 'NRIs Special Services', 'Local Experts Network', 'Regional Market Insights']
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global Standards',
      description: 'International quality standards with local expertise and global best practices.',
      details: ['International Partnerships', 'Quality Certification', 'Global Benchmarking', 'Local Expertise']
    },
  ];

  const faqs = [
    {
      question: 'How do I schedule a property viewing?',
      answer: 'You can schedule viewings directly through our platform. Select your preferred time slot, and our concierge will coordinate with the seller. We also offer virtual tours for remote viewing.'
    },
    {
      question: 'What makes your listings premium?',
      answer: 'Every listing undergoes 25-point verification, includes professional photography, 3D virtual tours, legal checks, and comes with detailed inspection reports from certified professionals.'
    },
    {
      question: 'Do you provide legal assistance?',
      answer: 'Yes, we partner with legal experts to provide document verification, agreement drafting, and complete legal support throughout the transaction process.'
    },
    {
      question: 'How accurate are your price estimates?',
      answer: 'Our AI-powered valuation considers 50+ parameters including recent sales, market trends, property condition, location factors, and future development plans for accurate pricing.'
    },
    {
      question: 'Is there support for NRI investors?',
      answer: 'We offer dedicated NRI services including video conferencing, power of attorney assistance, remote document signing, and comprehensive investment advisory.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Helmet>
        <title>Features | FNAEstate - Premium Real Estate Platform Features</title>
        <meta name="description" content="Discover FNAEstate's premium features: AI-powered search, market intelligence, verified listings, 3D virtual tours, dedicated concierge, and more. Experience the future of real estate." />
        <meta name="keywords" content="real estate features, property search features, AI property search, virtual property tours, property platform features, real estate technology" />
        <link rel="canonical" href="https://fnaestate.com/features" />
        <meta property="og:title" content="Features | FNAEstate" />
        <meta property="og:description" content="Discover FNAEstate's premium features including AI-powered search and market intelligence." />
        <meta property="og:url" content="https://fnaestate.com/features" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Features | FNAEstate" />
        <meta name="twitter:description" content="Discover FNAEstate's premium features including AI-powered search." />
      </Helmet>
      {/* Premium Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg  "></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-full px-6 py-2 mb-6">
            <Star className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium">PREMIUM REAL ESTATE PLATFORM</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-amber-100">
            Experience Luxury<br />Real Estate Redefined
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Where cutting-edge technology meets unparalleled service in property discovery and investment.
          </p>
        </div>
        </div>
       

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Exclusive Features</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Designed for discerning clients who expect nothing but the best in property search and investment.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl border border-slate-200 hover:border-amber-200 shadow-lg hover:shadow-2xl transition-all duration-500 p-8 hover:-translate-y-2"
            >
              <div className="absolute -top-4 left-8">
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white p-3 rounded-xl shadow-lg">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mt-4 mb-3 group-hover:text-amber-700 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                {feature.description}
              </p>
              <ul className="space-y-3">
                {feature.details.map((detail, idx) => (
                  <li key={idx} className="flex items-center text-slate-700 group/item">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mr-3 group-hover/item:scale-125 transition-transform"></div>
                    <span className="text-sm font-medium">{detail}</span>
                  </li>
                ))}
              </ul>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Premium CTA */}
      <div className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(251,191,36,0.1),transparent_50%)]"></div>
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Begin Your Premium<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-300">Property Journey</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Join our exclusive community of property investors and homeowners who trust us with their most important decisions.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/premium-properties"
              className="group relative px-10 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-semibold hover:from-amber-700 hover:to-amber-800 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 flex items-center gap-3"
            >
              <Home className="w-5 h-5" />
              Explore Premium Properties
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
            </Link>
            <Link
              to="/concierge"
              className="px-10 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              Request Concierge
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 text-center">
            {['10,000+', '₹5000Cr+', '98.7%', '24/7'].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl font-bold text-amber-400 mb-2">{stat}</div>
                <div className="text-sm text-slate-400">
                  {['Premium Properties', 'Transaction Value', 'Client Satisfaction', 'Dedicated Support'][idx]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Premium FAQ */}
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Premium Support</h2>
          <p className="text-lg text-slate-600">
            Everything you need to know about our premium services
          </p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="group bg-gradient-to-r from-white to-slate-50 border border-slate-200 rounded-2xl hover:border-amber-200 transition-all duration-300 overflow-hidden"
            >
              <details className="group">
                <summary className="cursor-pointer p-8 text-lg font-semibold text-slate-900 list-none flex justify-between items-center hover:text-amber-700 transition-colors">
                  {faq.question}
                  <div className="text-amber-600 group-open:rotate-180 transition-transform duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>
                <div className="px-8 pb-8 pt-2 border-t border-slate-100">
                  <p className="text-slate-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </details>
            </div>
          ))}
        </div>

        {/* Contact Card */}
        <div className="mt-20 bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Need Personalized Assistance?</h3>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Our premium concierge team is ready to provide one-on-one consultation tailored to your specific requirements.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-semibold transition-colors">
              Schedule Consultation
            </button>
            <button className="px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl font-semibold transition-colors">
              Call +91 98765 43210
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};