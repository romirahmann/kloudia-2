/* eslint-disable no-unused-vars */

import { Modal } from "../../shared/Modal";
import { AddUserModal } from "./modal/AddUserModal";
import { EditUserModal } from "./modal/EditUserModal";

/* eslint-disable no-unused-vars */
export function ModalUser({ modal, onClose }) {
  const { open, type, data } = modal;

  const renderForm = {
    ADD: <AddUserModal onClose={onClose} />,
    EDIT: <EditUserModal data={data} onClose={onClose} />,
    DELETE: <h1>DELETE</h1>,
  };

  const titleByType = {
    ADD: "ADD USER",
    EDIT: "EDIT USER",
    DELETE: "DELETE USER",
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
