import { logofullblack } from "../assets";

function Footer() {
  return (
    <footer className="font-poppins bg-[#f7f7f7] p-10 flex  items-center justify-between md:flex-row flex-col space-y-5 md:space-y-0">
      <div className="">
        <img src={logofullblack} alt="Natours logo" className="h-[60px] md:h-[70px]"/>
      </div>
      <div className="flex items-center flex-col gap-3 text-gray-700 md:items-end">
        <ul className="flex items-center gap-5 text-sm flex-col md:flex-row md:text-base " >
          <li>
            <a href="#">About us</a>
          </li>
          <li>
            <a href="#">Download apps</a>
          </li>
          <li>
            <a href="#">Become a guide</a>
          </li>
          <li>
            <a href="#">Careers</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
        <p className="mt-2 text-sm md:text-base">&copy; by GokulaKrishnan. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
