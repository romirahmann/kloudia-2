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
import { useSearchComponent } from "../store/SearchContext";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

import ToolbarAction from "../components/users/ActionUser";
import { LuFilter } from "react-icons/lu";

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
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [filter, setFilter] = useState("");
  const { searchQuery } = useSearchComponent();

  useEffect(() => {
    fetchGroups();
  }, []);

  useEffect(() => {
    setFilter(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    fetchGroupByFilter();
  }, [filter]);

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

  const fetchGroupByFilter = async () => {
    try {
      let res = await api.get(`/master/filter-group?search=${filter}`);
      setGroups(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenModal = (type, data) => {
    setModal({ open: true, type, data });
  };
  const handleCloseModal = () => {
    setModal({ open: false, type: "", data: "" });
    setSelectedGroup(null);
  };

  return (
    <>
      <div className="toolBar">
        <div className="toolbar flex gap-2 bg-white dark:bg-gray-950 mb-2 p-2">
          <Button
            onClick={() => handleOpenModal("ADD")}
            className="border p-2 rounded-md flex items-center justify-center border-primary hover:bg-primary hover:text-white dark:border-white dark:text-white"
          >
            <IoMdAddCircleOutline />
          </Button>
          <Button
            onClick={
              selectedGroup
                ? () => handleOpenModal("EDIT", selectedGroup)
                : () => alert("Please select a group first!")
            }
            className="border p-2 rounded-md flex items-center justify-center border-primary hover:bg-primary hover:text-white dark:border-white dark:text-white"
          >
            <FiEdit />
          </Button>
          <Button
            onClick={
              selectedGroup
                ? () => handleOpenModal("DELETE", selectedGroup)
                : () => alert("Please select a user first!")
            }
            className="border p-2 rounded-md flex items-center justify-center border-primary hover:bg-primary hover:text-white dark:border-white dark:text-white"
          >
            <MdDelete />
          </Button>
        </div>
      </div>
      <div className="max-w-full tenants-page bg-white dark:bg-gray-950 rounded-md p-9">
        <div className="mt-2">
          <TableGroup
            data={groups}
            handleSelected={setSelectedGroup}
            resetTrigger={!modal.open}
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
