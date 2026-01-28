import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { propertyService, enquiryService } from '../services/api';
import { Loading } from '../components/Loading';
import { 
  MapPin, 
  BedDouble, 
  Bath, 
  Square, 
  Car, 
  Heart, 
  Share2, 
  CheckCircle,
  Calendar,
  Building2,
  Phone,
  Mail,
  MessageSquare,
  ArrowLeft,
  Eye,
  Users,
  Shield,
  Star,
  Home,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Target
} from 'lucide-react';

export const PropertyDetailPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [saved, setSaved] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await propertyService.getPropertyDetails(id);
        setProperty(res.data.property);
        setLoading(false);
      } catch (err) {
        setError('Failed to load property details. Please try again.');
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitEnquiry = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await enquiryService.submitEnquiry({
        propertyId: id,
        contactInfo: formData,
      });
      setSuccessMessage('Your enquiry has been submitted successfully! Our premium concierge will contact you within 24 hours.');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setShowEnquiryForm(false);
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (err) {
      setError('Failed to submit enquiry. Please try again or contact our support team.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleScheduleVisit = () => {
    window.open(`https://calendly.com/premium-estate/${id}`, '_blank');
  };

  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)} L`;
    }
    return `₹${price.toLocaleString()}`;
  };

  const getDaysAgo = (date) => {
    const days = Math.floor((new Date() - new Date(date)) / (1000 * 60 * 60 * 24));
    return days === 0 ? 'Today' : `${days} days ago`;
  };

  const formatNumber = (num) => {
    if (!num && num !== 0) return '0';
    return num.toLocaleString('en-US');
  };

  const images = property?.media?.gallery && property.media.gallery.length > 0 
    ? [property.media.primaryImage, ...property.media.gallery]
    : ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600'];

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const amenitiesList = [
    { key: 'parking', label: 'Parking', icon: '🅿️' },
    { key: 'lift', label: 'Lift', icon: '🛗' },
    { key: 'security', label: 'Security', icon: '🔐' },
    { key: 'powerBackup', label: 'Power Backup', icon: '⚡' },
    { key: 'waterSupply', label: '24/7 Water', icon: '💧' },
    { key: 'gym', label: 'Gym', icon: '💪' },
    { key: 'swimmingPool', label: 'Swimming Pool', icon: '🏊' },
    { key: 'clubHouse', label: 'Club House', icon: '🏛️' },
    { key: 'childrensPlayArea', label: 'Play Area', icon: '🎠' },
    { key: 'garden', label: 'Garden', icon: '🌿' },
    { key: 'cctv', label: 'CCTV', icon: '📹' },
    { key: 'wifi', label: 'High-speed WiFi', icon: '📡' },
  ];

  if (loading) return <Loading />;
  
  if (error) return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-200 rounded-2xl p-12 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-500 to-red-600 rounded-full mb-6">
          <Shield className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-3">Unable to Load Property</h2>
        <p className="text-lg text-red-600 mb-6">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-8 py-3 bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
        >
          Try Again
        </button>
      </div>
    </div>
  );
  
  if (!property) return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-12 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-6">
          <Home className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-3">Property Not Available</h2>
        <p className="text-lg text-slate-600 mb-6">This property is no longer listed or has been removed.</p>
        <a 
          href="/properties" 
          className="px-8 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Browse Properties
        </a>
      </div>
    </div>
  );

  // Generate SEO content from property data
  const propertyTitle = property ? `${property.title} - ${property.location?.city || ''} | FNAEstate` : 'Property Details | FNAEstate';
  const propertyDescription = property 
    ? `${property.title} - ${property.propertyType || 'Property'} ${property.listingType || 'for sale/rent'} in ${property.location?.city || ''}, ${property.location?.locality || ''}. ${property.description?.substring(0, 150) || ''} Price: ${formatPrice(property.pricing?.price || 0)}. View details, photos, and contact seller.`
    : 'View detailed property information including photos, pricing, location, and amenities. Contact seller for more information.';
  const propertyImage = property?.media?.primaryImage || property?.media?.gallery?.[0] || 'https://fnaestate.com/default-property.jpg';
  const propertyUrl = `https://fnaestate.com/property/${id}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <Helmet>
        <title>{propertyTitle}</title>
        <meta name="description" content={propertyDescription} />
        <meta name="keywords" content={`${property?.propertyType || 'property'} ${property?.location?.city || ''} ${property?.listingType || 'sale rent'} real estate, ${property?.location?.locality || ''}, verified listing, FNAEstate`} />
        <link rel="canonical" href={propertyUrl} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={propertyUrl} />
        <meta property="og:title" content={propertyTitle} />
        <meta property="og:description" content={propertyDescription} />
        <meta property="og:image" content={propertyImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={propertyUrl} />
        <meta name="twitter:title" content={propertyTitle} />
        <meta name="twitter:description" content={propertyDescription} />
        <meta name="twitter:image" content={propertyImage} />
        
        {/* Structured Data */}
        {property && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateListing",
              "name": property.title,
              "description": property.description,
              "url": propertyUrl,
              "image": property.media?.gallery || [propertyImage],
              "address": {
                "@type": "PostalAddress",
                "streetAddress": property.location?.locality,
                "addressLocality": property.location?.city,
                "addressRegion": "Punjab",
                "postalCode": property.location?.pincode || "",
                "addressCountry": "IN"
              },
              "geo": property.location?.coordinates ? {
                "@type": "GeoCoordinates",
                "latitude": property.location.coordinates.lat,
                "longitude": property.location.coordinates.lng
              } : undefined,
              "price": property.pricing?.price,
              "priceCurrency": "INR",
              "numberOfRooms": property.propertyDetails?.bedrooms,
              "floorSize": {
                "@type": "QuantitativeValue",
                "value": property.propertyDetails?.builtUpArea,
                "unitCode": "MTK"
              },
              "yearBuilt": property.propertyDetails?.yearBuilt,
              "amenityFeature": amenitiesList
                .filter(amenity => property.amenities?.[amenity.key])
                .map(amenity => ({
                  "@type": "LocationFeatureSpecification",
                  "name": amenity.label,
                  "value": true
                }))
            })}
          </script>
        )}
      </Helmet>
      {/* Success Message */}
      {successMessage && (
        <div className="fixed top-4 right-4 z-50 animate-slideIn">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow-2xl max-w-sm">
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 flex-shrink-0" />
              <div>
                <p className="font-bold mb-1">Enquiry Submitted!</p>
                <p className="text-sm text-green-100">{successMessage}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Back & Actions */}
        <div className="flex justify-between items-center mb-8">
          <a 
            href="/properties" 
            className="inline-flex items-center gap-3 px-5 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:shadow-lg transition-all text-slate-700 font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Properties
          </a>
          <div className="flex gap-3">
            <button 
              onClick={() => setSaved(!saved)} 
              className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:shadow-lg transition-all"
            >
              <Heart className={`w-5 h-5 ${saved ? 'fill-red-500 text-red-500' : 'text-slate-700'}`} />
            </button>
            <button className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:shadow-lg transition-all">
              <Share2 className="w-5 h-5 text-slate-700" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Gallery */}
            <div className="mb-8 relative">
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 h-96">
                <img
                  src={images[selectedImage]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation Arrows */}
                <button 
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 backdrop-blur-sm text-white rounded-xl hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 backdrop-blur-sm text-white rounded-xl hover:bg-black/70 transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 backdrop-blur-sm text-white rounded-full text-sm font-semibold">
                  {selectedImage + 1} / {images.length}
                </div>

                {/* Premium Badge */}
                {property.pricing.finalPrice > 50000000 && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-2xl">
                    <Sparkles className="w-4 h-4" />
                    PREMIUM LISTING
                  </div>
                )}

                {/* Verified Badge */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-2xl">
                  <Shield className="w-4 h-4" />
                  VERIFIED PROPERTY
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-6 gap-3 mt-4">
                {images.slice(0, 6).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative rounded-xl overflow-hidden h-24 border-3 transition-all ${
                      selectedImage === idx
                        ? 'border-amber-500 shadow-lg'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Gallery ${idx}`}
                      className="w-full h-full object-cover"
                    />
                    {selectedImage === idx && (
                      <div className="absolute inset-0 bg-amber-500/20"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Property Details Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 mb-8">
              {/* Header */}
              <div className="mb-8 pb-8 border-b border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-amber-600 uppercase tracking-wider">
                    {property.propertyType}
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
                  {property.title}
                </h1>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin className="w-5 h-5 text-amber-500" />
                    <span className="text-lg font-medium">{property.location.locality}, {property.location.city}</span>
                  </div>
                  
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500">{property.location.state}</span>
                </div>

                {/* Price Section */}
                <div className="flex items-baseline gap-6 flex-wrap">
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-600 to-amber-700 bg-clip-text text-transparent">
                    {formatPrice(property.pricing.finalPrice)}
                  </div>
                  {property.pricing.originalPrice && (
                    <div className="text-2xl text-slate-400 line-through">
                      {formatPrice(property.pricing.originalPrice)}
                    </div>
                  )}
                  <div className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-full font-bold text-sm">
                    {property.listingType}
                  </div>
                </div>
              </div>

              {/* Key Specifications */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <Target className="w-6 h-6 text-amber-500" />
                  Key Specifications
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center p-6 bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl mb-4">
                      <BedDouble className="w-7 h-7 text-white" />
                    </div>
                    <p className="text-slate-600 text-sm font-medium">Bedrooms</p>
                    <p className="text-2xl font-bold text-slate-900">{property.propertyDetails.bedrooms}</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-100 rounded-2xl">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl mb-4">
                      <Bath className="w-7 h-7 text-white" />
                    </div>
                    <p className="text-slate-600 text-sm font-medium">Bathrooms</p>
                    <p className="text-2xl font-bold text-slate-900">{property.propertyDetails.bathrooms}</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl mb-4">
                      <Square className="w-7 h-7 text-white" />
                    </div>
                    <p className="text-slate-600 text-sm font-medium">Built-up Area</p>
                    <p className="text-2xl font-bold text-slate-900">{property.propertyDetails.builtUpArea} sqft</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl mb-4">
                      <Car className="w-7 h-7 text-white" />
                    </div>
                    <p className="text-slate-600 text-sm font-medium">Parking</p>
                    <p className="text-2xl font-bold text-slate-900">{property.propertyDetails.parking || '2'}</p>
                  </div>
                </div>
              </div>

              {/* Property Highlights */}
              <div className="mb-8 pb-8 border-b border-slate-200">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Property Highlights</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl">
                    <p className="text-slate-600 text-sm font-medium mb-1">Furnishing Status</p>
                    <p className="text-lg font-bold text-slate-900 capitalize">{property.propertyDetails.furnishingStatus}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl">
                    <p className="text-slate-600 text-sm font-medium mb-1">Floor Number</p>
                    <p className="text-lg font-bold text-slate-900">{property.propertyDetails.floorNumber || '5th'}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl">
                    <p className="text-slate-600 text-sm font-medium mb-1">Age of Property</p>
                    <p className="text-lg font-bold text-slate-900">{property.propertyDetails.age || 'New Construction'}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl">
                    <p className="text-slate-600 text-sm font-medium mb-1">Total Floors</p>
                    <p className="text-lg font-bold text-slate-900">{property.propertyDetails.totalFloors || '15'}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl">
                    <p className="text-slate-600 text-sm font-medium mb-1">Facing Direction</p>
                    <p className="text-lg font-bold text-slate-900">{property.propertyDetails.facing || 'East'}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl">
                    <p className="text-slate-600 text-sm font-medium mb-1">Availability</p>
                    <p className="text-lg font-bold text-emerald-600">Immediate</p>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-8 pb-8 border-b border-slate-200">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Premium Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {amenitiesList.map((amenity) => (
                    property.amenities?.[amenity.key] && (
                      <div key={amenity.key} className="flex items-center gap-3 p-4 bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-xl hover:border-amber-300 transition-colors">
                        <span className="text-2xl">{amenity.icon}</span>
                        <span className="font-semibold text-slate-900">{amenity.label}</span>
                      </div>
                    )
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Detailed Description</h3>
                <div className="prose prose-lg max-w-none">
                  <p className="text-slate-700 leading-relaxed text-lg">{property.description}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Contact Card */}
          <div>
            <div className="sticky top-24 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
              {!showEnquiryForm ? (
                <div className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Schedule a Viewing</h3>
                    <p className="text-slate-600">Experience this premium property firsthand</p>
                  </div>

                  <button
                    onClick={handleScheduleVisit}
                    className="w-full group relative bg-gradient-to-r from-amber-600 to-amber-700 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 mb-4 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      <Calendar className="w-5 h-5" />
                      Schedule Site Visit
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-700 to-amber-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>

                  <button
                    onClick={() => setShowEnquiryForm(true)}
                    className="w-full bg-white border-2 border-amber-500 text-amber-600 py-4 rounded-xl font-bold text-lg hover:bg-amber-50 transition-all mb-4 flex items-center justify-center gap-3"
                  >
                    <MessageSquare className="w-5 h-5" />
                    Send Enquiry
                  </button>

                  <div className="grid grid-cols-2 gap-3 mb-8">
                    <button className="py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
                      <Phone className="w-4 h-4" />
                      Call Now
                    </button>
                    <button className="py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
                      <Mail className="w-4 h-4" />
                      WhatsApp
                    </button>
                  </div>

                  {/* Property Info */}
                  <div className="mt-8 pt-8 border-t border-slate-200 space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Eye className="w-5 h-5 text-slate-500" />
                        <span className="text-slate-600">Views</span>
                      </div>
                      <span className="font-bold text-slate-900">{formatNumber(property.views || property.viewCount || 0)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-slate-500" />
                        <span className="text-slate-600">Listed</span>
                      </div>
                      <span className="font-bold text-slate-900">{getDaysAgo(property.createdAt)}</span>
                    </div>
                    </div> 
                  <div className="mt-8 p-6 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl text-white">
                    <div className="flex items-center gap-3 mb-4">
                      <Shield className="w-6 h-6 text-amber-400" />
                      <span className="font-bold">Premium Support</span>
                    </div>
                    <p className="text-sm text-slate-300 mb-4">
                      Get dedicated assistance from our premium concierge team for this property.
                    </p>
                    <button className="w-full py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-sm font-semibold hover:bg-white/20 transition-colors">
                      Request Concierge
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-slate-900">Enquiry Form</h3>
                    <button
                      onClick={() => setShowEnquiryForm(false)}
                      className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5 text-slate-600" />
                    </button>
                  </div>
                  
                  <form onSubmit={handleSubmitEnquiry} className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-900 mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        placeholder="Enter your full name"
                        required
                        className="w-full px-4 py-3.5 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-900 mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        placeholder="your.email@domain.com"
                        required
                        className="w-full px-4 py-3.5 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-900 mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                        placeholder="+91 98765 43210"
                        required
                        className="w-full px-4 py-3.5 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-900 mb-2">Your Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleFormChange}
                        placeholder="Tell us about your requirements, preferred timeline, etc."
                        rows="4"
                        className="w-full px-4 py-3.5 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all bg-white resize-none"
                      ></textarea>
                    </div>
                    <div className="flex gap-3">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="flex-1 group relative bg-gradient-to-r from-amber-600 to-amber-700 text-white py-3.5 rounded-xl font-bold hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {submitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span>Submitting...</span>
                            </>
                          ) : (
                            <>
                              <Mail className="w-5 h-5" />
                              <span>Submit Enquiry</span>
                            </>
                          )}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-700 to-amber-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </button>
                    </div>
                    <p className="text-xs text-slate-500 text-center">
                      By submitting, you agree to our Terms and Privacy Policy
                    </p>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};