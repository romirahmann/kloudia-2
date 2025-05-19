import { useEffect, useState } from "react";
import { Table } from "../../shared/Table";
import api from "../../services/axios.service";

export function TableUser() {
  const [users, setUsers] = useState([]);
  const columns = [
    { header: "Full Name", key: "fullname" },
    { header: "Username", key: "username" },
    { header: "Email", key: "email" },
    { header: "Role", key: "roleName" },
    { header: "Tenant", key: "tenantName" },
    { header: "Group", key: "grupName" },
  ];

  useEffect(() => {
    fecthUsersData();
  }, []);

  const fecthUsersData = async () => {
    try {
      let response = await api.get("/master/users");

      setUsers(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="min-w-[800px]">
        <Table columns={columns} data={users} />
      </div>
    </>
  );
}
