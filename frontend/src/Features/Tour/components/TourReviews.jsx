import TourReviewsCard from "./TourReviewsCard";

function TourReviews({ reviews }) {
  return (
    <div className="flex items-center overflow-x-scroll h-[50vh] md:h-[70vh] gap-16  ps-16 md:ps-56 pe-16">
      {reviews.map((review) => (
        <TourReviewsCard key={review.id} review={review}/>
      ))}
    </div>
  );
}

export default TourReviews;
