import { useState } from "react";
import { Search } from "../../shared/Search";
import { PiSlidersHorizontalBold } from "react-icons/pi";
import SelectInput from "../../shared/SelectInput";

export function PanelFilterUser() {
  const [selectedFilter, setSelectedFilter] = useState({
    group: "",
    roleId: "",
  });
  const [isOpenFilter, setFilter] = useState(false);

  const handleOnChangeFilter = (e) => {
    setSelectedFilter((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <>
      <div className="filter flex  gap-2">
        <Search />
        <button
          onClick={() => setFilter(!isOpenFilter)}
          className="btn-open-filter flex justify-center items-center gap-1 border rounded-md p-2 border-primary text-primary"
        >
          <PiSlidersHorizontalBold />
          <span>Filter</span>
        </button>
      </div>
      {isOpenFilter && (
        <div className="subFilter mt-5 flex gap-3">
          <SelectInput
            label="Group"
            name="group"
            id="group"
            value={selectedFilter.group}
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
