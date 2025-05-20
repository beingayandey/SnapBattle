import React from "react";
import "./SearchInput.css";

function SearchInput({ value, onChange }) {
  return (
    <div className="search-input">
      <input
        type="text"
        placeholder="Search by user or email..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default SearchInput;
