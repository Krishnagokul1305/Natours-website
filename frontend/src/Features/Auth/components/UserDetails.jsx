import { useUsers } from "../hooks/useUser";
import UserDetailsForm from "../../../components/UserDetailsForm";
import UserPasswordForm from "../../../components/UserPasswordForm";

function UserDetails() {
  const { data: user, isLoading } = useUsers();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-10 py-5 space-y-5 bg-white h-full w-[95%] m-auto rounded-md">
      <h1 className="font-extrabold text-ptext">Your Account Settings</h1>
      <UserDetailsForm user={user} />
      <UserPasswordForm />
    </div>
  );
}

export default UserDetails;
