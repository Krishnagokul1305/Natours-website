import { Link } from "react-router-dom";
import { bookings, exit, logofullblack, settings } from "../../../assets";

function UserNav() {
  return (
    <div className="basis-[20%] shadow-lg py-5 px-2 flex flex-col gap-5 ">
      <Link to="/">
        <img
          src={logofullblack}
          alt=""
          className="w-full object-contain h-[50px]"
        />
      </Link>
      <div className=" space-y-3">
        <Link
          className="bg-gray-100 px-5 py-4 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-gray-200 hover:translate-x-1 transition-all"
          to="/user/settings"
        >
          <img src={settings} alt="" className="h-[22px]" />
          <h1> Settings</h1>
        </Link>
        <Link
          className="bg-gray-100 px-5 py-4 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-gray-200 hover:translate-x-1 transition-all"
          to="/user/bookings"
        >
          <img src={bookings} alt="" className="h-[22px]" />
          <h1> Bookings</h1>
        </Link>
      </div>
      <div className="mt-auto bg-gray-100 px-5 py-4 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-gray-200 hover:translate-x-1 transition-all">
        <img src={exit} alt="" className="h-[22px]" />
        <h1>logout</h1>
      </div>
    </div>
  );
}

export default UserNav;
