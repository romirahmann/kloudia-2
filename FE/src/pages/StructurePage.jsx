import { useEffect, useState } from "react";
import { TableStructure } from "../components/structures/TableStructure";

import api from "../services/axios.service";
import { Link, useSearch } from "@tanstack/react-router";

import { FaArrowLeft } from "react-icons/fa";
import { AnimatePresence } from "motion/react";
import { ModalStructure } from "../components/structures/ModalStructure";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { listenToUpdate } from "../services/socket.service";
import { AlertMessage } from "../shared/Alert";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

import Split from "react-split";
import { useSearchComponent } from "../store/SearchContext";

/* eslint-disable no-unused-vars */
export function StructurePage() {
  const [structures, setStructure] = useState([]);
  const [classification, setClasification] = useState([]);
  const [selectedStructure, setSelectedStructure] = useState(null);
  const [isOpenFilter, setOpenFilter] = useState(null);
  const { searchQuery } = useSearchComponent();
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

  const { classificationId } = useSearch({});

  useEffect(() => {
    fetchStructure();
  }, []);
  useEffect(() => {
    fetchClassification();
  }, []);

  useEffect(() => {
    const handleUpdate = () => {
      fetchStructure();
    };
    listenToUpdate("Add_Structure", handleUpdate);
    listenToUpdate("Update_Structure", handleUpdate);
    listenToUpdate("Delete_Structure", handleUpdate);
  }, []);

  const fetchClassification = async () => {
    try {
      let res = await api.get(`/master/classification/${classificationId}`);
      setClasification(res.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const fetchStructure = async () => {
    try {
      let res = await api.get(`/master/structures/${classificationId}`);
      setStructure(res.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchBySearch();
  }, [searchQuery]);

  const fetchBySearch = async () => {
    try {
      let res = await api.get(
        `/master/filter/structure/${classificationId}?search=${searchQuery}`
      );
      setStructure(res.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleOpenModal = (type, data) => {
    setModal({ open: true, type, data });
    setSelectedStructure(null);
  };
  return (
    <>
      <div className="action">
        <div className="toolbar pe-12 ps-3 flex justify-between items-center bg-white dark:bg-gray-950 mb-2 p-2">
          {/* BACK BUTTON */}
          <Link
            to={"/classifications"}
            className="flex items-center gap-2 text-primary dark:text-gray-50  "
          >
            <FaArrowLeft className="text-2xl" /> <span>Back</span>
          </Link>
          <div className="flex gap-2">
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
                selectedStructure
                  ? () => handleOpenModal("EDIT", selectedStructure)
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

            {/* DELETE */}
            <button
              onClick={
                selectedStructure
                  ? () => handleOpenModal("DELETE", selectedStructure)
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
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div
        className="max-w-full tenants-page bg-white dark:bg-gray-950
       rounded-md px-9 py-2"
      >
        <Split
          className="flex "
          sizes={[80, 20]}
          minSize={100}
          gutterSize={5}
          direction="horizontal"
        >
          {/* Panel Atas */}
          <div className=" p-4 w-full overflow-auto">
            <div className="tableTenants mt-2 ">
              <TableStructure
                data={structures}
                resetTrigger={!modal.open}
                handleSelected={setSelectedStructure}
              />
            </div>
          </div>

          {/* Panel Tengah */}
          <div className="overflow-auto classification ps-4 bg-white dark:bg-gray-950 rounded-lg mb-5">
            <div className="title flex text-gray-800 dark:text-gray-100 items-center text-md md:text-2xl font-bold my-5 gap-2">
              <HiClipboardDocumentList />
              <h1>Classification Detail</h1>
            </div>
            <div className="grid md:gap-2 text-gray-800 dark:text-gray-100">
              <div className=" text-xs md:text-lg">
                <span className="font-bold ">Classification Name</span>
                <span>:</span>
                <p className="font-medium">
                  {classification?.classificationName}
                </p>
              </div>
              <div className="text-xs md:text-lg">
                <span className=" font-bold">Classification Description</span>
                <span>:</span>
                <p className="font-medium">
                  {classification?.classificationDescription}
                </p>
              </div>
            </div>
          </div>
        </Split>

        <ModalStructure
          classificationId={classificationId}
          modal={modal}
          onClose={() => setModal({ show: false, type: "", data: "" })}
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
