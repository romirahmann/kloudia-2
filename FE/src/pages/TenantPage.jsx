/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import api from "../services/axios.service";

import { TableTenant } from "../components/tenants/TableTenant";
import { Search } from "../shared/Search";
import SelectInput from "../shared/SelectInput";
import { ModalTenant } from "../components/tenants/ModalTenants";
import { AlertMessage } from "../shared/Alert";
import { AnimatePresence } from "framer-motion";
import { listenToUpdate } from "../services/socket.service";
import { Button } from "../shared/Button";
import { FaPlus } from "react-icons/fa";

export function TenantPage() {
  const [tenants, setTenant] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState({
    search: "",
    status: "",
  });
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
    fetchTenant();
  }, []);

  useEffect(() => {
    const handleUpdate = (data) => {
      fetchTenant();
    };

    listenToUpdate("update_tenant", handleUpdate);
    listenToUpdate("add_tenant", handleUpdate);
    listenToUpdate("delete_tenant", handleUpdate);
  }, []);

  const fetchTenant = async () => {
    try {
      let response = await api.get("/master/tenants");
      let dataTenant = response.data.data;
      setTenant(dataTenant);
      setFilteredData(dataTenant);
    } catch (error) {
      console.log("Fetch Tenant Error", error);
    }
  };

  const handleOpenModal = (type, data) => {
    setModal({ open: true, type, data });
  };

  const handleOnChangeFilter = (e) => {
    const { name, value } = e.target;

    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchFilterTenant = async () => {
      try {
        let response = await api.post(`/master/filter-tenants`, filter);
        setFilteredData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFilterTenant();
  }, [filter]);

  const handleCloseModal = () => {
    setModal({ open: false, type: null, data: null });
  };

  return (
    <>
      <div className="max-w-full tenants-page bg-white dark:bg-gray-950 rounded-md p-9">
        <div className="filter flex items-center gap-2">
          <Search
            onChange={(e) => handleOnChangeFilter(e)}
            placeholder="Search tenant name, description ..."
          />
          <div className="status cursor-pointer">
            <SelectInput
              name="status"
              id="status"
              value={filter.status}
              placeholder="Filter"
              onChange={(e) => handleOnChangeFilter(e)}
              options={[
                { value: 1, label: "Active" },
                { value: 0, label: "Inactive" },
              ]}
            />
          </div>
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
          <TableTenant
            data={filteredData}
            actionTable={(val) => handleOpenModal(val.type, val.data)}
          />
        </div>
        {/* MODAL USER */}
        <ModalTenant
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
