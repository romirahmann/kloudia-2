/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Button } from "../shared/Button";
import { Search } from "../shared/Search";
import { FaPlus } from "react-icons/fa";
import api from "../services/axios.service";

import { TableCabinet } from "../components/cabinets/TableCabinet";
import { ModalCabinet } from "../components/cabinets/ModalCabinet";
import { AlertMessage } from "../shared/Alert";
import { AnimatePresence } from "framer-motion";
import { listenToUpdate } from "../services/socket.service";

export function CabinetPage() {
  const [cabinets, setCabinet] = useState([]);
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

  const [filter, setFilter] = useState("");

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
  }, [filter]);

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
      let res = await api.get(`/master/filter-cabinet?search=${filter}`);
      setCabinet(res.data.data);
      setFilteredData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleOnChangeSearh = (e) => {
    const { name, value } = e.target;
    setFilter(value);
  };
  const handleOpenModal = (type, data) => {
    setModal({ open: true, type, data });
  };
  const handleCloseModal = (type, data) => {
    setModal({ open: false, type, data });
  };
  return (
    <>
      <div className="max-w-full tenants-page bg-white dark:bg-gray-950 rounded-md p-9">
        <div className="filter flex items-center gap-2">
          <Search
            onChange={(e) => handleOnChangeSearh(e)}
            placeholder="Search cabinet name ..."
          />
          <div className="status cursor-pointer"></div>
          <div className="addTenant">
            <Button
              onClick={() => handleOpenModal("ADD", null)}
              className="btn-open-filter flex justify-center items-center gap-1 border rounded-md px-2 py-3 border-primary  text-primary hover:bg-primary hover:text-white hover:border-white dark:border-gray-50 dark:text-gray-50"
            >
              <FaPlus />
              <span>Add</span>
            </Button>
          </div>
        </div>
        <div className="tableTenants mt-10 ">
          <TableCabinet
            data={filteredData}
            onAction={(val) => handleOpenModal(val.type, val.data)}
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
