import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../../service/apiUser";
import toast from "react-hot-toast";
import InputField from "../../../components/InputField"; // Adjust the path as needed
import { MdEmail, MdLock } from "react-icons/md";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      toast.success("Login successful");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const submitForm = (data) => {
    mutate(data);
  };

  return (
    <div className="text-center md:px-10 px-4 py-10 glassy md:me-52 rounded-lg shadow-lg space-y-5">
      <h1 className="text-5xl font-bold font-oswald text-ptext">Welcome</h1>
      <p className="font-bold text-lg text-gray-700">Login</p>
      <form onSubmit={handleSubmit(submitForm)}>
        <InputField
          id="email"
          type="text"
          placeholder="Email"
          register={register}
          validation={{ required: "Email is required" }}
          error={errors.email}
          icon={<MdEmail size={20} />}
        />

        <InputField
          id="password"
          type="password"
          placeholder="Password"
          register={register}
          validation={{ required: "Password is required" }}
          error={errors.password}
          icon={<MdLock size={20} />}
        />

        <div className="flex items-center justify-between mt-4 px-4">
          <div className="space-x-2">
            <input type="checkbox" {...register("rememberMe")} />
            <label htmlFor="rememberMe">Remember me</label>
          </div>
          <p className="underline text-blue-950 text-right">Forgot password?</p>
        </div>

        <button
          type="submit"
          className="rounded-full transition-all duration-300 font-bold flex flex-row items-center gap-2 hover:translate-y-[-4px] hover:shadow-lg mx-auto bg-white text-gray-800 px-10 py-3 mt-5"
        >
          {isPending ? "Logging in..." : "Login"}
        </button>

        <p className="mt-2">
          Don&apos;t have an account?{" "}
          <Link
            className="font-bold text-blue-900 underline"
            to="/auth/sign-in"
          >
            SignIn
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
