/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { PanelFilterUser } from "../components/users/PanelFilterUser";
import { TableUser } from "../components/users/TableUser";
import api from "../services/axios.service";
import { ModalUser } from "../components/users/ModalUser";
import { AnimatePresence } from "framer-motion";
import { AlertMessage } from "../shared/Alert";
import { listenToUpdate } from "../services/socket.service";

export function Userpage() {
  const [users, setUsers] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [modal, setModal] = useState({
    open: false,
    type: null,
    data: null,
  });
  const [showAlert, setShowAlert] = useState({
    show: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    const handleUpdate = (newData) => {
      fecthUsersData();
    };

    listenToUpdate("update_user", handleUpdate);
    listenToUpdate("add_user", handleUpdate);
    listenToUpdate("delete_user", handleUpdate);
  }, []);

  useEffect(() => {
    fecthUsersData();
  }, []);

  const fecthUsersData = async () => {
    try {
      let response = await api.get("/master/users");
      setUsers(response.data.data);
      setFilteredData(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOpenModal = (type, data) => {
    setModal({ open: true, type, data });
  };

  const handleCloseModal = () => {
    setModal({ open: false, type: null, data: null });
    fecthUsersData();
  };

  return (
    <>
      <div className="userpage">
        <div className="bg-white dark:bg-gray-950 rounded-md p-9">
          <PanelFilterUser
            users={users}
            setFilteredData={(data) => setFilteredData(data)}
            modal={(val) => setModal(val)}
          />
          <div className="mt-10">
            <TableUser
              data={filteredData}
              actionTable={({ type, data }) => handleOpenModal(type, data)}
            />
          </div>
        </div>
        {/* MODAL USER */}
        <ModalUser
          modal={modal}
          onClose={handleCloseModal}
          setModal={setModal}
          setAlert={(alert) => setShowAlert(alert)}
        />

        <AnimatePresence>
          {showAlert.show && (
            <AlertMessage
              message={`${showAlert.message}`}
              type={`${showAlert.type}`}
              onClose={() =>
                setShowAlert({ show: false, message: "", type: "" })
              }
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
