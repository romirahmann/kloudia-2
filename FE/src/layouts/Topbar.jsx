/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { FaCircleUser, FaChevronRight, FaSun } from "react-icons/fa6";
import { HiOutlineLogout } from "react-icons/hi";
import { useAuth } from "../store/AuthContext";
import { useNavigate } from "@tanstack/react-router";
import { MdOutlineDarkMode, MdOutlineWbSunny } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { useDarkMode } from "../store/ThemeContext";
import { Search } from "../shared/Search";
import { useSearchComponent } from "../store/SearchContext";

export function Topbar({ isOpen, onToggle, titleData }) {
  const [profilIsOpen, setProfilIsOpen] = useState(false);
  const { theme, toggleTheme } = useDarkMode();
  const [user, setUser] = useState({ fullname: "", role: "" });
  const { logout } = useAuth();
  const useRefProfil = useRef(null);
  const navigate = useNavigate();
  const { searchQuery, onChangeSearch } = useSearchComponent();

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

  useEffect(() => {
    let dataUser = JSON.parse(sessionStorage.getItem("user"));
    setUser({ fullname: dataUser.fullname, role: dataUser.roleName });
  }, []);

  const handleLogout = () => {
    logout();
    navigate({ to: "/login" });
  };

  const handleOnChangeSearch = (e) => {
    onChangeSearch(e);
  };

  return (
    <>
      <div className="relative bg-white dark:bg-gray-950 pe-4 py-2 dark:shadow-gray-800  shadow-md flex items-center justify-between ">
        {!isOpen && (
          <button
            onClick={() => onToggle(!isOpen)}
            className="bg-primary pe-1 py-3 text-sm rounded-e-xl text-white"
          >
            <FaChevronRight />
          </button>
        )}

        {/* TITLE */}
        <div className="page ms-5 flex flex-col">
          <h1 className="text-md lg:text-xl font-bold dark:text-gray-50">
            {titleData?.titlePage}
          </h1>
          <p className="text-[9px] lg:text-sm text-gray-500 dark:text-gray-300">
            {titleData?.titleDesc}
          </p>
        </div>
        {/* SEARCH */}
        <div
          className={` ${
            !isOpen ? "lg:w-[50em]" : "lg:w-[30em]"
          } ms-auto  w-[25em] `}
        >
          <Search
            onChange={(e) => handleOnChangeSearch(e)}
            placeholder="Search  ..."
          />
        </div>
        {/* USERS */}
        <div className="profilIcon ms-auto flex items-center">
          <button
            onClick={toggleTheme}
            className="darkMode px-2 py-2 border border-primary dark:text-white dark:border-white rounded-md mx-5 text-xl"
          >
            {theme === "dark" ? <MdOutlineDarkMode /> : <MdOutlineWbSunny />}
          </button>
          <button
            onClick={() => setProfilIsOpen(!profilIsOpen)}
            className="text-3xl lg:text-4xl text-primary dark:text-white"
          >
            <FaRegUserCircle />
          </button>
        </div>

        {profilIsOpen && (
          <div
            ref={useRefProfil}
            className={`absolute cardProfil top-12 right-12 px-6 py-2 rounded-md shadow-xl bg-gray-50 z-20`}
          >
            <div className="detail-profil my-5">
              <h1 className="text-md font-bold uppercase ">{user?.fullname}</h1>
              <h3 className="text-sm uppercase">{user?.role}</h3>
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
