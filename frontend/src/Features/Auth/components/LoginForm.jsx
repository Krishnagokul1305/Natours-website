import { Link, useNavigate } from "react-router-dom";
import {
  email as emailIcon,
  password as passwordIcon,
} from "../../../assets/index";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../userSlice";

function LoginForm() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  const dispatch = useDispatch();
const navigate=useNavigate()
  
  function submitForm(e) {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    dispatch(loginUser(user));
    navigate("/")
    setEmail("");
    setPassword("");
  }

  const { isLoading} = useSelector((store) => store.user);

  return (
    <div className={`text-center md:px-10 px-4 py-10 glassy md:me-52  rounded-lg shadow-lg space-y-5  ${isLoading&&"opacity-80 blur-[1px]"}`}>
      <h1 className="text-5xl font-bold font-oswald text-ptext">Welcome</h1>
      <p className="font-bold text-lg text-gray-700">Login</p>
      <form action="">
        <div className="flex gap-5 px-7 py-3 rounded-full transition-all duration-300 focus:outline-none focus:ring focus:ring-blue-200 glassy-input text-white my-7">
          <label htmlFor="">
            <img src={emailIcon} alt="" className="h-[24px]" />
          </label>
          <input
            type="text"
            className="w-[250px] bg-transparent focus:outline-none placeholder-white"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
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
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div className="flex items-center justify-between mt-4 px-4">
          <div className="space-x-2">
            <input type="checkbox" />
            <label htmlFor="">Remember me</label>
          </div>
          <p className=" underline text-blue-950 text-right">
            Forgot password ?
          </p>
        </div>
        <button
          className=" rounded-full transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-offset-2 font-bold flex flex-row items-center gap-2 hover:translate-y-[-4px] hover:shadow-lg mx-auto bg-white focus:ring-white  focus:ring-offset-white text-gray-800  px-10 py-3 mt-5"
          onClick={(e) => submitForm(e)}
          disabled={isLoading}
        >
          Login
        </button>
      </form>
      <p>
        Don't have an account ?
        <Link className="font-bold text-blue-900 underline" to="/auth/sign-in">
          {" "}
          SignIn
        </Link>
      </p>
    </div>
  );
}

export default LoginForm;
