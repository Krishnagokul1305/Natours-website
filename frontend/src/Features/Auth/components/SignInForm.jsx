import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import InputField from "../../../components/InputField";
import { useMutation } from "@tanstack/react-query";
import { signin } from "../../../service/apiUser";
import toast from "react-hot-toast";

function SignInForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const password = watch("password");
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: signin,
    onSuccess: () => {
      toast.success("Signin successful");
      reset();
      navigate("/"); // Redirect after success
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  const submitForm = (data) => {
    mutate(data); // Submit the form data to the mutation
  };

  return (
    <div className="text-center md:px-10 px-4 py-10 glassy md:me-52 rounded-lg shadow-lg space-y-5">
      <h1 className="text-5xl font-bold font-oswald text-ptext">Welcome</h1>
      <p className="font-bold text-lg text-gray-700">Sign-In</p>
      <form onSubmit={handleSubmit(submitForm)} noValidate>
        {/* Username Field */}
        <InputField
          id="name"
          type="text"
          placeholder="User name"
          icon={<FaUser size={20} />}
          register={register}
          validation={{ required: "Username is required" }}
          error={errors.name}
        />

        {/* Email Field */}
        <InputField
          id="email"
          type="email"
          placeholder="Email"
          icon={<FaEnvelope size={20} />}
          register={register}
          validation={{
            required: "Email is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
              message: "Invalid email format",
            },
          }}
          error={errors.email}
        />

        {/* Password Field */}
        <InputField
          id="password"
          type="password"
          placeholder="Password"
          icon={<FaLock size={20} />}
          register={register}
          validation={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          }}
          error={errors.password}
        />

        <InputField
          id="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          register={register}
          icon={<FaLock size={20} />}
          validation={{
            required: "Confirm Password is required",
            validate: (value) => value === password || "Passwords do not match",
          }}
          error={errors.confirmPassword}
        />

        <button
          type="submit"
          className="rounded-full mx-auto font-bold flex items-center gap-2 bg-white text-gray-800 px-10 py-3 mt-5"
        >
          {isPending ? "Registering..." : "Sign-In"}
        </button>
      </form>
      <p>
        Already have an account?{" "}
        <Link className="font-bold text-blue-900 underline" to="/auth/login">
          Login
        </Link>
      </p>
    </div>
  );
}

export default SignInForm;
