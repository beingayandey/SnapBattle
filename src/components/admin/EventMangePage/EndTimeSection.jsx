import React, { useState, useEffect } from "react";

const EndTimeSection = () => {
  const [endDate, setEndDate] = useState("2025-06-01T23:59");
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const end = new Date(endDate);
      const diff = end - now;

      if (diff <= 0) {
        setCountdown("Event Ended");
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setCountdown(`${days}d ${hours}h ${minutes}m`);
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  const handleDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleSave = () => {
    // API call to save end date
    alert("End date saved!");
  };

  return (
    <div className="card end-time">
      <h3>Set End Time</h3>
      <div className="end-time__field">
        <label>End Date</label>
        <input
          type="datetime-local"
          value={endDate}
          onChange={handleDateChange}
        />
      </div>
      <p>Countdown: {countdown}</p>
      <button className="button" onClick={handleSave}>
        Save End Time
      </button>
    </div>
  );
};

export default EndTimeSection;
