import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import { formatDate } from "../../../utils/helper";
import { motion } from "framer-motion";
import { TOUR_COVER } from "../../../../config";

function TourCard({ tour}) {
  const navigate = useNavigate();

  return (
    <motion.div
      className="shadow-lg rounded-sm overflow-hidden hover:translate-y-[-10px] hover:shadow-xl transition-all max-w-[23rem]"
      whileHover={{
        translateY: -10,
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* card img with header */}
      <div className="relative ">
        <div className="h-70 relative card-picture  h-[230px] bg-gray-200">
          <img
            src={`${TOUR_COVER}/${tour.imageCover}`}
            alt="Tour 1"
            className="card__picture-img object-cover h-100 "
          />
        </div>

        <h3 className="text-2xl text-right absolute bottom-8 text-white right-0 w-[70%] heading capitalize">
          <span className="px-3 py-3 leading-[1] bg-primary-op">
            {tour.name}
          </span>
        </h3>
      </div>

      {/* card body */}
      <div className="px-8 pt-2 pb-5 text-stone-500 font-thin space-y-4">
        <h4 className="text-stone-600 font-medium">
         <span className="capitalize">{tour.difficulty}</span>  {tour.locations.length}-day tour
        </h4>
        <p className="card__text">{tour.summary}</p>
        <div className="grid grid-cols-2 ms-3 gap-5 text-sm">
          <div className="flex items-center gap-2">
            {/*  */}
            <svg
              width="18px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.3856 23.789L11.3831 23.7871L11.3769 23.7822L11.355 23.765C11.3362 23.7501 11.3091 23.7287 11.2742 23.7008C11.2046 23.6451 11.1039 23.5637 10.9767 23.4587C10.7224 23.2488 10.3615 22.944 9.92939 22.5599C9.06662 21.793 7.91329 20.7041 6.75671 19.419C5.60303 18.1371 4.42693 16.639 3.53467 15.0528C2.64762 13.4758 2 11.7393 2 10C2 7.34784 3.05357 4.8043 4.92893 2.92893C6.8043 1.05357 9.34784 0 12 0C14.6522 0 17.1957 1.05357 19.0711 2.92893C20.9464 4.8043 22 7.34784 22 10C22 11.7393 21.3524 13.4758 20.4653 15.0528C19.5731 16.639 18.397 18.1371 17.2433 19.419C16.0867 20.7041 14.9334 21.793 14.0706 22.5599C13.6385 22.944 13.2776 23.2488 13.0233 23.4587C12.8961 23.5637 12.7954 23.6451 12.7258 23.7008C12.6909 23.7287 12.6638 23.7501 12.645 23.765L12.6231 23.7822L12.6169 23.7871L12.615 23.7885C12.615 23.7885 12.6139 23.7894 12 23L12.6139 23.7894C12.2528 24.0702 11.7467 24.0699 11.3856 23.789ZM12 23L11.3856 23.789C11.3856 23.789 11.3861 23.7894 12 23ZM15 10C15 11.6569 13.6569 13 12 13C10.3431 13 9 11.6569 9 10C9 8.34315 10.3431 7 12 7C13.6569 7 15 8.34315 15 10Z"
                fill="#000000"
              />
            </svg>
            {/*  */}
            <span>{tour.startLocation.description}</span>
          </div>
          <div className="flex items-center gap-2">
            {/*  */}
            <svg
              width="20px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.75 2.5C7.75 2.08579 7.41421 1.75 7 1.75C6.58579 1.75 6.25 2.08579 6.25 2.5V4.07926C4.81067 4.19451 3.86577 4.47737 3.17157 5.17157C2.47737 5.86577 2.19451 6.81067 2.07926 8.25H21.9207C21.8055 6.81067 21.5226 5.86577 20.8284 5.17157C20.1342 4.47737 19.1893 4.19451 17.75 4.07926V2.5C17.75 2.08579 17.4142 1.75 17 1.75C16.5858 1.75 16.25 2.08579 16.25 2.5V4.0129C15.5847 4 14.839 4 14 4H10C9.16097 4 8.41527 4 7.75 4.0129V2.5Z"
                fill="#000000"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 12C2 11.161 2 10.4153 2.0129 9.75H21.9871C22 10.4153 22 11.161 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12ZM17 14C17.5523 14 18 13.5523 18 13C18 12.4477 17.5523 12 17 12C16.4477 12 16 12.4477 16 13C16 13.5523 16.4477 14 17 14ZM17 18C17.5523 18 18 17.5523 18 17C18 16.4477 17.5523 16 17 16C16.4477 16 16 16.4477 16 17C16 17.5523 16.4477 18 17 18ZM13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13ZM13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17ZM7 14C7.55228 14 8 13.5523 8 13C8 12.4477 7.55228 12 7 12C6.44772 12 6 12.4477 6 13C6 13.5523 6.44772 14 7 14ZM7 18C7.55228 18 8 17.5523 8 17C8 16.4477 7.55228 16 7 16C6.44772 16 6 16.4477 6 17C6 17.5523 6.44772 18 7 18Z"
                fill="#000000"
              />
            </svg>
            {/*  */}
            <span>{formatDate(tour.startDates[0])}</span>
          </div>
          <div className="flex items-center gap-2">
            {/*  */}
            <svg
              width="20px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.75 1C6.16421 1 6.5 1.33579 6.5 1.75V3.6L8.22067 3.25587C9.8712 2.92576 11.5821 3.08284 13.1449 3.70797L13.3486 3.78943C14.9097 4.41389 16.628 4.53051 18.2592 4.1227C19.0165 3.93339 19.75 4.50613 19.75 5.28669V12.6537C19.75 13.298 19.3115 13.8596 18.6864 14.0159L18.472 14.0695C16.7024 14.5119 14.8385 14.3854 13.1449 13.708C11.5821 13.0828 9.8712 12.9258 8.22067 13.2559L6.5 13.6V21.75C6.5 22.1642 6.16421 22.5 5.75 22.5C5.33579 22.5 5 22.1642 5 21.75V1.75C5 1.33579 5.33579 1 5.75 1Z"
                fill="#000000"
              />
            </svg>
            {/*  */}
            <span>{tour.locations.length} stops</span>
          </div>
          <div className="flex items-center gap-2">
            {/*  */}
            <svg
              fill="#000000"
              width="20px"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16 15.503A5.041 5.041 0 1 0 16 5.42a5.041 5.041 0 0 0 0 10.083zm0 2.215c-6.703 0-11 3.699-11 5.5v3.363h22v-3.363c0-2.178-4.068-5.5-11-5.5z" />
            </svg>
            {/*  */}
            <span>{tour.maxGroupSize} people</span>
          </div>
        </div>
      </div>

      {/* footer part */}
      <div className="px-8 py-5 bg-gray-50 flex items-center justify-between">
        <div className="space-y-2">
          <p className="space-x-1">
            <span className="font-medium text-stone-600">${tour.price}</span>
            <span className="font-thin text-stone-500">per person</span>
          </p>
          <p className="space-x-1">
            <span className="font-medium text-stone-600">
              {tour.ratingsAverage.toFixed(1)}
            </span>
            <span className="font-thin text-stone-500">
              rating ({tour.ratingsQuantity})
            </span>
          </p>
        </div>
        <Button
          variant="secondary"
          type="small"
          onClick={() => navigate(`/tours/${tour.id}`)}
        >
          Details
        </Button>
      </div>
    </motion.div>
  );
}

export default TourCard;
