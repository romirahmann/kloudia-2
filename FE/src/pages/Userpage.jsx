/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { PanelFilterUser } from "../components/users/PanelFilterUser";
import { TableUser } from "../components/users/TableUser";
import api from "../services/axios.service";
import { ModalUser } from "../components/users/ModalUser";
import { AnimatePresence } from "framer-motion";
import { AlertMessage } from "../shared/Alert";
import { listenToUpdate } from "../services/socket.service";
import { useSearchComponent } from "../store/SearchContext";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import ToolbarAction from "../components/users/ActionUser";
import { MdDelete } from "react-icons/md";
import { FaFilter } from "react-icons/fa6";
import { LuFilter } from "react-icons/lu";
import Split from "react-split";
import SelectInput from "../shared/SelectInput";
import { Button } from "../shared/Button";
import { FaSearch } from "react-icons/fa";

export function Userpage() {
  const [users, setUsers] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isOpenFilter, setFilter] = useState(false);
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
  const [roleData, setRoleData] = useState([]);
  const [grupData, setGrupData] = useState([]);
  const { searchQuery } = useSearchComponent();
  const [selectedUser, setSelectedUser] = useState();
  const [selectedFilter, setSelectedFilter] = useState({
    search: "",
    grupId: "",
    roleId: "",
    tenantId: "",
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
    fetchAllRole();
    fetchAllGrup();
  }, []);

  const fecthUsersFilter = async (params) => {
    let response = await api.post("/master/users-filter", params);
    setFilteredData(response.data.data);
  };

  const fecthUsersData = async () => {
    try {
      let response = await api.get("/master/users");
      setUsers(response.data.data);
      setFilteredData(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAllRole = async () => {
    try {
      const response = await api.get("/master/roles");

      setRoleData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleOnChangeFilter = (e) => {
    setSelectedFilter((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleFilter = () => {
    fecthUsersFilter(selectedFilter);
  };
  const fetchAllGrup = async () => {
    try {
      const response = await api.get("/master/groups");

      setGrupData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenModal = (type, data) => {
    setModal({ open: true, type, data });
  };

  const handleCloseModal = () => {
    setModal({ open: false, type: null, data: null });
    setSelectedUser(null);
    fecthUsersData();
  };

  return (
    <>
      <div className="userpage">
        <div className="toolbar flex gap-2 bg-white dark:bg-gray-950 mb-2 p-2">
          <Button
            onClick={() => handleOpenModal("ADD")}
            className="border p-2 rounded-md flex items-center justify-center border-primary hover:bg-primary hover:text-white dark:border-white dark:text-white"
          >
            <IoMdAddCircleOutline />
          </Button>
          <Button
            onClick={
              selectedUser
                ? () => handleOpenModal("EDIT", selectedUser)
                : () => alert("Please select a user first!")
            }
            className="border p-2 rounded-md flex items-center justify-center border-primary hover:bg-primary hover:text-white dark:border-white dark:text-white"
          >
            <FiEdit />
          </Button>
          <Button
            onClick={
              selectedUser
                ? () => handleOpenModal("DELETE", selectedUser)
                : () => alert("Please select a user first!")
            }
            className="border p-2 rounded-md flex items-center justify-center border-primary hover:bg-primary hover:text-white dark:border-white dark:text-white"
          >
            <MdDelete />
          </Button>
          <Button
            onClick={() => (isOpenFilter ? setFilter(false) : setFilter(true))}
            className="border p-2 rounded-md flex items-center justify-center border-primary hover:bg-primary hover:text-white dark:border-white dark:text-white"
          >
            <LuFilter />
          </Button>
        </div>

        <div
          className={` ${
            isOpenFilter ? "grid grid-cols-1 lg:grid-cols-6 lg:gap-2" : ""
          } `}
        >
          <div
            className={`filter bg-white dark:bg-gray-950 p-3 rounded-md ${
              isOpenFilter ? "col-span-1" : "hidden"
            } `}
          >
            <div className="title-filter flex gap-2 items-center">
              <FaSearch />
              <h1 className="font-bold dark:text-white">Filter User</h1>
            </div>
            {isOpenFilter && (
              <div className="subFilter flex flex-col gap-4 mt-5 ">
                <SelectInput
                  label="Group"
                  name="grupId"
                  id="grupId"
                  value={selectedFilter.grupId}
                  onChange={(e) => handleOnChangeFilter(e)}
                  placeholder="Select Group"
                  options={grupData.map((grup) => ({
                    value: grup.grupId,
                    label: grup.grupName,
                  }))}
                />

                <SelectInput
                  label="Role"
                  name="roleId"
                  id="roleId"
                  value={selectedFilter.roleId}
                  onChange={(e) => handleOnChangeFilter(e)}
                  placeholder="Select User Role"
                  options={roleData.map((role) => ({
                    value: role.roleId,
                    label: role.roleName,
                  }))}
                />
                <div className="actionFilter flex gap-2 justify-end">
                  <button
                    onClick={() => fecthUsersData()}
                    className="border dark:text-white border-primary px-2 py-2 rounded-lg text-primary "
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => handleFilter()}
                    className="bg-primary px-3 py-2 rounded-lg text-white "
                  >
                    Filter
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="bg-white col-span-5 dark:bg-gray-950 rounded-md p-9">
            <div className="mt-2">
              <TableUser
                data={filteredData}
                handleSelected={setSelectedUser}
                resetTrigger={!modal.open}
              />
            </div>
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
