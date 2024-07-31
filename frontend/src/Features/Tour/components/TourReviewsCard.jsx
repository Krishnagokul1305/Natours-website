import { dQuotes } from  "../../../assets/index";

function TourReviewsCard({ review }) {
  console.log(review);
  return (
    <div className="min-w-[300px] bg-gray-100 h-[300px] px-10 py-5 space-y-5 rounded-md">
      <img src={dQuotes} alt="" className="h-[40px] ms-auto" />
      <div className="flex items-center justify-between mt-5">
        <div className="flex items-center space-x-3">
          <div className="w-[50px] h-[50px] rounded-full bg-primary">
            {review.user.photo ? (
              <img src={review.user.photo} alt="" />
            ) : (
              <div className=""></div>
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
