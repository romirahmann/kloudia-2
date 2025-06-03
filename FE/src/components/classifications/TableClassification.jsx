/* eslint-disable no-unused-vars */
import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { FaEdit, FaCheck } from "react-icons/fa";
import { Table } from "../../shared/Table";
import { MdBlock, MdDeleteForever } from "react-icons/md";
import { HiDotsHorizontal } from "react-icons/hi";
import { Link } from "@tanstack/react-router";
import { GrView } from "react-icons/gr";

function ActionDropdown({ position, row, onClose, onAction }) {
  return createPortal(
    <div
      style={{ top: position.top, left: position.left }}
      className="absolute z-50 bg-white border rounded shadow-md p-2 flex flex-col gap-1"
    >
      <Link
        to={"/structure"}
        search={{ classificationId: row.classificationId }}
        className="flex items-center gap-2 text-blue-600 text-sm hover:bg-gray-100 px-2 py-1 rounded"
      >
        <GrView /> View
      </Link>
      <button
        onClick={() => {
          onAction("EDIT", row);
          onClose();
        }}
        className="flex items-center gap-2 text-green-600 text-sm hover:bg-gray-100 px-2 py-1 rounded"
      >
        <FaEdit /> Edit
      </button>
      {row?.isActive === 1 ? (
        <button
          onClick={() => {
            onAction("NONAKTIF", row);
            onClose();
          }}
          className="flex items-center gap-2 text-yellow-600 text-sm hover:bg-gray-100 px-2 py-1 rounded"
        >
          <MdBlock /> InActive
        </button>
      ) : (
        <button
          onClick={() => {
            onAction("AKTIF", row);
            onClose();
          }}
          className="flex items-center gap-2 text-yellow-600 text-sm hover:bg-gray-100 px-2 py-1 rounded"
        >
          <FaCheck /> Active
        </button>
      )}
      <button
        onClick={() => {
          onAction("DELETE", row);
          onClose();
        }}
        className="flex items-center gap-2 text-red-600 text-sm hover:bg-gray-100 px-2 py-1 rounded"
      >
        <MdDeleteForever /> Delete
      </button>
    </div>,
    document.body
  );
}

export function TableClassification({ data, actionTable }) {
  const columns = [
    { header: "Name", key: "classificationName" },
    { header: "Description", key: "classificationDescription" },
    {
      header: "Status",
      key: "isActive",
      render: (value) =>
        value === 1 ? (
          <span className="bg-green-700 text-white p-2 rounded-md">Active</span>
        ) : (
          <span className="bg-red-700 text-white p-2 rounded-md">
            Non Active
          </span>
        ),
    },
  ];

  const [dropdown, setDropdown] = useState({
    show: false,
    position: { top: 0, left: 0 },
    row: null,
  });

  const buttonRefs = useRef([]);

  const toggleDropdown = (e, row, index) => {
    const rect = buttonRefs.current[index].getBoundingClientRect();
    const dropdownWidth = 150;
    let left = rect.left + window.scrollX;
    const top = rect.bottom + window.scrollY;

    if (left + dropdownWidth > window.innerWidth) {
      left = window.innerWidth - dropdownWidth - 8;
    }

    setDropdown({
      show: true,
      position: {
        top,
        left,
      },
      row,
    });
  };

  const closeDropdown = () => {
    setDropdown({ show: false, position: { top: 0, left: 0 }, row: null });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdown.show) {
        closeDropdown();
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [dropdown]);

  const renderActions = (row, index) => {
    return (
      <button
        ref={(el) => (buttonRefs.current[index] = el)}
        onClick={(e) => {
          e.stopPropagation();
          toggleDropdown(e, row, index);
        }}
        className="text-xl p-1 hover:bg-gray-100 rounded"
      >
        <HiDotsHorizontal />
      </button>
    );
  };

  return (
    <>
      <Table columns={columns} data={data} actionRenderer={renderActions} />
      {dropdown.show && (
        <ActionDropdown
          position={dropdown.position}
          row={dropdown.row}
          onAction={(type, data) => actionTable({ type, data })}
          onClose={closeDropdown}
        />
      )}
    </>
  );
}
