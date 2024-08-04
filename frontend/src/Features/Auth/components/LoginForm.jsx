import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../userSlice";

function LoginForm() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, success } = useSelector((store) => store.user);

  function submitForm(e) {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    dispatch(loginUser(user));
    setEmail("");
    setPassword("");
  }

  useEffect(() => {
    if (success) {
      navigate("/");
    }
  }, [success, navigate]);

  return (
    <div
      className={`text-center md:px-10 px-4 py-10 glassy md:me-52  rounded-lg shadow-lg space-y-5  ${
        isLoading && "opacity-80 blur-[1px]"
      }`}
    >
      <h1 className="text-5xl font-bold font-oswald text-ptext">Welcome</h1>
      <p className="font-bold text-lg text-gray-700">Login</p>
      <form action="">
        <div className="flex gap-5 px-7 py-3 rounded-full transition-all duration-300 focus:outline-none focus:ring focus:ring-blue-200 glassy-input text-white my-7">
          <label htmlFor="">
            {/*  */}
            <svg
              width="24px"
              viewBox="0 -2.5 20 20"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <g
                id="Page-1"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                <g
                  id="Dribbble-Light-Preview"
                  transform="translate(-340.000000, -922.000000)"
                  fill="#ffff"
                >
                  <g id="icons" transform="translate(56.000000, 160.000000)">
                    <path
                      d="M294,774.474 L284,765.649 L284,777 L304,777 L304,765.649 L294,774.474 Z M294.001,771.812 L284,762.981 L284,762 L304,762 L304,762.981 L294.001,771.812 Z"
                      id="email-[#1572]"
                    ></path>
                  </g>
                </g>
              </g>
            </svg>
            {/*  */}
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
            {/*  */}
            <svg
              width="24px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.25 10.0546V8C5.25 4.27208 8.27208 1.25 12 1.25C15.7279 1.25 18.75 4.27208 18.75 8V10.0546C19.8648 10.1379 20.5907 10.348 21.1213 10.8787C22 11.7574 22 13.1716 22 16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H8C5.17157 22 3.75736 22 2.87868 21.1213C2 20.2426 2 18.8284 2 16C2 13.1716 2 11.7574 2.87868 10.8787C3.40931 10.348 4.13525 10.1379 5.25 10.0546ZM6.75 8C6.75 5.10051 9.10051 2.75 12 2.75C14.8995 2.75 17.25 5.10051 17.25 8V10.0036C16.867 10 16.4515 10 16 10H8C7.54849 10 7.13301 10 6.75 10.0036V8ZM14 16C14 17.1046 13.1046 18 12 18C10.8954 18 10 17.1046 10 16C10 14.8954 10.8954 14 12 14C13.1046 14 14 14.8954 14 16Z"
                fill="#ffff"
              />
            </svg>
            {/*  */}
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
        Don&#39;t have an account ?
        <Link className="font-bold text-blue-900 underline" to="/auth/sign-in">
          {" "}
          SignIn
        </Link>
      </p>
    </div>
  );
}

export default LoginForm;
