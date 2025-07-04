import { create } from 'zustand'
import axios from 'axios'

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
      const catRes = await axios.get('http://localhost:5001/api/categories/')
      const categories = catRes.data
      // Fetch menu items for each category
      const menuPromises = categories.map(cat =>
        axios.get(`http://localhost:5001/api/menus/category/${cat._id}`)
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
    await axios.post('http://localhost:5001/api/categories/', { name })
    await get().fetchCategoriesAndMenus()
  },
  updateCategory: async (_id, name) => {
    await axios.put(`http://localhost:5001/api/categories/${_id}`, { name })
    await get().fetchCategoriesAndMenus()
  },
  deleteCategory: async (_id) => {
    await axios.delete(`http://localhost:5001/api/categories/${_id}`)
    await get().fetchCategoriesAndMenus()
  },
  // Menu CRUD
  addMenuItem: async (categoryId, formData) => {
    await axios.post(`http://localhost:5001/api/menus/category/${categoryId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    await get().fetchCategoriesAndMenus()
  },
  updateMenuItem: async (_id, formData) => {
    await axios.put(`http://localhost:5001/api/menus/${_id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    await get().fetchCategoriesAndMenus()
  },
  deleteMenuItem: async (_id) => {
    await axios.delete(`http://localhost:5001/api/menus/${_id}`)
    await get().fetchCategoriesAndMenus()
  },
}))

export default useMenuStore
