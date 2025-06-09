import React, { useState, useEffect } from 'react';
import { Trash2, Edit, Plus, Save, X, AlertTriangle } from 'lucide-react';
import axios from 'axios';

// API base URL (adjust if needed)
const API_BASE = '/api';

// Real API service using axios
const api = {
  // Category CRUD
  getCategories: async () => {
    // Fetch categories from backend
    const res = await axios.get(`${API_BASE}/categories`);
    return res.data;
  },

  createCategory: async (category) => {
    // Create category in backend
    const res = await axios.post(`${API_BASE}/categories`, category);
    return res.data;
  },

  updateCategory: async (id, category) => {
    // Update category in backend
    const res = await axios.put(`${API_BASE}/categories/${id}`, category);
    return res.data;
  },

  deleteCategory: async (id) => {
    // Delete category in backend
    await axios.delete(`${API_BASE}/categories/${id}`);
    return { success: true };
  },

  // Menu Items CRUD
  getMenuItems: async (categoryId) => {
    // Fetch menu items by category from backend
    const res = await axios.get(`${API_BASE}/menus/category/${categoryId}`);
    return res.data;
  },

  createMenuItem: async (categoryId, item) => {
    // Create menu item under a category in backend
    const res = await axios.post(`${API_BASE}/menus/category/${categoryId}`, item);
    return res.data;
  },

  updateMenuItem: async (itemId, item) => {
    const res = await axios.put(`${API_BASE}/menus/${itemId}`, item);
    return res.data;
  },

  deleteMenuItem: async (itemId) => {
    await axios.delete(`${API_BASE}/menus/${itemId}`);
    return { success: true };
  }
};

// Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

// Category Form Component
const CategoryForm = ({ category, onSave, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    name: category?.name || '',
    description: category?.description || ''
  });

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter category name"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter category description"
          rows="3"
        />
      </div>
      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => {
            if (formData.name.trim()) {
              onSave(formData);
            }
          }}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 flex items-center gap-2"
          disabled={loading}
        >
          {loading ? 'Saving...' : <><Save size={16} /> Save</>}
        </button>
      </div>
    </div>
  );
};

// Menu Item Form Component
const MenuItemForm = ({ item, onSave, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    name: item?.name || '',
    description: item?.description || '',
    price: item?.price || '',
    image: item?.image || '',
    badge: item?.badge || ''
  });

  const handleSubmit = () => {
    if (formData.name.trim() && formData.price) {
      onSave({ ...formData, price: parseFloat(formData.price) });
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter item name"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter item description"
          rows="3"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
        <input
          type="number"
          step="0.01"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="0.00"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
        <input
          type="url"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="https://example.com/image.jpg"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Badge (Optional)</label>
        <input
          type="text"
          value={formData.badge}
          onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Popular, New, etc."
        />
      </div>
      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 flex items-center gap-2"
          disabled={loading}
        >
          {loading ? 'Saving...' : <><Save size={16} /> Save</>}
        </button>
      </div>
    </div>
  );
};

// Menu Item Component with CRUD actions
const MenuItem = ({ item, onEdit, onDelete, isAdmin }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-all duration-200 hover:shadow-lg">
      <div className="relative w-full h-40 sm:h-48 overflow-hidden">
        <img 
          src={item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop'} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          loading="lazy"
        />
        {item.badge && (
          <span className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold shadow-sm">
            {item.badge}
          </span>
        )}
        {isAdmin && (
          <div className="absolute top-2 left-2 flex gap-1">
            <button
              onClick={() => onEdit(item)}
              className="bg-blue-500 text-white p-1.5 rounded-full hover:bg-blue-600 transition-colors"
            >
              <Edit size={14} />
            </button>
            <button
              onClick={() => onDelete(item)}
              className="bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors"
            >
              <Trash2 size={14} />
            </button>
          </div>
        )}
      </div>
      
      <div className="p-3 sm:p-4">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">{item.name}</h3>
        <p className="text-gray-600 text-sm sm:text-base mb-3 line-clamp-2">{item.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-green-600 font-bold text-lg">${item.price}</span>
        </div>
      </div>
    </div>
  );
};

// Confirmation Dialog
const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message, loading }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-amber-600">
          <AlertTriangle size={24} />
          <p>{message}</p>
        </div>
        <div className="flex gap-2 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

