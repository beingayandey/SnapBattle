import React, { useState, useMemo, useEffect } from "react";
import UserTable from "../../components/admin/AdminUser/UserTable";
import UserFilters from "../../components/admin/AdminUser/UserFilters";
import ExportUserData from "../../components/admin/AdminUser/ExportUserData";
import "./AdminUsersPage.css";

const initialUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "Inactive",
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Editor",
    status: "Active",
  },
  {
    id: 4,
    name: "Bob Brown",
    email: "bob@example.com",
    role: "User",
    status: "Banned",
  },
  // Add more sample users for pagination
  {
    id: 5,
    name: "Emma Wilson",
    email: "emma@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 6,
    name: "Liam Davis",
    email: "liam@example.com",
    role: "User",
    status: "Inactive",
  },
];

const AdminUsersPage = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ role: "", status: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = filters.role ? user.role === filters.role : true;
      const matchesStatus = filters.status
        ? user.status === filters.status
        : true;
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchQuery, filters]);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handleAction = (userId, action) => {
    setUsers((prevUsers) => {
      const user = prevUsers.find((u) => u.id === userId);
      if (!user) return prevUsers;

      switch (action) {
        case "ban":
          return prevUsers.map((u) =>
            u.id === userId ? { ...u, status: "Banned" } : u
          );
        case "delete":
          return prevUsers.filter((u) => u.id !== userId);
        case "changeRole":
          const newRole = user.role === "Admin" ? "User" : "Admin";
          return prevUsers.map((u) =>
            u.id === userId ? { ...u, role: newRole } : u
          );
        default:
          console.log(`View user ${userId}`);
          return prevUsers;
      }
    });
  };

  return (
    <div className="admin-users-page">
      <header className="admin-users-header">
        <h1>Users</h1>
        <ExportUserData users={filteredUsers} />
      </header>
      <UserFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filters={filters}
        setFilters={setFilters}
      />
      <UserTable
        users={paginatedUsers}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        handleAction={handleAction}
      />
    </div>
  );
};

export default AdminUsersPage;
