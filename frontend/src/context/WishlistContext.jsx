import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { wishlistService } from '../services/api';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [savedIds, setSavedIds] = useState([]);
  const [pendingId, setPendingId] = useState(null);

  // Admins do not save listings
  const canSave = Boolean(user) && user.role !== 'admin';

  const refreshWishlist = useCallback(async () => {
    if (!canSave) {
      setSavedIds([]);
      return;
    }

    try {
      const res = await wishlistService.getWishlistIds();
      setSavedIds(res.data.propertyIds || []);
    } catch {
      setSavedIds([]);
    }
  }, [canSave]);

  useEffect(() => {
    refreshWishlist();
  }, [refreshWishlist]);

  const isSaved = useCallback(
    (propertyId) => savedIds.includes(String(propertyId)),
    [savedIds]
  );

  const toggleSave = useCallback(
    async (propertyId) => {
      if (!user) {
        navigate('/login');
        return;
      }

      if (!canSave || !propertyId) return;

      const id = String(propertyId);
      setPendingId(id);

      try {
        const res = isSaved(id)
          ? await wishlistService.removeFromWishlist(id)
          : await wishlistService.addToWishlist(id);
        setSavedIds(res.data.propertyIds || []);
      } catch (error) {
        console.error(error?.response?.data?.message || 'Could not update saved listings');
      } finally {
        setPendingId(null);
      }
    },
    [canSave, isSaved, navigate, user]
  );

  return (
    <WishlistContext.Provider
      value={{
        savedIds,
        savedCount: savedIds.length,
        canSave,
        isSaved,
        toggleSave,
        pendingId,
        refreshWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
