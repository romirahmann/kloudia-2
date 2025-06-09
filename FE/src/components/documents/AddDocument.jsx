/* eslint-disable no-unused-vars */
import { Link, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { HiDocumentPlus } from "react-icons/hi2";
import api from "../../services/axios.service";
import { Form } from "../../shared/Form";
import { Input } from "../../shared/Input";
import { Button } from "../../shared/Button";
import moment from "moment";

export function AddDocument() {
  const { classificationId } = useSearch({});
  const [structures, setStructures] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (classificationId) {
      fetchClassificications();
    }
  }, [classificationId]);

  const fetchClassificications = async () => {
    try {
      const res = await api.get(`/master/structures/${classificationId}`);
      setStructures(res.data.data);
      // console.log(res.data.data);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    data.append("classificationId", classificationId);

    for (let pair of data.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      const res = await api.post("/master/upload-document", data);
      console.log(res.data.data);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
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
                      type="date"
                      placeholder={item.structureName}
                      onChange={handleOnChange}
                    />
                  ) : (
                    <Input
                      id={item.structureDescription}
                      label={item.structureName}
                      name={item.structureDescription}
                      placeholder={item.structureName}
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
      </div>
    </>
  );
}
