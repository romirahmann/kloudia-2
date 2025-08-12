import api from "../../services/axios.service";
import { Modal } from "../../shared/Modal";
import { useAlert } from "../../store/AlertContext";

/* eslint-disable no-unused-vars */
export function ActionUser({ isOpen, type, data, onClose, onAction }) {
  const { showAlert } = useAlert();
  const handleDelete = async () => {
    try {
      await api.delete(`/master/user/${data.userId}`);

      onClose();
      showAlert("Delete User Successfully!", "success");
    } catch (error) {
      showAlert("Delete User Failed!", "success");

      console.log(error);
    }
  };
  return (
    <>
      <Modal isOpen={isOpen} title={`${type} Users`} onClose={onClose}>
        {/* {type === "ADD" && <AddEmployee onAdd={onAction} onClose={onClose} />} */}
        {/* {type === "EDIT" && <EditEmployee data={data} onEdit={onAction} />} */}
        {type === "DELETE" && (
          <ModalDelete
            isOpen={isOpen}
            onDelete={handleDelete}
            onClose={onClose}
          />
        )}
      </Modal>
    </>
  );
}
