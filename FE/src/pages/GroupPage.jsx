/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Search } from "../shared/Search";
import { Button } from "../shared/Button";
import { FaPlus } from "react-icons/fa";
import { AnimatePresence } from "motion/react";
import { AlertMessage } from "../shared/Alert";
import { TableGroup } from "../components/groups/TableGroup";
import { ModalGroup } from "../components/groups/ModalGroup";
import api from "../services/axios.service";
import { listenToUpdate } from "../services/socket.service";

export function GroupPage() {
  const [groups, setGroups] = useState([]);
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

  const [filter, setFilter] = useState({
    search: "",
    status: "",
  });

  useEffect(() => {
    fetchGroups();
  }, []);

  useEffect(() => {
    const handleUpdate = () => {
      fetchGroups();
    };
    listenToUpdate("Add_Group", handleUpdate);
    listenToUpdate("Update_Group", handleUpdate);
    listenToUpdate("Delete_Group", handleUpdate);
  }, []);

  // FETCH CLASSIFICATION
  const fetchGroups = async () => {
    try {
      let res = await api.get("/master/groups");
      setGroups(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChangeSearh = async (e) => {
    const { name, value } = e.target;

    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };
  const handleOpenModal = (type, data) => {
    setModal({ open: true, type, data });
  };
  const handleCloseModal = () => {
    setModal({ open: false, type: "", data: "" });
  };

  return (
    <>
      <div className="max-w-full tenants-page bg-white dark:bg-gray-950 rounded-md p-9">
        <div className="filter flex items-center gap-2">
          <Search
            onChange={(e) => handleOnChangeSearh(e)}
            placeholder="Search group name, group description ..."
          />
          <div className="addTenant">
            <Button
              onClick={() => handleOpenModal("ADD", null)}
              className="btn-open-filter flex justify-center items-center gap-1 border rounded-md p-2 border-primary  text-primary hover:bg-primary hover:text-white hover:border-white dark:border-gray-50 dark:text-gray-50"
            >
              <FaPlus />
              <span>Add</span>
            </Button>
          </div>
        </div>

        <div className="mt-10">
          <TableGroup
            onAction={({ type, data }) => handleOpenModal(type, data)}
            data={groups}
          />
        </div>

        <ModalGroup
          modal={modal}
          onClose={handleCloseModal}
          setAlert={setShowAlert}
        />

        {/* ALERT */}
        <AnimatePresence>
          {showAlert.show && (
            <AlertMessage
              message={`${showAlert.message}`}
              type={`${showAlert.type}`}
              onClose={() => setShowAlert((prev) => ({ ...prev, show: false }))}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
