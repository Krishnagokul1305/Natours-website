import { dQuotes, defaultuser } from "../../../assets/index";

function TourReviewsCard({ review }) {
  return (
    <div className="min-w-[300px] bg-gray-100 h-[300px] px-10 py-5 space-y-5 rounded-md">
      <img src={dQuotes} alt="" className="h-[40px] ms-auto" />
      <div className="flex items-center justify-between mt-5">
        <div className="flex items-center space-x-3">
          <div className="w-[40px] h-[40px] rounded-full bg-primary">
            {review.user.photo ? (
              <img src={defaultuser} alt="" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                id="user"
              >
                <path
                  fill="#000"
                  fillRule="evenodd"
                  d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm3-12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 7a7.489 7.489 0 0 1 6-3 7.489 7.489 0 0 1 6 3 7.489 7.489 0 0 1-6 3 7.489 7.489 0 0 1-6-3Z"
                  clipRule="evenodd"
                ></path>
              </svg>
            )}
          </div>
          <h1>{review.user.name}</h1>
        </div>
      </div>

      <div className="mt-auto">
        <p className="text-sm">{review.review}</p>
      </div>
    </div>
  );
}

export default TourReviewsCard;
