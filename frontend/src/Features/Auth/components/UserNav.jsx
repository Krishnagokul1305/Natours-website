import { useState } from "react";
import { Link } from "react-router-dom";
import { logofullblack } from "../../../assets/index";
import { FaHome, FaList, FaSignOutAlt } from "react-icons/fa";
import { MdSettings } from "react-icons/md";

function UserNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className={`fixed lg:static top-0 left-0 h-full z-20 bg-white transition-transform duration-300 ${
          isOpen
            ? "translate-x-0 lg:translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        } w-[300px] shadow-lg py-5 px-2 flex flex-col gap-5`}
      >
        <Link to="/" onClick={toggleNav}>
          <img
            src={logofullblack}
            alt="Logo"
            className="w-full object-contain h-[50px] mt-12 lg:mt-0"
          />
        </Link>
        <div className="space-y-5 lg:space-y-3">
          <Link
            className="bg-gray-100 px-5 py-4 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-gray-200 hover:translate-x-1 transition-all"
            to="/"
            onClick={toggleNav}
          >
            <FaHome />
            <h1>Home</h1>
          </Link>
          <Link
            className="bg-gray-100 px-5 py-4 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-gray-200 hover:translate-x-1 transition-all"
            to="settings"
            onClick={toggleNav}
          >
            <MdSettings />
            <h1>Settings</h1>
          </Link>
          <Link
            className="bg-gray-100 px-5 py-4 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-gray-200 hover:translate-x-1 transition-all"
            to="bookings"
            onClick={toggleNav}
          >
            <FaList />
            <h1>Bookings</h1>
          </Link>
        </div>
        <div className="mt-auto bg-gray-100 px-5 py-4 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-gray-200 hover:translate-x-1 transition-all">
        <FaSignOutAlt/>
          <h1>Logout</h1>
        </div>
      </div>
      <div
        className={`fixed top-0 left-0 h-full w-full bg-black bg-opacity-50 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleNav}
      ></div>
      <div
        className="fixed top-5 left-5 bg-gray-200 p-2 rounded-full cursor-pointer z-30 lg:hidden"
        onClick={toggleNav}
      >
        {/* icons */}
        <svg
          width="24px"
          viewBox="0 0 1024 1024"
          className={`transition-transform duration-300 ${
            !isOpen ? "rotate-180" : ""
          }`}
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z"
            fill="#000000"
          />
        </svg>
      </div>
    </>
  );
}

export default UserNav;
