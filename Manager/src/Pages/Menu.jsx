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
      } catch {
        setError('Failed to fetch data')
      } finally {
        setLoading(false)
      }
    }
    fetchCategoriesAndMenus()
  }, [catActionMsg, menuActionMsg])

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
  const handleMenuDelete = async (id, categoryId) => {
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

  if (loading) return <div className="flex items-center justify-center h-64"><span className="loader"></span> Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-pink-700">Menu Management</h1>
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => openCatModal('add')} className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded shadow font-semibold transition">+ Add Category</button>
        {catActionMsg && <span className="ml-4 text-green-600 font-medium">{catActionMsg}</span>}
      </div>
      {categories.length === 0 && <div>No categories found.</div>}
      {categories.map(category => (
        <div key={category._id} className="mb-10 bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold text-pink-800">{category.name}</h2>
            <div>
              <button onClick={() => openCatModal('edit', category)} className="mr-2 px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition">Edit</button>
              <button onClick={() => handleCatDelete(category._id)} className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition">Delete</button>
            </div>
          </div>
          <div className="flex justify-end mb-4">
            <button onClick={() => openMenuModal('add', category._id)} className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded shadow text-sm">+ Add Menu Item</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {menuItems[category._id] && menuItems[category._id].length > 0 ? (
              menuItems[category._id].map(item => (
                <div key={item._id} className="border rounded-lg p-4 shadow bg-gray-50 relative">
                  <h3 className="font-bold text-lg text-pink-700">{item.name}</h3>
                  <p className="text-gray-600 mb-1">{item.ingredients}</p>
                  <p className="text-pink-600 font-semibold mb-1">${item.price}</p>
                  {item.badge && <span className="inline-block mt-1 px-2 py-1 bg-pink-200 text-pink-800 rounded text-xs">{item.badge}</span>}
                  {item.image && <img src={item.image} alt={item.name} className="mt-2 w-full h-32 object-cover rounded" />}
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button onClick={() => openMenuModal('edit', category._id, item)} className="px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-xs">Edit</button>
                    <button onClick={() => handleMenuDelete(item._id, category._id)} className="px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-xs">Delete</button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-gray-400">No items in this category.</div>
            )}
          </div>
        </div>
      ))}

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
      {menuActionMsg && <div className="fixed bottom-4 right-4 bg-green-100 text-green-700 px-4 py-2 rounded shadow-lg z-50">{menuActionMsg}</div>}
    </div>
  )
}

export default Menu
