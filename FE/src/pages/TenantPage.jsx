/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import api from "../services/axios.service";

import { TableTenant } from "../components/tenants/TableTenant";
import { Search } from "../shared/Search";
import SelectInput from "../shared/SelectInput";
import { ModalTenant } from "../components/tenants/ModalTenants";
import { AlertMessage } from "../shared/Alert";
import { AnimatePresence } from "framer-motion";
import { listenToUpdate } from "../services/socket.service";

import { FaCheck, FaPlus } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdBlock, MdDelete } from "react-icons/md";
import { LuFilter } from "react-icons/lu";
import ToolbarAction from "../components/users/ActionUser";
import { useSearchComponent } from "../store/SearchContext";

export function TenantPage() {
  const [tenants, setTenant] = useState([]);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState({
    search: "",
    status: "",
  });
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
  const [isOpenFilter, setOpenFilter] = useState(false);
  const { searchQuery } = useSearchComponent();

  useEffect(() => {
    fetchTenant();
  }, []);

  useEffect(() => {
    setFilter({ ...filter, search: searchQuery });
  }, [searchQuery]);

  useEffect(() => {
    const handleUpdate = (data) => {
      fetchTenant();
    };

    listenToUpdate("update_tenant", handleUpdate);
    listenToUpdate("add_tenant", handleUpdate);
    listenToUpdate("delete_tenant", handleUpdate);
  }, []);

  const fetchTenant = async () => {
    try {
      let response = await api.get("/master/tenants");
      let dataTenant = response.data.data;
      setTenant(dataTenant);
      setFilteredData(dataTenant);
    } catch (error) {
      console.log("Fetch Tenant Error", error);
    }
  };

  const handleOpenModal = (type, data) => {
    setModal({ open: true, type, data });
  };

  const handleOnChangeFilter = (e) => {
    const { name, value } = e.target;

    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchFilterTenant = async () => {
      try {
        let response = await api.post(`/master/filter-tenants`, filter);
        setFilteredData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFilterTenant();
  }, [filter]);

  const handleCloseModal = () => {
    setModal({ open: false, type: null, data: null });
    setSelectedTenant(null);
  };

  return (
    <>
      <div className="action">
        <div className="toolbar flex gap-2 bg-white dark:bg-gray-950 mb-2 p-2">
          <button
            onClick={() => handleOpenModal("ADD")}
            className="border p-2 rounded-md flex items-center justify-center border-primary hover:bg-primary hover:text-white dark:border-white dark:text-white"
          >
            <IoMdAddCircleOutline />
          </button>
          <button
            onClick={
              selectedTenant
                ? () => handleOpenModal("EDIT", selectedTenant)
                : () =>
                    setShowAlert({
                      show: true,
                      message: "Please select tenant to edit.",
                      type: "warning",
                    })
            }
            className="border p-2 rounded-md flex items-center justify-center border-primary hover:bg-primary hover:text-white dark:border-white dark:text-white"
          >
            <FiEdit />
          </button>

          <button
            onClick={
              selectedTenant
                ? () => handleOpenModal("NONAKTIF", selectedTenant)
                : () =>
                    setShowAlert({
                      show: true,
                      message: "Please select tenant to nonaktif.",
                      type: "warning",
                    })
            }
            disabled={selectedTenant && !selectedTenant.isActive}
            className={`border p-2 rounded-md flex items-center justify-center  hover:text-white dark:border-white dark:text-white ${
              selectedTenant && !selectedTenant.isActive
                ? "bg-gray-300 text-white border border-gray-400"
                : "border-primary hover:bg-primary"
            } `}
          >
            <MdBlock />
          </button>
          <button
            onClick={
              selectedTenant
                ? () => handleOpenModal("AKTIF", selectedTenant)
                : () =>
                    setShowAlert({
                      show: true,
                      message: "Please select tenant to active.",
                      type: "warning",
                    })
            }
            disabled={selectedTenant && selectedTenant.isActive}
            className={`border p-2 rounded-md flex items-center justify-center  hover:text-white dark:border-white dark:text-white ${
              selectedTenant && selectedTenant.isActive
                ? "bg-gray-300 text-white border border-gray-400"
                : "border-primary hover:bg-primary"
            } `}
          >
            <FaCheck />
          </button>
          <button
            onClick={
              selectedTenant
                ? () => handleOpenModal("DELETE", selectedTenant)
                : () =>
                    setShowAlert({
                      show: true,
                      message: "Please select tenant to delete.",
                      type: "warning",
                    })
            }
            className="border p-2 rounded-md flex items-center justify-center border-primary hover:bg-primary hover:text-white dark:border-white dark:text-white"
          >
            <MdDelete />
          </button>
          <button
            onClick={() =>
              isOpenFilter ? setOpenFilter(false) : setOpenFilter(true)
            }
            className="border p-2 rounded-md flex items-center justify-center border-primary hover:bg-primary hover:text-white dark:border-white dark:text-white"
          >
            <LuFilter />
          </button>
        </div>
      </div>

      {/* TABLE CONTENT */}
      <div className="max-w-full tenants-page  dark:bg-gray-950 rounded-md">
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
            <div className="status  cursor-pointer">
              <h1 className="mt-5">Select Tenant Status</h1>
              <SelectInput
                name="status"
                id="status"
                value={filter.status}
                placeholder="Status"
                className="mt-6"
                onChange={(e) => handleOnChangeFilter(e)}
                options={[
                  { value: 1, label: "Active" },
                  { value: 0, label: "Inactive" },
                ]}
              />
            </div>
          </div>
          <div className="bg-white col-span-5 dark:bg-gray-950 rounded-md p-9">
            <div className="tableTenants mt-2  ">
              <TableTenant
                data={filteredData}
                handleSelected={setSelectedTenant}
                resetTrigger={!modal.open}
              />
            </div>
          </div>
        </div>

        {/* MODAL USER */}
        <ModalTenant
          modal={modal}
          onClose={handleCloseModal}
          setModal={setModal}
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
