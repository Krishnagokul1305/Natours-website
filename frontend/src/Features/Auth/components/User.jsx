import { useDispatch, useSelector } from "react-redux";
import { defaultuser } from "../../../assets";
import Button from "../../../components/Button";
import { logout } from "../userSlice";

function User({ isScrolled }) {
  const { name } = useSelector((store) => store.user.user) || "Default";
  const dispatch = useDispatch();
  function logoutfn() {
    localStorage.removeItem("token");
    dispatch(logout());
  }

  return (
    <div className="flex gap-5 items-center ">
      <Button variant={`${isScrolled ? "secondary" : "primary"}`} type="small">
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
  );
}

export default User;
