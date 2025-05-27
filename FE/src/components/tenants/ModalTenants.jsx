/* eslint-disable no-undef */
import api from "../../services/axios.service";
import { DeleteComponent } from "../../shared/DeleteComponent";
import { Modal } from "../../shared/Modal";
import { AddTenant } from "./modal/AddTenant";
import { AktifTenant } from "./modal/AktifTenant";

import { EditTenant } from "./modal/EditTenant";
import { NonaktifTenant } from "./modal/NonaktifTenant";

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
        message: "Add Tenant Succesffuly!",
        type: "success",
      });
      onClose();
    } catch (error) {
      setAlert({
        show: true,
        message: "Add Tenant Failed!",
        type: "error",
      });
      console.log(error.response);
    }
  };

  const handleUpdate = async (newData) => {
    try {
      await api.put(`/master/tenant/${data.tenantId}`, newData);
      setAlert({
        show: true,
        message: "Update Tenant Succesffuly!",
        type: "success",
      });
      onClose();
    } catch (error) {
      setAlert({
        show: true,
        message: "Update Tenant Failed!",
        type: "error",
      });
      console.log(error.response);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/master/tenant/${data.tenantId}`);
      onClose();
      setAlert({
        show: true,
        message: "Delete Tenant Succesffuly!",
        type: "success",
      });
    } catch (error) {
      console.log(error.response);
      setAlert({
        show: true,
        message: "Delete Tenant Failed!",
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
        message: "Nonactive Tenant Succesffuly!",
        type: "success",
      });
      onClose();
    } catch (error) {
      setAlert({
        show: true,
        message: "Inactive Tenant Succesffuly!",
        type: "error",
      });
      console.log(error);
    }
  };

  const handleActive = async () => {
    try {
      await api.put(`/master/tenant/${data?.tenantId}`, {
        isActive: 1,
      });

      setAlert({
        show: true,
        message: "Tenant Active Now!",
        type: "success",
      });
      onClose();
    } catch (error) {
      console.log(error);
      setShowAlert({
        show: true,
        message: "Failed to Activeted Tenant!",
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
    NONAKTIF: <NonaktifTenant onClose={onClose} onNonaktif={handleNonaktif} />,
    AKTIF: <AktifTenant onActive={handleActive} onClose={onClose} />,
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
