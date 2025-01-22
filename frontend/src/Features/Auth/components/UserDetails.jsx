import { useState } from "react";
import { useForm } from "react-hook-form";
import { useUsers } from "../hooks/useUser";

function UserDetails() {
  const { data: user, isLoading } = useUsers();

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(user?.photo || "");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user.name,
      newPassword: "",
      confirmPassword: "",
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const onSubmitUserDetails = (data) => {
    const formData = new FormData();
    if (file) formData.append("photo", file);
    formData.append("name", data.name);
    // dispatch(updateUserDetails(formData));
  };

  const onSubmitPasswordChange = (data) => {
    if (data.newPassword !== data.confirmPassword) {
      return; // Handle password mismatch error
    }
    // dispatch(updatePassword({ password: user.password, newPassword: data.newPassword }));
  };

  function handleFileChange(e) {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  }

  return (
    <div className="px-10 py-5 space-y-5 bg-white h-full w-[95%] m-auto rounded-md">
      <h1 className="font-extrabold text-ptext">Your Account Settings</h1>
      <form
        onSubmit={handleSubmit(onSubmitUserDetails)}
        className="space-y-4 border-b-2 pb-5"
      >
        <div className="grid md:grid-cols-2 gap-5 md:gap-14 ">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              className="border border-stext rounded-md p-2 focus:outline-none"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="border border-stext rounded-md p-2 focus:outline-none"
              defaultValue={user.email}
              disabled
            />
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="h-[100px] w-[100px] bg-gray-200 rounded-full overflow-hidden">
            <img src={previewUrl} className="h-full w-full object-cover" />
          </div>
          <div className="relative inline-block">
            <input
              type="file"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none cursor-pointer">
              Change Avatar
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="ms-auto block bg-primary text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none cursor-pointer"
        >
          Save changes
        </button>
      </form>

      <form
        onSubmit={handleSubmit(onSubmitPasswordChange)}
        className="py-2 space-y-5"
      >
        <h1 className="font-extrabold text-ptext">Change password</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-14 ">
          <div className="flex flex-col gap-2">
            <label htmlFor="newPassword">New Password</label>
            <input
              {...register("newPassword", {
                required: "New password is required",
              })}
              type="password"
              className="border border-stext rounded-md p-2 focus:outline-none"
              placeholder="new password"
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm">
                {errors.newPassword.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              {...register("confirmPassword", {
                required: "Please confirm your new password",
              })}
              type="password"
              className="border border-stext rounded-md p-2 focus:outline-none"
              placeholder="confirm new password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="ms-auto block bg-primary text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none cursor-pointer"
        >
          Save changes
        </button>
      </form>
    </div>
  );
}

export default UserDetails;
