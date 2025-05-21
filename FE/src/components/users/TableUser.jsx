/* eslint-disable no-unused-vars */

import { FaEdit } from "react-icons/fa";
import { Table } from "../../shared/Table";
import { Tooltip } from "react-tooltip";
import { MdDeleteForever } from "react-icons/md";

export function TableUser({ data, actionTable }) {
  const columns = [
    { header: "Full Name", key: "fullname" },
    { header: "Username", key: "username" },
    { header: "Email", key: "email" },
    { header: "Role", key: "roleName" },
    { header: "Tenant", key: "tenantName" },
    { header: "Group", key: "grupName" },
  ];

  const renderActions = (row, index) => (
    <>
      <button
        data-tooltip-id={`edit-${index}`}
        data-tooltip-content="Edit"
        onClick={() => actionTable({ type: "EDIT", data: row })}
        className="text-green-600 text-xl"
      >
        <FaEdit />
        <Tooltip
          id={`edit-${index}`}
          place="top"
          closeOnClick
          className="z-50 bg-gray-800 text-white text-xs px-2 py-1 rounded"
        />
      </button>

      <button
        data-tooltip-id={`delete-${index}`}
        data-tooltip-content="Delete"
        onClick={() => actionTable({ type: "DELETE", data: row })}
        className="text-red-600 text-xl"
      >
        <MdDeleteForever />
        <Tooltip
          id={`delete-${index}`}
          place="top"
          closeOnClick
          className="z-50 bg-gray-800 text-white text-xs px-2 py-1 rounded"
        />
      </button>
    </>
  );

  return (
    <Table
      columns={columns}
      data={data}
      action={(val) => actionTable(val)}
      actionRenderer={renderActions}
    />
  );
}
