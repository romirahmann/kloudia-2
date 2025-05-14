/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { FaBars, FaCircleUser, FaChevronRight } from "react-icons/fa6";
import { HiOutlineLogout } from "react-icons/hi";

export function Topbar({ isOpen, onToggle }) {
  const [profilIsOpen, setProfilIsOpen] = useState(false);

  const useRefProfil = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        useRefProfil.current &&
        !useRefProfil.current.contains(event.target)
      ) {
        setProfilIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="relative bg-white pe-4 py-3 shadow-md flex items-center justify-between ">
        {!isOpen && (
          <button
            onClick={() => onToggle(!isOpen)}
            className="bg-primary pe-1 py-3 text-sm rounded-e-xl text-white"
          >
            <FaChevronRight />
          </button>
        )}
        <div className="profilIcon ms-auto flex items-center">
          <button
            onClick={() => setProfilIsOpen(!profilIsOpen)}
            className="text-2xl  lg:text-5xl"
          >
            <FaCircleUser />
          </button>
        </div>

        {profilIsOpen && (
          <div
            ref={useRefProfil}
            className={`absolute cardProfil top-12 right-12 px-6 py-2 rounded-md shadow-xl bg-gray-50`}
          >
            <div className="detail-profil my-5">
              <h1 className="text-md font-bold">ROMI RAHMAN</h1>
              <h3 className="text-sm">SUPER ADMIN</h3>
            </div>
            <hr className="my-2" />
            <button className="flex text-center items-center gap-1 rounded-md ">
              <HiOutlineLogout />
              <span className="">Logout</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
