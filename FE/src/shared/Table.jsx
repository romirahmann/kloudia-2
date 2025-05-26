/* eslint-disable no-unused-vars */
export function Table({ columns = [], data = [], actionRenderer }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th
                key={col.key + index}
                className=" border-b p-2 text-left text-primary dark:text-gray-200 whitespace-nowrap"
              >
                {col.header}
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
          {data.length > 0 ? (
            data.map((row, index) => (
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
    </div>
  );
}
