// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// // Add icon SVGs
// const PlusIcon = () => (
//   <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
// );
// const EditIcon = () => (
//   <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-2.828 0L9 13z"/></svg>
// );
// const DeleteIcon = () => (
//   <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
// );

// // Modal component
// const Modal = ({ isOpen, onClose, children }) => {
//   if (!isOpen) return null;
//   return (
//     <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//       <div style={{ background: '#fff', borderRadius: 12, padding: '2rem', minWidth: 320, maxWidth: 400, boxShadow: '0 4px 24px #0002', position: 'relative' }}>
//         <button onClick={onClose} style={{ position: 'absolute', top: 10, right: 10, background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#888' }}>&times;</button>
//         {children}
//       </div>
//     </div>
//   );
// };

// const Menu = () => {
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [menuItems, setMenuItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [menuLoading, setMenuLoading] = useState(false);
//   const [rating, setRating] = useState({}); // { [menuId]: value }
//   const [ratingMsg, setRatingMsg] = useState({}); // { [menuId]: msg }
//   const [menuRatings, setMenuRatings] = useState({}); // { [menuId]: { avgRating, count } }
//   const [newCategory, setNewCategory] = useState('');
//   const [editCategoryId, setEditCategoryId] = useState(null);
//   const [editCategoryName, setEditCategoryName] = useState('');
//   const [showCategoryInput, setShowCategoryInput] = useState(false);
//   const [showEditInputId, setShowEditInputId] = useState(null);
//   const [showMenuModal, setShowMenuModal] = useState(false);
//   const [menuModalMode, setMenuModalMode] = useState('create'); // 'create' or 'edit'
//   const [menuForm, setMenuForm] = useState({ name: '', description: '', price: '', image: null });
//   const [editMenuId, setEditMenuId] = useState(null);
//   const [menuFormError, setMenuFormError] = useState('');
//   const [menuFormLoading, setMenuFormLoading] = useState(false);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await axios.get('http://localhost:5001/api/categories');
//         setCategories(res.data);
//       } catch {
//         setError('Failed to fetch categories');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCategories();
//   }, []);

//   const fetchMenuItems = async (categoryId) => {
//     setMenuLoading(true);
//     setMenuItems([]);
//     setSelectedCategory(categoryId);
//     try {
//       const res = await axios.get(`http://localhost:5001/api/menus/category/${categoryId}`);
//       setMenuItems(res.data);
//       // Fetch average ratings for all menu items in parallel
//       const ratings = await Promise.all(
//         res.data.map(async (item) => {
//           try {
//             const ratingRes = await axios.get(`http://localhost:5001/api/rating/menu/${item._id || item.id}/average`);
//             return { id: item._id || item.id, ...ratingRes.data };
//           } catch {
//             return { id: item._id || item.id, avgRating: 0, count: 0 };
//           }
//         })
//       );
//       const ratingsObj = {};
//       ratings.forEach(r => { ratingsObj[r.id] = { avgRating: r.avgRating, count: r.count }; });
//       setMenuRatings(ratingsObj);
//     } catch {
//       setError('Failed to fetch menu items');
//     } finally {
//       setMenuLoading(false);
//     }
//   };

//   const handleRatingChange = (menuId, value) => {
//     setRating((prev) => ({ ...prev, [menuId]: value }));
//   };

//   const submitRating = async (menuId) => {
//     if (!rating[menuId]) return;
//     const today = new Date().toISOString().slice(0, 10); // e.g., "2025-06-29"
//     const key = `rated_${menuId}_${today}`;
//     if (localStorage.getItem(key)) {
//       setRatingMsg((prev) => ({ ...prev, [menuId]: 'You have already rated this item today.' }));
//       return;
//     }
//     try {
//       await axios.post('http://localhost:5001/api/rating', {
//         menu: menuId,
//         stars: rating[menuId],
//       });
//       setRatingMsg((prev) => ({ ...prev, [menuId]: 'Thank you for rating!' }));
//       localStorage.setItem(key, 'true');
//       // Refresh average rating for this menu item
//       try {
//         const ratingRes = await axios.get(`http://localhost:5001/api/rating/menu/${menuId}/average`);
//         setMenuRatings((prev) => ({
//           ...prev,
//           [menuId]: { avgRating: ratingRes.data.avgRating, count: ratingRes.data.count }
//         }));
//       } catch {
//         // Optionally handle error
//       }
//     } catch {
//       setRatingMsg((prev) => ({ ...prev, [menuId]: 'Failed to submit rating.' }));
//     }
//   };

//   // Create category
//   const handleCreateCategory = async (e) => {
//     e.preventDefault();
//     if (!newCategory.trim()) return;
//     try {
//       const res = await axios.post('http://localhost:5001/api/categories', { name: newCategory });
//       setCategories((prev) => [...prev, res.data]);
//       setNewCategory('');
//       setShowCategoryInput(false);
//       setError(null);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to create category');
//     }
//   };

//   // Start editing
//   const startEditCategory = (cat) => {
//     setEditCategoryId(cat._id || cat.id);
//     setEditCategoryName(cat.name);
//     setShowEditInputId(cat._id || cat.id);
//   };

//   // Update category
//   const handleUpdateCategory = async (e) => {
//     e.preventDefault();
//     if (!editCategoryName.trim()) return;
//     try {
//       const res = await axios.put(`http://localhost:5001/api/categories/${editCategoryId}`, { name: editCategoryName });
//       setCategories((prev) => prev.map(cat => (cat._id === editCategoryId || cat.id === editCategoryId) ? res.data : cat));
//       setEditCategoryId(null);
//       setEditCategoryName('');
//       setShowEditInputId(null);
//       setError(null);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to update category');
//     }
//   };

//   // Delete category
//   const handleDeleteCategory = async (catId) => {
//     if (!window.confirm('Are you sure you want to delete this category?')) return;
//     try {
//       await axios.delete(`http://localhost:5001/api/categories/${catId}`);
//       setCategories((prev) => prev.filter(cat => (cat._id || cat.id) !== catId));
//       if (selectedCategory === catId) {
//         setSelectedCategory(null);
//         setMenuItems([]);
//       }
//       setError(null);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to delete category');
//     }
//   };

//   // Open modal for create
//   const openCreateMenuModal = () => {
//     setMenuModalMode('create');
//     setMenuForm({ name: '', description: '', price: '', image: null });
//     setEditMenuId(null);
//     setMenuFormError('');
//     setShowMenuModal(true);
//   };

//   // Open modal for edit
//   const openEditMenuModal = (item) => {
//     setMenuModalMode('edit');
//     setMenuForm({ name: item.name, description: item.description, price: item.price, image: null });
//     setEditMenuId(item._id || item.id);
//     setMenuFormError('');
//     setShowMenuModal(true);
//   };

//   // Handle form input
//   const handleMenuFormChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === 'image') {
//       setMenuForm((prev) => ({ ...prev, image: files[0] }));
//     } else {
//       setMenuForm((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   // Create menu item
//   const handleCreateMenu = async (e) => {
//     e.preventDefault();
//     if (!menuForm.name.trim() || !menuForm.price) {
//       setMenuFormError('Name and price are required.');
//       return;
//     }
//     setMenuFormLoading(true);
//     setMenuFormError('');
//     try {
//       const formData = new FormData();
//       formData.append('name', menuForm.name);
//       formData.append('description', menuForm.description);
//       formData.append('price', menuForm.price);
//       if (menuForm.image) formData.append('image', menuForm.image);
//       formData.append('category', selectedCategory);
//       const res = await axios.post(`http://localhost:5001/api/menus/category/${selectedCategory}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
//       setMenuItems((prev) => [...prev, res.data]);
//       setShowMenuModal(false);
//       setMenuForm({ name: '', description: '', price: '', image: null });
//       setMenuFormError('');
//     } catch (err) {
//       setMenuFormError(err.response?.data?.message || 'Failed to create menu item');
//     } finally {
//       setMenuFormLoading(false);
//     }
//   };

//   // Update menu item
//   const handleUpdateMenu = async (e) => {
//     e.preventDefault();
//     if (!menuForm.name.trim() || !menuForm.price) {
//       setMenuFormError('Name and price are required.');
//       return;
//     }
//     setMenuFormLoading(true);
//     setMenuFormError('');
//     try {
//       const formData = new FormData();
//       formData.append('name', menuForm.name);
//       formData.append('description', menuForm.description);
//       formData.append('price', menuForm.price);
//       if (menuForm.image) formData.append('image', menuForm.image);
//       const res = await axios.put(`http://localhost:5001/api/menus/${editMenuId}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
//       setMenuItems((prev) => prev.map(item => (item._id === editMenuId || item.id === editMenuId) ? res.data : item));
//       setShowMenuModal(false);
//       setMenuForm({ name: '', description: '', price: '', image: null });
//       setEditMenuId(null);
//       setMenuFormError('');
//     } catch (err) {
//       setMenuFormError(err.response?.data?.message || 'Failed to update menu item');
//     } finally {
//       setMenuFormLoading(false);
//     }
//   };

//   // Delete menu item
//   const handleDeleteMenu = async (menuId) => {
//     if (!window.confirm('Are you sure you want to delete this menu item?')) return;
//     try {
//       await axios.delete(`http://localhost:5001/api/menus/${menuId}`);
//       setMenuItems((prev) => prev.filter(item => (item._id || item.id) !== menuId));
//     } catch (err) {
//       alert(err.response?.data?.message || 'Failed to delete menu item');
//     }
//   };

//   return (
//     <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1rem', fontFamily: 'Inter, Arial, sans-serif' }}>
//       <h1 style={{ fontSize: '2.2rem', fontWeight: 700, marginBottom: '1.5rem', textAlign: 'center', letterSpacing: '-1px' }}>Manage Menu Categories</h1>
//       {/* Add Category Icon Button */}
//       <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
//         <button
//           onClick={() => setShowCategoryInput((v) => !v)}
//           style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px #dbeafe', cursor: 'pointer', fontSize: 22 }}
//           title="Add Category"
//         >
//           <PlusIcon />
//         </button>
//       </div>
//       {/* Category Create Form Popup */}
//       {showCategoryInput && (
//         <form onSubmit={handleCreateCategory} style={{ margin: '0 auto 2rem', display: 'flex', gap: '0.7rem', alignItems: 'center', justifyContent: 'center', maxWidth: 400, background: '#f8fafc', borderRadius: 10, boxShadow: '0 2px 8px #e0e7ef', padding: '1.2rem' }}>
//           <input
//             type="text"
//             placeholder="Category name"
//             value={newCategory}
//             onChange={e => setNewCategory(e.target.value)}
//             style={{ padding: '0.7rem 1rem', borderRadius: '8px', border: '1.5px solid #bbb', fontSize: '1rem', minWidth: 220 }}
//             autoFocus
//           />
//           <button type="submit" style={{ padding: '0.7rem 1.5rem', borderRadius: '8px', background: '#2563eb', color: '#fff', border: 'none', fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}>
//             Add
//           </button>
//           <button type="button" onClick={() => { setShowCategoryInput(false); setNewCategory(''); }} style={{ padding: '0.7rem 1.5rem', borderRadius: '8px', background: '#eee', color: '#333', border: 'none', fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}>
//             Cancel
//           </button>
//         </form>
//       )}
//       {loading && <p style={{ textAlign: 'center', color: '#888' }}>Loading categories...</p>}
//       {error && <p style={{ color: '#dc2626', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}
//       <div style={{ display: 'flex', overflowX: 'auto', gap: '1.2rem', margin: '1.5rem 0', paddingBottom: '0.5rem', borderBottom: '1.5px solid #e5e7eb' }}>
//         {categories && categories.length > 0 ? (
//           categories.map((cat) => (
//             <div key={cat._id || cat.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '140px', background: selectedCategory === (cat._id || cat.id) ? '#f1f5f9' : '#fff', borderRadius: '12px', boxShadow: selectedCategory === (cat._id || cat.id) ? '0 2px 8px #dbeafe' : '0 1px 4px #e5e7eb', padding: '0.7rem 0.5rem', border: selectedCategory === (cat._id || cat.id) ? '2px solid #2563eb' : '1.5px solid #e5e7eb', transition: 'all 0.2s' }}>
//               <button
//                 style={{
//                   padding: '0.5rem 1rem',
//                   borderRadius: '20px',
//                   border: 'none',
//                   background: selectedCategory === (cat._id || cat.id) ? '#2563eb' : '#f3f4f6',
//                   color: selectedCategory === (cat._id || cat.id) ? '#fff' : '#222',
//                   fontWeight: 600,
//                   fontSize: '1rem',
//                   cursor: 'pointer',
//                   minWidth: '120px',
//                   marginBottom: '0.3rem',
//                   boxShadow: selectedCategory === (cat._id || cat.id) ? '0 2px 8px #dbeafe' : 'none',
//                   transition: 'all 0.2s'
//                 }}
//                 onClick={() => fetchMenuItems(cat._id || cat.id)}
//               >
//                 {cat.name}
//               </button>
//               <div style={{ marginTop: '0.2rem', display: 'flex', gap: '0.3rem' }}>
//                 <button onClick={() => startEditCategory(cat)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }} title="Edit">
//                   <EditIcon />
//                 </button>
//                 <button onClick={() => handleDeleteCategory(cat._id || cat.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }} title="Delete">
//                   <DeleteIcon />
//                 </button>
//               </div>
//               {/* Edit input popup for this category */}
//               {showEditInputId === (cat._id || cat.id) && (
//                 <form onSubmit={handleUpdateCategory} style={{ marginTop: '0.7rem', display: 'flex', gap: '0.5rem', alignItems: 'center', background: '#f8fafc', borderRadius: 8, boxShadow: '0 2px 8px #e0e7ef', padding: '0.7rem' }}>
//                   <input
//                     type="text"
//                     value={editCategoryName}
//                     onChange={e => setEditCategoryName(e.target.value)}
//                     style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: '1.5px solid #bbb', fontSize: '1rem', minWidth: 120 }}
//                     autoFocus
//                   />
//                   <button type="submit" style={{ padding: '0.5rem 1rem', borderRadius: '8px', background: '#2563eb', color: '#fff', border: 'none', fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}>
//                     Save
//                   </button>
//                   <button type="button" onClick={() => { setEditCategoryId(null); setEditCategoryName(''); setShowEditInputId(null); }} style={{ padding: '0.5rem 1rem', borderRadius: '8px', background: '#eee', color: '#333', border: 'none', fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}>
//                     Cancel
//                   </button>
//                 </form>
//               )}
//             </div>
//           ))
//         ) : (
//           !loading && <span style={{ color: '#888' }}>No categories found.</span>
//         )}
//       </div>
//       {selectedCategory && (
//         <div>
//           <h2 style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//             Menu Items
//             <button onClick={openCreateMenuModal} style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, marginLeft: 10, cursor: 'pointer' }} title="Add Menu Item">
//               <PlusIcon />
//             </button>
//           </h2>
//           {menuLoading ? (
//             <p>Loading menu items...</p>
//           ) : menuItems && menuItems.length > 0 ? (
//             <ul style={{ listStyle: 'none', padding: 0 }}>
//               {menuItems.map((item) => (
//                 <li key={item._id || item.id} style={{ marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '1rem', position: 'relative' }}>
//                   {item.image && (
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '10px', marginBottom: '0.5rem' }}
//                       onError={e => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/120?text=No+Image'; }}
//                     />
//                   )}
//                   {/* If no image, show placeholder */}
//                   {!item.image && (
//                     <img
//                       src={'https://via.placeholder.com/120?text=No+Image'}
//                       alt='No Image'
//                       style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '10px', marginBottom: '0.5rem' }}
//                     />
//                   )}
//                   <div style={{ fontWeight: 'bold' }}>{item.name}</div>
//                   <div>{item.description}</div>
//                   <div>Price: ${item.price}</div>
//                   <div>
//                     <span>
//                       Rating: {menuRatings[item._id || item.id]?.avgRating?.toFixed(1) || 'N/A'}
//                       {menuRatings[item._id || item.id]?.count ? ` (${menuRatings[item._id || item.id].count} ratings)` : ''}
//                     </span>
//                   </div>
//                   <div style={{ marginTop: '0.5rem' }}>
//                     <label>Rate this item: </label>
//                     <select
//                       value={rating[item._id || item.id] || ''}
//                       onChange={(e) => handleRatingChange(item._id || item.id, e.target.value)}
//                     >
//                       <option value=''>Select</option>
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <option key={star} value={star}>{star} Star{star > 1 ? 's' : ''}</option>
//                       ))}
//                     </select>
//                     <button
//                       style={{ marginLeft: '0.5rem' }}
//                       onClick={() => submitRating(item._id || item.id)}
//                       disabled={!rating[item._id || item.id]}
//                     >
//                       Submit
//                     </button>
//                     {ratingMsg[item._id || item.id] && (
//                       <span style={{ marginLeft: '0.5rem', color: 'green' }}>{ratingMsg[item._id || item.id]}</span>
//                     )}
//                   </div>
//                   <div style={{ position: 'absolute', top: 10, right: 10, display: 'flex', gap: 6 }}>
//                     <button onClick={() => openEditMenuModal(item)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }} title="Edit Menu Item">
//                       <EditIcon />
//                     </button>
//                     <button onClick={() => handleDeleteMenu(item._id || item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }} title="Delete Menu Item">
//                       <DeleteIcon />
//                     </button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No menu items found for this category.</p>
//           )}
//         </div>
//       )}
//       {/* Menu Modal for Create/Edit */}
//       <Modal isOpen={showMenuModal} onClose={() => setShowMenuModal(false)}>
//         <h3 style={{ marginBottom: 16 }}>{menuModalMode === 'create' ? 'Add New Menu Item' : 'Edit Menu Item'}</h3>
//         <form onSubmit={menuModalMode === 'create' ? handleCreateMenu : handleUpdateMenu}>
//           <div style={{ marginBottom: 12 }}>
//             <label>Name:</label><br />
//             <input type="text" name="name" value={menuForm.name} onChange={handleMenuFormChange} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1.5px solid #bbb' }} required />
//           </div>
//           <div style={{ marginBottom: 12 }}>
//             <label>Description:</label><br />
//             <textarea name="description" value={menuForm.description} onChange={handleMenuFormChange} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1.5px solid #bbb' }} rows={3} />
//           </div>
//           <div style={{ marginBottom: 12 }}>
//             <label>Price:</label><br />
//             <input type="number" name="price" value={menuForm.price} onChange={handleMenuFormChange} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1.5px solid #bbb' }} required min="0" step="0.01" />
//           </div>
//           <div style={{ marginBottom: 12 }}>
//             <label>Image:</label><br />
//             <input type="file" name="image" accept="image/*" onChange={handleMenuFormChange} />
//           </div>
//           {menuFormError && <div style={{ color: '#dc2626', marginBottom: 10 }}>{menuFormError}</div>}
//           <button type="submit" disabled={menuFormLoading} style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, padding: '0.7rem 1.5rem', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', width: '100%' }}>
//             {menuFormLoading ? 'Saving...' : (menuModalMode === 'create' ? 'Add Menu Item' : 'Update Menu Item')}
//           </button>
//         </form>
//       </Modal>
//     </div>
//   );
// };

// export default Menu;
