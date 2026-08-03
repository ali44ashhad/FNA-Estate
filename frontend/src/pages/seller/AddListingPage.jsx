import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { propertyService, adminService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { BUSINESS_CATEGORIES, TRICITY_LOCATIONS } from '../../utils/business';
import {
  getCategoryGroup,
  SPACE_FIELDS_BY_GROUP,
  FINANCIAL_FIELDS_BY_GROUP,
  AMENITIES_BY_GROUP,
  emptyAmenities,
  emptyFinancials,
  emptyBusinessDetails,
  emptyPropertyDetails,
  groupSectionTitle,
  toNumberOrUndefined,
} from '../../utils/listingForm';
import { Loading } from '../../components/Loading';
import {
  Store,
  MapPin,
  IndianRupee,
  Award,
  Upload,
  AlertCircle,
  XCircle,
  ShieldCheck,
  Building2,
  ImagePlus,
  X,
  Star,
  ClipboardList,
  TrendingUp,
  Users,
} from 'lucide-react';

const MAX_IMAGES = 10;
const MAX_FILE_MB = 5;

const defaultForm = {
  title: '',
  description: '',
  propertyType: 'Shop',
  listingType: 'Sale',
  location: {
    country: 'India',
    state: 'Punjab',
    city: '',
    locality: '',
    fullAddress: '',
  },
  pricing: {
    basePrice: '',
    currency: 'INR',
  },
  propertyDetails: emptyPropertyDetails(),
  financials: emptyFinancials(),
  businessDetails: emptyBusinessDetails(),
  amenities: emptyAmenities(),
};

const inputClass =
  'w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-800 shadow-sm transition-colors placeholder:text-slate-400 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100';

const SectionHeader = ({ icon: Icon, title, subtitle }) => (
  <div className="mb-6 flex items-center gap-3">
    <span className="rounded-xl bg-brand-50 p-2.5 text-brand-700">
      <Icon className="h-5 w-5" />
    </span>
    <div>
      <h3 className="text-lg font-bold text-slate-900">{title}</h3>
      {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
    </div>
  </div>
);

const FieldLabel = ({ children, required }) => (
  <label className="mb-2 block text-sm font-semibold text-slate-700">
    {children}
    {required ? ' *' : ''}
  </label>
);

export const AddListingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id: editId } = useParams();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const isEditMode = Boolean(isAdmin && editId);
  const returnPath =
    location.state?.from || (isAdmin ? '/admin/listings' : '/seller/dashboard');
  const fileInputRef = useRef(null);
  const skipTypeResetRef = useRef(false);
  const [formData, setFormData] = useState(defaultForm);
  const [images, setImages] = useState([]); // new local files { id, file, preview }
  const [existingImages, setExistingImages] = useState([]); // already uploaded URLs
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(isEditMode);
  const [sellers, setSellers] = useState([]);
  const [sellerId, setSellerId] = useState('');
  const [publishNow, setPublishNow] = useState(true);
  const [listingStatus, setListingStatus] = useState('Pending Approval');
  const [isVerified, setIsVerified] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const [isHot, setIsHot] = useState(false);

  const categoryGroup = useMemo(
    () => getCategoryGroup(formData.propertyType),
    [formData.propertyType]
  );
  const spaceFields = SPACE_FIELDS_BY_GROUP[categoryGroup] || [];
  const financialFields = FINANCIAL_FIELDS_BY_GROUP[categoryGroup] || [];
  const amenityOptions = AMENITIES_BY_GROUP[categoryGroup] || [];
  const prevTypeRef = useRef(formData.propertyType);
  const totalImageCount = existingImages.length + images.length;

  useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.preview));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isAdmin) return;
    (async () => {
      try {
        const res = await adminService.getSellers();
        setSellers((res.data.sellers || []).filter((s) => s.isActive !== false));
      } catch {
        setSellers([]);
      }
    })();
  }, [isAdmin]);

  // Load listing for admin edit
  useEffect(() => {
    if (!isEditMode) return;
    (async () => {
      try {
        setLoadingEdit(true);
        setError('');
        const res = await propertyService.getPropertyDetails(editId);
        const p = res.data.property;
        if (!p) throw new Error('Listing not found');

        skipTypeResetRef.current = true;
        prevTypeRef.current = p.propertyType || 'Shop';

        setFormData({
          title: p.title || '',
          description: p.description || '',
          propertyType: p.propertyType || 'Shop',
          listingType: p.listingType || 'Sale',
          location: {
            country: p.location?.country || 'India',
            state: p.location?.state || 'Punjab',
            city: p.location?.city || '',
            locality: p.location?.locality || '',
            fullAddress: p.location?.fullAddress || '',
          },
          pricing: {
            basePrice: p.pricing?.basePrice ?? p.pricing?.finalPrice ?? '',
            currency: p.pricing?.currency || 'INR',
          },
          propertyDetails: {
            ...emptyPropertyDetails(),
            ...Object.fromEntries(
              Object.entries(p.propertyDetails || {}).map(([k, v]) => [
                k,
                v == null ? '' : String(v),
              ])
            ),
            furnishingStatus: p.propertyDetails?.furnishingStatus || 'Unfurnished',
          },
          financials: {
            ...emptyFinancials(),
            monthlySales: p.financials?.monthlySales ?? '',
            monthlyProfit: p.financials?.monthlyProfit ?? '',
            establishmentYear: p.financials?.establishmentYear ?? '',
            staffCount: p.financials?.staffCount ?? '',
            reasonForSale: p.financials?.reasonForSale || '',
          },
          businessDetails: {
            ...emptyBusinessDetails(),
            seatingCapacity: p.businessDetails?.seatingCapacity ?? '',
            inventoryIncluded: Boolean(p.businessDetails?.inventoryIncluded),
            roomsCount: p.businessDetails?.roomsCount ?? '',
            bedsCount: p.businessDetails?.bedsCount ?? '',
            genderType: p.businessDetails?.genderType || '',
            rentPerBed: p.businessDetails?.rentPerBed ?? '',
            occupancyPercent: p.businessDetails?.occupancyPercent ?? '',
            hotelType: p.businessDetails?.hotelType || '',
            workstations: p.businessDetails?.workstations ?? '',
            cabins: p.businessDetails?.cabins ?? '',
            powerLoadKva: p.businessDetails?.powerLoadKva ?? '',
            plotArea: p.businessDetails?.plotArea ?? '',
            ceilingHeight: p.businessDetails?.ceilingHeight ?? '',
            loadingDock: Boolean(p.businessDetails?.loadingDock),
            machineryIncluded: Boolean(p.businessDetails?.machineryIncluded),
            licensesIncluded: Boolean(p.businessDetails?.licensesIncluded),
          },
          amenities: {
            ...emptyAmenities(),
            ...(p.amenities || {}),
          },
        });

        const urls = [p.media?.primaryImage, ...(p.media?.gallery || [])].filter(Boolean);
        setExistingImages(urls);
        setSellerId(p.createdBy?._id || p.createdBy || '');
        setPublishNow(p.status === 'Approved');
        setListingStatus(p.status || 'Pending Approval');
        setIsVerified(p.isVerified !== false);
        setIsPremium(Boolean(p.isPremium));
        setIsHot(Boolean(p.isHot));
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to load listing');
      } finally {
        setLoadingEdit(false);
      }
    })();
  }, [isEditMode, editId]);

  // Reset category-specific fields only when the user manually changes category
  useEffect(() => {
    if (skipTypeResetRef.current) {
      skipTypeResetRef.current = false;
      prevTypeRef.current = formData.propertyType;
      return;
    }
    if (prevTypeRef.current === formData.propertyType) return;
    prevTypeRef.current = formData.propertyType;
    setFormData((prev) => ({
      ...prev,
      propertyDetails: {
        ...emptyPropertyDetails(),
        furnishingStatus: 'Unfurnished',
      },
      financials: emptyFinancials(),
      businessDetails: emptyBusinessDetails(),
      amenities: emptyAmenities(),
    }));
  }, [formData.propertyType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNested = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const toggleAmenity = (key) => {
    setFormData((prev) => ({
      ...prev,
      amenities: { ...prev.amenities, [key]: !prev.amenities[key] },
    }));
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files || []);
    e.target.value = '';
    if (files.length === 0) return;

    setError('');
    setImages((prev) => {
      const remaining = MAX_IMAGES - existingImages.length - prev.length;
      if (remaining <= 0) {
        setError(`You can upload up to ${MAX_IMAGES} images`);
        return prev;
      }

      const accepted = [];
      for (const file of files.slice(0, remaining)) {
        if (!file.type.startsWith('image/')) {
          setError('Only image files are allowed (JPG, PNG, WEBP)');
          continue;
        }
        if (file.size > MAX_FILE_MB * 1024 * 1024) {
          setError(`Each image must be under ${MAX_FILE_MB} MB`);
          continue;
        }
        accepted.push({
          id: `${file.name}-${file.size}-${Date.now()}-${Math.random()}`,
          file,
          preview: URL.createObjectURL(file),
        });
      }
      return [...prev, ...accepted];
    });
  };

  const removeImage = (id) => {
    setImages((prev) => {
      const target = prev.find((img) => img.id === id);
      if (target) URL.revokeObjectURL(target.preview);
      return prev.filter((img) => img.id !== id);
    });
  };

  const removeExistingImage = (url) => {
    setExistingImages((prev) => prev.filter((u) => u !== url));
  };

  const setPrimaryExisting = (url) => {
    setExistingImages((prev) => {
      const idx = prev.indexOf(url);
      if (idx <= 0) return prev;
      const next = [...prev];
      next.splice(idx, 1);
      next.unshift(url);
      return next;
    });
  };

  const setPrimaryImage = (id) => {
    setImages((prev) => {
      const idx = prev.findIndex((img) => img.id === id);
      if (idx <= 0) return prev;
      const next = [...prev];
      const [picked] = next.splice(idx, 1);
      next.unshift(picked);
      return next;
    });
  };

  const getFieldValue = (field) => {
    const section = field.section || 'financials';
    return formData[section]?.[field.key];
  };

  const setFieldValue = (field, value) => {
    const section = field.section || 'financials';
    handleNested(section, field.key, value);
  };

  const renderDynamicField = (field) => {
    const value = getFieldValue(field);

    if (field.type === 'boolean') {
      return (
        <div key={`${field.section}-${field.key}`} className="flex flex-col justify-end">
          <FieldLabel required={field.required}>{field.label}</FieldLabel>
          <div className="flex gap-3">
            {[true, false].map((opt) => (
              <button
                key={String(opt)}
                type="button"
                onClick={() => setFieldValue(field, opt)}
                className={`flex-1 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${
                  value === opt
                    ? 'border-brand-400 bg-brand-50 text-brand-800'
                    : 'border-slate-300 text-slate-600 hover:border-brand-300'
                }`}
              >
                {opt ? 'Yes' : 'No'}
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (field.type === 'select') {
      return (
        <div key={`${field.section}-${field.key}`}>
          <FieldLabel required={field.required}>{field.label}</FieldLabel>
          <select
            value={value || ''}
            onChange={(e) => setFieldValue(field, e.target.value)}
            required={field.required}
            className={inputClass}
          >
            <option value="">Select</option>
            {(field.options || []).map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      );
    }

    return (
      <div key={`${field.section}-${field.key}`} className={field.type === 'text' && field.key === 'reasonForSale' ? 'lg:col-span-2' : ''}>
        <FieldLabel required={field.required}>{field.label}</FieldLabel>
        <input
          type={field.type === 'number' ? 'number' : 'text'}
          min={field.min}
          max={field.max}
          value={value ?? ''}
          onChange={(e) => setFieldValue(field, e.target.value)}
          required={field.required}
          className={inputClass}
          placeholder={field.type === 'number' ? '0' : ''}
        />
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      setError('');

      if (totalImageCount === 0) {
        setError('Please upload at least one image of your business');
        setSubmitting(false);
        return;
      }

      let mediaUrls = [...existingImages];
      if (images.length > 0) {
        const uploadRes = await propertyService.uploadImages(images.map((img) => img.file));
        const uploaded = uploadRes.data.urls || uploadRes.data.images || [];
        mediaUrls = [...mediaUrls, ...uploaded];
      }

      if (mediaUrls.length === 0) {
        throw new Error('Image upload returned no URLs');
      }

      const pd = formData.propertyDetails;
      const fin = formData.financials;
      const bd = formData.businessDetails;

      const payload = {
        title: formData.title,
        description: formData.description,
        propertyType: formData.propertyType,
        listingType: formData.listingType,
        location: formData.location,
        pricing: {
          basePrice: Number(formData.pricing.basePrice),
          finalPrice: Number(formData.pricing.basePrice),
          currency: 'INR',
        },
        propertyDetails: {
          builtUpArea: toNumberOrUndefined(pd.builtUpArea),
          carpetArea: toNumberOrUndefined(pd.carpetArea),
          bedrooms: toNumberOrUndefined(pd.bedrooms) ?? 0,
          bathrooms: toNumberOrUndefined(pd.bathrooms) ?? 0,
          floorNumber: pd.floorNumber || undefined,
          totalFloors: pd.totalFloors || undefined,
          furnishingStatus: pd.furnishingStatus || 'Unfurnished',
        },
        financials: {
          monthlySales: toNumberOrUndefined(fin.monthlySales),
          monthlyProfit: toNumberOrUndefined(fin.monthlyProfit),
          establishmentYear: toNumberOrUndefined(fin.establishmentYear),
          staffCount: toNumberOrUndefined(fin.staffCount),
          reasonForSale: fin.reasonForSale || undefined,
        },
        businessDetails: {
          seatingCapacity: toNumberOrUndefined(bd.seatingCapacity),
          inventoryIncluded: Boolean(bd.inventoryIncluded),
          roomsCount: toNumberOrUndefined(bd.roomsCount),
          bedsCount: toNumberOrUndefined(bd.bedsCount),
          genderType: bd.genderType || undefined,
          rentPerBed: toNumberOrUndefined(bd.rentPerBed),
          occupancyPercent: toNumberOrUndefined(bd.occupancyPercent),
          hotelType: bd.hotelType || undefined,
          workstations: toNumberOrUndefined(bd.workstations),
          cabins: toNumberOrUndefined(bd.cabins),
          powerLoadKva: toNumberOrUndefined(bd.powerLoadKva),
          plotArea: toNumberOrUndefined(bd.plotArea),
          ceilingHeight: toNumberOrUndefined(bd.ceilingHeight),
          loadingDock: Boolean(bd.loadingDock),
          machineryIncluded: Boolean(bd.machineryIncluded),
          licensesIncluded: Boolean(bd.licensesIncluded),
        },
        amenities: formData.amenities,
        media: {
          primaryImage: mediaUrls[0],
          gallery: mediaUrls.slice(1),
        },
        ...(isAdmin
          ? {
              sellerId: sellerId || undefined,
              isVerified,
              isPremium,
              isHot,
              ...(isEditMode ? {} : { publishNow }),
            }
          : {}),
      };

      if (isEditMode) {
        await adminService.updateProperty(editId, {
          ...payload,
          status: listingStatus,
        });
        navigate(returnPath);
      } else {
        await propertyService.createProperty(payload);
        navigate(returnPath);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          (isEditMode ? 'Failed to update listing' : 'Failed to create listing')
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingEdit) return <Loading />;

  return (
    <div className="min-h-full bg-white">
      <Helmet>
        <title>
          {isEditMode
            ? 'Edit Listing | Admin'
            : isAdmin
              ? 'Add Listing | Admin'
              : 'Add Listing | Seller'}{' '}
          | Udyam Mittar
        </title>
      </Helmet>

      <section className="relative border-b border-slate-100">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-white" />
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-100/40 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-xs font-semibold text-brand-800">
            <ShieldCheck className="h-4 w-4" />
            {isEditMode
              ? 'Admin · Edit Before Approval'
              : isAdmin
                ? 'Admin · Direct Listing'
                : 'New Business Listing'}
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            {isEditMode ? (
              <>
                Edit <span className="text-brand-800">Listing</span>
              </>
            ) : (
              <>
                Add <span className="text-brand-800">Listing</span>
              </>
            )}
          </h1>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-600">
            {isEditMode
              ? 'Update seller-submitted details, then return to pending approvals to approve or reject.'
              : isAdmin
                ? 'Create a listing directly from the admin panel. Optionally assign it to a seller and publish live.'
                : 'Fields adapt to your business category so buyers get the right details.'}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-10 lg:px-8">
        {error && (
          <div className="mb-6 flex items-center justify-between gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 shrink-0 text-red-500" />
              <span className="text-sm font-medium text-red-700">{error}</span>
            </div>
            <button type="button" onClick={() => setError('')} className="text-red-500 hover:text-red-700">
              <XCircle className="h-5 w-5" />
            </button>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8"
        >
          {isAdmin && (
            <section className="border-b border-slate-100 pb-8">
              <SectionHeader
                icon={Users}
                title="Ownership & Publish"
                subtitle="Assign to a seller (optional) and choose publish status"
              />
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <div>
                  <FieldLabel>Assign to Seller</FieldLabel>
                  <select
                    value={sellerId}
                    onChange={(e) => setSellerId(e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Platform / Admin (no seller)</option>
                    {sellers.map((s) => (
                      <option key={s._id} value={s._id}>
                        {s.name}
                        {s.companyName ? ` — ${s.companyName}` : ''} ({s.email})
                      </option>
                    ))}
                  </select>
                  <p className="mt-1.5 text-xs text-slate-500">
                    If assigned, the listing appears under that seller&apos;s account.
                  </p>
                </div>
                <div>
                  <FieldLabel required>Listing Status</FieldLabel>
                  {isEditMode ? (
                    <select
                      value={listingStatus}
                      onChange={(e) => setListingStatus(e.target.value)}
                      className={inputClass}
                    >
                      <option value="Approved">Approved (Live)</option>
                      <option value="Pending Approval">Pending Approval</option>
                      <option value="Sold">Sold</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  ) : (
                    <select
                      value={publishNow ? 'live' : 'pending'}
                      onChange={(e) => setPublishNow(e.target.value === 'live')}
                      className={inputClass}
                    >
                      <option value="live">Publish live (Approved)</option>
                      <option value="pending">Save as Pending Approval</option>
                    </select>
                  )}
                  {isEditMode && (
                    <p className="mt-1.5 text-xs text-slate-500">
                      Choose <span className="font-semibold">Sold</span> to remove from public
                      browse and close enquiries.
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  {
                    key: 'verified',
                    label: 'Verified Listing',
                    hint: 'Shows Verified badge',
                    checked: isVerified,
                    onChange: setIsVerified,
                  },
                  {
                    key: 'premium',
                    label: 'Premium Listing',
                    hint: 'Highlight as premium',
                    checked: isPremium,
                    onChange: setIsPremium,
                  },
                  {
                    key: 'hot',
                    label: 'Hot Opportunity',
                    hint: 'Priority hot badge',
                    checked: isHot,
                    onChange: setIsHot,
                  },
                ].map((badge) => (
                  <label
                    key={badge.key}
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 transition-all ${
                      badge.checked
                        ? 'border-brand-300 bg-brand-50'
                        : 'border-slate-200 hover:border-brand-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={badge.checked}
                      onChange={(e) => badge.onChange(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded text-brand-700 focus:ring-brand-500"
                    />
                    <span>
                      <span className="block text-sm font-semibold text-slate-800">{badge.label}</span>
                      <span className="text-xs text-slate-500">{badge.hint}</span>
                    </span>
                  </label>
                ))}
              </div>
            </section>
          )}

          {/* Basic */}
          <section className="border-b border-slate-100 pb-8">
            <SectionHeader
              icon={Store}
              title="Basic Information"
              subtitle="Title, category and description"
            />
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <div className="lg:col-span-2">
                <FieldLabel required>Title</FieldLabel>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Profitable Cafe in Sector 17"
                  className={inputClass}
                />
              </div>

              <div>
                <FieldLabel required>Business Category</FieldLabel>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  required
                  className={inputClass}
                >
                  {BUSINESS_CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
                <p className="mt-1.5 text-xs text-slate-500">
                  Form fields below update based on this category.
                </p>
              </div>

              <div>
                <FieldLabel required>Listing Type</FieldLabel>
                <select
                  name="listingType"
                  value={formData.listingType}
                  onChange={handleChange}
                  required
                  className={inputClass}
                >
                  <option value="Sale">For Sale</option>
                  <option value="Rent">For Lease</option>
                </select>
              </div>

              <div className="lg:col-span-2">
                <FieldLabel required>Description</FieldLabel>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Describe your business, strengths, and what is included..."
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          {/* Photos */}
          <section className="border-b border-slate-100 pb-8">
            <SectionHeader
              icon={ImagePlus}
              title="Business Photos *"
              subtitle={`Upload up to ${MAX_IMAGES} images (max ${MAX_FILE_MB} MB each). First image is the cover.`}
            />

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/jpg"
              multiple
              className="hidden"
              onChange={handleImageSelect}
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={totalImageCount >= MAX_IMAGES || submitting}
              className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center transition-colors hover:border-brand-400 hover:bg-brand-50/40 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="rounded-xl bg-brand-50 p-3 text-brand-700">
                <Upload className="h-6 w-6" />
              </span>
              <span className="text-sm font-semibold text-slate-800">Click to upload photos</span>
              <span className="text-xs text-slate-500">
                JPG, PNG or WEBP · {totalImageCount}/{MAX_IMAGES} selected
              </span>
            </button>

            {totalImageCount > 0 && (
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {existingImages.map((url, index) => (
                  <div
                    key={`existing-${url}`}
                    className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-slate-200 bg-slate-100"
                  >
                    <img src={url} alt={`Existing ${index + 1}`} className="h-full w-full object-cover" />
                    {index === 0 && (
                      <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-brand-gradient px-2 py-0.5 text-[10px] font-bold text-white shadow">
                        <Star className="h-3 w-3" />
                        Cover
                      </span>
                    )}
                    <div className="absolute inset-x-0 bottom-0 flex gap-1 bg-gradient-to-t from-black/70 to-transparent p-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100">
                      {index !== 0 && (
                        <button
                          type="button"
                          onClick={() => setPrimaryExisting(url)}
                          className="flex-1 rounded-lg bg-white/90 px-2 py-1 text-[10px] font-semibold text-slate-800"
                        >
                          Set cover
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => removeExistingImage(url)}
                        className="rounded-lg bg-red-500 px-2 py-1 text-white"
                        aria-label="Remove image"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
                {images.map((img, index) => {
                  const isCover = existingImages.length === 0 && index === 0;
                  return (
                    <div
                      key={img.id}
                      className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-slate-200 bg-slate-100"
                    >
                      <img src={img.preview} alt={`New ${index + 1}`} className="h-full w-full object-cover" />
                      {isCover && (
                        <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-brand-gradient px-2 py-0.5 text-[10px] font-bold text-white shadow">
                          <Star className="h-3 w-3" />
                          Cover
                        </span>
                      )}
                      <div className="absolute inset-x-0 bottom-0 flex gap-1 bg-gradient-to-t from-black/70 to-transparent p-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100">
                        {!isCover && existingImages.length === 0 && (
                          <button
                            type="button"
                            onClick={() => setPrimaryImage(img.id)}
                            className="flex-1 rounded-lg bg-white/90 px-2 py-1 text-[10px] font-semibold text-slate-800"
                          >
                            Set cover
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => removeImage(img.id)}
                          className="rounded-lg bg-red-500 px-2 py-1 text-white"
                          aria-label="Remove image"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Location */}
          <section className="border-b border-slate-100 pb-8">
            <SectionHeader icon={MapPin} title="Location Details" subtitle="Where is the business located?" />
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <div>
                <FieldLabel required>City</FieldLabel>
                <select
                  value={formData.location.city}
                  onChange={(e) => handleNested('location', 'city', e.target.value)}
                  required
                  className={inputClass}
                >
                  <option value="">Select city</option>
                  {TRICITY_LOCATIONS.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <FieldLabel required>State</FieldLabel>
                <input
                  type="text"
                  value={formData.location.state}
                  onChange={(e) => handleNested('location', 'state', e.target.value)}
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <FieldLabel required>Locality</FieldLabel>
                <input
                  type="text"
                  value={formData.location.locality}
                  onChange={(e) => handleNested('location', 'locality', e.target.value)}
                  required
                  placeholder="Sector 17"
                  className={inputClass}
                />
              </div>
              <div>
                <FieldLabel required>Country</FieldLabel>
                <input
                  type="text"
                  value={formData.location.country}
                  onChange={(e) => handleNested('location', 'country', e.target.value)}
                  required
                  className={inputClass}
                />
              </div>
              <div className="lg:col-span-2">
                <FieldLabel required>Full Address</FieldLabel>
                <input
                  type="text"
                  value={formData.location.fullAddress}
                  onChange={(e) => handleNested('location', 'fullAddress', e.target.value)}
                  required
                  placeholder="Complete address including landmark"
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          {/* Asking price */}
          <section className="border-b border-slate-100 pb-8">
            <SectionHeader icon={IndianRupee} title="Asking Price" subtitle="Investment amount for buyers" />
            <div className="max-w-sm">
              <FieldLabel required>Asking Price (₹)</FieldLabel>
              <input
                type="number"
                min="0"
                value={formData.pricing.basePrice}
                onChange={(e) => handleNested('pricing', 'basePrice', e.target.value)}
                required
                placeholder="3500000"
                className={inputClass}
              />
            </div>
          </section>

          {/* Category-specific space / operations */}
          <section className="border-b border-slate-100 pb-8">
            <SectionHeader
              icon={ClipboardList}
              title={groupSectionTitle(categoryGroup)}
              subtitle={`Required details for ${BUSINESS_CATEGORIES.find((c) => c.value === formData.propertyType)?.label || 'this category'}`}
            />
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">{spaceFields.map(renderDynamicField)}</div>
          </section>

          {/* Financials */}
          <section className="border-b border-slate-100 pb-8">
            <SectionHeader
              icon={TrendingUp}
              title="Business Financials"
              subtitle="Helps serious buyers evaluate the opportunity"
            />
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {financialFields.map(renderDynamicField)}
            </div>
          </section>

          {/* Amenities */}
          <section className="pb-2">
            <SectionHeader
              icon={Award}
              title="Amenities & Facilities"
              subtitle="Select what applies to this business type"
            />
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
              {amenityOptions.map(({ key, label }) => (
                <label
                  key={key}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-all ${
                    formData.amenities[key]
                      ? 'border-brand-300 bg-brand-50'
                      : 'border-slate-200 hover:border-brand-300 hover:bg-brand-50/50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={Boolean(formData.amenities[key])}
                    onChange={() => toggleAmenity(key)}
                    className="h-4 w-4 rounded text-brand-700 focus:ring-brand-500"
                  />
                  <span className="text-sm font-semibold text-slate-700">{label}</span>
                </label>
              ))}
            </div>
          </section>

          <div className="flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => navigate(returnPath)}
              className="rounded-xl border border-slate-300 px-8 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gradient px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-500/25 transition-colors hover:bg-brand-gradient disabled:opacity-60"
            >
              <Upload className="h-4 w-4" />
              {submitting
                ? isEditMode
                  ? 'Saving changes...'
                  : 'Uploading & submitting...'
                : isEditMode
                  ? 'Save Changes'
                  : isAdmin
                    ? publishNow
                      ? 'Create & Publish'
                      : 'Create as Pending'
                    : 'Submit for Approval'}
            </button>
          </div>
        </form>

        <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-slate-400">
          <Building2 className="h-3.5 w-3.5" />
          {isEditMode
            ? 'Save updates without losing the listing — adjust status above if needed'
            : isAdmin
              ? 'Admin listings can go live immediately or wait for review'
              : 'Listing will be reviewed by admin before going live'}
        </p>
      </div>
    </div>
  );
};
