import { defaultuser } from "../../../assets";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

function UserBtn({ isScrolled, user }) {
  const navigate = useNavigate();
  console.log(user);
  const { logout, isPending } = useLogout();

  return (
    <div>
      <div className="md:flex gap-10 items-center flex-col md:flex-row md:gap-5 hidden">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate(`/user/${user._id}/`)}
        >
          <img src={defaultuser} alt="" className="h-[27px]" />
          <h1 className="font-semibold capitalize">{user.name}</h1>
        </div>

        <Button
          variant={`${isScrolled ? "secondaryUnfill" : "primaryUnfill"}`}
          type="small"
          onClick={() => logout()}
        >
          {isPending ? "Logging out" : "Logout"}
        </Button>
      </div>
      <div className="flex gap-10 items-center flex-col md:flex-row md:gap-5 md:hidden">
        <Button
          variant={"secondary"}
          type="small"
          onClick={() => navigate("/user")}
        >
          <img src={defaultuser} alt="" className="h-[27px]" />
          <h1 className="capitalize">{user.name || ""}</h1>
        </Button>

        <Button variant={"secondary"} type="small" onClick={() => logout()}>
          {isPending ? "Logging out" : "Logout"}
        </Button>
      </div>
    </div>
  );
}

export default UserBtn;
