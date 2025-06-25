/* eslint-disable no-unused-vars */

import { FaCheck, FaEdit } from "react-icons/fa";
import { Table } from "../../shared/Table";
import { Tooltip } from "react-tooltip";
import { MdBlock, MdDeleteForever } from "react-icons/md";
import { useEffect, useState } from "react";

export function TableCabinet({ data, resetTrigger, handleSelected }) {
  const [checkedId, setCheckedId] = useState(null);

  useEffect(() => {
    setCheckedId(null);
  }, [resetTrigger]);
  const coloumns = [
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
          checked={checkedId === row.cabinetId}
          onChange={(e) => {
            const checked = e.target.checked;
            if (checked) {
              handleSelected(row);
              setCheckedId(row.cabinetId);
            } else {
              handleSelected(null);
              setCheckedId(null);
            }
          }}
        />
      ),
    },
    { header: "Cabinet Name", key: "cabinetName" },
    { header: "Tenant Name", key: "tenantName" },
    { header: "Group Name", key: "grupName" },
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

  return <Table columns={coloumns} data={data} />;
}
