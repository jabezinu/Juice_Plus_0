import React, { useEffect, useState } from 'react'
import axios from 'axios'

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
        const catRes = await axios.get('http://localhost:5001/api/categories/')
        setCategories(catRes.data)
        // Fetch menu items for each category
        const menuPromises = catRes.data.map(cat =>
          axios.get(`http://localhost:5001/api/menus/category/${cat._id}`)
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
      await axios.put(`http://localhost:5001/api/menus/${editForm._id}`,
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
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-pink-700">Out of Stock Menu Items</h1>
      {categories.length === 0 && <div>No categories found.</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.some(cat => outOfStockItems[cat._id]?.length > 0) ? (
          categories.map(category =>
            outOfStockItems[category._id]?.map(item => (
              <div key={item._id} className="border rounded-lg p-4 shadow bg-gray-50 relative">
                <h3 className="font-bold text-lg text-pink-700">{item.name}</h3>
                <p className="text-gray-600 mb-1">{item.ingredients}</p>
                <p className="text-pink-600 font-semibold mb-1">${item.price}</p>
                {item.badge && <span className="inline-block mt-1 px-2 py-1 bg-pink-200 text-pink-800 rounded text-xs">{item.badge}</span>}
                {item.image && <img src={item.image} alt={item.name} className="mt-2 w-full h-32 object-cover rounded" />}
                <button onClick={() => handleEditClick(item)} className="absolute top-2 right-2 px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-xs">Edit</button>
              </div>
            ))
          )
        ) : (
          <div className="col-span-full text-center text-gray-400 py-8">No out of stock items found.</div>
        )}
      </div>
      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative">
            <button onClick={closeEditModal} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700">&times;</button>
            <h2 className="text-xl font-bold mb-4 text-pink-700">Edit Menu Item</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditFormChange}
                  placeholder="Item Name"
                  className="border rounded px-3 py-2 focus:outline-pink-400"
                  required
                />
                <input
                  type="number"
                  name="price"
                  value={editForm.price}
                  onChange={handleEditFormChange}
                  placeholder="Price"
                  className="border rounded px-3 py-2 focus:outline-pink-400"
                  required
                />
                <input
                  type="text"
                  name="badge"
                  value={editForm.badge}
                  onChange={handleEditFormChange}
                  placeholder="Badge (optional)"
                  className="border rounded px-3 py-2 focus:outline-pink-400"
                />
                <input
                  type="text"
                  name="image"
                  value={editForm.image}
                  onChange={handleEditFormChange}
                  placeholder="Image URL (optional)"
                  className="border rounded px-3 py-2 focus:outline-pink-400"
                />
                <label className="flex items-center col-span-1 md:col-span-2">
                  <input
                    type="checkbox"
                    name="outOfStock"
                    checked={!!editForm.outOfStock}
                    onChange={handleEditFormChange}
                    className="mr-2"
                  />
                  Out of Stock
                </label>
                <textarea
                  name="ingredients"
                  value={editForm.ingredients}
                  onChange={handleEditFormChange}
                  placeholder="Ingredients"
                  className="border rounded px-3 py-2 col-span-1 md:col-span-2 focus:outline-pink-400"
                  required
                />
              </div>
              <button type="submit" disabled={editLoading} className="w-full mt-4 bg-pink-600 hover:bg-pink-700 text-white py-2 rounded font-semibold transition">
                {editLoading ? 'Saving...' : 'Update'}
              </button>
              {editMsg && <div className="mt-2 text-center text-green-600">{editMsg}</div>}
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default OutOfStock
