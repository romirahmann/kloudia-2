import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import { Table } from "../../shared/Table";
import moment from "moment";

export function TableGroup({ onAction, data }) {
  const coloumns = [
    { header: "Group Name", key: "grupName" },
    { header: "Group Description", key: "grupDescription" },
    {
      header: "Created At",
      key: "createdAt",
      render: (value) => moment(value).format("DD-MM-YYYY HH:mm:ss"),
    },
    {
      header: "Update At",
      key: "updateAt",
      render: (value) =>
        value !== null ? moment(value).format("DD-MM-YYYY HH:mm:ss") : "",
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
    <>
      <Table columns={coloumns} data={data} actionRenderer={renderActions} />
    </>
  );
}
