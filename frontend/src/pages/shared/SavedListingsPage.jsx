import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { wishlistService } from '../../services/api';
import { useWishlist } from '../../context/WishlistContext';
import { Loading } from '../../components/Loading';
import {
  FALLBACK_LISTING_IMAGE,
  getCategoryLabel,
  getListingImage,
  getListingPrice,
  getListingStats,
} from '../../utils/business';
import {
  Heart,
  Search,
  AlertCircle,
  XCircle,
  ArrowRight,
  Trash2,
  Eye,
} from 'lucide-react';

export const SavedListingsPage = () => {
  const { refreshWishlist } = useWishlist();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [removingId, setRemovingId] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await wishlistService.getWishlist();
        setProperties(res.data.properties || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load saved businesses');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleRemove = async (propertyId) => {
    setRemovingId(propertyId);
    try {
      await wishlistService.removeFromWishlist(propertyId);
      setProperties((prev) => prev.filter((p) => p._id !== propertyId));
      refreshWishlist();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not remove listing');
    } finally {
      setRemovingId(null);
    }
  };

  const filtered = properties.filter((p) =>
    [p.title, p.propertyType, getCategoryLabel(p.propertyType)]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loading />;

  return (
    <div className="min-h-full bg-white">
      <Helmet>
        <title>Saved Businesses | Udyam Mittar</title>
      </Helmet>

      <section className="relative border-b border-slate-100">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-white" />
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-100/40 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-xs font-semibold text-brand-800">
                <Heart className="h-4 w-4" />
                Your Shortlist
              </span>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Saved Businesses <span className="text-brand-800">({filtered.length})</span>
              </h1>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-600">
                Every listing you have saved, kept in one place for quick comparison.
              </p>
            </div>
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search saved businesses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm font-medium text-slate-800 shadow-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        {error && (
          <div className="mb-6 flex items-center justify-between gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <span className="text-sm font-medium text-red-700">{error}</span>
            </div>
            <button type="button" onClick={() => setError('')}>
              <XCircle className="h-5 w-5 text-red-500" />
            </button>
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
            <span className="mx-auto inline-flex rounded-xl bg-brand-50 p-4 text-brand-700">
              <Heart className="h-8 w-8" />
            </span>
            <h3 className="mt-5 text-xl font-bold text-slate-900">No Saved Businesses</h3>
            <p className="mt-2 text-sm text-slate-500">
              {searchTerm
                ? 'Try a different search term'
                : 'Tap the heart icon on any listing to save it here'}
            </p>
            <Link
              to="/properties"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-6 py-3 text-sm font-semibold text-white hover:bg-brand-gradient"
            >
              Browse Businesses
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px]">
                <thead>
                  <tr className="border-b border-slate-100 bg-brand-50/50">
                    {['Business', 'Key Details', 'Category', 'Asking Price', 'Actions'].map((h) => (
                      <th
                        key={h}
                        className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((property) => (
                    <tr key={property._id} className="hover:bg-brand-50/40">
                      <td className="px-5 py-4">
                        <Link to={`/property/${property._id}`} className="flex items-center gap-3">
                          <img
                            src={getListingImage(property)}
                            alt={property.title}
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.src = FALLBACK_LISTING_IMAGE;
                            }}
                            className="h-12 w-16 shrink-0 rounded-xl object-cover"
                          />
                          <span className="font-bold text-brand-800 hover:underline">
                            {property.title}
                          </span>
                        </Link>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-600">
                        <div className="space-y-0.5">
                          {getListingStats(property)
                            .slice(0, 2)
                            .map((stat) => (
                              <div key={stat.label}>
                                <span className="text-slate-400">{stat.label}: </span>
                                <span className="font-semibold text-slate-800">{stat.value}</span>
                              </div>
                            ))}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-600">
                        {getCategoryLabel(property.propertyType)}
                      </td>
                      <td className="px-5 py-4 text-sm font-bold text-brand-700">
                        {getListingPrice(property)}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/property/${property._id}`}
                            className="rounded-lg p-2 text-slate-500 hover:bg-brand-50 hover:text-brand-700"
                            aria-label="View listing"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleRemove(property._id)}
                            disabled={removingId === property._id}
                            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            {removingId === property._id ? 'Removing...' : 'Remove'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
