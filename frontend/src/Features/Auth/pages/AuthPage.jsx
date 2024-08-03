import { Outlet, useNavigate } from "react-router-dom";
import { lArrow } from "../../../assets/index";
import Popup from "../../../components/Popup";
import { useSelector } from "react-redux";

function AuthPage() {
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((store) => store.user);
  console.log(isLoading, error);
  return (
    <div className="h-screen flex items-center justify-center login relative">
      <button
        className="absolute top-5 left-5 bg-white w-[50px] h-[50px] rounded-full"
        onClick={() => navigate("/")}
      >
        <img src={lArrow} alt="" className="w-[24px] m-auto" />
      </button>
      <div className="flex items-center justify-center">
        {error && <Popup message={error} status="error" />}
      </div>
      <Outlet />
    </div>
  );
}

export default AuthPage;
