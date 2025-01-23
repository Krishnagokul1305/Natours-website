import { useState } from "react";
import { useForm } from "react-hook-form";
import { updateUser } from "../service/apiUser";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function UserDetailsForm({user}) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(user?.photo || "");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user.name,
    },
  });

  const queryClient = useQueryClient();

  const { mutate: userDetailsUpdate, isPending: isUpdatingUser } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries("user")
      toast.success("Details updated successfully");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const onSubmitUserDetails = (data) => {
    const formData = new FormData();
    if (file) formData.append("photo", file);
    formData.append("name", data.name);
    userDetailsUpdate(formData);
  };

  function handleFileChange(e) {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Validate image type
      if (!selectedFile.type.startsWith('image/')) {
        alert('Please upload a valid image file');
        return;
      }

      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  }


  return (
    <form
      onSubmit={handleSubmit(onSubmitUserDetails)}
      className="space-y-4 border-b-2 pb-5"
    >
      <div className="grid md:grid-cols-2 gap-5 md:gap-14">
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
          <img
            src={previewUrl}
            className="h-full w-full object-cover"
            alt="User Avatar"
          />
        </div>
        <div className="relative inline-block">
          <input
            type="file"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <button
            type="button"
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none cursor-pointer"
          >
            Change Avatar
          </button>
        </div>
      </div>
      <button
        type="submit"
        className="ms-auto block bg-primary text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none cursor-pointer"
      >
        {isUpdatingUser ? "Updating..." : "Save changes"}
      </button>
    </form>
  );
}

export default UserDetailsForm;
