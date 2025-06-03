/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import { Modal } from "../../shared/Modal";
import api from "../../services/axios.service";
import { AddStructure } from "./modal/AddStructure";

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
    console.log(newData);
  };
  const handleEdit = async () => {};
  const handleDelete = async () => {};

  const renderForm = {
    ADD: (
      <AddStructure
        typeData={typeData}
        onClose={onClose}
        onAdd={handleAdd}
        classificationId={classificationId}
      />
    ),
    EDIT: "Edit Classification",
    DELETE: "Delete Classification",
  };

  return (
    <Modal isOpen={open} title={titleByType[type] || "MODAL"} onClose={onClose}>
      {renderForm[type] || <p>Unkown modal type</p>}
    </Modal>
  );
}
