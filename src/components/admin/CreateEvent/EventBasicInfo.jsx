import React, { useState } from "react";
import "./EventBasicInfo.css";

const EventBasicInfo = ({ title, subtitle, category, onChange }) => {
  // Initial categories (could be fetched from an API or config)
  const [categories, setCategories] = useState([
    "Photography",
    "Nature",
    "Portrait",
    "Street",
  ]);
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      const updatedCategories = [...categories, newCategory.trim()];
      setCategories(updatedCategories);
      setNewCategory("");
      // Optionally save to backend or local storage
      // Example: localStorage.setItem('eventCategories', JSON.stringify(updatedCategories));
    }
  };

  return (
    <div className="event-basic-info card">
      <h2 className="card-title">Basic Info</h2>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={onChange}
          placeholder="Event title"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="subtitle">Subtitle</label>
        <input
          type="text"
          id="subtitle"
          name="subtitle"
          value={subtitle}
          onChange={onChange}
          placeholder="Event subtitle"
        />
      </div>
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={category}
          onChange={onChange}
          required
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group add-category">
        <label>Add Category</label>
        <div className="add-category-input">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New category"
          />
          <button
            type="button"
            onClick={handleAddCategory}
            disabled={!newCategory.trim()}
            className="add-category-button"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventBasicInfo;
