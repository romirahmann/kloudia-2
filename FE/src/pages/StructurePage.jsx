import { useEffect, useState } from "react";
import { TableStructure } from "../components/structures/TableStructure";
import { Search } from "../shared/Search";
import api from "../services/axios.service";
import { Link, useSearch } from "@tanstack/react-router";
import { Button } from "../shared/Button";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { AnimatePresence } from "motion/react";
import { ModalStructure } from "../components/structures/ModalStructure";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { listenToUpdate } from "../services/socket.service";
import { AlertMessage } from "../shared/Alert";

/* eslint-disable no-unused-vars */
export function StructurePage() {
  const [structures, setStructure] = useState([]);
  const [classification, setClasification] = useState([]);

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

  const handleOnChangeFilter = (e) => {};

  const handleOpenModal = (type, data) => {
    setModal({ open: true, type, data });
  };
  return (
    <>
      <div className="btn-back  w-[5em] mb-2 p-3 ">
        <Link
          to={"/classifications"}
          className="flex items-center gap-2 text-primary dark:text-gray-50  "
        >
          <FaArrowLeft className="text-2xl" /> <span>Back</span>
        </Link>
      </div>
      <div className="classification py-4 px-6 bg-white dark:bg-gray-950 rounded-lg mb-5">
        <div className="title flex text-gray-800 dark:text-gray-100 items-center text-2xl md:text-3xl font-bold my-5 gap-2">
          <HiClipboardDocumentList />
          <h1>Classification Detail</h1>
        </div>
        <div className="grid md:gap-2 text-gray-800 dark:text-gray-100">
          <div className="md:flex md:gap-2 text-xs md:text-lg">
            <span className=" font-bold ">Classification Name</span>
            <span>:</span>
            <span className="font-medium">
              {classification?.classificationName}
            </span>
          </div>
          <div className="md:flex md:gap-2 text-xs md:text-lg">
            <span className=" font-bold">Classification Description</span>
            <span>:</span>
            <span className="font-medium">
              {classification?.classificationDescription}
            </span>
          </div>
        </div>
      </div>
      <div className="max-w-full tenants-page bg-white dark:bg-gray-950 rounded-md p-9">
        <div className="filter flex items-center mt-10 gap-2">
          <Search
            onChange={(e) => handleOnChangeFilter(e)}
            placeholder="Search structure name,  ..."
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
        <div className="tableTenants mt-10 ">
          <TableStructure
            data={structures}
            actionTable={(val) => handleOpenModal(val.type, val.data)}
          />
        </div>
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
