import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { propertyService, enquiryService, authService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Loading } from '../components/Loading';
import { SaveButton } from '../components/SaveButton';
import {
  FALLBACK_LISTING_IMAGE,
  getCategoryLabel,
  getListingBadge,
  getListingBadgeTone,
  getListingBadges,
  getListingPrice,
  getListingStats,
  getListingHighlights,
} from '../utils/business';
import {
  Square,
  Car,
  Share2,
  CheckCircle,
  Calendar,
  Building2,
  Phone,
  Mail,
  MessageSquare,
  ArrowLeft,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Handshake,
  BedDouble,
  Bath,
  Compass,
  Zap,
  Droplets,
  Dumbbell,
  Waves,
  Lock,
  ArrowUpDown,
  X,
  LogIn,
  LayoutDashboard,
} from 'lucide-react';

const AMENITIES = [
  { key: 'parking', label: 'Parking', icon: Car },
  { key: 'lift', label: 'Lift', icon: ArrowUpDown },
  { key: 'security', label: 'Security', icon: Lock },
  { key: 'powerBackup', label: 'Power Backup', icon: Zap },
  { key: 'waterSupply', label: '24/7 Water', icon: Droplets },
  { key: 'gym', label: 'Gym', icon: Dumbbell },
  { key: 'swimmingPool', label: 'Swimming Pool', icon: Waves },
  { key: 'kitchen', label: 'Kitchen', icon: CheckCircle },
  { key: 'outdoorSeating', label: 'Outdoor Seating', icon: CheckCircle },
  { key: 'liquorLicense', label: 'Liquor License', icon: CheckCircle },
  { key: 'cctv', label: 'CCTV', icon: Lock },
  { key: 'loadingBay', label: 'Loading Bay', icon: CheckCircle },
  { key: 'access24x7', label: '24×7 Access', icon: CheckCircle },
  { key: 'ac', label: 'AC', icon: CheckCircle },
  { key: 'wifi', label: 'Wi‑Fi', icon: CheckCircle },
  { key: 'attachedBathroom', label: 'Attached Bathroom', icon: Bath },
  { key: 'messFacility', label: 'Mess / Food', icon: CheckCircle },
];

const inputClass =
  'w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 transition focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-100';

/** Normalize phone for tel: and WhatsApp (defaults to India +91 for 10-digit numbers) */
const toWhatsAppNumber = (phone) => {
  if (!phone) return '';
  let digits = String(phone).replace(/\D/g, '');
  if (digits.startsWith('0')) digits = digits.slice(1);
  if (digits.length === 10) digits = `91${digits}`;
  return digits;
};

const toTelHref = (phone) => {
  const digits = toWhatsAppNumber(phone);
  return digits ? `tel:+${digits}` : null;
};

