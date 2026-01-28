import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { propertyService } from '../services/api';
import { PropertyCard } from '../components/PropertyCard';
import { Loading } from '../components/Loading';
import {
  Search,
  Shield,
  MessageSquare,
  Smartphone,
  TrendingUp,
  Users,
  Home,
  Star,
  MapPin,
  ChevronRight,
  Award,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

export const HomePage = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchFilters, setSearchFilters] = useState({
    city: '',
    propertyType: '',
    minPrice: '',
  });

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        const res = await propertyService.getApprovedProperties({});
        // Show only approved listings (top 3)
        setProperties(res.data.properties.slice(0, 3));
        setLoading(false);
      } catch (err) {
        setError('Failed to load properties');
        setLoading(false);
      }
    };

    fetchFeaturedProperties();
  }, []);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchFilters({ ...searchFilters, [name]: value });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Build query params
    const params = new URLSearchParams();
    if (searchFilters.city) params.set('city', searchFilters.city);
    if (searchFilters.propertyType) params.set('propertyType', searchFilters.propertyType);
    if (searchFilters.minPrice) {
      // Convert price string to number (e.g., "₹1Cr" -> 10000000)
      const priceMap = {
        '₹50L': '5000000',
        '₹1Cr': '10000000',
        '₹2Cr': '20000000',
        '₹5Cr+': '50000000',
      };
      const priceValue = priceMap[searchFilters.minPrice] || searchFilters.minPrice.replace(/[₹,]/g, '');
      params.set('minPrice', priceValue);
    }
    navigate(`/properties?${params.toString()}`);
  };

  const features = [
    {
      icon: <Search className="w-8 h-8" />,
      title: "AI-Powered Search",
      description: "Smart property matching with predictive analytics and lifestyle preferences",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Verified Excellence",
      description: "25-point verification process ensuring only premium, authentic listings",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Market Intelligence",
      description: "Real-time analytics, price trends, and investment insights",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Dedicated Concierge",
      description: "Personal property consultant for end-to-end assistance",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Immersive Experience",
      description: "3D virtual tours, AR view, and professional photography",
      color: "from-violet-500 to-indigo-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Exclusive Network",
      description: "Access to premium developers, architects, and legal experts",
      color: "from-rose-500 to-red-500"
    }
  ];

  const testimonials = [
    {
      name: "Aarav Sharma",
      role: "Tech Entrepreneur",
      text: "Found my sea-facing penthouse through FNAEstate. The concierge service made the entire process seamless from viewing to documentation.",
      avatar: "AS",
      rating: 5,
      property: "₹12.5Cr • Bandra, Mumbai"
    },
    {
      name: "Priya Reddy",
      role: "NR Investor",
      text: "As an NRI, I needed reliable partners. FNAEstate handled everything remotely - from virtual tours to legal paperwork. Exceptional service!",
      avatar: "PR",
      rating: 5,
      property: "₹8.7Cr • Hyderabad"
    },
    {
      name: "Rajesh Khanna",
      role: "Business Owner",
      text: "Their market insights helped me make a strategic investment in a commercial property that's already appreciated 35% in 18 months.",
      avatar: "RK",
      rating: 5,
      property: "₹21Cr • Gurgaon"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <Helmet>
        <title>FNAEstate - Premium Real Estate Platform | Luxury Properties in India</title>
        <meta name="description" content="Discover exclusive premium properties across India. FNAEstate offers verified luxury listings, AI-powered search, market intelligence, and dedicated concierge services for discerning property buyers and investors." />
        <meta name="keywords" content="premium real estate, luxury properties, property search India, real estate platform, property investment, verified listings, property consultation, Chandigarh properties, Mohali properties, Tricity real estate" />
        <meta name="author" content="FNAEstate" />
        <link rel="canonical" href="https://fnaestate.com/" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fnaestate.com/" />
        <meta property="og:title" content="FNAEstate - Premium Real Estate Platform | Luxury Properties in India" />
        <meta property="og:description" content="Discover exclusive premium properties across India. Verified luxury listings, AI-powered search, and dedicated concierge services." />
        <meta property="og:image" content="https://fnaestate.com/og-image.jpg" />
        <meta property="og:site_name" content="FNAEstate" />
        <meta property="og:locale" content="en_IN" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://fnaestate.com/" />
        <meta name="twitter:title" content="FNAEstate - Premium Real Estate Platform" />
        <meta name="twitter:description" content="Discover exclusive premium properties across India. Verified luxury listings and AI-powered search." />
        <meta name="twitter:image" content="https://fnaestate.com/twitter-image.jpg" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateAgent",
            "name": "FNAEstate",
            "description": "Premium real estate platform offering verified luxury properties across India",
            "url": "https://fnaestate.com",
            "logo": "https://fnaestate.com/logo.png",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "IN"
            },
            "areaServed": {
              "@type": "City",
              "name": ["Chandigarh", "Mohali", "Kharar", "Zirakpur"]
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "1000+"
            }
          })}
        </script>
      </Helmet>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg "></div>
        <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-full px-4 py-2 mb-6">
                <Star className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-medium">INDIA'S PREMIUM REAL ESTATE PLATFORM</span>
              </div>
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
                Where Luxury Meets{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-300">
                  Intelligent Living
                </span>
              </h1>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl">
                Discover exclusive properties, market insights, and premium services designed for the discerning few.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/properties/premium"
                  className="group relative bg-gradient-to-r from-amber-600 to-amber-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <Home className="w-5 h-5" />
                  Explore Premium Properties
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/concierge"
                  className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
                >
                  Book Concierge
                </Link>
              </div>
              
              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-slate-700/50">
                <div>
                  <div className="text-2xl font-bold text-amber-400">10,000+</div>
                  <div className="text-sm text-slate-400">Premium Properties</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-amber-400">98.7%</div>
                  <div className="text-sm text-slate-400">Client Satisfaction</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-amber-400">50+</div>
                  <div className="text-sm text-slate-400">Cities Across India</div>
                </div>
              </div>
            </div>
            
            {/* Hero Image/Form */}
            <div className="relative">
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
                <h3 className="text-2xl font-bold mb-6">Find Your Premium Property</h3>
                <form onSubmit={handleSearchSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm text-slate-300 mb-2">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <input
                        type="text"
                        name="city"
                        value={searchFilters.city}
                        onChange={handleSearchChange}
                        placeholder="Search by city, area, or landmark"
                        className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-slate-300 mb-2">Min Price</label>
                      <select 
                        name="minPrice"
                        value={searchFilters.minPrice}
                        onChange={handleSearchChange}
                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500"
                      >
                        <option value="">Any Price</option>
                        <option value="₹50L">₹50L</option>
                        <option value="₹1Cr">₹1Cr</option>
                        <option value="₹2Cr">₹2Cr</option>
                        <option value="₹5Cr+">₹5Cr+</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-slate-300 mb-2">Property Type</label>
                      <select 
                        name="propertyType"
                        value={searchFilters.propertyType}
                        onChange={handleSearchChange}
                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500"
                      >
                        <option value="">All Types</option>
                        <option value="Factory">Factory</option>
                        <option value="Warehouse">Warehouse</option>
                        <option value="Office">Office</option>
                        <option value="Shop">Shop</option>
                        <option value="Hotel">Hotel</option>
                        <option value="Industrial">Industrial</option>
                        <option value="Cafe">Cafe</option>
                        <option value="Restaurant">Restaurant</option>
                        <option value="Pg">PG</option>
                        <option value="Running Business">Running Business</option>
                      </select>
                    </div>
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Search className="w-5 h-5" />
                    Search Premium Properties
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-slate-900">
                Curated <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-400">Excellence</span>
              </h2>
              <p className="text-xl text-slate-600">Handpicked premium properties for the discerning few</p>
            </div>
            <Link
              to="/properties"
              className="hidden lg:flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold group"
            >
              View all properties
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {loading ? (
            <Loading />
          ) : error ? (
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
              <p className="text-red-800 font-medium">{error}</p>
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
              <p className="text-slate-600 text-lg">No premium properties available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}

          <div className="text-center mt-12 lg:hidden">
            <Link
              to="/properties"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all"
            >
              View All Properties
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-900">
              The <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-400">FNAEstate</span> Advantage
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Experience real estate redefined with technology, transparency, and unparalleled service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl border border-slate-200 p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} text-white mb-6 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 mb-6">{feature.description}</p>
                 
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-full px-4 py-2 mb-6">
              <Award className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-white font-medium">TRUSTED BY INDUSTRY LEADERS</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
              Voices of <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-300">Excellence</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Hear from our premium clients who have experienced the difference
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-slate-600/50 transition-colors"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">{testimonial.name}</h4>
                    <p className="text-slate-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed">{testimonial.text}</p>
                <div className="flex items-center justify-between pt-6 border-t border-slate-700/50">
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <div className="text-sm text-slate-400">{testimonial.property}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(251,191,36,0.1),transparent_50%)]"></div>
            <div className="relative">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
                Begin Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-300">Premium Journey</span>
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Join our exclusive community of property investors and homeowners who trust us with their most important decisions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/register"
                  className="group relative bg-gradient-to-r from-amber-600 to-amber-700 text-white px-10 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <CheckCircle className="w-5 h-5" />
                  Create Premium Account
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/concierge"
                  className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
                >
                  Schedule Consultation
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-8 border-t border-slate-700/50">
                <div>
                  <div className="text-2xl font-bold text-amber-400">₹5000Cr+</div>
                  <div className="text-sm text-slate-400">Transaction Value</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-amber-400">24/7</div>
                  <div className="text-sm text-slate-400">Premium Support</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-amber-400">100%</div>
                  <div className="text-sm text-slate-400">Verified Listings</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-amber-400">RERA</div>
                  <div className="text-sm text-slate-400">Registered Platform</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};