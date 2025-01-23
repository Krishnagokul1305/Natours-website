import { useForm } from "react-hook-form";
import { updateUserPassword } from "../service/apiUser";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

function UserPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const { mutate: userPasswordUpdate, isPending: isUpdatingPassword } =
    useMutation({
      mutationFn: updateUserPassword,
      onSuccess: () => {
        toast.success("Password updated successfully");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  const onSubmitPasswordChange = (data) => {
    userPasswordUpdate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitPasswordChange)}
      className="py-2 space-y-5"
    >
      <h1 className="font-extrabold text-ptext">Change password</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7">
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Current Password</label>
          <input
            {...register("currentPassword", {
              required: "Current password is required",
            })}
            type="password"
            className="border border-stext rounded-md p-2 focus:outline-none"
            placeholder="Current password"
          />
          {errors.newPassword && (
            <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="newPassword">New Password</label>
          <input
            {...register("newPassword", {
              required: "New password is required",
              validate: (value) => {
                const { confirmPassword } = getValues();
                return confirmPassword === value || "Passwords do not match";
              },
            })}
            type="password"
            className="border border-stext rounded-md p-2 focus:outline-none"
            placeholder="new password"
          />
          {errors.newPassword && (
            <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input
            {...register("confirmPassword", {
              required: "Please confirm your new password",
              validate: (value) => {
                const { newPassword } = getValues();
                return newPassword === value || "Passwords do not match";
              },
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
        {isUpdatingPassword ? "Updating..." : "Save changes"}
      </button>
    </form>
  );
}

export default UserPasswordForm;
