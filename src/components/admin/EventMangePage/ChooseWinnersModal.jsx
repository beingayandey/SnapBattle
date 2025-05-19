import React, { useState } from "react";

const ChooseWinnersModal = ({ isOpen, onClose, submissions = [] }) => {
  // Initialize winners state dynamically based on submissions
  const maxWinners = Math.min(submissions.length, 3); // Limit to 5 winners for practicality
  const initialWinners = Array.from({ length: maxWinners }, (_, index) => ({
    place: `place${index + 1}`,
    value: null,
  })).reduce((acc, curr) => ({ ...acc, [curr.place]: curr.value }), {});

  const [winners, setWinners] = useState(initialWinners);

  const handleSelect = (place, id) => {
    setWinners({ ...winners, [place]: id });
  };

  const handleSave = () => {
    // API call to save winners
    alert(`Winners selected: ${JSON.stringify(winners)}`);
    onClose();
  };

  if (!isOpen) return null;

  // Ensure submissions are unique and exclude already selected winners from other dropdowns
  const getAvailableOptions = (currentPlace) => {
    return submissions.filter((sub) => {
      const selectedValues = Object.values(winners).filter(
        (value, key) => key !== currentPlace && value
      );
      return (
        !selectedValues.includes(sub.id) || sub.id === winners[currentPlace]
      );
    });
  };

  // Generate winner fields dynamically
  const winnerFields = Array.from({ length: maxWinners }, (_, index) => ({
    place: `place${index + 1}`,
    label: `${index + 1}${
      index === 0 ? "st" : index === 1 ? "nd" : index === 2 ? "rd" : "th"
    } Place`,
  }));

  return (
    <div className="modal">
      <div className="modal__content">
        <h3>Choose Winners</h3>
        {winnerFields.map((field) => (
          <div key={field.place} className="choose-winners__field">
            <label>{field.label}</label>
            <select onChange={(e) => handleSelect(field.place, e.target.value)}>
              <option value="">Select</option>
              {getAvailableOptions(field.place).map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.user}
                </option>
              ))}
            </select>
          </div>
        ))}
        <div className="modal__actions">
          <button className="button" onClick={handleSave}>
            Save
          </button>
          <button
            className="button"
            style={{ background: "var(--danger)" }}
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChooseWinnersModal;
