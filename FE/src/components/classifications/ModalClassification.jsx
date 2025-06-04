import { useEffect, useState } from "react";
import api from "../../services/axios.service";
import { DeleteComponent } from "../../shared/DeleteComponent";
import { Modal } from "../../shared/Modal";
import { AddClassification } from "./modal/AddClassification";
import { EditClassification } from "./modal/EditClassification";
import { NonactiveComponent } from "../../shared/NonaktifComponent";
import { ActivatedComponent } from "../../shared/ActivatedComponent";

/* eslint-disable no-unused-vars */
export function ModalClassification({ modal, onClose, setAlert }) {
  const [cabinets, setCabinet] = useState([]);
  const { open, type, data } = modal;

  const titleByType = {
    ADD: "Add Classification",
    EDIT: "Edit Classification",
    DELETE: "Delete Classification",
    NONAKTIF: "Nonaktif Classification",
    AKTIF: "Aktif Classification",
  };

  useEffect(() => {
    fetchCabinet();
  }, []);

  const fetchCabinet = async () => {
    try {
      const response = await api.get("/master/cabinets");
      setCabinet(response.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleAdd = async (newData) => {
    try {
      await api.post("/master/classification", newData);
      setAlert({
        show: true,
        message: "Classification added successfully!",
        type: "success",
      });
      onClose();
    } catch (error) {
      console.log(error.response);
      setAlert({
        show: true,
        message: "Classification added failure!",
        type: "error",
      });
    }
  };
  const handleUpdate = async (newData) => {
    try {
      await api.put(`/master/classification/${data.classificationId}`, newData);

      setAlert({
        show: true,
        message: "Classification updated successfully!",
        type: "success",
      });
      onClose();
    } catch (error) {
      console.log(error.response);
      setAlert({
        show: true,
        message: "Classification updated failure!",
        type: "error",
      });
    }
  };
  const handleDelete = async () => {
    try {
      await api.delete(`/master/classification/${data.classificationId}`);

      setAlert({
        show: true,
        message: "Classification deleted successfully!",
        type: "success",
      });
      onClose();
    } catch (error) {
      console.log(error.response);
      setAlert({
        show: true,
        message: "Classification deleted failure!",
        type: "error",
      });
    }
  };
  const onNonaktif = async () => {
    try {
      await api.put(`/master/classification/${data.classificationId}`, {
        isActive: 0,
      });

      setAlert({
        show: true,
        message: "Classification nonatived successfully!",
        type: "success",
      });
      onClose();
    } catch (error) {
      console.log(error.response);
      setAlert({
        show: true,
        message: "Classification nonatived failure!",
        type: "error",
      });
    }
  };
  const onAktif = async () => {
    try {
      await api.put(`/master/classification/${data.classificationId}`, {
        isActive: 1,
      });

      setAlert({
        show: true,
        message: "Classification actived successfully!",
        type: "success",
      });
      onClose();
    } catch (error) {
      console.log(error.response);
      setAlert({
        show: true,
        message: "Classification actived failure!",
        type: "error",
      });
    }
  };

  const renderForm = {
    ADD: (
      <AddClassification
        onAdd={(newData) => handleAdd(newData)}
        cabinets={cabinets}
      />
    ),
    EDIT: (
      <EditClassification
        onUpdate={(newData) => handleUpdate(newData)}
        data={data}
        cabinets={cabinets}
      />
    ),
    DELETE: (
      <DeleteComponent onDelete={handleDelete} data={data} onClose={onClose} />
    ),
    NONAKTIF: <NonactiveComponent onNonaktif={onNonaktif} onClose={onClose} />,
    AKTIF: <ActivatedComponent onActive={onAktif} onClose={onClose} />,
  };

  return (
    <>
      <Modal
        isOpen={open}
        title={titleByType[type] || "Modal"}
        onClose={onClose}
      >
        {" "}
        {renderForm[type] || <p>Unknown modal type</p>}{" "}
      </Modal>
    </>
  );
}
