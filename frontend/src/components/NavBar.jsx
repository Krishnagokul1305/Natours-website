import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { close, logoBlack, logoWhite, menu } from "../assets/index";
import Button from "./Button";
import Userbtn from "../Features/Auth/components/UserBtn";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const navbarVariant = {
  hidden: { y: -100, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.5,
    },
  },
};

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { isLogged } = useSelector((store) => store.user);
  const [animate, setAnimate] = useState(location.pathname === "/");

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    const isHomePage = location.pathname === "/";
    setAnimate(isHomePage);

    if (isHomePage) {
      setIsScrolled(window.scrollY > 200);
      window.addEventListener("scroll", handleScroll);
    } else {
      setIsScrolled(true);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  return (
    <motion.nav
      className={`h-15 py-5 px-8 md:px-40 fixed z-10 top-0 w-full ${
        isScrolled ? "glassy-white shadow-lg" : "bg-transparent text-white"
      } flex items-center justify-between transition-all duration-300`}
      variants={animate ? navbarVariant : undefined}
      initial={animate ? "hidden" : "show"}
      animate="show"
    >
      <Link to="/" className="flex items-center gap-2">
        <img
          src={isScrolled ? logoBlack : logoWhite}
          alt="Logo"
          className="h-[50px]"
        />
        <h1 className="font-bold font-oswald text-lg">Natours</h1>
      </Link>

      <ul className="hidden md:flex items-center gap-10 font-semibold">
        <li>
          <Link to="/" className="relative-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/tours" className="relative-link">
            Tours
          </Link>
        </li>
        <li>
          <a href="#" className="relative-link">
            About
          </a>
        </li>
        <li>
          <a href="#" className="relative-link">
            Process
          </a>
        </li>
      </ul>
      <div className="hidden md:flex gap-4">
        {!isLogged ? (
          <>
            <Button
              variant={`${isScrolled ? "secondaryUnfill" : "primaryUnfill"}`}
              type="small"
              to="/auth"
            >
              Login
            </Button>
            <Button
              variant={`${isScrolled ? "secondary" : "primary"}`}
              type="small"
              to="/auth/sign-in"
            >
              Sign-In
            </Button>
          </>
        ) : (
          <Userbtn isScrolled={isScrolled} />
        )}
      </div>
      <div
        className="md:hidden flex items-center w-[50px] h-[50px] rounded-full bg-gray-200 absolute top-5 right-5"
        onClick={() => setIsOpen(true)}
      >
        <img src={menu} alt="Menu" className="h-6 w-6 m-auto" />
      </div>

      <div
        className={`nav-links w-full md:hidden ${
          isOpen ? "open" : ""
        } pt-20 bg-white flex justify-center`}
      >
        <div
          className="md:hidden flex items-center w-[50px] h-[50px] rounded-full bg-gray-200 absolute top-5 right-5"
          onClick={() => setIsOpen(false)}
        >
          <img src={close} alt="Menu" className="h-4 w-4 m-auto" />
        </div>
        <ul className="flex flex-col gap-16 items-center text-ptext font-bold text-xl tracking-widest">
          <li onClick={() => setIsOpen(false)}>
            <Link className="relative-link" to="/">
              Home
            </Link>
          </li>
          <li onClick={() => setIsOpen(false)}>
            <Link className="relative-link" to="/tours">
              Tours
            </Link>
          </li>
          <li onClick={() => setIsOpen(false)}>
            <a href="#" className="relative-link">
              About
            </a>
          </li>
          <li onClick={() => setIsOpen(false)}>
            <a href="#" className="relative-link">
              Process
            </a>
          </li>
          {!isLogged ? (
            <>
              <li>
                <Button
                  variant="secondary"
                  type="small"
                  to="/auth"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Button>
              </li>
              <li>
                <Button
                  variant="secondary"
                  type="small"
                  to="/auth/sign-in"
                  onClick={() => setIsOpen(false)}
                >
                  Sign-In
                </Button>
              </li>
            </>
          ) : (
            <Userbtn isScrolled={isScrolled} onClick={() => setIsOpen(false)} />
          )}
        </ul>
      </div>
    </motion.nav>
  );
}

export default NavBar;
