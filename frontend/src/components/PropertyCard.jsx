import React from 'react';
import { Link } from 'react-router-dom';
import { Handshake } from 'lucide-react';
import {
  FALLBACK_LISTING_IMAGE,
  getCategoryLabel,
  getListingBadge,
  getListingBadgeTone,
  getListingImage,
  getListingPrice,
  getListingStats,
} from '../utils/business';
import { SaveButton } from './SaveButton';

const ListingBadge = ({ label, tone = 'brand' }) => {
  const className =
    tone === 'amber'
      ? 'bg-amber-500 text-white'
      : tone === 'sold'
        ? 'bg-slate-800 text-white'
        : 'bg-brand-gradient text-white';
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${className}`}
    >
      {label}
    </span>
  );
};

const SpecRow = ({ stats }) => (
  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-slate-500">
    {stats.map((stat, index) => (
      <React.Fragment key={stat.label}>
        {index > 0 && <span className="text-slate-300">·</span>}
        <span>
          <span className="text-slate-400">{stat.label}: </span>
          <span className="font-medium text-slate-700">{stat.value}</span>
        </span>
      </React.Fragment>
    ))}
  </div>
);

export const PropertyCard = ({ property, viewMode = 'grid' }) => {
  const detailLink = `/property/${property._id}`;
  const category = getCategoryLabel(property.propertyType);
  const price = getListingPrice(property);
  const stats = getListingStats(property);
  const badge = getListingBadge(property);
  const badgeTone = getListingBadgeTone(property);
  const isSold = property.status === 'Sold';
  const listingLabel = property.listingType === 'Rent' ? 'For Lease' : 'For Sale';

  const image = (
    <img
      src={getListingImage(property)}
      alt={property.title}
      loading="lazy"
      onError={(e) => {
        e.currentTarget.src = FALLBACK_LISTING_IMAGE;
      }}
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
    />
  );

  const actions = (
    <div className="grid grid-cols-2 gap-2">
      <Link
        to={detailLink}
        className="rounded-lg border border-slate-200 py-2 text-center text-xs font-medium text-slate-600 transition-colors hover:border-brand-500 hover:text-brand-700"
      >
        View Details
      </Link>
      <Link
        to={detailLink}
        className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold text-white transition-colors ${
          isSold
            ? 'pointer-events-none bg-slate-400'
            : 'bg-brand-gradient hover:opacity-95'
        }`}
      >
        <Handshake className="h-3.5 w-3.5" />
        {isSold ? 'Sold' : 'Connect'}
      </Link>
    </div>
  );

  if (viewMode === 'list') {
    return (
      <article className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow duration-300 hover:shadow-md">
        <div className="flex flex-col md:flex-row">
          <div className="relative h-48 overflow-hidden bg-slate-100 md:h-auto md:w-64 md:shrink-0">
            {image}
            <span className="absolute left-2.5 top-2.5">
              <ListingBadge label={badge} tone={badgeTone} />
            </span>
            <span className="absolute right-2.5 top-2.5">
              <SaveButton
                propertyId={property._id}
                ownerId={property.createdBy?._id || property.createdBy}
              />
            </span>
          </div>

          <div className="flex flex-1 flex-col px-4 py-3.5 sm:px-5">
            <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
              {category}
              <span className="mx-1.5 text-slate-300">·</span>
              {listingLabel}
            </p>

            <div className="mt-1.5 flex items-start justify-between gap-4">
              <Link to={detailLink} className="min-w-0">
                <h3 className="truncate text-[15px] font-semibold leading-snug text-slate-900 transition-colors hover:text-brand-700">
                  {property.title}
                </h3>
              </Link>
              <div className="shrink-0 text-right">
                <p className="text-[15px] font-semibold tabular-nums text-slate-900">{price}</p>
              </div>
            </div>

            {property.description && (
              <p className="mt-1.5 line-clamp-1 text-xs leading-relaxed text-slate-500">
                {property.description}
              </p>
            )}

            <div className="mt-3">
              <SpecRow stats={stats} />
            </div>

            <div className="mt-4 max-w-xs">{actions}</div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow duration-300 hover:shadow-md">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        {image}
        <span className="absolute left-2.5 top-2.5">
          <ListingBadge label={badge} tone={badgeTone} />
        </span>
        <span className="absolute right-2.5 top-2.5">
          <SaveButton
            propertyId={property._id}
            ownerId={property.createdBy?._id || property.createdBy}
          />
        </span>
      </div>

      <div className="flex flex-1 flex-col px-3.5 py-3">
        <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
          {category}
          <span className="mx-1.5 text-slate-300">·</span>
          {listingLabel}
        </p>

        <Link to={detailLink} className="mt-1 min-w-0">
          <h3 className="truncate text-[15px] font-semibold leading-snug text-slate-900 transition-colors hover:text-brand-700">
            {property.title}
          </h3>
        </Link>

        <p className="mt-1 text-[15px] font-semibold tabular-nums text-slate-900">{price}</p>

        <div className="mt-2.5 border-t border-slate-100 pt-2.5">
          <SpecRow stats={stats} />
        </div>

        <div className="mt-auto pt-3">{actions}</div>
      </div>
    </article>
  );
};
