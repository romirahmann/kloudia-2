import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import { Table } from "../../shared/Table";
import moment from "moment";
import { useEffect, useState } from "react";

// eslint-disable-next-line no-unused-vars
export function TableGroup({ data, handleSelected, resetTrigger }) {
  const [checkedId, setCheckedId] = useState(null); // untuk simpan ID user yang dicentang

  useEffect(() => {
    // Reset checkbox saat trigger berubah (modal ditutup)
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
          checked={checkedId === row.grupId}
          onChange={(e) => {
            const checked = e.target.checked;
            if (checked) {
              handleSelected(row);
              setCheckedId(row.grupId);
            } else {
              handleSelected(null);
              setCheckedId(null);
            }
          }}
        />
      ),
    },
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

  return (
    <>
      <Table columns={coloumns} data={data} />
    </>
  );
}
