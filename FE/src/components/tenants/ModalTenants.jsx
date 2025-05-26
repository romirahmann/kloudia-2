import { DeleteComponent } from "../../shared/DeleteComponent";
import { Modal } from "../../shared/Modal";
import { AddTenant } from "./modal/AddTenant";
import { AktifTenant } from "./modal/AktifTenant";

import { EditTenant } from "./modal/EditTenant";
import { NonaktifTenant } from "./modal/NonaktifTenant";

/* eslint-disable no-unused-vars */
export function ModalTenant({ modal, onClose, setModal, message }) {
  const { open, type, data } = modal;
  const titleByType = {
    ADD: "Add Tenant",
    EDIT: "Edit Tenant",
    DELETE: "Delete Tenant",
    NONAKTIF: "Nonaktif Tenant",
    AKTIF: "Active Tenant",
  };

  const renderForm = {
    ADD: <AddTenant />,
    EDIT: <EditTenant />,
    DELETE: <DeleteComponent data={data} onClose={onClose} />,
    NONAKTIF: (
      <NonaktifTenant data={data} onClose={onClose} message={message} />
    ),
    AKTIF: <AktifTenant data={data} onClose={onClose} message={message} />,
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
