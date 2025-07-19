import React, { useEffect, useState } from 'react'
import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const OutOfStock = () => {
  const [categories, setCategories] = useState([])
  const [outOfStockItems, setOutOfStockItems] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editForm, setEditForm] = useState({ name: '', price: '', ingredients: '', badge: '', image: '', _id: null, outOfStock: true })
  const [editLoading, setEditLoading] = useState(false)
  const [editMsg, setEditMsg] = useState('')

  useEffect(() => {
    const fetchOutOfStock = async () => {
      try {
        setLoading(true)
        // Fetch all categories
        const catRes = await axios.get(`${BACKEND_URL}/categories/`)
        setCategories(catRes.data)
        // Fetch menu items for each category
        const menuPromises = catRes.data.map(cat =>
          axios.get(`${BACKEND_URL}/menus/category/${cat._id}`)
        )
        const menuResults = await Promise.all(menuPromises)
        const outMap = {}
        catRes.data.forEach((cat, idx) => {
          outMap[cat._id] = menuResults[idx].data.filter(item => item.outOfStock)
        })
        setOutOfStockItems(outMap)
      } catch {
        setError('Failed to fetch data')
      } finally {
        setLoading(false)
      }
    }
    fetchOutOfStock()
  }, [])

  const handleEditClick = (item) => {
    setEditForm({ ...item })
    setShowEditModal(true)
  }
  const closeEditModal = () => {
    setShowEditModal(false)
    setEditForm({ name: '', price: '', ingredients: '', badge: '', image: '', _id: null, outOfStock: true })
    setEditMsg('')
  }
  const handleEditFormChange = e => {
    const { name, value, type, checked } = e.target
    setEditForm({
      ...editForm,
      [name]: type === 'checkbox' ? checked : value
    })
  }
  const handleEditSubmit = async e => {
    e.preventDefault()
    setEditLoading(true)
    try {
      await axios.put(`${BACKEND_URL}/menus/${editForm._id}`,
        { ...editForm, price: parseFloat(editForm.price), outOfStock: !!editForm.outOfStock })
      setEditMsg('Menu item updated!')
      setTimeout(() => {
        setEditMsg('')
        closeEditModal()
        // Refresh out-of-stock list
        window.location.reload()
      }, 1000)
    } catch {
      setEditMsg('Error updating menu item')
    } finally {
      setEditLoading(false)
    }
  }

  if (loading) return <div className="flex items-center justify-center h-64"><span className="loader"></span> Loading...</div>
  if (error) return <div className="text-red-500 text-center text-sm sm:text-base">{error}</div>

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-pink-700">Out of Stock Menu Items</h1>
      {categories.length === 0 && <div className="text-center text-sm sm:text-base">No categories found.</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {categories.some(cat => outOfStockItems[cat._id]?.length > 0) ? (
          categories.map(category =>
            outOfStockItems[category._id]?.map(item => (
              <div key={item._id} className="border rounded-lg p-4 sm:p-5 shadow bg-gray-50 relative">
                <h3 className="font-bold text-base sm:text-lg text-pink-700">{item.name}</h3>
                <p className="text-gray-600 text-sm sm:text-base mb-1">{item.ingredients}</p>
                <p className="text-pink-600 font-semibold text-sm sm:text-base mb-1">${item.price}</p>
                {item.badge && <span className="inline-block mt-1 px-2 py-1 bg-pink-200 text-pink-800 rounded text-xs sm:text-sm">{item.badge}</span>}
                {item.image && <img src={item.image} alt={item.name} className="mt-2 w-full h-24 sm:h-32 object-cover rounded" />}
                <button onClick={() => handleEditClick(item)} className="absolute top-2 right-2 px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-xs sm:text-sm">Edit</button>
              </div>
            ))
          )
        ) : (
          <div className="col-span-full text-center text-gray-400 py-6 sm:py-8 text-sm sm:text-base">LOL, looks like everything's in stock! Time to feast!</div>
        )}
      </div>
      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 w-full max-w-md sm:max-w-lg relative">
            <button onClick={closeEditModal} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-lg sm:text-xl">×</button>
            <h2 className="text-lg sm:text-xl font-bold mb-4 text-pink-700">Edit Menu Item</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditFormChange}
                  placeholder="Item Name"
                  className="border rounded px-3 py-2 text-sm sm:text-base focus:outline-pink-400"
                  required
                />
                <input
                  type="number"
                  name="price"
                  value={editForm.price}
                  onChange={handleEditFormChange}
                  placeholder="Price"
                  className="border rounded px-3 py-2 text-sm sm:text-base focus:outline-pink-400"
                  required
                />
                <input
                  type="text"
                  name="badge"
                  value={editForm.badge}
                  onChange={handleEditFormChange}
                  placeholder="Badge (optional)"
                  className="border rounded px-3 py-2 text-sm sm:text-base focus:outline-pink-400"
                />
                <input
                  type="text"
                  name="image"
                  value={editForm.image}
                  onChange={handleEditFormChange}
                  placeholder="Image URL (optional)"
                  className="border rounded px-3 py-2 text-sm sm:text-base focus:outline-pink-400"
                />
                <label className="flex items-center col-span-1 sm:col-span-2">
                  <input
                    type="checkbox"
                    name="outOfStock"
                    checked={!!editForm.outOfStock}
                    onChange={handleEditFormChange}
                    className="mr-2"
                  />
                  <span className="text-sm sm:text-base">Out of Stock</span>
                </label>
                <textarea
                  name="ingredients"
                  value={editForm.ingredients}
                  onChange={handleEditFormChange}
                  placeholder="Ingredients"
                  className="border rounded px-3 py-2 col-span-1 sm:col-span-2 text-sm sm:text-base focus:outline-pink-400"
                />
              </div>
              <button type="submit" disabled={editLoading} className="w-full mt-4 bg-pink-600 hover:bg-pink-700 text-white py-2 rounded font-semibold transition text-sm sm:text-base">
                {editLoading ? 'Saving...' : 'Update'}
              </button>
              {editMsg && <div className="mt-2 text-center text-green-600 text-sm sm:text-base">{editMsg}</div>}
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default OutOfStock