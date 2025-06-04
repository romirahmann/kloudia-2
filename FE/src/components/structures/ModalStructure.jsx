/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import { Modal } from "../../shared/Modal";
import api from "../../services/axios.service";
import { AddStructure } from "./modal/AddStructure";
import { DeleteComponent } from "../../shared/DeleteComponent";
import { EditStructure } from "./modal/EditStructure";

export function ModalStructure({ modal, onClose, setAlert, classificationId }) {
  const [typeData, setTypeData] = useState([]);
  const { open, type, data } = modal;

  useEffect(() => {
    fetchTypeData();
  }, []);

  const fetchTypeData = async () => {
    try {
      let result = await api.get("/master/typedata");
      setTypeData(result.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const titleByType = {
    ADD: "Add Classification",
    EDIT: "Edit Classification",
    DELETE: "Delete Classification",
  };

  const handleAdd = async (newData) => {
    try {
      await api.post(`/master/structure`, newData);
      setAlert({
        show: true,
        message: "Structure added successfully",
        type: "success",
      });
      onClose();
    } catch (error) {
      console.log(error.response);
      setAlert({
        show: true,
        message: "Structure added failed",
        type: "error",
      });
    }
  };
  const handleEdit = async (newData) => {
    try {
      await api.put(`/master/structure/${data.structureId}`, newData);
      setAlert({
        show: true,
        message: "Structure updated successfully",
        type: "success",
      });
      onClose();
    } catch (error) {
      console.log(error.response);
      setAlert({
        show: true,
        message: "Structure updated failed",
        type: "error",
      });
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/master/structure/${data.structureId}`);
      setAlert({
        show: true,
        message: "Structure deleted successfully",
        type: "success",
      });
      onClose();
    } catch (error) {
      console.log(error.response);
      setAlert({
        show: true,
        message: "Structure deleted failed",
        type: "error",
      });
    }
  };

  const renderForm = {
    ADD: (
      <AddStructure
        typeData={typeData}
        onAdd={handleAdd}
        classificationId={classificationId}
      />
    ),
    EDIT: (
      <EditStructure
        onEdit={handleEdit}
        typeData={typeData}
        classificationId={classificationId}
        data={data}
      />
    ),
    DELETE: <DeleteComponent onDelete={handleDelete} onClose={onClose} />,
  };

  return (
    <Modal isOpen={open} title={titleByType[type] || "MODAL"} onClose={onClose}>
      {renderForm[type] || <p>Unkown modal type</p>}
    </Modal>
  );
}
