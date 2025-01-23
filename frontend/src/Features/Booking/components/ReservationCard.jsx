import { TOUR_COVER } from "../../../../config";
import { formatDate } from "../../../utils/helper";

function ReservationCard({ booking }) {
  return (
    <div className="flex flex-col md:flex-row border border-primary-800 text-gray-700 max-w-xl">
      {/* Image */}
      <div className="relative h-32 aspect-square">
        <img
          src={`${TOUR_COVER}/${booking.tour.imageCover}`}
          className="object-cover border-r border-primary-800 h-full w-full"
        />
      </div>

      {/* Content */}
      <div className="flex-grow px-6 py-3 flex flex-col">
        {/* Title */}
        <div className="flex justify-between flex-col md:flex-row items-start gap-2 mb-2">
          <h3 className="text-lg font-semibold">{booking.tour.name}</h3>
          <span className="bg-green-800 text-green-100 p-1 px-3 uppercase text-xs rounded-sm font-bold flex items-center">
            upcoming
          </span>
        </div>

        <p className="text-md text-primary-300">
          Sun, Oct 01 2023 &mdash; Thu, Oct 05 2023
        </p>

        <div className="flex gap-5 mt-2 md:mt-auto items-baseline">
          <p className="text-xl font-semibold text-ptext">
            ${booking.tour.price}
          </p>

          <p className="ml-auto text-sm text-primary-400">
            Booked {formatDate(booking.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ReservationCard;
