import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [menuLoading, setMenuLoading] = useState(false);
  const [rating, setRating] = useState({}); // { [menuId]: value }
  const [ratingMsg, setRatingMsg] = useState({}); // { [menuId]: msg }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/categories');
        setCategories(res.data);
      } catch {
        setError('Failed to fetch categories');
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const fetchMenuItems = async (categoryId) => {
    setMenuLoading(true);
    setMenuItems([]);
    setSelectedCategory(categoryId);
    try {
      const res = await axios.get(`http://localhost:5001/api/menus/category/${categoryId}`);
      setMenuItems(res.data);
    } catch {
      setError('Failed to fetch menu items');
    } finally {
      setMenuLoading(false);
    }
  };

  const handleRatingChange = (menuId, value) => {
    setRating((prev) => ({ ...prev, [menuId]: value }));
  };

  const submitRating = async (menuId) => {
    if (!rating[menuId]) return;
    try {
      await axios.post('http://localhost:5001/api/rating', {
        menu: menuId,
        stars: rating[menuId],
      });
      setRatingMsg((prev) => ({ ...prev, [menuId]: 'Thank you for rating!' }));
    } catch {
      setRatingMsg((prev) => ({ ...prev, [menuId]: 'Failed to submit rating.' }));
    }
  };

  return (
    <div>
      <h1>Welcome to the Menu Page</h1>
      {loading && <p>Loading categories...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ display: 'flex', overflowX: 'auto', gap: '1rem', margin: '1rem 0' }}>
        {categories && categories.length > 0 ? (
          categories.map((cat) => (
            <button
              key={cat._id || cat.id}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                border: selectedCategory === (cat._id || cat.id) ? '2px solid #333' : '1px solid #ccc',
                background: selectedCategory === (cat._id || cat.id) ? '#f0f0f0' : '#fff',
                cursor: 'pointer',
                minWidth: '120px',
              }}
              onClick={() => fetchMenuItems(cat._id || cat.id)}
            >
              {cat.name}
            </button>
          ))
        ) : (
          !loading && <span>No categories found.</span>
        )}
      </div>
      {selectedCategory && (
        <div>
          <h2>Menu Items</h2>
          {menuLoading ? (
            <p>Loading menu items...</p>
          ) : menuItems && menuItems.length > 0 ? (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {menuItems.map((item) => (
                <li key={item._id || item.id} style={{ marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
                  <div style={{ fontWeight: 'bold' }}>{item.name}</div>
                  <div>{item.description}</div>
                  <div>Price: ${item.price}</div>
                  <div style={{ marginTop: '0.5rem' }}>
                    <label>Rate this item: </label>
                    <select
                      value={rating[item._id || item.id] || ''}
                      onChange={(e) => handleRatingChange(item._id || item.id, e.target.value)}
                    >
                      <option value=''>Select</option>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <option key={star} value={star}>{star} Star{star > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                    <button
                      style={{ marginLeft: '0.5rem' }}
                      onClick={() => submitRating(item._id || item.id)}
                      disabled={!rating[item._id || item.id]}
                    >
                      Submit
                    </button>
                    {ratingMsg[item._id || item.id] && (
                      <span style={{ marginLeft: '0.5rem', color: 'green' }}>{ratingMsg[item._id || item.id]}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No menu items found for this category.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Menu;
