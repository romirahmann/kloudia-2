/* eslint-disable no-undef */
import api from "../../services/axios.service";
import { ActivatedComponent } from "../../shared/ActivatedComponent";
import { DeleteComponent } from "../../shared/DeleteComponent";
import { Modal } from "../../shared/Modal";
import { NonactiveComponent } from "../../shared/NonaktifComponent";
import { AddTenant } from "./modal/AddTenant";

import { EditTenant } from "./modal/EditTenant";

/* eslint-disable no-unused-vars */
export function ModalTenant({ modal, onClose, setAlert }) {
  const { open, type, data } = modal;

  const titleByType = {
    ADD: "Add Tenant",
    EDIT: "Edit Tenant",
    DELETE: "Delete Tenant",
    NONAKTIF: "Nonaktif Tenant",
    AKTIF: "Active Tenant",
  };

  const handleAdd = async (newData) => {
    try {
      await api.post("/master/tenant", newData);

      setAlert({
        show: true,
        message: "Tenant created successfully!",
        type: "success",
      });
      onClose();
    } catch (error) {
      setAlert({
        show: true,
        message: "Failed to add tenant. Please try again!",
        type: "error",
      });
    }
  };

  const handleUpdate = async (newData) => {
    try {
      await api.put(`/master/tenant/${data.tenantId}`, newData);
      setAlert({
        show: true,
        message: "Tenant updated successfully!",
        type: "success",
      });
      onClose();
    } catch (error) {
      setAlert({
        show: true,
        message: "Failed to update tenant. Please ensure all fields are valid!",
        type: "error",
      });
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/master/tenant/${data.tenantId}`);
      onClose();
      setAlert({
        show: true,
        message: "Tenant has been deleted successfully!",
        type: "success",
      });
    } catch (error) {
      setAlert({
        show: true,
        message: "Unable to delete tenant. Please try again later!",
        type: "error",
      });
    }
  };

  const handleNonaktif = async () => {
    try {
      await api.put(`/master/tenant/${data.tenantId}`, {
        isActive: 0,
      });

      setAlert({
        show: true,
        message: "Tenant has been deactivated!",
        type: "success",
      });
      onClose();
    } catch (error) {
      setAlert({
        show: true,
        message: "Failed to deactivate tenant. Please try again!",
        type: "error",
      });
    }
  };

  const handleActive = async () => {
    try {
      await api.put(`/master/tenant/${data?.tenantId}`, {
        isActive: 1,
      });

      setAlert({
        show: true,
        message: "Tenant has been reactivated successfully!",
        type: "success",
      });
      onClose();
    } catch (error) {
      console.log(error);
      setAlert({
        show: true,
        message:
          "Failed to reactivate tenant. Please check your connection or try again later!",
        type: "error",
      });
    }
  };

  const renderForm = {
    ADD: <AddTenant onAdd={(newData) => handleAdd(newData)} />,
    EDIT: (
      <EditTenant onUpdate={(newData) => handleUpdate(newData)} data={data} />
    ),
    DELETE: (
      <DeleteComponent onDelete={handleDelete} data={data} onClose={onClose} />
    ),
    NONAKTIF: (
      <NonactiveComponent onClose={onClose} onNonaktif={handleNonaktif} />
    ),
    AKTIF: <ActivatedComponent onActive={handleActive} onClose={onClose} />,
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
