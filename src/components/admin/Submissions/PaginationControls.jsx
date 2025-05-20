import React from "react";
import "./PaginationControls.css";

function PaginationControls({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="pagination-controls">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default PaginationControls;
