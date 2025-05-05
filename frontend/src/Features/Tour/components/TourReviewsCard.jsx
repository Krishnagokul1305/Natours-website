// import { dQuotes, defaultuser } from "../../../assets/index";

import { USER_IMG } from "../../../../config";

function TourReviewsCard({ review }) {
  return (
    <div className=" bg-white h-full px-8 py-6 space-y-5 rounded-lg shadow-md">
      {/* Star Ratings */}
      <div className="flex space-x-1">
        {Array.from({ length: 5 }, (_, i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            fill={i < review.rating ? "#FFC107" : "#E0E0E0"}
            viewBox="0 0 24 24"
            width="20"
            height="20"
          >
            <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.785 1.4 8.185L12 18.897l-7.334 3.861 1.4-8.185L.132 9.21l8.2-1.192z" />
          </svg>
        ))}
      </div>

      {/* Review Text */}
      <p className="text-gray-700 text-sm font-medium leading-relaxed">
        {review.review}
      </p>

      {/* User Info */}
      <div className="flex items-center space-x-3 mt-4">
        <div className="w-[50px] h-[50px] rounded-full overflow-hidden bg-gray-200">
          {review.user.photo != "default.jpg" ? (
            <img
              src={
                `${USER_IMG}/${review.user.photo}` ||
                "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2511"
              }
              alt={review.user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              width="50"
              height="50"
              className="text-gray-400"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm3-12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 7a7.489 7.489 0 0 1 6-3 7.489 7.489 0 0 1 6 3 7.489 7.489 0 0 1-6 3 7.489 7.489 0 0 1-6-3Z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
        <div>
          <h1 className="text-gray-900 text-sm font-semibold">
            {review.user.name}
          </h1>
          <p className="text-gray-500 text-xs">User</p>
        </div>
      </div>
    </div>
  );
}

export default TourReviewsCard;
