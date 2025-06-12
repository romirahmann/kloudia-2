/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import api from "../services/axios.service";
import { listenToUpdate } from "../services/socket.service";
import { Search } from "../shared/Search";
import { Button } from "../shared/Button";
import { FaPlus } from "react-icons/fa";
import { AnimatePresence } from "framer-motion";
import { AlertMessage } from "../shared/Alert";
import { TableClassification } from "../components/classifications/TableClassification";
import { ModalClassification } from "../components/classifications/ModalClassification";

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

  const [filter, setFilter] = useState({
    search: "",
    status: "",
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (filter.search.trim() === "" && filter.status === "") {
          await fetchClassification();
        } else {
          const response = await api.post(
            `/master/filter-classification`,
            filter
          );
          setClassification(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [filter]);

  // FETCH CLASSIFICATION
  const fetchClassification = async () => {
    try {
      let res = await api.get("/master/classifications");

      setClassification(res.data.data);
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
            placeholder="Search name or description ..."
          />

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

        <div className="mt-10">
          <TableClassification
            data={classifictaions}
            actionTable={({ type, data }) => handleOpenModal(type, data)}
          />
        </div>

        <ModalClassification
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
