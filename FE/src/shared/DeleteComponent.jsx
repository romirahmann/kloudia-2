import { FaTrash } from "react-icons/fa6";
import { Button } from "./Button";

/* eslint-disable no-unused-vars */
export function DeleteComponent({ data = [], title = "", onClose }) {
  return (
    <>
      <div className="w-full">
        <div className="icon flex justify-center text-[10em] text-red-700">
          <FaTrash />
        </div>
        <h1 className="text-center text-gray-800 my-5">
          Are you sure for delete this data ?{" "}
        </h1>
        <div className="btn flex justify-end gap-2">
          <Button
            funct={onClose}
            style="bg-transparent border border-gray-700 rounded-md text-gray-900"
          >
            Cancel
          </Button>
          <Button
            funct={"delete"}
            style="bg-red-700 hover:bg-red-600 rounded-md text-white"
          >
            Delete
          </Button>
        </div>
      </div>
    </>
  );
}
