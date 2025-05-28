/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import api from "../services/axios.service";
import { listenToUpdate } from "../services/socket.service";
import { Search } from "../shared/Search";
import { Button } from "../shared/Button";
import { FaPlus } from "react-icons/fa";
import { AnimatePresence } from "framer-motion";
import { AlertMessage } from "../shared/Alert";

export function ClassificationPage() {
  const [classifictaions, setClassification] = useState([]);
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
    fetchClassification();
  }, []);

  useEffect(() => {
    const handleUpdate = () => {
      fetchClassification();
    };
    listenToUpdate("add_classification", handleUpdate);
    listenToUpdate("update_classification", handleUpdate);
    listenToUpdate("delete_classification", handleUpdate);
  }, []);

  // FETCH CLASSIFICATION
  const fetchClassification = async () => {
    try {
      let res = await api.get("/master/classifications");
      setClassification(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChangeSearh = () => {};
  const handleOpenModal = (type, data) => {
    setModal({ open: true, type, data });
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
              className="btn-open-filter flex justify-center items-center gap-1 border rounded-md p-2 border-primary  text-primary hover:bg-primary hover:text-white hover:border-white dark:border-gray-50 dark:text-gray-50"
            >
              <FaPlus />
              <span>Add</span>
            </Button>
          </div>
        </div>

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
