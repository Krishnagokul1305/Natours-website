import { Link, useNavigate } from "react-router-dom";
import {
  email as emailIcon,
  password as passwordIcon,
  person,
} from "../../../assets/index";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../userSlice";

function SignInForm() {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [cPassword, setcPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function submitForm(e) {
    e.preventDefault();
    const user = {
      name,
      email,
      password,
      confirmPassword: cPassword,
    };
    dispatch(createUser(user));
    navigate("/home");
    setEmail("");
    setName("");
    setPassword("");
    setcPassword("");
  }

  const { isLoading } = useSelector((store) => store.user);

  return (
    <div
      className={`text-center md:px-10 px-4 py-10 glassy md:me-52  rounded-lg shadow-lg space-y-5  ${
        isLoading && "opacity-80 blur-[1px]"
      }`}
    >
      <h1 className="text-5xl font-bold font-oswald text-ptext">Welcome</h1>
      <p className="font-bold text-lg text-gray-700">Sign-In</p>
      <form action="">
        <div className="flex gap-5 px-7 py-3 rounded-full transition-all duration-300 focus:outline-none focus:ring focus:ring-blue-200 glassy-input text-white my-7">
          <label htmlFor="">
            <img src={person} alt="" className="h-[24px]" />
          </label>
          <input
            type="text"
            className="w-[250px] bg-transparent focus:outline-none placeholder-white"
            placeholder="User name"
            value={name}
            disabled={isLoading}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex gap-5 px-7 py-3 rounded-full transition-all duration-300 focus:outline-none focus:ring focus:ring-blue-200 glassy-input text-white my-7">
          <label htmlFor="">
            <img src={emailIcon} alt="" className="h-[24px]" />
          </label>
          <input
            type="text"
            className="w-[250px] bg-transparent focus:outline-none placeholder-white"
            placeholder="Email"
            value={email}
            disabled={isLoading}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex gap-5 px-7 py-3 rounded-full transition-all duration-300 focus:outline-none focus:ring focus:ring-blue-200 glassy-input text-white mt-7">
          <label htmlFor="">
            <img src={passwordIcon} alt="" className="h-[24px]" />
          </label>
          <input
            type="text"
            className="w-[250px] bg-transparent focus:outline-none placeholder-white "
            placeholder="Password"
            value={password}
            disabled={isLoading}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex gap-5 px-7 py-3 rounded-full transition-all duration-300 focus:outline-none focus:ring focus:ring-blue-200 glassy-input text-white mt-7">
          <label htmlFor="">
            <img src={passwordIcon} alt="" className="h-[24px]" />
          </label>
          <input
            type="text"
            className="w-[250px] bg-transparent focus:outline-none placeholder-white "
            placeholder="Confirm Password"
            value={cPassword}
            disabled={isLoading}
            onChange={(e) => setcPassword(e.target.value)}
          />
        </div>

        <button
          className=" rounded-full transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-offset-2 font-bold flex flex-row items-center gap-2 hover:translate-y-[-4px] hover:shadow-lg mx-auto bg-white focus:ring-white  focus:ring-offset-white text-gray-800  px-10 py-3 mt-5"
          onClick={(e) => submitForm(e)}
          disabled={isLoading}
        >
          Sign-In
        </button>
      </form>
      <p>
        already have an account ?
        <Link className="font-bold text-blue-900 underline" to="/auth/login">
          {" "}
          Login
        </Link>
      </p>
    </div>
  );
}

export default SignInForm;
