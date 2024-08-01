import { useSelector } from "react-redux";
import { logoWhite } from "../../../assets/index";
import Button from "../../../components/Button";

function TourBooking() {
  const { isLogged } = useSelector((store) => store.user);
  return (
    <section className="px-5 py-16 bg-gray-100">
      <div className="mx-auto  rounded-2xl  w-fit px-5 py-7  shadow-xl flex items-center overflow-hidden bg-white">
        <div className="bg-primary  rounded-full md:translate-x-[-55%] translate-x-[-80%] w-[150px] h-[150px] flex items-center justify-center shadow-lg">
          <img
            src={logoWhite}
            alt="Natours logo"
            className="object-contain h-[6rem]"
          />
        </div>

        <div className="flex items-start md:items-center gap-5 md:gap-14 flex-col md:flex-row justify-between">
          <div className=" space-y-2 md:space-y-4">
            {isLogged ? (
              <>
                <h2 className="font-semibold text-ptext md:text-2xl">
                  What are you waiting for?
                </h2>
                <p className="text-gray-500 text-xs md:text-lg">
                  10 days. 1 adventure. Infinite memories. Make it yours today!
                </p>
              </>
            ) : (
              <h2 className="font-semibold text-ptext md:text-2xl">
                Log in to Book Tours
              </h2>
            )}
          </div>

          {isLogged ? (
            <Button type="big" variant="secondary">
              Book tour now!
            </Button>
          ) : (
            <Button type="big" variant="secondary" to="/auth/login">
              Login
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}

export default TourBooking;
