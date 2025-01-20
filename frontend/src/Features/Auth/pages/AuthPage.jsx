import { Outlet, useNavigate } from "react-router-dom";
import { lArrow } from "../../../assets/index";

function AuthPage() {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex items-center justify-center login relative">
      <button
        className="absolute top-5 left-5 bg-white w-[50px] h-[50px] rounded-full"
        onClick={() => navigate("/")}
      >
        <img src={lArrow} alt="" className="w-[24px] m-auto" />
      </button>
      <Outlet />
    </div>
  );
}

export default AuthPage;
