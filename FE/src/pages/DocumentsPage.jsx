/* eslint-disable no-unused-vars */
import { AiOutlineFileAdd } from "react-icons/ai";
import { FaEye, FaFolder } from "react-icons/fa";
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
  const [dataDetail, setDataDetail] = useState([]);
  const [selectedDetail, setSelectedDetail] = useState("");
  const navigate = useNavigate();

  const [showAlert, setShowAlert] = useState({
    show: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    fetchDetail();
  }, [selectedClassification]);

  useEffect(() => {
    fetchClassification();
  }, []);

  const fetchDetail = async () => {
    if (selectedClassification) {
      try {
        const res = await api.get(
          `/master/details/${selectedClassification.classificationId}`
        );
        console.log(res.data.data);
        setDataDetail(res.data.data);
      } catch (error) {
        console.log(error.response);
      }
    }
    return;
  };

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
      setShowAlert({
        show: true,
        message: "Choose your document first",
        type: "warning",
      });
      return;
    }

    switch (type) {
      case "VIEW":
        navigate({
          to: "view-document",
          search: {
            classificationId: selectedClassification.classificationId,
            detailId: selectedDetail.detailId,
          },
        });
        break;
      case "ADD":
        navigate({
          to: "add-document",
          search: {
            classificationId: selectedClassification.classificationId,
            cabinetId: selectedClassification.cabinetId,
          },
        });
        break;
      case "UPDATE":
        navigate({ to: "edit-document" });
        break;
      case "DELETE":
        if (!selectedDetail) {
          setShowAlert({
            show: true,
            message: "Choose your document first",
            type: "warning",
          });
          return;
        }
        handleDeleted();
        break;
      case "SHARE":
        navigate({
          to: "/share-document",
          search: {
            originalName: selectedDetail.fileName,
            filename: selectedDetail.encryption_title,
            key: selectedDetail.key,
            iv: selectedDetail.iv,
          },
        });
        break;

      default:
        break;
    }
  };

  const handleDeleted = async () => {
    try {
      await api.delete(
        `/master/detail/${selectedDetail.detailId}/classification/${selectedClassification.classificationId}`
      );
      setShowAlert({
        show: true,
        message: "Document deleted successfully",
        type: "success",
      });
    } catch (error) {
      console.log(error.response);
      setShowAlert({
        show: true,
        message: "Error deleting document",
        type: "error",
      });
    }
  };

  return (
    <>
      <div className="max-w-full rounded-md ">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-1 md:gap-3 ">
          {/* HEADER NAVIGASI */}
          <div className="grid1 w-full col-span-1 ">
            <div className="text-2xl text-center font-bold border border-gray-600/30 py-5 px-5 dark:text-gray-200 dark:bg-gray-950 bg-white rounded-lg">
              <h1>DOCUMENTS</h1>
            </div>
          </div>
          {/* HEADER CONTENT */}
          <div className="grid2 col-span-5 content-center">
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
                  <Button onClick={() => handleAction("VIEW")}>
                    <div className="border border-primary hover:text-white hover:bg-primary dark:border-white p-2 rounded-md">
                      <FaEye />
                    </div>
                  </Button>
                  <Button onClick={() => handleAction("ADD")}>
                    <div className="border border-primary hover:text-white hover:bg-primary dark:border-white p-2 rounded-md">
                      <AiOutlineFileAdd />
                    </div>
                  </Button>
                  <div className="border border-primary hover:text-white hover:bg-primary dark:border-white p-2 rounded-md">
                    <FiEdit />
                  </div>
                  <Button onClick={() => handleAction("DELETE")}>
                    <div className="border border-primary hover:text-white hover:bg-primary dark:border-white p-2 rounded-md">
                      <MdOutlineDeleteForever />
                    </div>
                  </Button>
                  <Button onClick={() => handleAction("SHARE")}>
                    <div className="border border-primary hover:text-white hover:bg-primary dark:border-white p-2 rounded-md">
                      <IoShareSocialOutline />
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-6 md:gap-3 mt-2 ">
          {/* BODY NAVIGASI */}
          <div className="grid1 col-span-1 border border-gray-600/30 bg-white dark:bg-gray-950 dark:text-gray-200 rounded-sm flex flex-col justify-center gap-2 px-8">
            {classifications &&
              classifications.map((classification) => {
                return (
                  <button
                    onClick={() => setSelectedClassification(classification)}
                  >
                    <div className="flex items-center gap-2 text-md hover:text-primary">
                      <FaFolder />
                      <h1> {classification?.classificationName} </h1>
                    </div>
                  </button>
                );
              })}
          </div>
          {/* BODY CONTENT */}
          <div className="grid2 col-span-5 border border-gray-600/30 bg-white dark:bg-gray-950 dark:text-gray-200 rounded-sm p-3">
            <TableDocument
              classificationId={selectedClassification.classificationId}
              data={dataDetail}
              selectedDetail={(val) => setSelectedDetail(val)}
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
