import React, { useEffect, useState } from "react";
import "./EventBasicInfo.css";
import { getCategoryList } from "../../../api/api";

const EventBasicInfo = ({ title, subtitle, category, onChange }) => {
  // Initialize categories as an empty array to avoid undefined
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      const updatedCategories = [...categories, newCategory.trim()];
      setCategories(updatedCategories);
      setNewCategory("");
      // Update the form's category to the newly added one
      onChange({ target: { name: "category", value: newCategory.trim() } });
      // Optionally save to backend or local storage
      // Example: localStorage.setItem('eventCategories', JSON.stringify(updatedCategories));
    }
  };

  const categoryData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await getCategoryList(token);
      console.log(response.data);
      // Ensure response.data.categories is an array and map to names
      setCategories(response.data.categories?.map((cat) => cat.name) || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]); // Fallback to empty array on error
    }
  };

  useEffect(() => {
    categoryData();
  }, []);

  console.log("categories:", categories);

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
        <label htmlFor="description">Subtitle</label>
        <input
          type="text"
          id="description"
          name="description"
          value={subtitle}
          onChange={onChange}
          placeholder="Enter event subtitle"
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
          {categories.length > 0 ? (
            categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))
          ) : (
            <option value="" disabled>
              No categories available
            </option>
          )}
          <option value="others">Others</option>
        </select>
      </div>
      {category === "others" && (
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
      )}
    </div>
  );
};

export default EventBasicInfo;
