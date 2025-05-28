/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { DeleteComponent } from "../../shared/DeleteComponent";
import { Modal } from "../../shared/Modal";
import { AddCabinet } from "./modal/AddCabinet";
import { EditCabinet } from "./modal/EditCabinet";
import api from "../../services/axios.service";
import { NonactiveComponent } from "../../shared/NonaktifComponent";
import { ActivatedComponent } from "../../shared/ActivatedComponent";

export function ModalCabinet({ modal, onClose, setAlert }) {
  const { open, type, data } = modal;
  const [tenants, setTenants] = useState([]);
  const [groups, setGroup] = useState([]);

  useEffect(() => {
    fetchTenant(), fetchGroups();
  }, []);

  const fetchTenant = async () => {
    try {
      let res = await api.get("/master/tenants");
      setTenants(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchGroups = async () => {
    try {
      let res = await api.get("/master/groups");
      setGroup(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const titleByType = {
    ADD: "Add Cabinet",
    EDIT: "Edit Cabinet",
    DELETE: "Delete Cabinet",
    NONAKTIF: "Nonaktif Cabinet",
    AKTIF: "Active Cabinet",
  };

  const handleAdd = async (newData) => {
    if (!newData.cabinetName || !newData.tenantId || !newData.grupId) {
      setAlert({
        show: true,
        message: "Please fill all fields",
        type: "error",
      });
      return;
    }

    try {
      await api.post("/master/cabinet", newData);
      setAlert({
        show: true,
        message: "Cabinet created successfully",
        type: "success",
      });
      onClose();
    } catch (error) {
      setAlert({
        show: true,
        message: "Failed to create the cabinet. Please try again.",
        type: "error",
      });
    }
  };
  const handleUpdate = async (newData) => {
    try {
      await api.put(`/master/cabinet/${data.cabinetId}`, newData);
      setAlert({
        show: true,
        message: "Cabinet updated successfully",
        type: "success",
      });
      onClose();
    } catch (error) {
      setAlert({
        show: true,
        message: "Failed to update the cabinet. Please try again.",
        type: "error",
      });
    }
  };
  const handleDelete = async () => {
    try {
      await api.delete(`/master/cabinet/${data.cabinetId}`);
      setAlert({
        show: true,
        message: "Cabinet deleted successfully",
        type: "success",
      });
      onClose();
    } catch (error) {
      setAlert({
        show: true,
        message: "Failed to delete the cabinet. Please try again!",
        type: "error",
      });
    }
  };
  const handleActive = async () => {
    try {
      await api.put(`/master/cabinet/${data.cabinetId}`, {
        isActive: 1,
      });
      setAlert({
        show: true,
        message: "Cabinet activated successfully",
        type: "success",
      });
      onClose();
    } catch (error) {
      setAlert({
        show: true,
        message: "Failed to activate the cabinet.",
        type: "error",
      });
    }
  };
  const handleNonactive = async () => {
    try {
      await api.put(`/master/cabinet/${data.cabinetId}`, {
        isActive: 0,
      });
      setAlert({
        show: true,
        message: "Cabinet deactivated successfully",
        type: "success",
      });
      onClose();
    } catch (error) {
      setAlert({
        show: true,
        message: "Failed to deactivate the cabinet",
        type: "error",
      });
    }
  };

  const renderForm = {
    ADD: (
      <AddCabinet
        tenants={tenants}
        groups={groups}
        onAdd={(newData) => handleAdd(newData)}
      />
    ),
    EDIT: (
      <EditCabinet
        tenants={tenants}
        groups={groups}
        onUpdate={(newData) => handleUpdate(newData)}
        data={data}
      />
    ),
    DELETE: (
      <DeleteComponent onDelete={handleDelete} data={data} onClose={onClose} />
    ),
    NONAKTIF: (
      <NonactiveComponent onClose={onClose} onNonaktif={handleNonactive} />
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
