import { DeleteComponent } from "../../shared/DeleteComponent";
import { Modal } from "../../shared/Modal";
import { AddCabinet } from "./modal/AddCabinet";
import { EditCabinet } from "./modal/EditCabinet";

/* eslint-disable no-unused-vars */
export function ModalCabinet({ modal, onClose, setAlert }) {
  const { open, type, data } = modal;

  const titleByType = {
    ADD: "Add Cabinet",
    EDIT: "Edit Cabinet",
    DELETE: "Delete Cabinet",
    NONAKTIF: "Nonaktif Cabinet",
    AKTIF: "Active Cabinet",
  };

  const handleAdd = async () => {};
  const handleUpdate = async () => {};
  const handleDelete = async () => {};
  const handleActive = async () => {};
  const handleNonactive = async () => {};

  const renderForm = {
    ADD: <AddCabinet onAdd={(newData) => handleAdd(newData)} />,
    EDIT: (
      <EditCabinet onUpdate={(newData) => handleUpdate(newData)} data={data} />
    ),
    DELETE: (
      <DeleteComponent onDelete={handleDelete} data={data} onClose={onClose} />
    ),
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
