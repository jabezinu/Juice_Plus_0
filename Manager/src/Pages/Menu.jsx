import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Plus, Edit, Trash2, Eye, Loader2, X, Check, Star, StarHalf, ChevronLeft, ChevronRight } from 'lucide-react'
import useMenuStore from '../stores/menuStore'

const Menu = () => {
  // Zustand store hooks
  const {
    categories,
    menuItems,
    loading,
    error,
    selectedCategory,
    fetchCategoriesAndMenus,
    setSelectedCategory,
    addCategory,
    updateCategory,
    deleteCategory,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem
  } = useMenuStore()

  // UI state (modals, forms, etc.)
  const [showCatModal, setShowCatModal] = useState(false)
  const [catModalType, setCatModalType] = useState('add') // 'add' or 'edit'
  const [catForm, setCatForm] = useState({ name: '', _id: null })
  const [catActionLoading, setCatActionLoading] = useState(false)
  const [catActionMsg, setCatActionMsg] = useState('')
  // Menu CRUD UI state
  const [showMenuModal, setShowMenuModal] = useState(false)
  const [menuModalType, setMenuModalType] = useState('add') // 'add' or 'edit'
  const [menuForm, setMenuForm] = useState({ name: '', price: '', ingredients: '', badge: '', image: '', _id: null, category: '', outOfStock: false, imageFile: null })
  const [menuActionLoading, setMenuActionLoading] = useState(false)
  const [menuActionMsg, setMenuActionMsg] = useState('')
  // Detail UI state
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [detailItem, setDetailItem] = useState(null)
  const [detailRating, setDetailRating] = useState({ count: 0, avg: 0 })
  const [detailLoading, setDetailLoading] = useState(false)

  useEffect(() => {
    fetchCategoriesAndMenus()
    // eslint-disable-next-line
  }, [])

  // Category CRUD handlers
  const openCatModal = (type, cat = { name: '', _id: null }) => {
    setCatModalType(type)
    setCatForm(cat)
    setShowCatModal(true)
  }
  const closeCatModal = () => {
    setShowCatModal(false)
    setCatForm({ name: '', _id: null })
  }
  const handleCatFormChange = e => {
    setCatForm({ ...catForm, [e.target.name]: e.target.value })
  }
  const handleCatSubmit = async e => {
    e.preventDefault()
    setCatActionLoading(true)
    try {
      if (catModalType === 'add') {
        await addCategory(catForm.name)
        setCatActionMsg('Category added!')
      } else {
        await updateCategory(catForm._id, catForm.name)
        setCatActionMsg('Category updated!')
      }
      closeCatModal()
    } catch {
      setCatActionMsg('Error saving category')
    } finally {
      setCatActionLoading(false)
      setTimeout(() => setCatActionMsg(''), 1500)
    }
  }
  // Menu CRUD handlers
  const openMenuModal = (type, categoryId, item = { name: '', price: '', ingredients: '', badge: '', image: '', _id: null, outOfStock: false, imageFile: null }) => {
    setMenuModalType(type)
    setMenuForm({ ...item, category: categoryId, outOfStock: item.outOfStock ?? false })
    setShowMenuModal(true)
  }
  const closeMenuModal = () => {
    setShowMenuModal(false)
    // Revoke object URL to avoid memory leaks
    if (menuForm.image && menuForm.image.startsWith('blob:')) {
      URL.revokeObjectURL(menuForm.image)
    }
    setMenuForm({ name: '', price: '', ingredients: '', badge: '', image: '', _id: null, category: '', outOfStock: false, imageFile: null })
  }
  const handleMenuFormChange = e => {
    const { name, value, type, checked, files } = e.target
    
    // Handle file input
    if (type === 'file' && files && files[0]) {
      // Revoke previous blob URL to prevent memory leaks
      if (menuForm.image && menuForm.image.startsWith('blob:')) {
        URL.revokeObjectURL(menuForm.image)
      }
      
      setMenuForm(prev => ({
        ...prev,
        imageFile: files[0],
        image: URL.createObjectURL(files[0])
      }))
    } 
    // Handle other inputs
    else {
      setMenuForm(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }))
    }
  }
  const handleMenuSubmit = async e => {
    e.preventDefault()
    setMenuActionLoading(true)
    try {
      const formData = new FormData()
      formData.append('name', menuForm.name)
      formData.append('price', parseFloat(menuForm.price))
      formData.append('ingredients', menuForm.ingredients)
      formData.append('badge', menuForm.badge)
      formData.append('outOfStock', !!menuForm.outOfStock)
      formData.append('category', menuForm.category)
      if (menuForm.imageFile) {
        formData.append('image', menuForm.imageFile)
      } else if (menuForm.image && !menuForm.image.startsWith('blob:')) {
        formData.append('imageUrl', menuForm.image)
      }
      if (menuModalType === 'add') {
        await addMenuItem(menuForm.category, formData)
        setMenuActionMsg('Menu item added!')
      } else {
        await updateMenuItem(menuForm._id, formData)
        setMenuActionMsg('Menu item updated!')
      }
      closeMenuModal()
    } catch {
      setMenuActionMsg('Error saving menu item')
    } finally {
      setMenuActionLoading(false)
      setTimeout(() => setMenuActionMsg(''), 1500)
    }
  }
  const handleMenuDelete = async (id) => {
    if (!window.confirm('Delete this menu item?')) return
    setMenuActionLoading(true)
    try {
      await deleteMenuItem(id)
      setMenuActionMsg('Menu item deleted!')
    } catch {
      setMenuActionMsg('Error deleting menu item')
    } finally {
      setMenuActionLoading(false)
      setTimeout(() => setMenuActionMsg(''), 1500)
    }
  }
  const openDetailModal = async (item) => {
    setDetailLoading(true)
    setDetailItem(item)
    setShowDetailModal(true)
    try {
      // Fetch average rating from backend
      const res = await axios.get(`http://localhost:5001/api/rating/menu/${item._id}/average`)
      // Expecting { count, avg } from backend
      if (typeof res.data === 'object' && res.data !== null) {
        setDetailRating({ count: res.data.count ?? 0, avg: res.data.avgRating ?? 0 })
      } else {
        setDetailRating({ count: 0, avg: 0 })
      }
    } catch {
      setDetailRating({ count: 0, avg: 0 })
    } finally {
      setDetailLoading(false)
    }
  }
  const closeDetailModal = () => {
    setShowDetailModal(false)
    setDetailItem(null)
    setDetailRating({ count: 0, avg: 0 })
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 animate-spin text-pink-600" />
      <span className="ml-2 text-sm sm:text-base text-gray-600">Loading menu...</span>
    </div>
  )
  if (error) return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="bg-red-50 border-l-4 border-red-500 p-4 w-full max-w-sm sm:max-w-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <X className="h-5 w-5 text-red-500" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Menu Management</h1>
            <p className="mt-1 text-sm sm:text-base text-gray-500">Manage your menu categories and items</p>
          </div>
          <button
            onClick={() => openCatModal('add')}
            className="mt-4 sm:mt-0 inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </button>
        </div>
        {/* Category Tabs */}
        <div className="mb-6 sm:mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-2 sm:space-x-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {categories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => setSelectedCategory(cat._id)}
                  className={`whitespace-nowrap py-3 px-3 sm:py-4 sm:px-4 border-b-2 font-medium text-xs sm:text-sm ${
                    selectedCategory === cat._id
                      ? 'border-pink-500 text-pink-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Status Messages */}
        {catActionMsg && (
          <div className="mb-6">
            <div className="rounded-md bg-green-50 p-3 sm:p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-green-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">{catActionMsg}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category Actions */}
        {selectedCategory && (
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
              {categories.find(cat => cat._id === selectedCategory)?.name || 'Select a Category'}
            </h2>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
              <button
                onClick={() => openCatModal('edit', categories.find(c => c._id === selectedCategory))}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 w-full sm:w-auto"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Category
              </button>
              <button
                onClick={() => openMenuModal('add', selectedCategory)}
                className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 w-full sm:w-auto"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Menu Item
              </button>
            </div>
          </div>
        )}

        {/* Menu Items Grid */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          {selectedCategory && menuItems[selectedCategory] && menuItems[selectedCategory].length > 0 ? (
            <ul className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 p-4 sm:p-6">
              {menuItems[selectedCategory].map((item) => (
                <li key={item._id} className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200 hover:shadow-lg transition-shadow duration-200">
                  <div className="w-full flex flex-col sm:flex-row items-center justify-between p-4 sm:p-6 space-y-4 sm:space-y-0 sm:space-x-6">
                    <div className="flex-1 truncate">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-gray-900 text-sm sm:text-base font-medium truncate">{item.name}</h3>
                        {item.outOfStock && (
                          <span className="flex-shrink-0 inline-block px-2 py-0.5 text-yellow-800 text-xs font-medium bg-yellow-100 rounded-full">
                            Out of Stock
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-gray-500 text-xs sm:text-sm line-clamp-2">{item.ingredients}</p>
                      <p className="mt-2 text-base sm:text-lg font-semibold text-pink-600">{item.price} Birr</p>
                      {item.badge && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800 mt-2">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    {item.image ? (
                      <img
                        className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-300 rounded-full flex-shrink-0 object-cover"
                        src={item.image}
                        alt={item.name}
                      />
                    ) : (
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-full flex-shrink-0 flex items-center justify-center text-gray-400">
                        <svg className="h-8 w-8 sm:h-10 sm:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="-mt-px flex divide-x divide-gray-200">
                      <div className="w-0 flex-1 flex">
                        <button
                          onClick={() => openDetailModal(item)}
                          className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-3 sm:py-4 text-xs sm:text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                        >
                          <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                          <span className="ml-2 sm:ml-3">View</span>
                        </button>
                      </div>
                      <div className="-ml-px w-0 flex-1 flex">
                        <button
                          onClick={() => openMenuModal('edit', selectedCategory, item)}
                          className="relative w-0 flex-1 inline-flex items-center justify-center py-3 sm:py-4 text-xs sm:text-sm text-gray-700 font-medium border border-transparent hover:text-gray-500"
                        >
                          <Edit className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                          <span className="ml-2 sm:ml-3">Edit</span>
                        </button>
                      </div>
                      <div className="-ml-px w-0 flex-1 flex">
                        <button
                          onClick={() => handleMenuDelete(item._id, selectedCategory)}
                          className="relative w-0 flex-1 inline-flex items-center justify-center py-3 sm:py-4 text-xs sm:text-sm text-red-600 font-medium border border-transparent rounded-br-lg hover:text-red-500"
                        >
                          <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                          <span className="ml-2 sm:ml-3">Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8 sm:py-12">
              <svg
                className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                />
              </svg>
              <h3 className="mt-2 text-sm sm:text-base font-medium text-gray-900">No menu items</h3>
              <p className="mt-1 text-xs sm:text-sm text-gray-500">
                Get started by creating a new menu item.
              </p>
              <div className="mt-4 sm:mt-6">
                <button
                  type="button"
                  onClick={() => openMenuModal('add', selectedCategory)}
                  className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  <Plus className="-ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  New Menu Item
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Category Modal */}
      {showCatModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={closeCatModal}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"></span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  onClick={closeCatModal}
                >
                  <span className="sr-only">Close</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    {catModalType === 'add' ? 'Add New Category' : 'Edit Category'}
                  </h3>
                  <div className="mt-4">
                    <form onSubmit={handleCatSubmit}>
                      <div>
                        <label htmlFor="category-name" className="block text-sm font-medium text-gray-700">
                          Category Name
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="name"
                            id="category-name"
                            value={catForm.name}
                            onChange={handleCatFormChange}
                            className="shadow-sm focus:ring-pink-500 focus:border-pink-500 block w-full px-3 py-2 sm:px-4 sm:py-3 sm:text-sm border-gray-300 rounded-md"
                            placeholder="e.g. Appetizers, Main Course"
                            required
                          />
                        </div>
                      </div>
                      <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                        <button
                          type="submit"
                          disabled={catActionLoading}
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-3 py-2 sm:px-4 sm:py-2 bg-pink-600 text-sm sm:text-base font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 sm:col-start-2 disabled:opacity-50"
                        >
                          {catActionLoading ? (
                            <>
                              <Loader2 className="animate-spin -ml-1 mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" />
                              Processing...
                            </>
                          ) : catModalType === 'add' ? (
                            'Add Category'
                          ) : (
                            'Update Category'
                          )}
                        </button>
                        <button
                          type="button"
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-3 py-2 sm:px-4 sm:py-2 bg-white text-sm sm:text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 sm:mt-0 sm:col-start-1"
                          onClick={closeCatModal}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Menu Modal */}
      {showMenuModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="menu-modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={closeMenuModal}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"></span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full sm:p-6">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  onClick={closeMenuModal}
                >
                  <span className="sr-only">Close</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900" id="menu-modal-title">
                    {menuModalType === 'add' ? 'Add New Menu Item' : 'Edit Menu Item'}
                  </h3>
                  <div className="mt-4">
                    <form onSubmit={handleMenuSubmit} className="space-y-4 sm:space-y-6">
                      <div className="grid grid-cols-1 gap-y-4 sm:gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                          <label htmlFor="item-name" className="block text-sm font-medium text-gray-700">
                            Item Name *
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="name"
                              id="item-name"
                              value={menuForm.name}
                              onChange={handleMenuFormChange}
                              className="shadow-sm focus:ring-pink-500 focus:border-pink-500 block w-full sm:text-sm border-gray-300 rounded-md px-3 py-2"
                              required
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                            Price *
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm"></span>
                            </div>
                            <input
                              type="number"
                              name="price"
                              id="price"
                              value={menuForm.price}
                              onChange={handleMenuFormChange}
                              className="focus:ring-pink-500 focus:border-pink-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md px-3 py-2"
                              placeholder="0.00 Birr"
                              min="0"
                              step="0.01"
                              required
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                            Category *
                          </label>
                          <select
                            id="category"
                            name="category"
                            value={menuForm.category}
                            onChange={handleMenuFormChange}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm rounded-md"
                            required
                          >
                            <option value="">Select a category</option>
                            {categories.map((cat) => (
                              <option key={cat._id} value={cat._id}>
                                {cat.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="badge" className="block text-sm font-medium text-gray-700">
                            Badge (optional)
                          </label>
                          <div className="mt-1">
                            <select
                              id="badge"
                              name="badge"
                              value={menuForm.badge}
                              onChange={handleMenuFormChange}
                              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm rounded-md"
                            >
                              <option value="">Select a badge</option>
                              <option value="New">New</option>
                              <option value="Popular">Popular</option>
                              <option value="Recommended">Recommended</option>
                            </select>
                          </div>
                        </div>

                        <div className="sm:col-span-6">
                          <label className="block text-sm font-medium text-gray-700" htmlFor="image">
                            {menuForm.image ? 'Current Image' : 'Upload Image'}
                          </label>
                          {menuForm.image && (
                            <div className="mb-2">
                              <img 
                                src={menuForm.image} 
                                alt="Preview" 
                                className="h-20 w-20 sm:h-24 sm:w-24 object-cover rounded-md"
                              />
                            </div>
                          )}
                          <div className="flex items-center">
                            <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-3 sm:px-4 rounded-md border border-gray-300 transition-colors">
                              Choose File
                              <input
                                className="hidden"
                                id="image"
                                name="image"
                                type="file"
                                accept="image/*"
                                onChange={handleMenuFormChange}
                              />
                            </label>
                            {menuForm.image && (
                              <button
                                type="button"
                                onClick={() => {
                                  if (menuForm.image.startsWith('blob:')) {
                                    URL.revokeObjectURL(menuForm.image)
                                  }
                                  setMenuForm(prev => ({ ...prev, image: '', imageFile: null }))
                                }}
                                className="ml-2 text-red-500 hover:text-red-700 text-sm"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                          <p className="mt-1 text-xs text-gray-500">
                            {menuForm.imageFile ? menuForm.imageFile.name : 'PNG, JPG, JPEG up to 5MB'}
                          </p>
                        </div>

                        <div className="sm:col-span-6">
                          <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">
                            Ingredients *
                          </label>
                          <div className="mt-1">
                            <textarea
                              id="ingredients"
                              name="ingredients"
                              rows={3}
                              className="shadow-sm focus:ring-pink-500 focus:border-pink-500 block w-full sm:text-sm border border-gray-300 rounded-md px-3 py-2"
                              placeholder="List ingredients separated by commas"
                              value={menuForm.ingredients}
                              onChange={handleMenuFormChange}
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-6">
                          <div className="flex items-center">
                            <input
                              id="out-of-stock"
                              name="outOfStock"
                              type="checkbox"
                              checked={!!menuForm.outOfStock}
                              onChange={handleMenuFormChange}
                              className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                            />
                            <label htmlFor="out-of-stock" className="ml-2 block text-sm text-gray-700">
                              Mark as out of stock
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                        <button
                          type="submit"
                          disabled={menuActionLoading}
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-3 py-2 sm:px-4 sm:py-2 bg-pink-600 text-sm sm:text-base font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 sm:col-start-2 disabled:opacity-50"
                        >
                          {menuActionLoading ? (
                            <>
                              <Loader2 className="animate-spin -ml-1 mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" />
                              Processing...
                            </>
                          ) : menuModalType === 'add' ? (
                            'Add Menu Item'
                          ) : (
                            'Update Menu Item'
                          )}
                        </button>
                        <button
                          type="button"
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-3 py-2 sm:px-4 sm:py-2 bg-white text-sm sm:text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 sm:mt-0 sm:col-start-1"
                          onClick={closeMenuModal}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && detailItem && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="detail-modal-title" role="dialog" aria-modal="true">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={closeDetailModal}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"></span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full sm:p-6">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  onClick={closeDetailModal}
                >
                  <span className="sr-only">Close</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900" id="detail-modal-title">
                    Menu Item Details
                  </h3>
                  <div className="mt-4">
                    {detailLoading ? (
                      <div className="flex justify-center py-6 sm:py-8">
                        <Loader2 className="animate-spin h-6 w-6 sm:h-8 sm:w-8 text-pink-600" />
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 h-20 w-20 sm:h-24 sm:w-24 rounded-lg overflow-hidden bg-gray-100">
                            {detailItem.image ? (
                              <img
                                src={detailItem.image}
                                alt={detailItem.name}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = 'https://via.placeholder.com/100';
                                }}
                              />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center text-gray-400">
                                <svg className="h-10 w-10 sm:h-12 sm:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <div className="ml-4 flex-1">
                            <h4 className="text-base sm:text-lg font-bold text-gray-900">{detailItem.name}</h4>
                            <p className="text-base sm:text-lg font-semibold text-pink-600">{Number(detailItem.price).toFixed(2)} Birr</p>
                            {detailItem.badge && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800 mt-1">
                                {detailItem.badge}
                              </span>
                            )}
                            {detailItem.outOfStock && (
                              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                Out of Stock
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="border-t border-gray-200 pt-4">
                          <h4 className="text-sm font-medium text-gray-900">Ingredients</h4>
                          <p className="mt-1 text-xs sm:text-sm text-gray-600 whitespace-pre-line">
                            {detailItem.ingredients}
                          </p>
                        </div>

                        <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Rating Information</h4>
                          <dl className="grid grid-cols-2 gap-4">
                            <div>
                              <dt className="text-xs font-medium text-gray-500">Total Ratings</dt>
                              <dd className="mt-1 text-xs sm:text-sm text-gray-900">
                                {typeof detailRating.count === 'number' && !isNaN(detailRating.count) ? detailRating.count : 0}
                              </dd>
                            </div>
                            <div>
                              <dt className="text-xs font-medium text-gray-500">Average Rating</dt>
                              <dd className="mt-1 text-xs sm:text-sm text-gray-900">
                                {typeof detailRating.avg === 'number' && detailRating.count > 0 && !isNaN(detailRating.avg) ? (
                                  <div className="flex items-center">
                                    <span className="mr-1">{detailRating.avg.toFixed(1)}</span>
                                    <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
                                  </div>
                                ) : (
                                  'N/A'
                                )}
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-3 py-2 sm:px-4 sm:py-2 bg-pink-600 text-sm sm:text-base font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  onClick={closeDetailModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {menuActionMsg && (
        <div className="fixed bottom-4 right-4 bg-green-100 text-green-700 px-3 py-2 sm:px-4 sm:py-2 rounded shadow-lg z-50 text-sm">
          {menuActionMsg}
        </div>
      )}
    </div>
  )
}

export default Menu