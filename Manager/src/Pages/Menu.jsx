import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Menu = () => {
  const [categories, setCategories] = useState([])
  const [menuItems, setMenuItems] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  // CRUD UI state
  const [showCatModal, setShowCatModal] = useState(false)
  const [catModalType, setCatModalType] = useState('add') // 'add' or 'edit'
  const [catForm, setCatForm] = useState({ name: '', _id: null })
  const [catDeleteId, setCatDeleteId] = useState(null)
  const [catActionLoading, setCatActionLoading] = useState(false)
  const [catActionMsg, setCatActionMsg] = useState('')
  // Menu CRUD UI state
  const [showMenuModal, setShowMenuModal] = useState(false)
  const [menuModalType, setMenuModalType] = useState('add') // 'add' or 'edit'
  const [menuForm, setMenuForm] = useState({ name: '', price: '', ingredients: '', badge: '', image: '', _id: null, category: '', outOfStock: false })
  const [menuDelete, setMenuDelete] = useState({ id: null, categoryId: null })
  const [menuActionLoading, setMenuActionLoading] = useState(false)
  const [menuActionMsg, setMenuActionMsg] = useState('')
  // Detail UI state
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [detailItem, setDetailItem] = useState(null)
  const [detailRating, setDetailRating] = useState({ count: 0, avg: 0 })
  const [detailLoading, setDetailLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)

  useEffect(() => {
    const fetchCategoriesAndMenus = async () => {
      try {
        setLoading(true)
        // Fetch all categories
        const catRes = await axios.get('http://localhost:5001/api/categories/')
        setCategories(catRes.data)
        // Fetch menu items for each category
        const menuPromises = catRes.data.map(cat =>
          axios.get(`http://localhost:5001/api/menus/category/${cat._id}`)
        )
        const menuResults = await Promise.all(menuPromises)
        const menuMap = {}
        catRes.data.forEach((cat, idx) => {
          menuMap[cat._id] = menuResults[idx].data
        })
        setMenuItems(menuMap)
        // Set default selected category
        if (catRes.data.length > 0 && !selectedCategory) {
          setSelectedCategory(catRes.data[0]._id)
        }
      } catch {
        setError('Failed to fetch data')
      } finally {
        setLoading(false)
      }
    }
    fetchCategoriesAndMenus()
  }, [catActionMsg, menuActionMsg, selectedCategory])

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
        await axios.post('http://localhost:5001/api/categories/', { name: catForm.name })
        setCatActionMsg('Category added!')
      } else {
        await axios.put(`http://localhost:5001/api/categories/${catForm._id}`, { name: catForm.name })
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
  const handleCatDelete = async id => {
    if (!window.confirm('Delete this category?')) return
    setCatActionLoading(true)
    try {
      await axios.delete(`http://localhost:5001/api/categories/${id}`)
      setCatActionMsg('Category deleted!')
    } catch {
      setCatActionMsg('Error deleting category')
    } finally {
      setCatActionLoading(false)
      setTimeout(() => setCatActionMsg(''), 1500)
    }
  }

  // Menu CRUD handlers
  const openMenuModal = (type, categoryId, item = { name: '', price: '', ingredients: '', badge: '', image: '', _id: null, outOfStock: false }) => {
    setMenuModalType(type)
    setMenuForm({ ...item, category: categoryId, outOfStock: item.outOfStock ?? false })
    setShowMenuModal(true)
  }
  const closeMenuModal = () => {
    setShowMenuModal(false)
    setMenuForm({ name: '', price: '', ingredients: '', badge: '', image: '', _id: null, category: '', outOfStock: false })
  }
  const handleMenuFormChange = e => {
    const { name, value, type, checked } = e.target
    setMenuForm({
      ...menuForm,
      [name]: type === 'checkbox' ? checked : value
    })
  }
  const handleMenuSubmit = async e => {
    e.preventDefault()
    setMenuActionLoading(true)
    try {
      if (menuModalType === 'add') {
        await axios.post(`http://localhost:5001/api/menus/category/${menuForm.category}`,
          { ...menuForm, price: parseFloat(menuForm.price), outOfStock: !!menuForm.outOfStock })
        setMenuActionMsg('Menu item added!')
      } else {
        await axios.put(`http://localhost:5001/api/menus/${menuForm._id}`,
          { ...menuForm, price: parseFloat(menuForm.price), outOfStock: !!menuForm.outOfStock })
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
      await axios.delete(`http://localhost:5001/api/menus/${id}`)
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

  if (loading) return <div className="flex items-center justify-center h-64"><span className="loader"></span> Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-pink-700">Menu Management</h1>
      {/* Horizontal Category Selector */}
      <div className="flex overflow-x-auto gap-4 mb-8 pb-2 scrollbar-thin scrollbar-thumb-pink-300 scrollbar-track-pink-100">
        {categories.map(cat => (
          <button
            key={cat._id}
            onClick={() => setSelectedCategory(cat._id)}
            className={`whitespace-nowrap px-6 py-2 rounded-full font-semibold shadow transition-all border-2 ${selectedCategory === cat._id ? 'bg-pink-600 text-white border-pink-600 scale-105' : 'bg-white text-pink-700 border-pink-200 hover:bg-pink-50'}`}
            style={{ minWidth: '120px' }}
          >
            {cat.name}
          </button>
        ))}
        <button
          onClick={() => openCatModal('add')}
          className="whitespace-nowrap px-6 py-2 rounded-full font-semibold shadow transition-all border-2 bg-gradient-to-r from-pink-400 to-pink-600 text-white border-pink-400 hover:scale-105 ml-2"
          style={{ minWidth: '120px' }}
        >
          + Add Category
        </button>
      </div>
      {catActionMsg && <div className="mb-4 text-green-600 font-medium text-center">{catActionMsg}</div>}
      {/* Category Edit/Delete Buttons */}
      {selectedCategory && (
        <div className="flex justify-end items-center mb-4 gap-2">
          <button
            onClick={() => openCatModal('edit', categories.find(c => c._id === selectedCategory))}
            className="px-4 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
          >Edit Category</button>
          <button
            onClick={() => handleCatDelete(selectedCategory)}
            className="px-4 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
          >Delete Category</button>
        </div>
      )}
      {/* Menu Items for Selected Category */}
      <div className="mb-10 bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-pink-800">
            {categories.find(cat => cat._id === selectedCategory)?.name || 'Select a Category'}
          </h2>
          {selectedCategory && (
            <button
              onClick={() => openMenuModal('add', selectedCategory)}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded shadow text-sm"
            >
              + Add Menu Item
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedCategory && menuItems[selectedCategory] && menuItems[selectedCategory].length > 0 ? (
            menuItems[selectedCategory].map(item => (
              <div key={item._id} className="border rounded-2xl p-5 shadow-lg bg-gradient-to-br from-pink-50 to-white relative hover:shadow-2xl transition-all">
                <h3 className="font-bold text-lg text-pink-700 mb-1">{item.name}</h3>
                <p className="text-gray-600 mb-1">{item.ingredients}</p>
                <p className="text-pink-600 font-semibold mb-1">${item.price}</p>
                {item.badge && <span className="inline-block mt-1 px-2 py-1 bg-pink-200 text-pink-800 rounded text-xs font-semibold">{item.badge}</span>}
                {item.image && <img src={item.image} alt={item.name} className="mt-2 w-full h-32 object-cover rounded-xl border border-pink-100 shadow" />}
                <div className="absolute top-2 right-2 flex gap-1">
                  <button onClick={() => openMenuModal('edit', selectedCategory, item)} className="px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-xs">Edit</button>
                  <button onClick={() => handleMenuDelete(item._id, selectedCategory)} className="px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-xs">Delete</button>
                  <button onClick={() => openDetailModal(item)} className="px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-xs">View Details</button>
                </div>
                {item.outOfStock && <span className="absolute bottom-2 right-2 bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-xs font-bold">Out of Stock</span>}
              </div>
            ))
          ) : (
            <div className="col-span-full text-gray-400 text-center py-8">No items in this category.</div>
          )}
        </div>
      </div>

      {/* Category Modal */}
      {showCatModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
            <button onClick={closeCatModal} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700">&times;</button>
            <h2 className="text-xl font-bold mb-4 text-pink-700">{catModalType === 'add' ? 'Add Category' : 'Edit Category'}</h2>
            <form onSubmit={handleCatSubmit}>
              <input
                type="text"
                name="name"
                value={catForm.name}
                onChange={handleCatFormChange}
                placeholder="Category Name"
                className="w-full border rounded px-3 py-2 mb-4 focus:outline-pink-400"
                required
              />
              <button type="submit" disabled={catActionLoading} className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded font-semibold transition">
                {catActionLoading ? 'Saving...' : (catModalType === 'add' ? 'Add' : 'Update')}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Menu Modal */}
      {showMenuModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative">
            <button onClick={closeMenuModal} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700">&times;</button>
            <h2 className="text-xl font-bold mb-4 text-pink-700">{menuModalType === 'add' ? 'Add Menu Item' : 'Edit Menu Item'}</h2>
            <form onSubmit={handleMenuSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={menuForm.name}
                  onChange={handleMenuFormChange}
                  placeholder="Item Name"
                  className="border rounded px-3 py-2 focus:outline-pink-400"
                  required
                />
                <input
                  type="number"
                  name="price"
                  value={menuForm.price}
                  onChange={handleMenuFormChange}
                  placeholder="Price"
                  className="border rounded px-3 py-2 focus:outline-pink-400"
                  required
                />
                <select
                  name="category"
                  value={menuForm.category}
                  onChange={handleMenuFormChange}
                  className="border rounded px-3 py-2 focus:outline-pink-400"
                  required
                >
                  <option value="" disabled>Select Category</option>
                  {categories.map(cat => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
                <input
                  type="text"
                  name="badge"
                  value={menuForm.badge}
                  onChange={handleMenuFormChange}
                  placeholder="Badge (optional)"
                  className="border rounded px-3 py-2 focus:outline-pink-400"
                />
                <input
                  type="text"
                  name="image"
                  value={menuForm.image}
                  onChange={handleMenuFormChange}
                  placeholder="Image URL (optional)"
                  className="border rounded px-3 py-2 focus:outline-pink-400"
                />
                <label className="flex items-center col-span-1 md:col-span-2">
                  <input
                    type="checkbox"
                    name="outOfStock"
                    checked={!!menuForm.outOfStock}
                    onChange={handleMenuFormChange}
                    className="mr-2"
                  />
                  Out of Stock
                </label>
                <textarea
                  name="ingredients"
                  value={menuForm.ingredients}
                  onChange={handleMenuFormChange}
                  placeholder="Ingredients"
                  className="border rounded px-3 py-2 col-span-1 md:col-span-2 focus:outline-pink-400"
                  required
                />
              </div>
              <button type="submit" disabled={menuActionLoading} className="w-full mt-4 bg-pink-600 hover:bg-pink-700 text-white py-2 rounded font-semibold transition">
                {menuActionLoading ? 'Saving...' : (menuModalType === 'add' ? 'Add' : 'Update')}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && detailItem && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
            <button onClick={closeDetailModal} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700">&times;</button>
            <h2 className="text-xl font-bold mb-4 text-pink-700">Menu Item Details</h2>
            {detailLoading ? (
              <div>Loading...</div>
            ) : (
              <>
                <h3 className="font-bold text-lg mb-2">{detailItem.name}</h3>
                <p className="mb-1"><span className="font-semibold">Price:</span> ${detailItem.price}</p>
                <p className="mb-1"><span className="font-semibold">Ingredients:</span> {detailItem.ingredients}</p>
                {detailItem.badge && <p className="mb-1"><span className="font-semibold">Badge:</span> {detailItem.badge}</p>}
                {detailItem.image && <img src={detailItem.image} alt={detailItem.name} className="my-2 w-full h-32 object-cover rounded" />}
                <p className="mb-1"><span className="font-semibold">Out of Stock:</span> {detailItem.outOfStock ? 'Yes' : 'No'}</p>
                <div className="mt-4 p-3 bg-gray-100 rounded">
                  <h4 className="font-semibold mb-1 text-pink-700">Rating Details</h4>
                  <p><span className="font-semibold">Number of Ratings:</span> {typeof detailRating.count === 'number' && !isNaN(detailRating.count) ? detailRating.count : 0}</p>
                  <p><span className="font-semibold">Average Rating:</span> {typeof detailRating.avg === 'number' && detailRating.count > 0 && !isNaN(detailRating.avg) ? detailRating.avg.toFixed(2) : 'N/A'}</p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {menuActionMsg && <div className="fixed bottom-4 right-4 bg-green-100 text-green-700 px-4 py-2 rounded shadow-lg z-50">{menuActionMsg}</div>}
    </div>
  )
}

export default Menu
