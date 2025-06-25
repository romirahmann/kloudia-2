/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Button } from "../shared/Button";
import { Search } from "../shared/Search";
import { FaCheck, FaPlus } from "react-icons/fa";
import api from "../services/axios.service";

import { TableCabinet } from "../components/cabinets/TableCabinet";
import { ModalCabinet } from "../components/cabinets/ModalCabinet";
import { AlertMessage } from "../shared/Alert";
import { AnimatePresence } from "framer-motion";
import { listenToUpdate } from "../services/socket.service";
import { useSearchComponent } from "../store/SearchContext";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdBlock, MdDelete } from "react-icons/md";
import { LuFilter } from "react-icons/lu";

export function CabinetPage() {
  const [cabinets, setCabinet] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [modal, setModal] = useState({
    open: false,
    type: null,
    data: null,
  });
  const [selectedCabinet, setSelectedCabinet] = useState(null);
  const [showAlert, setShowAlert] = useState({
    show: false,
    message: "",
    type: "",
  });
  const { searchQuery } = useSearchComponent();

  const [isOpenFilter, setOpenFilter] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      fetchCabinet();
    };
    listenToUpdate("add_cabinet", handleUpdate);
    listenToUpdate("update_cabinet", handleUpdate);
    listenToUpdate("delete_cabinet", handleUpdate);
  }, []);

  useEffect(() => {
    fetchCabinet();
  }, []);

  useEffect(() => {
    fetchCabinetByFilter();
  }, [searchQuery]);

  const fetchCabinet = async () => {
    try {
      let response = await api.get("/master/cabinets");
      setCabinet(response.data.data);
      setFilteredData(response.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };
  const fetchCabinetByFilter = async () => {
    try {
      let res = await api.get(`/master/filter-cabinet?search=${searchQuery}`);
      setCabinet(res.data.data);
      setFilteredData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleOnChangeSearh = (e) => {
    const { name, value } = e.target;
  };
  const handleOpenModal = (type, data) => {
    setModal({ open: true, type, data });
  };
  const handleCloseModal = (type, data) => {
    setModal({ open: false, type, data });
    setSelectedCabinet(null);
  };
  return (
    <>
      <div className="action">
        <div className="toolbar flex gap-2 bg-white dark:bg-gray-950 mb-2 p-2">
          <button
            onClick={() => handleOpenModal("ADD")}
            title="Add Cabinet"
            className="border p-2 rounded-md flex items-center justify-center border-primary hover:bg-primary hover:text-white dark:border-white dark:text-white"
          >
            <IoMdAddCircleOutline />
          </button>
          <button
            onClick={
              selectedCabinet
                ? () => handleOpenModal("EDIT", selectedCabinet)
                : () =>
                    setShowAlert({
                      show: true,
                      message: "Please select tenant to edit.",
                      type: "warning",
                    })
            }
            title="Edit Cabinet"
            className="border p-2 rounded-md flex items-center justify-center border-primary hover:bg-primary hover:text-white dark:border-white dark:text-white"
          >
            <FiEdit />
          </button>
          <button
            onClick={
              selectedCabinet
                ? () => handleOpenModal("NONAKTIF", selectedCabinet)
                : () =>
                    setShowAlert({
                      show: true,
                      message: "Please select tenant to nonaktif.",
                      type: "warning",
                    })
            }
            title="Nonactive Cabinet"
            disabled={selectedCabinet && !selectedCabinet.isActive}
            className={`border p-2 rounded-md flex items-center justify-center  hover:text-white dark:border-white dark:text-white ${
              selectedCabinet && !selectedCabinet.isActive
                ? "bg-gray-300 text-white border border-gray-400"
                : "border-primary hover:bg-primary"
            } `}
          >
            <MdBlock />
          </button>
          <button
            onClick={
              selectedCabinet
                ? () => handleOpenModal("AKTIF", selectedCabinet)
                : () =>
                    setShowAlert({
                      show: true,
                      message: "Please select tenant to active.",
                      type: "warning",
                    })
            }
            title="Activate Cabinet"
            disabled={selectedCabinet && selectedCabinet.isActive}
            className={`border p-2 rounded-md flex items-center justify-center  hover:text-white dark:border-white dark:text-white ${
              selectedCabinet && selectedCabinet.isActive
                ? "bg-gray-300 text-white border border-gray-400"
                : "border-primary hover:bg-primary"
            } `}
          >
            <FaCheck />
          </button>
          <button
            onClick={
              selectedCabinet
                ? () => handleOpenModal("DELETE", selectedCabinet)
                : () =>
                    setShowAlert({
                      show: true,
                      message: "Please select tenant to delete.",
                      type: "warning",
                    })
            }
            title="Delete Cabinet"
            className="border p-2 rounded-md flex items-center justify-center border-primary hover:bg-primary hover:text-white dark:border-white dark:text-white"
          >
            <MdDelete />
          </button>
          <button
            onClick={() =>
              isOpenFilter ? setOpenFilter(false) : setOpenFilter(true)
            }
            title="Filter Cabinet"
            className="border p-2 rounded-md flex items-center justify-center border-primary hover:bg-primary hover:text-white dark:border-white dark:text-white"
          >
            <LuFilter />
          </button>
        </div>
      </div>

      <div className="max-w-full tenants-page bg-white dark:bg-gray-950 rounded-md p-9">
        <div className="tableTenants mt-2 ">
          <TableCabinet
            data={filteredData}
            handleSelected={setSelectedCabinet}
            resetTrigger={!modal.open}
          />
        </div>
        {/* MODAL USER */}
        <ModalCabinet
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
