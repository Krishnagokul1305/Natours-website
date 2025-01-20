import { logofullblack } from "../assets";

function Footer() {
  return (
    <footer className="font-poppins bg-[#f7f7f7] px-10 py-5 flex  items-center justify-between md:flex-row flex-col space-y-5 md:space-y-0">
      <div className="">
        <img
          src={logofullblack}
          alt="Natours logo"
          className="h-[40px]"
        />
      </div>
      <div className="flex items-center flex-col gap-3 text-gray-700 md:items-end">
        <p className="mt-2 text-sm md:text-base">
          &copy; by GokulaKrishnan. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
