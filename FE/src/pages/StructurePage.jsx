import { useEffect, useState } from "react";
import { TableStructure } from "../components/structures/TableStructure";
import { Search } from "../shared/Search";
import api from "../services/axios.service";
import { useSearch } from "@tanstack/react-router";
import { Button } from "../shared/Button";
import { FaPlus } from "react-icons/fa";
import { ModalClassification } from "../components/classifications/ModalClassification";
import { AnimatePresence } from "motion/react";
import { ModalStructure } from "../components/structures/ModalStructure";

/* eslint-disable no-unused-vars */
export function StructurePage() {
  const [structures, setStructure] = useState([]);
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

  const fetchStructure = async () => {
    try {
      let result = await api.get(`/master/structures/${classificationId}`);
      setStructure(result.data.data);
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
      <div className="max-w-full tenants-page bg-white dark:bg-gray-950 rounded-md p-9">
        <div className="filter flex items-center gap-2">
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
