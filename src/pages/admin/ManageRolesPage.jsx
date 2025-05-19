import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../../components/toast/ToastNotification";
import "react-toastify/dist/ReactToastify.css";
import RoleModal from "../../components/admin/ManageRoles/RoleModal";
import RoleTable from "../../components/admin/ManageRoles/RoleTable";
import { fetchUsers } from "../../redux/slices/userRolesSlice";
import "./ManageRolesPage.css";

const ManageRolesPage = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.userRoles);
  const { showSuccess, showError } = useToast();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="manage-roles-page">
      <h1 className="page-title">Manage Roles</h1>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <RoleTable users={users} />
      )}
      <RoleModal />
    </div>
  );
};

export default ManageRolesPage;
