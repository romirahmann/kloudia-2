/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { FaCircleUser, FaChevronRight } from "react-icons/fa6";
import { HiOutlineLogout } from "react-icons/hi";
import { useAuth } from "../store/AuthContext";
import { useNavigate } from "@tanstack/react-router";

export function Topbar({ isOpen, onToggle }) {
  const [profilIsOpen, setProfilIsOpen] = useState(false);
  const { logout } = useAuth();
  const useRefProfil = useRef(null);
  const navigate = useNavigate();

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

  const handleLogout = () => {
    logout();
    setTimeout(() => {
      navigate({ to: "/login" });
    }, 1000);
  };

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

        <div className="page ms-5 flex flex-col">
          <h1 className="text-xl lg:text-2xl font-bold">Dashboard</h1>
          <p className="text-[9px] lg:text-sm text-gray-500">
            Let's check your update!
          </p>
        </div>
        <div className="profilIcon ms-auto flex items-center">
          <button
            onClick={() => setProfilIsOpen(!profilIsOpen)}
            className="text-4xl lg:text-5xl"
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
            <button
              onClick={() => handleLogout()}
              className="flex text-center items-center gap-1 rounded-md "
            >
              <HiOutlineLogout />
              <span className="">Logout</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