export const PropertyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const routerLocation = useLocation();
  const { user } = useAuth();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [platformPhone, setPlatformPhone] = useState('');

  const ownerId = property?.createdBy?._id || property?.createdBy;
  const isOwnListing = Boolean(
    user?.role === 'seller' &&
      ownerId &&
      String(ownerId) === String(user.id || user._id)
  );
  const isAdmin = user?.role === 'admin';
  const canEnquire = Boolean(
    user && (user.role === 'user' || user.role === 'seller') && !isOwnListing
  );
  const enquiriesPath = user?.role === 'seller' ? '/seller/enquiries' : '/user/enquiries';
  const returnPath = `${routerLocation.pathname}${routerLocation.search}`;

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await propertyService.getPropertyDetails(id);
        setProperty(res.data.property);
        setSelectedImage(0);
      } catch (err) {
        setError('Failed to load business details. Please try again.');
        setProperty(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  useEffect(() => {
    (async () => {
      try {
        const res = await authService.getPlatformContact();
        setPlatformPhone(res.data.contact?.phone || '');
      } catch {
        setPlatformPhone('');
      }
    })();
  }, []);

  // Prefill enquiry contact details from the logged-in profile
  useEffect(() => {
    if (!user || (user.role !== 'user' && user.role !== 'seller')) {
      setShowEnquiryForm(false);
      return;
    }
    setFormData((prev) => ({
      ...prev,
      name: prev.name || user.name || '',
      email: prev.email || user.email || '',
      phone: prev.phone || user.phone || '',
    }));
  }, [user]);

  const images = useMemo(() => {
    if (!property) return [FALLBACK_LISTING_IMAGE];
    const primary = property.media?.primaryImage;
    const gallery = property.media?.gallery || [];
    const list = [primary, ...gallery].filter(Boolean);
    return list.length > 0 ? [...new Set(list)] : [FALLBACK_LISTING_IMAGE];
  }, [property]);

  const requireLogin = () => {
    navigate('/login', { state: { from: returnPath } });
  };

  const openEnquiryForm = () => {
    if (!user) {
      requireLogin();
      return;
    }
    if (isOwnListing) {
      setError('You cannot send an enquiry on your own listing.');
      return;
    }
    if (!canEnquire) {
      setError('Only buyer or seller accounts can send enquiries.');
      return;
    }
    setError('');
    setShowEnquiryForm(true);
  };

  const handleContactClick = (e) => {
    if (!user) {
      e.preventDefault();
      requireLogin();
      return;
    }
    if (isOwnListing) {
      e.preventDefault();
      setError('You cannot contact yourself on your own listing.');
      return;
    }
    if (!canEnquire) {
      e.preventDefault();
      setError('Only buyer or seller accounts can contact sellers from this page.');
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitEnquiry = async (e) => {
    e.preventDefault();
    if (!canEnquire) {
      if (!user) requireLogin();
      return;
    }
    try {
      setSubmitting(true);
      setError('');
      await enquiryService.submitEnquiry({
        propertyId: id,
        contactInfo: formData,
      });
      setSuccessMessage(
        'Your enquiry has been submitted successfully! Track its status anytime under My Enquiries.'
      );
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        message: '',
      });
      setShowEnquiryForm(false);
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (err) {
      if (err.response?.status === 401) {
        requireLogin();
        return;
      }
      setError(
        err.response?.data?.message ||
          'Failed to submit enquiry. Please try again or contact support.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: property?.title || 'Udyam Mittar Listing',
      text: `Check out this business on Udyam Mittar: ${property?.title || ''}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setSuccessMessage('Listing link copied to clipboard.');
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch {
      // User cancelled share — ignore.
    }
  };

  const getDaysAgo = (date) => {
    if (!date) return '—';
    const days = Math.floor((Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24));
    if (days <= 0) return 'Today';
    if (days === 1) return '1 day ago';
    return `${days} days ago`;
  };

  const nextImage = () => setSelectedImage((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);

  if (loading) return <Loading />;

  if (error && !property) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-12 text-center">
          <span className="mx-auto mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-500">
            <ShieldCheck className="h-8 w-8 text-white" />
          </span>
          <h2 className="text-2xl font-bold text-slate-900">Unable to Load Business</h2>
          <p className="mt-2 text-red-600">{error}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 rounded-xl bg-brand-gradient px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-gradient"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
          <span className="mx-auto mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-50">
            <Building2 className="h-8 w-8 text-brand-700" />
          </span>
          <h2 className="text-2xl font-bold text-slate-900">Business Not Available</h2>
          <p className="mt-2 text-slate-600">
            This listing is no longer available or has been removed.
          </p>
          <Link
            to="/properties"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-gradient"
          >
            <ArrowLeft className="h-4 w-4" />
            Browse Businesses
          </Link>
        </div>
      </div>
    );
  }

  const category = getCategoryLabel(property.propertyType);
  const price = getListingPrice(property);
  const badge = getListingBadge(property);
  const badgeTone = getListingBadgeTone(property);
  const badges = getListingBadges(property);
  const isSold = property.status === 'Sold';
  const stats = getListingStats(property);
  const listingType = property.listingType === 'Rent' ? 'For Lease' : 'For Sale';
  const activeAmenities = AMENITIES.filter((item) => property.amenities?.[item.key]);
  const otherAmenities = property.amenities?.other || [];

  const seoTitle = `${property.title} | ${category} | Udyam Mittar`;
  const seoDescription = `${property.title} — verified ${category.toLowerCase()} ${listingType.toLowerCase()}. ${
    property.description?.slice(0, 140) || 'View details, photos and connect with the seller on Udyam Mittar.'
  } Asking price: ${price}.`;
  const propertyImage = images[0];
  const propertyUrl = `https://udyammittar.com/property/${id}`;

  const highlightItems = getListingHighlights(property);

  const badgeClass =
    badgeTone === 'amber'
      ? 'bg-amber-500 text-white'
      : badgeTone === 'sold'
        ? 'bg-slate-800 text-white'
        : 'bg-brand-gradient text-white';

  const callHref = toTelHref(platformPhone);
  const whatsappNumber = toWhatsAppNumber(platformPhone);
  const whatsappHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        `Hi, I'm interested in: ${property.title}`
      )}`
    : null;

  return (
    <div className="min-h-screen bg-slate-50">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta
          name="keywords"
          content={`${category}, ${property.propertyType}, business for sale, Udyam Mittar`}
        />
        <link rel="canonical" href={propertyUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={propertyUrl} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:image" content={propertyImage} />
        <meta property="og:site_name" content="Udyam Mittar" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={propertyImage} />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: property.title,
            description: property.description,
            url: propertyUrl,
            image: images,
            category,
            offers: {
              '@type': 'Offer',
              price: property.pricing?.finalPrice,
              priceCurrency: 'INR',
              availability: isSold
                ? 'https://schema.org/SoldOut'
                : 'https://schema.org/InStock',
            },
          })}
        </script>
      </Helmet>

      {isSold && (
        <div className="border-b border-slate-700 bg-slate-800 px-4 py-3 text-center text-sm font-semibold text-white">
          This business has been marked as Sold. Enquiries are closed for this listing.
        </div>
      )}

      {successMessage && (
        <div className="fixed right-4 top-4 z-50 max-w-sm rounded-2xl bg-brand-gradient p-5 text-white shadow-2xl">
          <div className="flex items-start gap-3">
            <CheckCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <div>
              <p className="font-bold">Done</p>
              <p className="mt-1 text-sm text-brand-100">{successMessage}</p>
            </div>
            <button
              type="button"
              onClick={() => setSuccessMessage('')}
              className="ml-auto rounded-lg p-1 hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8 lg:py-8">
        <div className="mb-5 flex items-center justify-between gap-4">
          <Link
            to="/properties"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 transition-colors hover:text-brand-700"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Businesses
          </Link>

          <div className="flex gap-2">
            <SaveButton
              propertyId={property._id}
              ownerId={property.createdBy?._id || property.createdBy}
              variant="outlined"
            />
            <button
              type="button"
              onClick={handleShare}
              aria-label="Share listing"
              className="rounded-lg border border-slate-200 bg-white p-2 transition-colors hover:border-brand-300"
            >
              <Share2 className="h-4 w-4 text-slate-500" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main */}
          <div className="lg:col-span-2">
            {/* Gallery */}
            <div className="mb-5">
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-slate-200 sm:aspect-[2/1]">
                <img
                  src={images[selectedImage]}
                  alt={property.title}
                  onError={(e) => {
                    e.currentTarget.src = FALLBACK_LISTING_IMAGE;
                  }}
                  className="h-full w-full object-cover"
                />

                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={prevImage}
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 rounded-lg bg-black/45 p-1.5 text-white backdrop-blur-sm transition-colors hover:bg-black/65"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={nextImage}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-lg bg-black/45 p-1.5 text-white backdrop-blur-sm transition-colors hover:bg-black/65"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </>
                )}

                <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 rounded-md bg-black/55 px-2 py-0.5 text-[10px] font-medium text-white">
                  {selectedImage + 1} / {images.length}
                </div>

                <span
                  className={`absolute left-2.5 top-2.5 inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${badgeClass}`}
                >
                  {badge}
                </span>
              </div>

              {images.length > 1 && (
                <div className="mt-2.5 grid grid-cols-5 gap-1.5 sm:grid-cols-7">
                  {images.slice(0, 7).map((img, idx) => (
                    <button
                      key={`${img}-${idx}`}
                      type="button"
                      onClick={() => setSelectedImage(idx)}
                      className={`relative aspect-[4/3] overflow-hidden rounded-lg border transition-all ${
                        selectedImage === idx
                          ? 'border-brand-600'
                          : 'border-transparent hover:border-slate-300'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Gallery ${idx + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details card */}
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 lg:p-6">
              <div className="mb-5 border-b border-slate-100 pb-5">
                <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                  {category}
                  <span className="mx-1.5 text-slate-300">·</span>
                  {listingType}
                  {badges.length > 0 && (
                    <>
                      <span className="mx-1.5 text-slate-300">·</span>
                      {badges.map((b, i) => (
                        <span key={b.label}>
                          {i > 0 && <span className="mx-1.5 text-slate-300">·</span>}
                          <span className="text-slate-500">{b.label}</span>
                        </span>
                      ))}
                    </>
                  )}
                </p>

                <h1 className="mt-2 text-xl font-semibold leading-snug tracking-tight text-slate-900 sm:text-2xl">
                  {property.title}
                </h1>

                <div className="mt-3">
                  <div className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                    Asking price
                  </div>
                  <div className="mt-0.5 text-xl font-semibold tabular-nums text-slate-900 sm:text-2xl">
                    {price}
                  </div>
                </div>
              </div>

              {/* Key specs */}
              <div className="mb-6">
                <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Key Details
                </h2>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {stats.map((stat) => (
                    <SpecCard
                      key={stat.label}
                      icon={
                        /Area|Plot|Built/i.test(stat.label)
                          ? Square
                          : /Room|Bed/i.test(stat.label)
                            ? BedDouble
                            : Building2
                      }
                      label={stat.label}
                      value={stat.value}
                    />
                  ))}
                  {property.amenities?.parking != null && (
                    <SpecCard
                      icon={Car}
                      label="Parking"
                      value={property.amenities.parking ? 'Available' : 'Not available'}
                    />
                  )}
                </div>
              </div>

              {/* Highlights */}
              {highlightItems.length > 0 && (
                <div className="mb-6 border-b border-slate-100 pb-6">
                  <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Business Highlights
                  </h2>
                  <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                    {highlightItems.map((item) => (
                      <div key={item.label} className="rounded-lg border border-slate-100 bg-slate-50/80 px-3 py-2.5">
                        <div className="text-[11px] font-medium text-slate-400">{item.label}</div>
                        <div className="mt-0.5 text-[13px] font-semibold capitalize text-slate-800">
                          {item.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Amenities */}
              {(activeAmenities.length > 0 || otherAmenities.length > 0) && (
                <div className="mb-6 border-b border-slate-100 pb-6">
                  <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Amenities
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {activeAmenities.map(({ key, label, icon: Icon }) => (
                      <div
                        key={key}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700"
                      >
                        <Icon className="h-3 w-3 text-brand-600" />
                        {label}
                      </div>
                    ))}
                    {otherAmenities.map((label) => (
                      <div
                        key={label}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700"
                      >
                        <CheckCircle className="h-3 w-3 text-brand-600" />
                        {label}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div>
                <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  About This Business
                </h2>
                <p className="whitespace-pre-line text-sm leading-relaxed text-slate-600">
                  {property.description || 'No description provided for this listing.'}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="sticky top-24 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              {!showEnquiryForm ? (
                <div className="p-4 sm:p-5">
                  <div className="mb-4">
                    <h3 className="text-[15px] font-semibold text-slate-900">
                      Interested in this business?
                    </h3>
                    <p className="mt-0.5 text-xs text-slate-500">
                      Connect securely with the verified seller
                    </p>
                  </div>

                  <div className="mb-4 rounded-lg border border-slate-100 bg-slate-50/80 px-3.5 py-3">
                    <div className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                      Asking price
                    </div>
                    <div className="mt-0.5 text-lg font-semibold tabular-nums text-slate-900">
                      {price}
                    </div>
                    <div className="mt-0.5 text-[11px] text-slate-500">{listingType}</div>
                  </div>

                  {error && (
                    <div className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                      {error}
                    </div>
                  )}

                  {!user ? (
                    <>
                      <button
                        type="button"
                        onClick={requireLogin}
                        disabled={isSold}
                        className="mb-2 flex w-full items-center justify-center gap-1.5 rounded-lg bg-brand-gradient py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <LogIn className="h-3.5 w-3.5" />
                        {isSold ? 'Sold — Enquiries Closed' : 'Login to Connect'}
                      </button>
                      {!isSold && (
                        <p className="mb-5 text-center text-[11px] text-slate-500">
                          Sign in so we can track your enquiry status in My Enquiries.
                        </p>
                      )}
                    </>
                  ) : isSold ? (
                    <div className="mb-5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-600">
                      This listing is marked as <span className="font-semibold">Sold</span>. You
                      cannot send new enquiries. Browse other available businesses instead.
                    </div>
                  ) : isOwnListing ? (
                    <div className="mb-5 space-y-2">
                      <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-xs text-amber-900">
                        This is your listing. You cannot send an enquiry on your own business.
                      </div>
                      <Link
                        to="/seller/listings"
                        className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-brand-gradient py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-95"
                      >
                        <LayoutDashboard className="h-3.5 w-3.5" />
                        Seller Dashboard
                      </Link>
                    </div>
                  ) : isAdmin ? (
                    <div className="mb-5 space-y-2">
                      <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-600">
                        You are signed in as admin. Enquiries are for buyers and sellers only.
                      </div>
                      <Link
                        to={`/admin/listings/${id}/edit`}
                        state={{ from: '/admin/listings' }}
                        className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-brand-gradient py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-95"
                      >
                        <LayoutDashboard className="h-3.5 w-3.5" />
                        Manage Listing
                      </Link>
                    </div>
                  ) : !canEnquire ? (
                    <div className="mb-5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-600">
                      Buyer and seller accounts can send enquiries and track their status. You are
                      signed in as{' '}
                      <span className="font-semibold text-slate-800">{user.role}</span>.
                    </div>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={openEnquiryForm}
                        className="mb-2 flex w-full items-center justify-center gap-1.5 rounded-lg bg-brand-gradient py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-95"
                      >
                        <Handshake className="h-3.5 w-3.5" />
                        Connect with Seller
                      </button>

                      <button
                        type="button"
                        onClick={openEnquiryForm}
                        className="mb-2 flex w-full items-center justify-center gap-1.5 rounded-lg border border-slate-200 py-2.5 text-xs font-medium text-slate-700 transition-colors hover:border-brand-500 hover:text-brand-700"
                      >
                        <MessageSquare className="h-3.5 w-3.5" />
                        Send Enquiry
                      </button>

                      <div className="mb-5 grid grid-cols-2 gap-2">
                        {callHref ? (
                          <a
                            href={callHref}
                            onClick={handleContactClick}
                            className="flex items-center justify-center gap-1.5 rounded-lg bg-slate-50 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100"
                          >
                            <Phone className="h-3.5 w-3.5" />
                            Call
                          </a>
                        ) : (
                          <button
                            type="button"
                            disabled
                            className="flex items-center justify-center gap-1.5 rounded-lg bg-slate-50 py-2 text-xs font-medium text-slate-400"
                          >
                            <Phone className="h-3.5 w-3.5" />
                            Call
                          </button>
                        )}
                        {whatsappHref ? (
                          <a
                            href={whatsappHref}
                            target="_blank"
                            rel="noreferrer"
                            onClick={handleContactClick}
                            className="flex items-center justify-center gap-1.5 rounded-lg bg-slate-50 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100"
                          >
                            <Mail className="h-3.5 w-3.5" />
                            WhatsApp
                          </a>
                        ) : (
                          <button
                            type="button"
                            disabled
                            className="flex items-center justify-center gap-1.5 rounded-lg bg-slate-50 py-2 text-xs font-medium text-slate-400"
                          >
                            <Mail className="h-3.5 w-3.5" />
                            WhatsApp
                          </button>
                        )}
                      </div>
                    </>
                  )}

                  <div className="space-y-2.5 border-t border-slate-100 pt-4 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-slate-400">
                        <Calendar className="h-3.5 w-3.5" />
                        Listed
                      </span>
                      <span className="font-medium text-slate-700">
                        {getDaysAgo(property.createdAt)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-slate-400">
                        <Building2 className="h-3.5 w-3.5" />
                        Category
                      </span>
                      <span className="font-medium text-slate-700">{property.propertyType}</span>
                    </div>
                    {property.propertyDetails?.facingDirection && (
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-slate-400">
                          <Compass className="h-3.5 w-3.5" />
                          Facing
                        </span>
                        <span className="font-medium text-slate-700">
                          {property.propertyDetails.facingDirection}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 rounded-lg bg-brand-gradient p-3.5 text-white">
                    <div className="mb-1 flex items-center gap-1.5 text-xs font-semibold">
                      <ShieldCheck className="h-3.5 w-3.5 text-brand-200" />
                      Verified & Confidential
                    </div>
                    <p className="text-[11px] leading-relaxed text-brand-100">
                      Every listing on Udyam Mittar is manually verified. Your enquiry stays private
                      until you choose to connect.
                    </p>
                    {canEnquire && (
                      <Link
                        to={enquiriesPath}
                        className="mt-3 block rounded-md bg-white/10 py-1.5 text-center text-[11px] font-semibold transition-colors hover:bg-white/20"
                      >
                        View My Enquiries
                      </Link>
                    )}
                    <Link
                      to="/services/consultation"
                      className="mt-2 block rounded-md bg-white/10 py-1.5 text-center text-[11px] font-semibold transition-colors hover:bg-white/20"
                    >
                      Get Expert Guidance
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="p-4 sm:p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-[15px] font-semibold text-slate-900">Send Enquiry</h3>
                    <button
                      type="button"
                      onClick={() => setShowEnquiryForm(false)}
                      className="rounded-md p-1.5 transition-colors hover:bg-slate-100"
                    >
                      <ArrowLeft className="h-4 w-4 text-slate-500" />
                    </button>
                  </div>

                  {error && (
                    <div className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmitEnquiry} className="space-y-3">
                    <div>
                      <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        placeholder="Enter your full name"
                        required
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        placeholder="your.email@domain.com"
                        required
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                        placeholder="+91 98765 43210"
                        required
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                        Your Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleFormChange}
                        placeholder="Tell us about your interest, budget, or questions..."
                        rows="4"
                        className={`${inputClass} resize-none`}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-brand-gradient py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {submitting ? (
                        <>
                          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Handshake className="h-3.5 w-3.5" />
                          Submit Enquiry
                        </>
                      )}
                    </button>
                    <p className="text-center text-[11px] text-slate-500">
                      You can track this enquiry anytime under{' '}
                      <Link to={enquiriesPath} className="font-semibold text-brand-700 hover:underline">
                        My Enquiries
                      </Link>
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

const SpecCard = ({ icon: Icon, label, value }) => (
  <div className="rounded-lg border border-slate-100 bg-slate-50/80 px-3 py-2.5">
    <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
      <Icon className="h-3 w-3" />
      {label}
    </div>
    <div className="mt-0.5 text-[13px] font-semibold capitalize text-slate-800">{value}</div>
  </div>
);
