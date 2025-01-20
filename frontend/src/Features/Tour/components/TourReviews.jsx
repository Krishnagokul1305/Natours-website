import { useState } from "react";
import TourReviewsCard from "./TourReviewsCard";

function TourReviews({ reviews }) {
  const [formData, setFormData] = useState({
    description: "",
    rating: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {};

  return (
    <div className="md:px-10 px-5 py-20 max-w-7xl mx-auto ">
      {/* Heading */}
      <div className="text-center mb-10 space-y-3">
        <h2 className="text-3xl font-bold text-ptext font-oswald tracking-widest head text-center">
          Reviews
        </h2>
        <p className="text-base text-gray-500 italic">
        &quot;Traveling – it leaves you speechless, then turns you into a
          storyteller.&quot;
        </p>
      </div>

      {/* Review Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center mb-10">
        {reviews.slice(0, 3).map((review) => (
          <TourReviewsCard key={review.id} review={review} />
        ))}
      </div>

      <div>
        <div className="flex md:items-center gap-2 md:justify-between mb-2 flex-col md:flex-row justify-start">
          <h1 className=" font-semibold text-lg text-gray-700">
            Write Your Review
          </h1>
          <div className="flex space-x-2 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                // onClick={() => handleRatingChange(star)}
                className={`w-6 h-6 cursor-pointer ${
                  formData.rating >= star ? "text-yellow-500" : "text-gray-300"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>
        </div>
        {/* Description Input */}
        <div>
          <textarea
            name="description"
            rows="4"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-ptext focus:outline-none mb-4"
            placeholder="Write your review here..."
            value={formData.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="ms-auto block bg-ptext text-white py-2 px-4 rounded-lg hover:bg-ptext/90 transition duration-200"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
}

export default TourReviews;
