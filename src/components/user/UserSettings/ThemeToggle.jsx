import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../../redux/slices/themeSlice";
import "./ThemeToggle.css";

function ThemeToggle() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);

  const handleThemeChange = () => {
    dispatch(toggleTheme());
  };

  return (
    <section className="theme-toggle card">
      <h2>Theme</h2>
      <button onClick={handleThemeChange} className="theme-button">
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>
    </section>
  );
}

export default ThemeToggle;
