import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeModal,
  updateUserRole,
} from "../../../redux/slices/userRolesSlice";

import "./roleModal.css";
import { useToast } from "../../toast/ToastNotification";

const RoleModal = () => {
  const dispatch = useDispatch();
  const { modalOpen, selectedUser } = useSelector((state) => state.userRoles);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("judge");
  const [error, setError] = useState("");
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    if (selectedUser) {
      setEmail(selectedUser.email);
      setRole(selectedUser.role);
    } else {
      setEmail("");
      setRole("judge");
    }
  }, [selectedUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required");
      return;
    }
    try {
      await dispatch(updateUserRole({ email, role })).unwrap();
      showSuccess("Role updated successfully!");
      dispatch(closeModal());
      setError("");
    } catch (err) {
      setError(err.message || "Failed to update role");
      showError("Failed to update role");
    }
  };

  if (!modalOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{selectedUser ? "Edit Role" : "Assign Role"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!!selectedUser}
              placeholder="Enter user email"
            />
          </div>
          <div className="form-group">
            <label>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
              <option value="judge">Judge</option>
            </select>
          </div>
          {error && <p className="error">{error}</p>}
          <div className="modal-actions">
            <button type="button" onClick={() => dispatch(closeModal())}>
              Cancel
            </button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoleModal;
