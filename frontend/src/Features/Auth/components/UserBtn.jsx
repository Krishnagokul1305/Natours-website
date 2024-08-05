import { useDispatch, useSelector } from "react-redux";
import { defaultuser } from "../../../assets";
import Button from "../../../components/Button";
import { logout } from "../userSlice";
import { useNavigate } from "react-router-dom";

function UserBtn({ isScrolled }) {
  const { name } = useSelector((store) => store.user.user) || "Default";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function logoutfn() {
    localStorage.removeItem("token");
    dispatch(logout());
  }

  return (
    <div>
      <div className="md:flex gap-10 items-center flex-col md:flex-row md:gap-5 hidden">
        <Button
          variant={`${isScrolled ? "secondary" : "primary"}`}
          type="small"
          onClick={() => {
            navigate("/user");
            onclick();
          }}
        >
          <img src={defaultuser} alt="" className="h-[27px]" />
          <h1>{name}</h1>
        </Button>

        <Button
          variant={`${isScrolled ? "secondaryUnfill" : "primaryUnfill"}`}
          type="small"
          onClick={logoutfn}
        >
          Logout
        </Button>
      </div>
      <div className="flex gap-10 items-center flex-col md:flex-row md:gap-5 md:hidden">
        <Button
          variant={"secondary"}
          type="small"
          onClick={() => navigate("/user")}
        >
          <img src={defaultuser} alt="" className="h-[27px]" />
          <h1>{name}</h1>
        </Button>

        <Button variant={"secondary"} type="small" onClick={logoutfn}>
          Logout
        </Button>
      </div>
    </div>
  );
}

export default UserBtn;
