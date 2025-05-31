/* eslint-disable no-unused-vars */

import { FaCheck, FaEdit } from "react-icons/fa";
import { Table } from "../../shared/Table";
import { Tooltip } from "react-tooltip";
import { MdBlock, MdDeleteForever } from "react-icons/md";

export function TableCabinet({ data, onAction }) {
  const coloumns = [
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

  const renderActions = (row, index) => {
    return (
      <>
        <button
          data-tooltip-id={`edit-${index}`}
          data-tooltip-content="Edit"
          onClick={() => onAction({ type: "EDIT", data: row })}
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
        {row?.isActive === 1 && (
          <button
            data-tooltip-id={`nonaktif-${index}`}
            data-tooltip-content="Nonaktif"
            onClick={() => onAction({ type: "NONAKTIF", data: row })}
            className="text-yellow-600 text-xl"
          >
            <MdBlock />
            <Tooltip
              id={`nonaktif-${index}`}
              place="top"
              closeOnClick
              className="z-50 bg-gray-800 text-white text-xs px-2 py-1 rounded"
            />
          </button>
        )}

        {row?.isActive === 0 && (
          <button
            data-tooltip-id={`aktif-${index}`}
            data-tooltip-content="Aktif"
            onClick={() => onAction({ type: "AKTIF", data: row })}
            className="text-yellow-600 text-xl"
          >
            <FaCheck />
            <Tooltip
              id={`aktif-${index}`}
              place="top"
              closeOnClick
              className="z-50 bg-gray-800 text-white text-xs px-2 py-1 rounded"
            />
          </button>
        )}

        <button
          data-tooltip-id={`delete-${index}`}
          data-tooltip-content="Delete"
          onClick={() => onAction({ type: "DELETE", data: row })}
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
  };

  return (
    <Table columns={coloumns} data={data} actionRenderer={renderActions} />
  );
}
