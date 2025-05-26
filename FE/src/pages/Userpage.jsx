/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { PanelFilterUser } from "../components/users/PanelFilterUser";
import { TableUser } from "../components/users/TableUser";
import api from "../services/axios.service";

import { ModalUser } from "../components/users/ModalUser";

export function Userpage() {
  const [users, setUsers] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [modal, setModal] = useState({
    open: false,
    type: null,
    data: null,
  });
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
        />
      </div>
    </>
  );
}
