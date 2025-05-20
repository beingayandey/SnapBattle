import React from "react";

import SettingsToggleGroup from "../../components/admin/Settings/SettingsToggleGroup";

import "./AdminSettingsPage.css";

const AdminSettingsPage = () => {
  return (
    <div className="admin-settings-page">
      <h1 className="admin-settings-page__title">Admin Settings</h1>
      <div className="admin-settings-page__container">
        <section className="admin-settings-page__card">
          <SettingsToggleGroup />
        </section>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
