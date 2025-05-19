import { FaSearch } from "react-icons/fa";

export function Search() {
  return (
    <>
      <div className="search w-full relative">
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-200 ps-9 w-full px-3 py-3 rounded-lg focus:outline-primary"
        />
        <FaSearch className="absolute top-4 left-3" />
      </div>
    </>
  );
}
