/* eslint-disable no-unused-vars */
import { AiOutlineFileAdd } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
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
import { buildTree } from "../services/buildTree.service";
import { FolderTree } from "../shared/FolderTree";

export function DocumentsPage() {
  const [selectedClassification, setSelectedClassification] = useState(null);
  const [dataDetail, setDataDetail] = useState([]);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [documentTree, setDocumentTree] = useState([]);

  const navigate = useNavigate();

  const [showAlert, setShowAlert] = useState({
    show: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    fetchFileManager();
  }, []);

  useEffect(() => {
    fetchDetail();
  }, [selectedClassification]);

  const fetchDetail = async () => {
    if (!selectedClassification?.classificationId) return;

    try {
      const res = await api.get(
        `/master/details/${selectedClassification.classificationId}`
      );
      setDataDetail(res.data.data);
    } catch (error) {
      console.error(error.response);
    }
  };

  const fetchFileManager = async () => {
    try {
      const res = await api.get("/master/file-manager/");
      const tree = buildTree(res.data.data);
      // console.log(res.data.data);
      setDocumentTree(tree);
    } catch (error) {
      console.error(error.response);
    }
  };

  const handleAction = (type) => {
    const showWarning = (message) =>
      setShowAlert({ show: true, message, type: "warning" });

    switch (type) {
      case "VIEW":
        if (!selectedClassification || !selectedDetail)
          return showWarning("Choose document first!");
        navigate({
          to: "view-document",
          search: {
            classificationId: selectedClassification.classificationId,
            detailId: selectedDetail.detailId,
            authTag: selectedDetail.authTag,
          },
        });
        break;

      case "ADD":
        if (!selectedClassification)
          return showWarning("Choose document first!");
        navigate({
          to: "add-document",
          search: {
            classificationId: selectedClassification.classificationId,
            cabinetId: selectedClassification.cabinetId,
          },
        });
        break;

      case "UPDATE":
        if (!selectedDetail) return showWarning("Choose document first!");
        navigate({ to: "edit-document" });
        break;

      case "DELETE":
        if (!selectedDetail) return showWarning("Choose document first!");
        handleDeleted();
        break;

      case "SHARE":
        if (!selectedDetail) return showWarning("Choose document first!");
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
      fetchDetail();
    } catch (error) {
      console.error(error.response);
      setShowAlert({
        show: true,
        message: "Error deleting document",
        type: "error",
      });
    }
  };

  const handleSelectClassification = async (val) => {
    setSelectedClassification(val);
  };

  return (
    <div className="w-full h-[calc(100vh-4rem)] grid grid-cols-1 lg:grid-cols-7 lg:gap-3">
      {/* SIDENAV */}
      <div className="col-span-2 h-full overflow-y-auto border-r border-gray-300 dark:border-gray-700 p-3">
        <div className="text-sm lg:text-2xl text-center font-bold border border-gray-600/30 py-5 px-5 dark:text-gray-200 dark:bg-gray-950 bg-white rounded-lg">
          <h1>DOCUMENTS</h1>
        </div>
        <div className="mt-2 border p-4 border-gray-600/30 bg-white dark:bg-gray-950 dark:text-gray-200 rounded-sm overflow-auto flex flex-col custom-scrollbar">
          <FolderTree
            data={documentTree}
            onSelect={handleSelectClassification}
          />
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="col-span-5 h-full overflow-y-auto p-3">
        {/* HEADER */}
        <div className="font-bold border border-gray-600/30 px-5 py-5 md:py-3 md:px-5 rounded-lg bg-white dark:bg-gray-950 dark:text-gray-200 flex flex-col md:flex-row justify-between gap-3 md:gap-2">
          <h1 className="text-sm text-center md:text-2xl font-bold order-1 md:order-2">
            {selectedClassification?.classificationName || ""}
          </h1>

          <div className="order-2 md:order-3">
            <Search />
          </div>

          <div className="flex gap-5 md:gap-2 text-md text-xl justify-center items-center order-3 md:order-1 mt-2 md:my-0 text-primary dark:text-white">
            <Button onClick={() => handleAction("VIEW")}>
              {" "}
              <div className="border border-primary hover:text-white hover:bg-primary dark:border-white p-2 rounded-md">
                <FaEye />
              </div>{" "}
            </Button>
            <Button onClick={() => handleAction("ADD")}>
              {" "}
              <div className="border border-primary hover:text-white hover:bg-primary dark:border-white p-2 rounded-md">
                <AiOutlineFileAdd />
              </div>{" "}
            </Button>
            <Button onClick={() => handleAction("UPDATE")}>
              {" "}
              <div className="border border-primary hover:text-white hover:bg-primary dark:border-white p-2 rounded-md">
                <FiEdit />
              </div>{" "}
            </Button>
            <Button onClick={() => handleAction("DELETE")}>
              {" "}
              <div className="border border-primary hover:text-white hover:bg-primary dark:border-white p-2 rounded-md">
                <MdOutlineDeleteForever />
              </div>{" "}
            </Button>
            <Button onClick={() => handleAction("SHARE")}>
              {" "}
              <div className="border border-primary hover:text-white hover:bg-primary dark:border-white p-2 rounded-md">
                <IoShareSocialOutline />
              </div>{" "}
            </Button>
          </div>
        </div>

        {/* TABLE */}
        <div className="mt-2 border border-gray-600/30 bg-white dark:bg-gray-950 dark:text-gray-200 rounded-sm p-3">
          <TableDocument
            classificationId={selectedClassification?.classificationId}
            data={dataDetail}
            selectedDetail={(val) => setSelectedDetail(val)}
          />
        </div>
      </div>

      {/* ALERT */}
      <AnimatePresence>
        {showAlert.show && (
          <AlertMessage
            message={showAlert.message}
            type={showAlert.type}
            onClose={() => setShowAlert((prev) => ({ ...prev, show: false }))}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
