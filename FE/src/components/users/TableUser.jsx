import { useEffect, useState } from "react";
import { Table } from "../../shared/Table";

export function TableUser({ data, handleSelected, resetTrigger }) {
  const [checkedId, setCheckedId] = useState(null); // untuk simpan ID user yang dicentang

  useEffect(() => {
    // Reset checkbox saat trigger berubah (modal ditutup)
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
          checked={checkedId === row.userId}
          onChange={(e) => {
            const checked = e.target.checked;
            if (checked) {
              handleSelected(row);
              setCheckedId(row.userId);
            } else {
              handleSelected(null);
              setCheckedId(null);
            }
          }}
        />
      ),
    },
    { header: "Full Name", key: "fullname" },
    { header: "Username", key: "username" },
    { header: "Email", key: "email" },
    { header: "Role", key: "roleName" },
    { header: "Tenant", key: "tenantName" },
    { header: "Group", key: "grupName" },
  ];

  return <Table columns={columns} data={data} />;
}
