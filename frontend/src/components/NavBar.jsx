import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; // If you're using react-router-dom for routing
import { close, logoBlack, logoWhite, menu } from "../assets/index";
import Button from "./Button";
import User from "../Features/Auth/components/User";
import { useSelector } from "react-redux";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { isLogged } = useSelector((store) => store.user);
  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    const isHomePage = location.pathname === "/";

    if (isHomePage) {
      setIsScrolled(window.scrollY > 100);

      window.addEventListener("scroll", handleScroll);
    } else {
      setIsScrolled(true);
    }

    return () => {
      // Cleanup scroll listener
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  return (
    <nav
      className={`h-15 py-5 px-8 md:px-40 fixed z-10 top-0 w-full ${
        isScrolled ? "glassy-white shadow-lg" : "bg-transparent text-white"
      } flex items-center justify-between  transition-all duration-300`}
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
          <User isScrolled={isScrolled} />
        )}
      </div>
      <div
        className="md:hidden flex items-center w-[50px] h-[50px] rounded-full bg-gray-200 absolute top-5 right-5"
        onClick={() => setIsOpen(true)}
      >
        <img src={menu} alt="Menu" className="h-6 w-6 m-auto" />
      </div>

      {/* mobile view navigation bar */}
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
          <li>
            <a href="#" className="relative-link">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="relative-link">
              Tours
            </a>
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
          <li>
            <Button variant="secondary" type="small" to="/auth">
              Login
            </Button>
          </li>
          <li>
            <Button variant="secondary" type="small" to="/auth/sign-in">
              Sign-In
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
