/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import api from "../services/axios.service";
import { listenToUpdate } from "../services/socket.service";
import { Search } from "../shared/Search";
import { Button } from "../shared/Button";
import { FaCheck, FaPlus } from "react-icons/fa";
import { AnimatePresence } from "framer-motion";
import { AlertMessage } from "../shared/Alert";
import { TableClassification } from "../components/classifications/TableClassification";
import { ModalClassification } from "../components/classifications/ModalClassification";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdBlock, MdDelete } from "react-icons/md";
import { LuFilter } from "react-icons/lu";
import { Link } from "@tanstack/react-router";
import { GrView } from "react-icons/gr";

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

  const [selectedClassification, setSelectedClassification] = useState(null);
  const [isOpenFilter, setOpenFilter] = useState(false);
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
    setSelectedClassification(null);
  };

  return (
    <>
      <div className="action">
        <div className="toolbar flex gap-2 bg-white dark:bg-gray-950 mb-2 p-2">
          {selectedClassification ? (
            <Link
              to={"/structure"}
              search={{
                classificationId: selectedClassification.classificationId,
              }}
              className="border p-2 rounded-md flex items-center justify-center border-primary hover:bg-primary hover:text-white dark:border-white dark:text-white"
            >
              <GrView />
            </Link>
          ) : (
            <button
              onClick={() =>
                setShowAlert({
                  show: true,
                  message: "Please select a classification",
                  type: "warning",
                })
              }
              className="bg-gray-300 text-gray-600  border border-gray-400  p-2 rounded-md"
            >
              <GrView />
            </button>
          )}
          {/* ADD */}
          <button
            onClick={() => handleOpenModal("ADD")}
            title="Add Classification"
            className="border p-2 rounded-md flex items-center justify-center border-primary hover:bg-primary hover:text-white dark:border-white dark:text-white"
          >
            <IoMdAddCircleOutline />
          </button>

          {/* EDIT */}
          <button
            onClick={
              selectedClassification
                ? () => handleOpenModal("EDIT", selectedClassification)
                : () =>
                    setShowAlert({
                      show: true,
                      message: "Please select classification to edit.",
                      type: "warning",
                    })
            }
            title="Edit Classification"
            className="border p-2 rounded-md flex items-center justify-center border-primary hover:bg-primary hover:text-white dark:border-white dark:text-white"
          >
            <FiEdit />
          </button>

          {/* NONAKTIF */}
          <button
            onClick={
              selectedClassification
                ? () => handleOpenModal("NONAKTIF", selectedClassification)
                : () =>
                    setShowAlert({
                      show: true,
                      message: "Please select classification to nonaktif.",
                      type: "warning",
                    })
            }
            title="Nonactive Classification"
            disabled={
              selectedClassification && !selectedClassification.isActive
            }
            className={`border p-2 rounded-md flex items-center justify-center  hover:text-white dark:border-white dark:text-white ${
              selectedClassification && !selectedClassification.isActive
                ? "bg-gray-300 text-white border border-gray-400"
                : "border-primary hover:bg-primary"
            } `}
          >
            <MdBlock />
          </button>

          {/* AKTIF */}
          <button
            onClick={
              selectedClassification
                ? () => handleOpenModal("AKTIF", selectedClassification)
                : () =>
                    setShowAlert({
                      show: true,
                      message: "Please select classification to active.",
                      type: "warning",
                    })
            }
            title="Activate Classification"
            disabled={selectedClassification && selectedClassification.isActive}
            className={`border p-2 rounded-md flex items-center justify-center  hover:text-white dark:border-white dark:text-white ${
              selectedClassification && selectedClassification.isActive
                ? "bg-gray-300 text-white border border-gray-400"
                : "border-primary hover:bg-primary"
            } `}
          >
            <FaCheck />
          </button>

          {/* DELETE */}
          <button
            onClick={
              selectedClassification
                ? () => handleOpenModal("DELETE", selectedClassification)
                : () =>
                    setShowAlert({
                      show: true,
                      message: "Please select classification to delete.",
                      type: "warning",
                    })
            }
            title="Delete Classification"
            className="border p-2 rounded-md flex items-center justify-center border-primary hover:bg-primary hover:text-white dark:border-white dark:text-white"
          >
            <MdDelete />
          </button>

          <button
            onClick={() =>
              isOpenFilter ? setOpenFilter(false) : setOpenFilter(true)
            }
            title="Filter Classification"
            className="border p-2 rounded-md flex items-center justify-center border-primary hover:bg-primary hover:text-white dark:border-white dark:text-white"
          >
            <LuFilter />
          </button>
        </div>
      </div>
      <div className="max-w-full tenants-page bg-white dark:bg-gray-950 rounded-md p-9">
        <div className="mt-2">
          <TableClassification
            data={classifictaions}
            handleSelected={setSelectedClassification}
            resetTrigger={!modal.open}
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
