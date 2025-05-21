/* eslint-disable no-unused-vars */
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

export function Search({ value = "", onChange, placeholder = "Search ..." }) {
  const [query, setQuery] = useState(value);

  const handleChange = (e) => {
    setQuery(e.target.value);
    onChange(e);
  };

  return (
    <div className="search w-full relative">
      <input
        type="text"
        placeholder={`${placeholder}`}
        value={query}
        name="search"
        onChange={handleChange}
        className="border dark:text-gray-50 border-gray-200 dark:bg-transparent dark:border-gray-50 ps-9 w-full px-3 py-3 rounded-lg focus:outline-primary dark:focus:outline-gray-50"
      />
      <FaSearch className="absolute top-4 left-3 text-gray-400" />
    </div>
  );
}
