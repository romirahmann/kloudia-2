import { FaEdit } from "react-icons/fa";
import { Table } from "../../shared/Table";
import { Tooltip } from "react-tooltip";
import { MdBlock, MdDeleteForever } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { useEffect, useState } from "react";

/* eslint-disable no-unused-vars */
export function TableTenant({ data, resetTrigger, handleSelected }) {
  const [checkedId, setCheckedId] = useState(null);

  useEffect(() => {
    setCheckedId(null);
  }, [resetTrigger]);
  const columns = [
    {
      header: (
        <input
          type="checkbox"
          onChange={(e) => {
            const checked = e.target.checked;
            if (!checked) {
              handleSelected(null);
              setCheckedId(null);
            }
          }}
        />
      ),
      key: "__checkbox",
      render: (_, row) => (
        <input
          type="checkbox"
          checked={checkedId === row.tenantId}
          onChange={(e) => {
            const checked = e.target.checked;
            if (checked) {
              handleSelected(row);
              setCheckedId(row.tenantId);
            } else {
              handleSelected(null);
              setCheckedId(null);
            }
          }}
        />
      ),
    },
    { header: "Tenant Name", key: "tenantName" },
    { header: "Description", key: "tenantDescription" },
    {
      header: "Status",
      key: "isActive",
      render: (value) =>
        value === 1 ? (
          <span className="bg-green-700 text-white p-2 rounded-md">Active</span>
        ) : (
          <span className="bg-red-700 text-white p-2 rounded-md">
            Non Active
          </span>
        ),
    },
  ];

  return <Table columns={columns} data={data} />;
}
