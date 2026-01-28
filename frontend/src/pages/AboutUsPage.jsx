import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Building2,
  Target,
  Eye,
  Shield,
  TrendingUp,
  Users,
  Award,
  Globe,
  Home,
  Heart,
  Star,
  CheckCircle,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  Trophy,
  BarChart3,
  Building
} from 'lucide-react';

export const AboutUsPage = () => {
  const leadershipTeam = [
    { 
      name: 'Vikram Mehta', 
      role: 'Founder & Chairman', 
      experience: '25+ years in luxury real estate',
      achievement: 'Former MD at Jones Lang LaSalle',
      specialty: 'Commercial Real Estate'
    },
    { 
      name: 'Priyanka Singhania', 
      role: 'Chief Executive Officer', 
      experience: '15+ years in property development',
      achievement: 'Harvard Business School Alumni',
      specialty: 'Luxury Residential'
    },
    { 
      name: 'Arjun Reddy', 
      role: 'Chief Technology Officer', 
      experience: '12+ years in proptech innovation',
      achievement: 'Ex-Google, AI/ML Expert',
      specialty: 'Digital Transformation'
    },
    { 
      name: 'Neha Kapoor', 
      role: 'Chief Operating Officer', 
      experience: '18+ years in operations',
      achievement: 'Six Sigma Black Belt',
      specialty: 'Service Excellence'
    },
  ];

  const coreValues = [
    { 
      title: 'Integrity First', 
      description: 'Every transaction built on trust and transparency',
      icon: <Shield className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-400'
    },
    { 
      title: 'Excellence Always', 
      description: 'Setting new standards in luxury real estate service',
      icon: <Award className="w-8 h-8" />,
      color: 'from-amber-500 to-amber-300'
    },
    { 
      title: 'Client Centricity', 
      description: 'Personalized service for every unique requirement',
      icon: <Heart className="w-8 h-8" />,
      color: 'from-rose-500 to-pink-400'
    },
    { 
      title: 'Innovation Driven', 
      description: 'Leveraging technology to enhance property discovery',
      icon: <TrendingUp className="w-8 h-8" />,
      color: 'from-emerald-500 to-teal-400'
    },
  ];

  const performanceStats = [
    { number: '₹5,000Cr+', label: 'Premium Transactions', icon: <BarChart3 className="w-6 h-6" /> },
    { number: '10,000+', label: 'Exclusive Listings', icon: <Building className="w-6 h-6" /> },
    { number: '98.7%', label: 'Client Satisfaction', icon: <Star className="w-6 h-6" /> },
    { number: '50+', label: 'Cities Served', icon: <Globe className="w-6 h-6" /> },
    { number: '24/7', label: 'Premium Support', icon: <Clock className="w-6 h-6" /> },
    { number: '250+', label: 'Expert Partners', icon: <Users className="w-6 h-6" /> },
  ];

  const certifications = [
    'RERA Registered',
    'ISO 27001 Certified',
    'NAR Member',
    'CREDAI Partner',
    'GDPR Compliant',
    'PCI DSS Certified'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <Helmet>
        <title>About Us | FNAEstate - Premium Real Estate Platform</title>
        <meta name="description" content="Learn about FNAEstate - India's premium real estate platform. 25+ years of experience, verified listings, and exceptional service. Meet our leadership team and discover our mission." />
        <meta name="keywords" content="about FNAEstate, real estate company, property platform, real estate services, property consultants, real estate team, property company India" />
        <link rel="canonical" href="https://fnaestate.com/about-us" />
        <meta property="og:title" content="About Us | FNAEstate" />
        <meta property="og:description" content="Learn about FNAEstate - India's premium real estate platform with 25+ years of experience." />
        <meta property="og:url" content="https://fnaestate.com/about-us" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="About Us | FNAEstate" />
        <meta name="twitter:description" content="Learn about FNAEstate - India's premium real estate platform." />
      </Helmet>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg  "></div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-2 rounded-lg">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-medium text-slate-300">ESTABLISHED 2018</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Redefining Luxury<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-300">
              Real Estate Experience
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
            India's premier luxury real estate platform, connecting discerning clients with exceptional properties through unparalleled service and technological innovation.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Building2 className="w-4 h-4" />
              Our Legacy
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Crafting Dreams into<br />
              <span className="text-amber-600">Luxury Realities</span>
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                Founded in 2018 by Vikram Mehta, a veteran with 25+ years in luxury real estate, FNAEstate emerged from a vision to transform India's high-end property market. We recognized the need for a platform that combines traditional expertise with cutting-edge technology.
              </p>
              <p>
                What started as a boutique advisory for ultra-high-net-worth individuals has grown into India's most trusted luxury real estate platform. We've curated exclusive partnerships with premium developers, architects, and interior designers to offer a complete ecosystem for luxury living.
              </p>
              <p>
                Today, we're proud to be the preferred choice for discerning clients seeking exceptional properties, whether it's heritage bungalows in Mumbai, luxury villas in Goa, or commercial spaces in Bengaluru.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl p-8 text-white">
              <div className="text-6xl mb-6">🏆</div>
              <h3 className="text-2xl font-bold mb-4">Industry Recognition</h3>
              <p className="text-amber-100 mb-6">
                Awarded 'Best Luxury Real Estate Platform' for three consecutive years at the National Real Estate Awards.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {['2019', '2020', '2021', '2022'].map((year) => (
                  <div key={year} className="text-center">
                    <div className="text-3xl font-bold">{year}</div>
                    <div className="text-sm text-amber-200">Award Winner</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-slate-800 to-slate-900 text-white p-6 rounded-2xl shadow-2xl">
              <Trophy className="w-8 h-8 mb-3 text-amber-400" />
              <div className="text-2xl font-bold">25+ Years</div>
              <div className="text-sm text-slate-300">Combined Leadership Experience</div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Stats */}
      <div className="bg-gradient-to-r from-slate-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Our <span className="text-amber-600">Performance</span> Metrics
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {performanceStats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl mb-4 group-hover:scale-110 transition-transform">
                  <div className="text-white">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-2xl font-bold text-slate-900 mb-2">{stat.number}</div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Our <span className="text-amber-600">Core Values</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            The principles that guide every decision and interaction at FNAEstate
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((value, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl border border-slate-200 p-8 hover:shadow-2xl hover:border-amber-200 transition-all duration-300"
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${value.color} mb-6 group-hover:scale-110 transition-transform`}>
                <div className="text-white">
                  {value.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
              <p className="text-slate-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Leadership Team */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Executive Leadership</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Seasoned professionals with decades of experience in luxury real estate and technology
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadershipTeam.map((member, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 hover:from-slate-700 hover:to-slate-800 transition-all duration-300 border border-slate-700 hover:border-amber-500/30"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <div className="text-amber-400 font-semibold mb-4">{member.role}</div>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Award className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-300">{member.experience}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Star className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-300">{member.achievement}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Target className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-300">Specialty: {member.specialty}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-3xl p-12">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-2 rounded-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-amber-700">OUR MISSION</span>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-6">
              To Transform Luxury<br />
              Property Discovery
            </h3>
            <ul className="space-y-4">
              {[
                'Provide unparalleled access to exclusive properties',
                'Deliver personalized service through dedicated concierge',
                'Ensure complete transparency in every transaction',
                'Leverage cutting-edge technology for better insights',
                'Maintain the highest standards of professionalism'
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-12">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-2 rounded-lg">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-amber-300">OUR VISION</span>
            </div>
            <h3 className="text-3xl font-bold mb-6">
              Redefining Premium<br />
              Real Estate Standards
            </h3>
            <p className="text-slate-300 mb-8 leading-relaxed">
              To become India's most trusted and technologically advanced luxury real estate platform, setting global benchmarks in service excellence and innovation while creating lasting value for our clients and partners.
            </p>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">2025</div>
                <div className="text-sm text-slate-400">Goal: Pan-India</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">2030</div>
                <div className="text-sm text-slate-400">Global Presence</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Certifications & <span className="text-amber-600">Accreditations</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-white border border-slate-200 rounded-xl p-6 text-center hover:shadow-lg hover:border-amber-200 transition-all group"
              >
                <Shield className="w-8 h-8 text-amber-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-slate-700">{cert}</span>
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
              Experience Premium<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-300">
                Real Estate Service
              </span>
            </h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Join thousands of satisfied clients who have found their dream properties with us
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-3 group"
              >
                <Phone className="w-5 h-5" />
                Schedule Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/properties/premium"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl font-semibold hover:bg-white/20 transition-all hover:scale-105"
              >
                Browse Premium Properties
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Office Locations */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
          Our <span className="text-amber-600">Presence</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { city: 'Mumbai', address: 'Level 42, One World Trade Center', hours: 'Mon-Sat: 9AM-8PM' },
            { city: 'Delhi', address: 'Unit 12A, Cyber Hub, DLF Cyber City', hours: 'Mon-Sat: 9AM-8PM' },
            { city: 'Bengaluru', address: 'Tower B, Prestige Trade Center', hours: 'Mon-Sat: 9AM-8PM' },
          ].map((office) => (
            <div key={office.city} className="bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="w-6 h-6 text-amber-600" />
                <span className="text-xl font-bold text-slate-900">{office.city}</span>
              </div>
              <p className="text-slate-600 mb-4">{office.address}</p>
              <div className="flex items-center gap-2 text-slate-500">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{office.hours}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};