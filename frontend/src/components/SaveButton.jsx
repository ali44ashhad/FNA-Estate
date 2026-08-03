import React from 'react';
import { Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';

// Floating heart used on listing cards and the listing detail page.
export const SaveButton = ({ propertyId, ownerId, variant = 'floating' }) => {
  const { user } = useAuth();
  const { isSaved, toggleSave, pendingId } = useWishlist();

  const isOwnListing = Boolean(user && ownerId && String(ownerId) === String(user.id || user._id));
  if (user?.role === 'admin' || isOwnListing) return null;

  const saved = isSaved(propertyId);
  const busy = pendingId === String(propertyId);

  const styles =
    variant === 'outlined'
      ? 'rounded-xl border border-slate-200 bg-white p-2.5 transition-colors hover:border-brand-300'
      : 'rounded-full bg-white/90 p-2 shadow-sm transition-colors hover:bg-white';

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleSave(propertyId);
      }}
      disabled={busy}
      aria-label={saved ? 'Remove from saved' : 'Save this business'}
      title={user ? (saved ? 'Remove from saved' : 'Save this business') : 'Login to save'}
      className={`${styles} disabled:opacity-60`}
    >
      <Heart
        className={`${variant === 'outlined' ? 'h-5 w-5' : 'h-4 w-4'} ${
          saved ? 'fill-red-500 text-red-500' : 'text-slate-600'
        }`}
      />
    </button>
  );
};
