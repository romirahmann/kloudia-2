import { FaEdit } from "react-icons/fa";
import { Table } from "../../shared/Table";
import { Tooltip } from "react-tooltip";
import { MdBlock, MdDeleteForever } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";

/* eslint-disable no-unused-vars */
export function TableTenant({ data, actionTable }) {
  const columns = [
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

  const renderActions = (row, index) => {
    return (
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
        {row?.isActive === 1 && (
          <button
            data-tooltip-id={`nonaktif-${index}`}
            data-tooltip-content="Nonaktif"
            onClick={() => actionTable({ type: "NONAKTIF", data: row })}
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
            onClick={() => actionTable({ type: "AKTIF", data: row })}
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
  };

  return <Table columns={columns} data={data} actionRenderer={renderActions} />;
}