// Main Component
const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true); // Toggle for admin mode
  
  // Modal states
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showItemForm, setShowItemForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  // Load categories on mount
  useEffect(() => {
    loadCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load menu items when active category changes
  useEffect(() => {
    if (activeCategory) {
      loadMenuItems(activeCategory._id);
    }
  }, [activeCategory]);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await api.getCategories();
      setCategories(data);
      if (data.length > 0 && !activeCategory) {
        setActiveCategory(data[0]);
      }
    } catch (error) {
      console.error('Failed to load categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMenuItems = async (categoryId) => {
    try {
      const items = await api.getMenuItems(categoryId);
      setMenuItems(items);
    } catch (error) {
      console.error('Failed to load menu items:', error);
    }
  };

  // Category CRUD handlers
  const handleCategoryCreate = () => {
    setEditingCategory(null);
    setShowCategoryForm(true);
  };

  const handleCategoryEdit = (category) => {
    setEditingCategory(category);
    setShowCategoryForm(true);
  };

  const handleCategorySave = async (categoryData) => {
    try {
      setFormLoading(true);
      if (editingCategory) {
        const updated = await api.updateCategory(editingCategory._id, categoryData);
        setCategories(cats => cats.map(cat => cat._id === updated._id ? updated : cat));
        if (activeCategory?._id === updated._id) {
          setActiveCategory(updated);
        }
      } else {
        const newCategory = await api.createCategory(categoryData);
        setCategories(cats => [...cats, newCategory]);
      }
      setShowCategoryForm(false);
      setEditingCategory(null);
    } catch (error) {
      console.error('Failed to save category:', error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleCategoryDelete = (category) => {
    setDeleteTarget({ type: 'category', data: category });
    setShowDeleteConfirm(true);
  };

  // Menu Item CRUD handlers
  const handleItemCreate = () => {
    setEditingItem(null);
    setShowItemForm(true);
  };

  const handleItemEdit = (item) => {
    setEditingItem(item);
    setShowItemForm(true);
  };

  const handleItemSave = async (itemData) => {
    try {
      setFormLoading(true);
      if (editingItem) {
        const updated = await api.updateMenuItem(editingItem._id, itemData);
        setMenuItems(items => items.map(item => item._id === updated._id ? updated : item));
      } else {
        const newItem = await api.createMenuItem(activeCategory._id, itemData);
        setMenuItems(items => [...items, newItem]);
      }
      setShowItemForm(false);
      setEditingItem(null);
    } catch (error) {
      console.error('Failed to save menu item:', error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleItemDelete = (item) => {
    setDeleteTarget({ type: 'item', data: item });
    setShowDeleteConfirm(true);
  };

  // Delete confirmation handler
  const handleDeleteConfirm = async () => {
    try {
      setFormLoading(true);
      if (deleteTarget.type === 'category') {
        await api.deleteCategory(deleteTarget.data._id);
        setCategories(cats => cats.filter(cat => cat._id !== deleteTarget.data._id));
        if (activeCategory?._id === deleteTarget.data._id) {
          const remainingCategories = categories.filter(cat => cat._id !== deleteTarget.data._id);
          setActiveCategory(remainingCategories[0] || null);
        }
      } else {
        await api.deleteMenuItem(deleteTarget.data._id);
        setMenuItems(items => items.filter(item => item._id !== deleteTarget.data._id));
      }
      setShowDeleteConfirm(false);
      setDeleteTarget(null);
    } catch (error) {
      console.error('Failed to delete:', error);
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-green-50 to-green-100 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Menu Management</h1>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="text-sm text-gray-600">Admin Mode</span>
              </label>
              {isAdmin && (
                <button
                  onClick={handleCategoryCreate}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
                >
                  <Plus size={16} /> Add Category
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Category Navigation */}
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <div key={category._id} className="relative">
              <button
                className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeCategory?._id === category._id
                    ? 'bg-green-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 hover:bg-green-50 shadow-md'
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category.name}
              </button>
              {isAdmin && (
                <div className="absolute -top-2 -right-2 flex gap-1">
                  <button
                    onClick={() => handleCategoryEdit(category)}
                    className="bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600 transition-colors"
                  >
                    <Edit size={12} />
                  </button>
                  <button
                    onClick={() => handleCategoryDelete(category)}
                    className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Active Category Content */}
        {activeCategory && (
          <>
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 mb-2">
                <h2 className="text-2xl font-bold text-gray-800">{activeCategory.name}</h2>
                {isAdmin && (
                  <button
                    onClick={handleItemCreate}
                    className="bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 flex items-center gap-1 text-sm"
                  >
                    <Plus size={14} /> Add Item
                  </button>
                )}
              </div>
              <p className="text-gray-600 mb-4">{activeCategory.description}</p>
              <div className="w-16 h-1 bg-green-500 mx-auto rounded-full"></div>
            </div>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {menuItems.map((item) => (
                <MenuItem
                  key={item._id}
                  item={item}
                  onEdit={handleItemEdit}
                  onDelete={handleItemDelete}
                  isAdmin={isAdmin}
                />
              ))}
            </div>

            {menuItems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No items in this category yet.</p>
                {isAdmin && (
                  <button
                    onClick={handleItemCreate}
                    className="mt-4 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 flex items-center gap-2 mx-auto"
                  >
                    <Plus size={16} /> Add First Item
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Modals */}
      <Modal
        isOpen={showCategoryForm}
        onClose={() => setShowCategoryForm(false)}
        title={editingCategory ? 'Edit Category' : 'Create Category'}
      >
        <CategoryForm
          category={editingCategory}
          onSave={handleCategorySave}
          onCancel={() => setShowCategoryForm(false)}
          loading={formLoading}
        />
      </Modal>

      <Modal
        isOpen={showItemForm}
        onClose={() => setShowItemForm(false)}
        title={editingItem ? 'Edit Menu Item' : 'Create Menu Item'}
      >
        <MenuItemForm
          item={editingItem}
          onSave={handleItemSave}
          onCancel={() => setShowItemForm(false)}
          loading={formLoading}
        />
      </Modal>

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeleteConfirm}
        title={`Delete ${deleteTarget?.type === 'category' ? 'Category' : 'Menu Item'}`}
        message={`Are you sure you want to delete "${deleteTarget?.data?.name}"? This action cannot be undone.`}
        loading={formLoading}
      />

      {/* Custom CSS */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Menu;