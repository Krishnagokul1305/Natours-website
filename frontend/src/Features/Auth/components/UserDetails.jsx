import { useDispatch, useSelector } from "react-redux";
import { updatePassword, updateUserDetails } from "../userSlice";
import { useState } from "react";

function UserDetails() {
  const user = useSelector((store) => store.user.user);

  let [newPassword, setnewPassword] = useState("");
  let [file, setFile] = useState("");
  let [name, setName] = useState(user.name);

  const dispatch = useDispatch();

  function changePassword() {
    dispatch(updatePassword({ password: user.password, newPassword }));
  }

  function changeUserDetails() {
    const formData = new FormData();
    if (file) formData.append("photo", file);
    formData.append("name", name);
    console.log(formData.get("name"), formData.get("photo"));
    dispatch(updateUserDetails(formData));
  }
  return (
    <div className="px-10 py-5 space-y-5 bg-white h-full w-[95%] m-auto rounded-md">
      <h1 className="font-extrabold text-ptext">Your Account Settings</h1>
      <div className="space-y-4 border-b-2 pb-5">
        <div className="grid md:grid-cols-2 gap-5 md:gap-14 ">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="border border-stext rounded-md p-2 focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="border border-stext rounded-md p-2  focus:outline-none"
              defaultValue={user.email}
              disabled
            />
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="h-[100px] w-[100px] bg-white  rounded-full overflow-hidden">
            <img
              src={user.photo}
              alt="Avatar"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="relative inline-block">
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none cursor-pointer ">
              Change Avatar
            </button>
          </div>
        </div>
        <button
          className="ms-auto block bg-primary text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none cursor-pointer"
          onClick={changeUserDetails}
        >
          Save changes
        </button>
      </div>
      <div className="py-2 space-y-5">
        <h1 className="font-extrabold text-ptext">Change password</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-14 ">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Password</label>
            <input
              type="text"
              className="border border-stext rounded-md p-2 focus:outline-none"
              value={user.password}
              disabled
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">New Password</label>
            <input
              type="password"
              className="border border-stext rounded-md p-2  focus:outline-none"
              value={newPassword}
              onChange={(e) => setnewPassword(e.target.value)}
              placeholder="new password"
            />
          </div>
        </div>
        <button
          className="ms-auto block bg-primary text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none cursor-pointer"
          onClick={changePassword}
        >
          Save changes
        </button>
      </div>
    </div>
  );
}

export default UserDetails;
