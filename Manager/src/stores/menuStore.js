import { create } from 'zustand'
import axios from 'axios'
import useAuthStore from './authStore'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const useMenuStore = create((set, get) => ({
  categories: [],
  menuItems: {},
  loading: false,
  error: null,
  selectedCategory: null,
  // Fetch categories and menu items
  fetchCategoriesAndMenus: async () => {
    set({ loading: true, error: null })
    try {
      const { token } = useAuthStore.getState();
      const catRes = await axios.get(`${BACKEND_URL}/categories/`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      })
      const categories = catRes.data
      // Fetch menu items for each category
      const menuPromises = categories.map(cat =>
        axios.get(`${BACKEND_URL}/menus/category/${cat._id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        })
      )
      const menuResults = await Promise.all(menuPromises)
      const menuMap = {}
      categories.forEach((cat, idx) => {
        menuMap[cat._id] = menuResults[idx].data
      })
      set({
        categories,
        menuItems: menuMap,
        selectedCategory: get().selectedCategory || (categories[0]?._id || null),
        loading: false,
        error: null
      })
    } catch {
      set({ error: 'Failed to fetch data', loading: false })
    }
  },
  setSelectedCategory: (id) => set({ selectedCategory: id }),
  // Category CRUD
  addCategory: async (name) => {
    const { token } = useAuthStore.getState();
    await axios.post(`${BACKEND_URL}/categories/`, { name }, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    })
    await get().fetchCategoriesAndMenus()
  },
  updateCategory: async (_id, name) => {
    const { token } = useAuthStore.getState();
    await axios.put(`${BACKEND_URL}/categories/${_id}`, { name }, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    })
    await get().fetchCategoriesAndMenus()
  },
  deleteCategory: async (_id) => {
    const { token } = useAuthStore.getState();
    await axios.delete(`${BACKEND_URL}/categories/${_id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    })
    await get().fetchCategoriesAndMenus()
  },
  // Menu CRUD
  addMenuItem: async (categoryId, formData) => {
    const { token } = useAuthStore.getState();
    await axios.post(`${BACKEND_URL}/menus/category/${categoryId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }
    })
    await get().fetchCategoriesAndMenus()
  },
  updateMenuItem: async (_id, formData) => {
    const { token } = useAuthStore.getState();
    await axios.put(`${BACKEND_URL}/menus/${_id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }
    })
    await get().fetchCategoriesAndMenus()
  },
  deleteMenuItem: async (_id) => {
    const { token } = useAuthStore.getState();
    await axios.delete(`${BACKEND_URL}/menus/${_id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    })
    await get().fetchCategoriesAndMenus()
  },
}))

export default useMenuStore
