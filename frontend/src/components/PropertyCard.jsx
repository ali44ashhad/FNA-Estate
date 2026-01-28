import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  BedDouble,
  Bath,
  Square,
  Car,
  Heart,
  Eye,
  CheckCircle,
  TrendingUp,
  Building2,
  Sparkles
} from 'lucide-react';

/* ===============================
   Fallback Image (Unsplash)
================================ */
const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

/* ===============================
   Component
================================ */
export const PropertyCard = ({ property, viewMode = 'grid' }) => {
  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)} L`;
    }
    return `₹${price.toLocaleString()}`;
  };

  const getPropertyTypeIcon = (type) => {
    const icons = {
      Penthouse: '🏢',
      Villa: '🏡',
      Flat: '🏠',
      Plot: '📐',
      Commercial: '🏢',
      Farmhouse: '🌳'
    };
    return icons[type] || '🏠';
  };

  const getImageSrc = () => {
    return property?.media?.primaryImage || FALLBACK_IMAGE;
  };

  const isPremium = property.pricing.finalPrice > 50000000;
  const isFeatured = property.isFeatured;

  /* ===============================
     LIST VIEW
  ================================ */
  if (viewMode === 'list') {
    return (
      <Link to={`/property/${property._id}`} className="no-underline group">
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:border-amber-200">
          <div className="flex flex-col md:flex-row">
            {/* Image */}
            <div className="md:w-1/3 relative overflow-hidden h-64 md:h-auto bg-slate-100">
              <img
                src={getImageSrc()}
                alt={property.title}
                onError={(e) => (e.currentTarget.src = FALLBACK_IMAGE)}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {isPremium && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg">
                  <Sparkles className="w-4 h-4" />
                  PREMIUM
                </div>
              )}

              {isFeatured && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg">
                  <TrendingUp className="w-4 h-4" />
                  FEATURED
                </div>
              )}

              <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-xl font-bold text-sm">
                {getPropertyTypeIcon(property.propertyType)} {property.propertyType}
              </div>

              <div className="absolute bottom-4 right-4 flex gap-2">
                <button className="p-2 bg-white/90 rounded-lg shadow-lg">
                  <Heart className="w-5 h-5 text-slate-700" />
                </button>
                <button className="p-2 bg-white/90 rounded-lg shadow-lg">
                  <Eye className="w-5 h-5 text-slate-700" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="md:w-2/3 p-8">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium text-green-600">VERIFIED</span>
              </div>

              <h3 className="text-2xl font-bold mb-3 text-slate-900">
                {property.title}
              </h3>

              <div className="flex items-center gap-2 text-slate-600 mb-6">
                <MapPin className="w-5 h-5 text-amber-500" /> 
                {property.location.locality}, {property.location.city}
                <MapPin className="w-5 h-5 text-amber-500" />
                    <span className="text-lg font-medium">{property.location.locality}, {property.location.city}</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <Info icon={<BedDouble />} label="Bedrooms" value={property.propertyDetails.bedrooms} />
                <Info icon={<Bath />} label="Bathrooms" value={property.propertyDetails.bathrooms} />
                <Info icon={<Square />} label="Sq Ft" value={property.propertyDetails.builtUpArea} />
                <Info icon={<Car />} label="Parking" value={property.propertyDetails.parking || '2'} />
              </div>

              <div className="flex justify-between items-center pt-6 border-t">
                <div>
                  <div className="text-sm text-slate-500">Starting from</div>
                  <div className="text-3xl font-bold text-amber-600">
                    {formatPrice(property.pricing.finalPrice)}
                  </div>
                </div>

                <button className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold flex items-center gap-2">
                  View Details
                  <Building2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  /* ===============================
     GRID VIEW
  ================================ */
  return (
    <Link to={`/property/${property._id}`} className="no-underline group">
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:-translate-y-1">
        <div className="relative h-64 bg-slate-100">
          <img
            src={getImageSrc()}
            alt={property.title}
            onError={(e) => (e.currentTarget.src = FALLBACK_IMAGE)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {isPremium && (
            <div className="absolute top-4 left-4 bg-amber-600 text-white px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              PREMIUM
            </div>
          )}

          <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            VERIFIED
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">{property.title}</h3>

          <div className="flex items-center gap-2 text-slate-600 mb-4">
            <MapPin className="w-4 h-4 text-amber-500" />
            {property.location.locality}, {property.location.city}
          </div>

         

          <div className="mt-4">
            <div className="text-sm text-slate-500">Starting from</div>
            <div className="text-2xl font-bold text-amber-600">
              {formatPrice(property.pricing.finalPrice)}
            </div>
          </div>

          <button className="w-full mt-4 bg-slate-900 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2">
            View Property
            <Building2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Link>
  );
};

/* ===============================
   Helper Components
================================ */
const Info = ({ icon, label, value }) => (
  <div className="flex items-center gap-3">
    <div className="p-2 bg-slate-100 rounded-lg">{icon}</div>
    <div>
      <div className="font-bold">{value}</div>
      <div className="text-sm text-slate-500">{label}</div>
    </div>
  </div>
);

const MiniInfo = ({ icon, value, label }) => (
  <div className="text-center">
    <div className="mx-auto mb-2 p-2 bg-slate-100 rounded-lg w-10 h-10 flex items-center justify-center">
      {icon}
    </div>
    <div className="text-sm font-bold">{value}</div>
    <div className="text-xs text-slate-500">{label}</div>
  </div>
);
