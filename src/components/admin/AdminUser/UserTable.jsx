import React from "react";
import RoleBadge from "./RoleBadge";
import UserActionsDropdown from "./UserActionsDropdown";
import "./UserTable.css";

const UserTable = ({
  users,
  currentPage,
  totalPages,
  setCurrentPage,
  handleAction,
}) => {
  return (
    <div className="user-table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <RoleBadge role={user.role} />
                </td>
                <td>{user.status}</td>
                <td>
                  <UserActionsDropdown
                    userId={user.id}
                    handleAction={handleAction}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-users">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </button>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default UserTable;
