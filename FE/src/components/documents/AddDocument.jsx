/* eslint-disable no-unused-vars */
import { Link, useSearch } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { HiDocumentPlus } from "react-icons/hi2";
import api from "../../services/axios.service";
import { Form } from "../../shared/Form";
import { Input } from "../../shared/Input";
import { Button } from "../../shared/Button";
import { AnimatePresence } from "framer-motion";
import { AlertMessage } from "../../shared/Alert";

export function AddDocument() {
  const { classificationId, cabinetId } = useSearch({});
  const [structures, setStructures] = useState([]);
  const [formData, setFormData] = useState({});
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [showAlert, setShowAlert] = useState({
    show: false,
    message: "",
    type: "",
  });
  const fileInputRef = useRef(null);
  useEffect(() => {
    if (classificationId) {
      fetchClassificications();
    }
  }, [classificationId]);

  const fetchClassificications = async () => {
    try {
      const res = await api.get(`/master/structures/${classificationId}`);
      console.log(res.data.data);
      setStructures(res.data.data);

      const initialData = {};
      res.data.data.forEach((item) => {
        initialData[item.structureDescription] = "";
      });
      setFormData(initialData);
    } catch (error) {
      console.log(error?.response);
    }
  };

  const handleOnChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleOnChangeFiles = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    data.append("classificationId", classificationId);
    data.append("cabinetId", cabinetId);

    try {
      await api.post("/master/upload-document", data);

      // Reset form input dan file
      const resetData = {};
      structures.forEach((item) => {
        resetData[item.structureDescription] = "";
      });
      setFormData(resetData);

      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }

      // Tampilkan alert
      setShowAlert({
        show: true,
        message: "Document uploaded successfully",
        type: "success",
      });
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  const uploadFolder = async (e) => {
    e.preventDefault();
    console.log(selectedFiles);
  };

  return (
    <>
      <div className="btn-back  w-[5em] mb-2 p-3 ">
        <Link
          to={"/documents"}
          className="flex items-center gap-2 text-primary dark:text-gray-50  "
        >
          <FaArrowLeft className="text-2xl" /> <span>Back</span>
        </Link>
      </div>
      <div className="title text-2xl font-bold gap-2 flex items-center my-5">
        <HiDocumentPlus />
        <h1 className="">ADD DOCUMENT</h1>
      </div>
      <div className="max-w-full rounded-md py-4 px-6 bg-white">
        {structures.length !== 0 ? (
          <Form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {structures &&
                structures.map((item, index) => (
                  <div key={index}>
                    {item.typeId === 3 ? (
                      <Input
                        id={item.structureDescription}
                        label={item.structureName}
                        name={item.structureDescription}
                        value={formData[item.structureDescription] || ""}
                        type="date"
                        ref={fileInputRef}
                        placeholder={item.structureName}
                        onChange={handleOnChange}
                      />
                    ) : (
                      <Input
                        id={item.structureDescription}
                        label={item.structureName}
                        value={formData[item.structureDescription] || ""}
                        name={item.structureDescription}
                        placeholder={item.structureName}
                        ref={fileInputRef}
                        onChange={handleOnChange}
                      />
                    )}
                  </div>
                ))}

              {/* Input file */}
              <div>
                <label htmlFor="file" className="block text-sm mb-1">
                  Upload File
                </label>
                <input
                  id="file"
                  name="file"
                  type="file"
                  accept="*"
                  onChange={handleOnChange}
                  className="w-full rounded-xl border border-gray-300 p-2 cursor-pointer text-sm text-gray-700"
                />
              </div>
            </div>

            <div className="mt-4">
              <Button
                onClick={handleSubmit}
                className="text-md bg-primary rounded-xl text-white py-2 px-6 hover:bg-dark-primary"
              >
                SUBMIT
              </Button>
            </div>
          </Form>
        ) : (
          <div className="mx-auto w-full">
            <Form>
              <div>
                <h1 className="text-xl font-bold uppercase m-2">
                  Upload Document
                </h1>
                <div className="flex w-full gap-2">
                  <div className="inputFolder w-full">
                    <Input
                      id="files"
                      name="files"
                      type="file"
                      placeholder="Select Folder ..."
                      multiple
                      webkitdirectory="true"
                      className="block w-full text-sm text-gray-700
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-primary file:text-white
                      hover:file:bg-dark-primary
                      cursor-pointer"
                      onChange={handleOnChangeFiles}
                    />
                  </div>
                  <Button
                    onClick={uploadFolder}
                    className="text-md bg-primary rounded-xl text-white py-1 px-3 hover:bg-dark-primary"
                  >
                    SUBMIT
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        )}
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
