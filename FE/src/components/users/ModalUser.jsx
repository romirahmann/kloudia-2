/* eslint-disable no-unused-vars */

import api from "../../services/axios.service";
import { DeleteComponent } from "../../shared/DeleteComponent";
import { Modal } from "../../shared/Modal";
import { AddUserModal } from "./modal/AddUserModal";
import { EditUserModal } from "./modal/EditUserModal";
import { OtpUserModal } from "./modal/OtpUserModal";
import { ResetPasswordModal } from "./modal/ResetPasswordModal";

/* eslint-disable no-unused-vars */
export function ModalUser({ modal, onClose, setModal, setAlert }) {
  const { open, type, data } = modal;
  const titleByType = {
    ADD: "ADD USER",
    EDIT: "EDIT USER",
    DELETE: "DELETE USER",
    RESET: "RESET PASSWORD",
    OTP: "OTP VERIFICATION",
  };

  const handleSetModalType = (newType) => {
    setModal((prev) => ({ ...prev, type: newType }));
  };

  const handleDeleteData = async () => {
    try {
      await api.delete(`/master/user/${data.userId}`);

      onClose();
      setAlert({
        show: true,
        message: "Delete User Successfully!",
        type: "success",
      });
    } catch (error) {
      setAlert({
        show: true,
        message: "Delete User Failed!",
        type: "error",
      });
      console.log(error);
    }
  };

  const renderForm = {
    ADD: <AddUserModal setAlert={setAlert} onClose={onClose} />,
    EDIT: (
      <EditUserModal
        data={data}
        onClose={onClose}
        setModalType={handleSetModalType}
        setAlert={setAlert}
      />
    ),
    DELETE: (
      <DeleteComponent
        actionDelete={handleDeleteData}
        title={type}
        onClose={onClose}
      />
    ),
    RESET: <ResetPasswordModal data={data} />,
    OTP: <OtpUserModal data={data} setModalType={handleSetModalType} />,
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
