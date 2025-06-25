/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Search } from "../../shared/Search";
import { PiSlidersHorizontalBold } from "react-icons/pi";
import SelectInput from "../../shared/SelectInput";
import api from "../../services/axios.service";
import { FaPlus } from "react-icons/fa6";
import { useSearchComponent } from "../../store/SearchContext";

export function PanelFilterUser({ users, setFilteredData, modal }) {
  const { searchQuery } = useSearchComponent();
  const [selectedFilter, setSelectedFilter] = useState({
    search: "",
    grupId: "",
    roleId: "",
    tenantId: "",
  });
  const [roleData, setRoleData] = useState([]);
  const [grupData, setGrupData] = useState([]);
  const [isOpenFilter, setFilter] = useState(false);

  const handleOnChangeFilter = (e) => {
    setSelectedFilter((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    setSelectedFilter((prev) => ({
      ...prev,
      search: searchQuery,
    }));
  }, [searchQuery]);

  useEffect(() => {
    fecthUsersFilter(selectedFilter);
  }, [selectedFilter]);

  useEffect(() => {
    fetchAllRole();
    fetchAllGrup();
  }, []);

  const fetchAllRole = async () => {
    try {
      const response = await api.get("/master/roles");

      setRoleData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAllGrup = async () => {
    try {
      const response = await api.get("/master/groups");

      setGrupData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fecthUsersFilter = async (params) => {
    let response = await api.post("/master/users-filter", params);
    setFilteredData(response.data.data);
  };

  const handleFilter = () => {
    setFilter(!isOpenFilter);
    setSelectedFilter({
      search: "",
      grupId: "",
      roleId: "",
      tenantId: "",
    });
  };

  const handleModalAdd = () => {
    modal({ open: true, type: "ADD", data: null });
  };

  return (
    <>
      {/* <div className="filter flex justify-between gap-2">
        <button
          onClick={() => handleModalAdd()}
          className="btn-open-filter flex justify-center items-center gap-1 border rounded-md p-2 border-primary  text-primary hover:bg-primary hover:text-white hover:border-white dark:border-gray-50 dark:text-gray-50"
        >
          <FaPlus />
          <span>Add</span>
        </button>
        <button
          onClick={() => handleFilter()}
          className="btn-open-filter flex justify-center items-center gap-1 border rounded-md p-2 border-primary text-primary hover:bg-primary hover:text-white hover:border-white dark:border-gray-50 dark:text-gray-50"
        >
          <PiSlidersHorizontalBold />
          <span>Filter</span>
        </button>
      </div> */}
    </>
  );
}
