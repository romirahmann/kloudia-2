/* eslint-disable no-unused-vars */
import { AiOutlineFileAdd } from "react-icons/ai";
import { FaFolder } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { IoShareSocialOutline } from "react-icons/io5";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Search } from "../shared/Search";
import { TableDocument } from "../components/documents/TableDocument";
import { useEffect, useState } from "react";
import api from "../services/axios.service";
import { AnimatePresence } from "motion/react";
import { AlertMessage } from "../shared/Alert";
import { Button } from "../shared/Button";
import { useNavigate } from "@tanstack/react-router";

export function DocumentsPage() {
  const [classifications, setClassification] = useState([]);
  const [selectedClassification, setSelectedClassification] = useState("");
  const navigate = useNavigate();
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

  const fetchClassification = async () => {
    try {
      const res = await api.get(`/master/classifications`);

      setClassification(res.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleAction = (type) => {
    if (!selectedClassification) {
      console.log("Pilih dulu dokumen!");
      return;
    }
    console.log(selectedClassification);
    switch (type) {
      case "ADD":
        navigate({
          to: "add-document",
          search: { classificationId: selectedClassification.classificationId },
        });
        break;
      case "UPDATE":
        navigate({ to: "edit-document" });
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="max-w-full rounded-md ">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-1 md:gap-3 ">
          {/* HEADER NAVIGASI */}
          <div className="grid1 w-full col-span-1 ">
            <div className="text-2xl text-center font-bold border border-gray-600/30 py-6 px-5 dark:text-gray-200 dark:bg-gray-950 bg-white rounded-lg">
              <h1>DOCUMENTS</h1>
            </div>
          </div>
          {/* HEADER CONTENT */}
          <div className="grid2 col-span-3 content-center">
            <div className="grid2 col-span-3 content-center">
              <div className="header-content font-bold border border-gray-600/30 px-2 py-5 md:py-3 md:px-5 rounded-lg bg-white dark:bg-gray-950 dark:text-gray-200 flex flex-col md:flex-row justify-between gap-3 md:gap-2">
                <div className="title flex items-center order-1  md:order-2">
                  <h1 className="text-sm text-center md:text-2xl font-bold">
                    {selectedClassification.classificationName}
                  </h1>
                </div>

                <div className="searchComponent order-2 md:order-3">
                  <Search />
                </div>

                {/* Icon Action */}
                <div className="iconAction flex gap-5 md:gap-2 text-md text-xl justify-center items-center order-3 md:order-1 mt-2 md:my-0 text-primary dark:text-white">
                  <Button onClick={() => handleAction("ADD")}>
                    <div className="border border-primary hover:text-white hover:bg-primary dark:border-white p-2 rounded-md">
                      <AiOutlineFileAdd />
                    </div>
                  </Button>
                  <div className="border border-primary hover:text-white hover:bg-primary dark:border-white p-2 rounded-md">
                    <FiEdit />
                  </div>
                  <div className="border border-primary hover:text-white hover:bg-primary dark:border-white p-2 rounded-md">
                    <MdOutlineDeleteForever />
                  </div>
                  <div className="border border-primary hover:text-white hover:bg-primary dark:border-white p-2 rounded-md">
                    <IoShareSocialOutline />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-3 mt-2 ">
          {/* BODY NAVIGASI */}
          <div className="grid1 col-span-1 border border-gray-600/30 bg-white dark:bg-gray-950 dark:text-gray-200 rounded-sm flex flex-col justify-center gap-2 px-10">
            {classifications &&
              classifications.map((classification) => {
                return (
                  <button
                    onClick={() => setSelectedClassification(classification)}
                  >
                    <div className="flex items-center gap-2 text-xl hover:text-primary">
                      <FaFolder />
                      <h1> {classification?.classificationName} </h1>
                    </div>
                  </button>
                );
              })}
          </div>
          {/* BODY CONTENT */}
          <div className="grid2  col-span-3 border border-gray-600/30 bg-white dark:bg-gray-950 dark:text-gray-200 rounded-sm p-3">
            <TableDocument
              classificationId={selectedClassification.classificationId}
            />
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
