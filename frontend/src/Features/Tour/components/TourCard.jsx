/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { calendar, flag, pin, user } from  "../../../assets/index";
import Button from "../../../components/Button";
import { formatDate } from "../../../utils/helper";

function TourCard({ tour }) {
  const navigate = useNavigate();

  return (
    <div className="shadow-lg hover:translate-y-[-10px] hover:shadow-xl transition-all max-w-[23rem]">
      {/* card img with header */}
      <div className="relative">
        <div className="h-70 relative card-picture">
          <img
            src={`http://127.0.0.1:8000/api/v1/public/img/toursCover/${tour.imageCover}`}
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
          {tour.difficulty} {tour.locations.length}-day tour
        </h4>
        <p className="card__text">{tour.summary}</p>
        <div className="grid grid-cols-2 ms-3 gap-5 text-sm">
          <div className="flex items-center gap-2">
            <img src={pin} alt="" className="h-[16px]" />
            <span>{tour.startLocation.description}</span>
          </div>
          <div className="flex items-center gap-2">
            <img src={calendar} alt="" className="h-[16px]" />
            <span>{formatDate(tour.startDates[0])}</span>
          </div>
          <div className="flex items-center gap-2">
            <img src={flag} alt="" className="h-[16px]" />
            <span>{tour.locations.length} stops</span>
          </div>
          <div className="flex items-center gap-2">
            <img src={user} alt="" className="h-[16px]" />
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
    </div>
  );
}

export default TourCard;
