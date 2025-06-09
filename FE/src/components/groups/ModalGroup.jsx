import api from "../../services/axios.service";
import { DeleteComponent } from "../../shared/DeleteComponent";
import { Modal } from "../../shared/Modal";
import { AddGroupComponent } from "./modal/AddGroup";
import { EditGroupComponent } from "./modal/EditGroup";

/* eslint-disable no-unused-vars */
export function ModalGroup({ modal, onClose, setAlert }) {
  const { open, type, data } = modal;

  const titleByType = {
    ADD: "Add Group",
    EDIT: "Edit Group",
    DELETE: "Delete Group",
  };

  const handleAdd = async (newData) => {
    try {
      console.log(newData);
      await api.post("/master/group", newData);
      setAlert({
        show: true,
        message: "Group created successfully",
        type: "success",
      });
      onClose();
    } catch (error) {
      setAlert({
        show: true,
        message: "Failed to create the group. Please try again.",
        type: "error",
      });
    }
  };
  const handleEdit = async (newData) => {
    try {
      await api.put(`/master/group/${data.grupId}`, newData);
      setAlert({
        show: true,
        message: "Group edit successfully",
        type: "success",
      });
      onClose();
    } catch (error) {
      setAlert({
        show: true,
        message: "Failed to edit the group. Please try again.",
        type: "error",
      });
    }
  };
  const handleDelete = async () => {
    try {
      await api.delete(`/master/group/${data.grupId}`);
      setAlert({
        show: true,
        message: "Group deleted successfully",
        type: "success",
      });
      onClose();
    } catch (error) {
      setAlert({
        show: true,
        message: "Failed to delete the group. Please try again!",
        type: "error",
      });
    }
  };

  const renderForm = {
    ADD: <AddGroupComponent onAdd={handleAdd} />,
    EDIT: <EditGroupComponent onUpdate={handleEdit} data={data} />,
    DELETE: <DeleteComponent onDelete={handleDelete} onClose={onClose} />,
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
