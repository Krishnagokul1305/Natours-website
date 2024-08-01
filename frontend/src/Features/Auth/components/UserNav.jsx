import { useState } from "react";
import { Link } from "react-router-dom";
import { bookings, exit, leftArrow, logofullblack, settings } from "../../../assets/index";
import { useDispatch } from "react-redux";
import { logout } from "../userSlice";

function UserNav() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`fixed lg:static top-0 left-0 h-full z-20 bg-white transition-transform duration-300 ${isOpen ? 'translate-x-0 lg:translate-x-0' : '-translate-x-full lg:translate-x-0'} w-[300px] shadow-lg py-5 px-2 flex flex-col gap-5`}>
       
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
            to="/user/settings"
            onClick={toggleNav}
          >
            <img src={settings} alt="Settings" className="h-[22px]" />
            <h1>Settings</h1>
          </Link>
          <Link
            className="bg-gray-100 px-5 py-4 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-gray-200 hover:translate-x-1 transition-all"
            to="/user/bookings"
            onClick={toggleNav}
          >
            <img src={bookings} alt="Bookings" className="h-[22px]" />
            <h1>Bookings</h1>
          </Link>
        </div>
        <div
          className="mt-auto bg-gray-100 px-5 py-4 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-gray-200 hover:translate-x-1 transition-all"
          onClick={() => {
            dispatch(logout());
            toggleNav();
          }}
        >
          <img src={exit} alt="Logout" className="h-[22px]" />
          <h1>Logout</h1>
        </div>
      </div>
      <div className={`fixed top-0 left-0 h-full w-full bg-black bg-opacity-50 transition-opacity duration-300 lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={toggleNav}></div>
      <div className="fixed top-5 left-5 bg-gray-200 p-2 rounded-full cursor-pointer z-30 lg:hidden" onClick={toggleNav}>
        <img src={leftArrow} alt="Open" className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </div>
    </>
  );
}

export default UserNav;
