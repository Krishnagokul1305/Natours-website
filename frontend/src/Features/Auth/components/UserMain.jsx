import { Outlet } from "react-router-dom";
import Button from "../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../userSlice";
import UserLoader from "./UserLoader";

function UserMain() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  return (
    <div className="lg:basis-[80%] bg-gray-50 overflow-y-scroll basis-[100%]">
      <header className="h-[180px] bg-gray-400 relative user-bg">
        <div className="h-[150px] w-[150px] bg-gray-200 rounded-full absolute bottom-0 left-5 translate-y-1/3 overflow-hidden">
          <img
            src={user.user.photo}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      </header>
      <div className="mt-[50px]">
        <div className="px-10 py-5 flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="font-extrabold text-xl tracking-wide">
              {user.user.name || "User"}
            </h1>
            <p className="font-thin text-gray-700 text-sm">
              {user.user.email || "user@gmail.com"}
            </p>
          </div>
          <Button
            type="small"
            variant="secondary"
            onClick={() => dispatch(logout())}
          >
            Logout
          </Button>
        </div>
        <div>{user.isLoading ? <UserLoader /> : <Outlet />}</div>
      </div>
    </div>
  );
}

export default UserMain;
