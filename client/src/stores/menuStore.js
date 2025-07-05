import { create } from 'zustand';
import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache duration

const useMenuStore = create((set, get) => ({
  // State
  categories: [],
  selectedCategory: null,
  menuItems: [],
  loading: true,
  error: null,
  menuLoading: false,
  rating: {},
  ratingMsg: {},
  menuRatings: {},
  // Cache for menu items by category
  _menuItemsCache: {},
  _lastFetchTimes: {},

  // Actions
  fetchCategories: async () => {
    try {
      set({ loading: true, error: null });
      const { data } = await axios.get(`${API_URL}/categories`);
      set({ categories: data });
      
      // Automatically fetch menu items for the first category
      if (data.length > 0) {
        get().fetchMenuItems(data[0]._id);
      }
      return data;
    } catch (error) {
      set({ error: 'Failed to fetch categories' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  fetchMenuItems: async (categoryId, forceRefresh = false) => {
    const { _menuItemsCache, _lastFetchTimes } = get();
    const now = Date.now();
    
    // Check if we have a cached version that's still valid
    if (!forceRefresh && 
        _menuItemsCache[categoryId] && 
        now - (_lastFetchTimes[categoryId] || 0) < CACHE_DURATION) {
      set({ 
        menuItems: _menuItemsCache[categoryId].items,
        menuRatings: _menuItemsCache[categoryId].ratings,
        selectedCategory: categoryId,
        menuLoading: false 
      });
      return _menuItemsCache[categoryId].items;
    }

    try {
      set({ menuLoading: true, menuItems: [], selectedCategory: categoryId });
      
      // Fetch menu items
      const { data: menuItems } = await axios.get(`${API_URL}/menus/category/${categoryId}`);
      
      // Only proceed with ratings if we have items
      let ratingsObj = {};
      if (menuItems && menuItems.length > 0) {
        // Fetch ratings for all menu items in parallel
        const ratingsPromises = menuItems.map(async (item) => {
          try {
            const { data } = await axios.get(`${API_URL}/rating/menu/${item._id || item.id}/average`);
            return { id: item._id || item.id, ...data };
          } catch {
            return { id: item._id || item.id, avgRating: 0, count: 0 };
          }
        });

        const ratings = await Promise.all(ratingsPromises);
        ratingsObj = ratings.reduce((acc, r) => ({
          ...acc,
          [r.id]: { avgRating: r.avgRating, count: r.count }
        }), {});
      }

      // Update cache
      const cacheEntry = {
        items: menuItems,
        ratings: ratingsObj,
        timestamp: now
      };

      set({
        menuItems,
        menuRatings: ratingsObj,
        _menuItemsCache: {
          ..._menuItemsCache,
          [categoryId]: cacheEntry
        },
        _lastFetchTimes: {
          ..._lastFetchTimes,
          [categoryId]: now
        }
      });

      return menuItems;
    } catch (error) {
      set({ error: 'Failed to fetch menu items' });
      throw error;
    } finally {
      set({ menuLoading: false });
    }
  },
  
  // Force refresh the current category
  refreshCurrentCategory: async () => {
    const { selectedCategory } = get();
    if (selectedCategory) {
      return get().fetchMenuItems(selectedCategory, true);
    }
  },

  handleRatingChange: (menuId, value) => {
    set(state => ({
      rating: {
        ...state.rating,
        [menuId]: state.rating[menuId] === value ? 0 : value
      },
      ratingMsg: {
        ...state.ratingMsg,
        [menuId]: ''
      }
    }));
  },

  submitRating: async (menuId) => {
    const { rating, menuRatings } = get();
    if (!rating[menuId]) return;
    
    const today = new Date().toISOString().slice(0, 10);
    const ratingKey = `ratings_${menuId}_${today}`;
    const countKey = `rating_count_${menuId}_${today}`;
    
    // Get today's ratings for this menu item
    const todayRatings = JSON.parse(localStorage.getItem(ratingKey) || '[]');
    const ratingCount = parseInt(localStorage.getItem(countKey) || '0', 10);
    
    // Check if user has already rated this item 4 times today
    if (ratingCount >= 4) {
      set(state => ({
        ratingMsg: {
          ...state.ratingMsg,
          [menuId]: 'You have reached the maximum of 4 ratings per day for this item.'
        }
      }));
      return;
    }
    
    // Check if user has already rated this item today
    if (todayRatings.includes(menuId)) {
      set(state => ({
        ratingMsg: {
          ...state.ratingMsg,
          [menuId]: 'You have already rated this item today.'
        }
      }));
      return;
    }
    
    try {
      await axios.post(`${API_URL}/rating`, {
        menu: menuId,
        stars: rating[menuId],
        user: 'anonymous' // You might want to replace this with actual user ID if you have authentication
      });
      
      // Update local storage
      localStorage.setItem(ratingKey, JSON.stringify([...todayRatings, menuId]));
      localStorage.setItem(countKey, (ratingCount + 1).toString());
      
      // Update the UI with the new rating
      const currentRating = menuRatings[menuId] || { avgRating: 0, count: 0 };
      const newCount = currentRating.count + 1;
      const newAvg = ((currentRating.avgRating * currentRating.count) + rating[menuId]) / newCount;
      
      set(state => ({
        menuRatings: {
          ...state.menuRatings,
          [menuId]: {
            avgRating: newAvg,
            count: newCount
          }
        },
        rating: {
          ...state.rating,
          [menuId]: 0 // Reset the selected rating
        },
        ratingMsg: {
          ...state.ratingMsg,
          [menuId]: 'Thank you for your rating!'
        }
      }));
      
    } catch (error) {
      set(state => ({
        ratingMsg: {
          ...state.ratingMsg,
          [menuId]: 'Failed to submit rating. Please try again.'
        }
      }));
    }
  },
  
  // Reset state when needed
  reset: () => set({
    categories: [],
    selectedCategory: null,
    menuItems: [],
    loading: false,
    error: null,
    menuLoading: false,
    rating: {},
    ratingMsg: {},
    menuRatings: {},
    _menuItemsCache: {},
    _lastFetchTimes: {}
  })
}));

export default useMenuStore;
