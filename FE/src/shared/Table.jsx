import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Tooltip } from "react-tooltip";

export function Table({ columns = [], data = [] }) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col.key}
              className="border-b p-2 text-left text-primary whitespace-nowrap"
            >
              {col.header}
            </th>
          ))}
          <th className="border-b p-2 text-left text-primary whitespace-nowrap">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((row, idx) => (
            <tr key={idx}>
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="border-b p-2 text-sm text-gray-600 whitespace-nowrap"
                >
                  {row[col.key]}
                </td>
              ))}
              <td className="border-b p-2 flex gap-2 whitespace-nowrap">
                <button
                  data-tooltip-id={`btn-edit-${idx}`}
                  data-tooltip-content="Edit"
                  className="text-green-600 hover:underline text-xl"
                >
                  <FaEdit />
                  <Tooltip
                    id={`btn-edit-${idx}`}
                    place="right"
                    className="z-50 text-xs px-2 py-1 rounded shadow-md bg-gray-800 text-white"
                  />
                </button>
                <button
                  data-tooltip-id={`btn-delete-${idx}`}
                  data-tooltip-content="Delete"
                  className="text-red-600 hover:underline text-xl"
                >
                  <MdDeleteForever />
                  <Tooltip
                    id={`btn-delete-${idx}`}
                    place="right"
                    className="z-50 text-xs px-2 py-1 rounded shadow-md bg-gray-800 text-white"
                  />
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={columns.length + 1}
              className="text-center text-sm px-4 py-4 border-b"
            >
              Data Not Found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
