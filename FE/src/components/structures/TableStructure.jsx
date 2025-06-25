import { FaEdit } from "react-icons/fa";
import { Table } from "../../shared/Table";
import { Tooltip } from "react-tooltip";
import { MdDeleteForever } from "react-icons/md";
import { useEffect, useState } from "react";

/* eslint-disable no-unused-vars */
export function TableStructure({ resetTrigger, data, handleSelected }) {
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
          checked={checkedId === row.structureId}
          onChange={(e) => {
            const checked = e.target.checked;
            if (checked) {
              handleSelected(row);
              setCheckedId(row.structureId);
            } else {
              handleSelected(null);
              setCheckedId(null);
            }
          }}
        />
      ),
    },
    { header: "Name", key: "structureName" },
    { header: "Field Size", key: "fieldSize" },
    { header: "Type Data", key: "typeName" },
  ];

  // const renderActions = (row, index) => {
  //   return (
  //     <>
  //       <button
  //         data-tooltip-id={`edit-${index}`}
  //         data-tooltip-content="Edit"
  //         onClick={() => actionTable({ type: "EDIT", data: row })}
  //         className="text-green-600 text-xl"
  //       >
  //         <FaEdit />
  //         <Tooltip
  //           id={`edit-${index}`}
  //           place="top"
  //           closeOnClick
  //           className="z-50 bg-gray-800 text-white text-xs px-2 py-1 rounded"
  //         />
  //       </button>

  //       <button
  //         data-tooltip-id={`delete-${index}`}
  //         data-tooltip-content="Delete"
  //         onClick={() => actionTable({ type: "DELETE", data: row })}
  //         className="text-red-600 text-xl"
  //       >
  //         <MdDeleteForever />
  //         <Tooltip
  //           id={`delete-${index}`}
  //           place="top"
  //           closeOnClick
  //           className="z-50 bg-gray-800 text-white text-xs px-2 py-1 rounded"
  //         />
  //       </button>
  //     </>
  //   );
  // };

  return <Table columns={columns} data={data} />;
}
