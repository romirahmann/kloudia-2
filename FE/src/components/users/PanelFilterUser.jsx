/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Search } from "../../shared/Search";
import { PiSlidersHorizontalBold } from "react-icons/pi";
import SelectInput from "../../shared/SelectInput";
import api from "../../services/axios.service";
import { FaPlus } from "react-icons/fa6";

export function PanelFilterUser({ users, setFilteredData, modal }) {
  const [selectedFilter, setSelectedFilter] = useState({
    search: "",
    grupId: "",
    roleId: "",
    tenantId: "",
  });
  const [isOpenFilter, setFilter] = useState(false);

  const handleOnChangeFilter = (e) => {
    setSelectedFilter((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    fecthUsersFilter(selectedFilter);
  }, [selectedFilter]);

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
      <div className="filter flex gap-2">
        <Search
          data={users}
          value={selectedFilter.search}
          onChange={(e) => handleOnChangeFilter(e)}
          placeholder="Search Fullname, username or email..."
        />
        <button
          onClick={() => handleFilter()}
          className="btn-open-filter flex justify-center items-center gap-1 border rounded-md p-2 border-primary text-primary hover:bg-primary hover:text-white hover:border-white dark:border-gray-50 dark:text-gray-50"
        >
          <PiSlidersHorizontalBold />
          <span>Filter</span>
        </button>
        <button
          onClick={() => handleModalAdd()}
          className="btn-open-filter flex justify-center items-center gap-1 border rounded-md p-2 border-primary  text-primary hover:bg-primary hover:text-white hover:border-white dark:border-gray-50 dark:text-gray-50"
        >
          <FaPlus />
          <span>Add</span>
        </button>
      </div>
      {isOpenFilter && (
        <div className="subFilter mt-5 flex gap-3">
          <SelectInput
            label="Group"
            name="grupId"
            id="grupId"
            value={selectedFilter.grupId}
            onChange={(e) => handleOnChangeFilter(e)}
            placeholder="Select Group"
            options={[
              { value: "1", label: "IT" },
              { value: "2", label: "HRD" },
              { value: "3", label: "PPIC" },
            ]}
          />

          <SelectInput
            label="Role"
            name="roleId"
            id="roleId"
            value={selectedFilter.roleId}
            onChange={(e) => handleOnChangeFilter(e)}
            placeholder="Select User Role"
            options={[
              { value: "1", label: "SUPER ADMIN" },
              { value: "2", label: "ADMIN" },
              { value: "3", label: "USER" },
            ]}
          />
        </div>
      )}
    </>
  );
}
