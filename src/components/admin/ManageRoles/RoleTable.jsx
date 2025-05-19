import React from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../../redux/slices/userRolesSlice";
import RoleCard from "./RoleCard";
import "./roleTable.css";

const RoleTable = ({ users }) => {
  const dispatch = useDispatch();

  const handleEditRole = (user) => {
    dispatch(openModal({ user }));
  };

  const handleAssignRole = () => {
    dispatch(openModal({ user: null }));
  };

  return (
    <div className="role-table-container">
      <button className="assign-role-btn" onClick={handleAssignRole}>
        + Assign Role
      </button>
      <div className="table-wrapper">
        <table className="role-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`role-badge role-${user.role}`}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEditRole(user)}
                  >
                    Edit Role
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card-view">
        {users.map((user) => (
          <RoleCard key={user.id} user={user} onEdit={handleEditRole} />
        ))}
      </div>
    </div>
  );
};

export default RoleTable;
