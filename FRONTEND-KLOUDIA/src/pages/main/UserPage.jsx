/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {
  FaUser,
  FaPlus,
  FaFilter,
  FaRedo,
  FaSearch,
  FaUsersCog,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { TableUser } from "../../components/users/TableUser";
import api from "../../services/axios.service";

export function UserPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [filters, setFilters] = useState({
    name: "",
    role: "",
    status: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFilters({
      name: "",
      role: "",
      status: "",
    });
  };

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
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-gray-800 flex items-center gap-2">
          <FaUsersCog className="text-blue-600" />
          Manajemen User
        </h1>
        <div className="action flex gap-2">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow transition-all flex items-center gap-2">
            <FaPlus />
            Tambah User
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl shadow transition-all flex items-center gap-2">
            <FaEdit />
            Edit User
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl shadow transition-all flex items-center gap-2">
            <FaTrash />
            Edit User
          </button>
        </div>
      </div>

      {/* FILTER */}
      <div className="bg-white shadow rounded-xl p-4">
        <div className="flex flex-col md:flex-row md:items-end gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Nama</label>
            <input
              type="text"
              name="name"
              value={filters.name}
              onChange={handleFilterChange}
              placeholder="Cari nama user..."
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Role</label>
            <select
              name="role"
              value={filters.role}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Semua</option>
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="viewer">Viewer</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Semua</option>
              <option value="active">Aktif</option>
              <option value="inactive">Nonaktif</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {}}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-all flex items-center gap-2"
            >
              <FaSearch />
              Cari
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-100 text-gray-600 px-4 py-2 rounded-xl hover:bg-gray-200 transition-all flex items-center gap-2"
            >
              <FaRedo />
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* TABEL */}
      <div className="bg-white shadow rounded-xl overflow-x-auto min-w-full  p-8">
        <TableUser data={users} handleSelected={setSelectedUser} />
      </div>
    </div>
  );
}
