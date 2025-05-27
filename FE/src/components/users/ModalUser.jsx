/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import api from "../../services/axios.service";
import { DeleteComponent } from "../../shared/DeleteComponent";
import { Modal } from "../../shared/Modal";
import { AddUserModal } from "./modal/AddUserModal";
import { EditUserModal } from "./modal/EditUserModal";
import { OtpUserModal } from "./modal/OtpUserModal";
import { ResetPasswordModal } from "./modal/ResetPasswordModal";

/* eslint-disable no-unused-vars */
export function ModalUser({ modal, onClose, setModal, setAlert }) {
  const { open, type, data } = modal;
  const [roleData, setRoleData] = useState([]);
  const [grupData, setGrupData] = useState([]);
  const [tenants, setTenantData] = useState([]);

  useEffect(() => {
    fetchAllRole();
    fetchAllGrup();
    fetchAllTenant();
  }, []);

  const fetchAllRole = async () => {
    try {
      const response = await api.get("/master/roles");

      setRoleData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAllGrup = async () => {
    try {
      const response = await api.get("/master/groups");

      setGrupData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAllTenant = async () => {
    try {
      const response = await api.get("/master/tenants");

      setTenantData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const titleByType = {
    ADD: "ADD USER",
    EDIT: "EDIT USER",
    DELETE: "DELETE USER",
    RESET: "RESET PASSWORD",
    OTP: "OTP VERIFICATION",
  };

  const handleSetModalType = (newType) => {
    setModal((prev) => ({ ...prev, type: newType }));
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/master/user/${data.userId}`);

      onClose();
      setAlert({
        show: true,
        message: "Delete User Successfully!",
        type: "success",
      });
    } catch (error) {
      setAlert({
        show: true,
        message: "Delete User Failed!",
        type: "error",
      });
      console.log(error);
    }
  };

  const handleAdd = async (formData) => {
    if (
      !formData.username ||
      !formData.email ||
      !formData.fullname ||
      !formData.roleId ||
      !formData.grupId ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setAlert({
        show: true,
        message: "All Required!",
        type: "warning",
      });
      return;
    }

    if (formData.password.length < 7) {
      setAlert({
        show: true,
        message: "Password must have at least 8 characters!",
        type: "error",
      });
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setAlert({
        show: true,
        message: "Password Not Match!",
        type: "error",
      });
      return;
    }

    let data = {
      username: formData.username,
      email: formData.email,
      fullname: formData.fullname,
      roleId: parseInt(formData.roleId),
      grupId: parseInt(formData.grupId),
      tenantId: parseInt(formData.tenantId),
      password: formData.password,
    };

    console.log(data);

    try {
      let response = await api.post("/master/register", data);
      console.log(response.data.data);
      onClose();
      setAlert({
        show: true,
        message: "Add User Successfully!",
        type: "success",
      });
    } catch (error) {
      console.log(error);
      setAlert({
        show: true,
        message: "Add User Failed!",
        type: "error",
      });
    }
  };

  const handleUpdate = async (formData) => {
    let newData = {
      username: formData.username,
      email: formData.email,
      fullname: formData.fullname,
      roleId: parseInt(formData.roleId),
      grupId: parseInt(formData.grupId),
      tenantId: parseInt(formData.tenantId),
      password: formData.password,
    };

    try {
      let response = await api.put(`/master/user/${data?.userId}`, newData);
      setAlert({
        show: true,
        message: "Edit User Successfully!",
        type: "success",
      });
      onClose();
    } catch (error) {
      console.error("Edit user failed:", error.response?.data || error.message);
      setAlert({
        show: true,
        message: "Edit User Failed!",
        type: "error",
      });
    }
  };

  const renderForm = {
    ADD: (
      <AddUserModal
        onAdd={handleAdd}
        roles={roleData}
        groups={grupData}
        tenants={tenants}
      />
    ),
    EDIT: (
      <EditUserModal
        roles={roleData}
        groups={grupData}
        tenants={tenants}
        data={data}
        onClose={onClose}
        setModalType={handleSetModalType}
        onUpdate={handleUpdate}
      />
    ),
    DELETE: <DeleteComponent onDelete={handleDelete} onClose={onClose} />,
    RESET: <ResetPasswordModal data={data} />,
    OTP: <OtpUserModal data={data} setModalType={handleSetModalType} />,
  };

  return (
    <>
      <Modal
        isOpen={open}
        title={titleByType[type] || "Modal"}
        onClose={onClose}
      >
        {renderForm[type] || <p>Unknown modal type</p>}
      </Modal>
    </>
  );
}
