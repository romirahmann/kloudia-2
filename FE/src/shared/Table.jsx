import { useState, useMemo } from "react";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";

export function Table({
  columns = [],
  data = [],
  actionRenderer,
  rowsPerPage = 10,
}) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      const valA = a[sortConfig.key];
      const valB = b[sortConfig.key];

      if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
      if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return sortedData.slice(start, start + rowsPerPage);
  }, [sortedData, currentPage, rowsPerPage]);

  const handleSort = (key) => {
    if (sortConfig.key === key) {
      setSortConfig({
        key,
        direction: sortConfig.direction === "asc" ? "desc" : "asc",
      });
    } else {
      setSortConfig({ key, direction: "asc" });
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th
                key={col.key + index}
                onClick={() => handleSort(col.key)}
                className="cursor-pointer border-b p-2 text-left text-primary dark:text-gray-200 whitespace-nowrap"
              >
                <span className="flex items-center gap-1">
                  {col.header}
                  {sortConfig.key !== col.key && <FaSort className="text-sm" />}
                  {sortConfig.key === col.key && (
                    <span className="text-xs">
                      {sortConfig.direction === "asc" ? (
                        <FaSortUp className="text-sm" />
                      ) : (
                        <FaSortDown className="text-sm" />
                      )}
                    </span>
                  )}
                </span>
              </th>
            ))}
            {actionRenderer && (
              <th className="border-b p-2 text-center text-primary dark:text-gray-200 whitespace-nowrap">
                Action
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((row, index) => (
              <tr key={index}>
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="border-b p-2 text-sm dark:text-gray-400 text-gray-600 whitespace-nowrap"
                  >
                    {col.render
                      ? col.render(row[col.key], row, index)
                      : row[col.key]}
                  </td>
                ))}
                {actionRenderer && (
                  <td className="border-b p-2 whitespace-nowrap">
                    <div className="flex justify-center gap-2">
                      {actionRenderer(row, index)}
                    </div>
                  </td>
                )}
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

      {/* Pagination */}
      <div className="flex justify-end items-center mt-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        <div className="space-x-1">
          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === num + 1
                  ? "bg-primary text-white"
                  : "bg-white text-black"
              }`}
            >
              {num + 1}
            </button>
          ))}
        </div>

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
