import UserNav from "../components/UserNav";
import UserMain from "../components/UserMain";

function UserPage() {
  return (
    <div className="flex h-screen font-poppins">
      <UserNav />
      <UserMain />
    </div>
  );
}

export default UserPage;
