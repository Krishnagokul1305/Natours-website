import { useForm } from "react-hook-form";
import { useState } from "react";
import TourReviewsCard from "./TourReviewsCard";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postReview } from "../../../service/apiReview";
import toast from "react-hot-toast";

function TourReviews({ reviews, data, tourId }) {
  const [selectedRating, setSelectedRating] = useState(0);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const hasReviewed = reviews.some((review) => review.user._id === data?._id);

  const { mutate, isPending } = useMutation({
    mutationFn: postReview,
    onError(e) {
      toast.error(e.message || "Something went wrong");
    },
    onSuccess() {
      toast.success("Review posted successfully");
      reset();
      queryClient.invalidateQueries({ queryKey: ["tour", tourId] });
      setSelectedRating(0);
    },
  });

  const handleRatingChange = (star) => {
    setSelectedRating(star);
    setValue("rating", star);
  };

  const onSubmit = (formData) => {
    mutate({ review: formData, userId: data._id, tourId });
  };

  return (
    <div className="md:px-10 px-5 py-20 max-w-7xl mx-auto">
      {/* Heading */}
      <div className="text-center mb-10 space-y-3">
        <h2 className="text-3xl font-bold text-ptext font-oswald tracking-widest head">
          Reviews
        </h2>
        <p className="text-base text-gray-500 italic">
          &quot;Traveling – it leaves you speechless, then turns you into a
          storyteller.&quot;
        </p>
      </div>

      {reviews.length === 0 ? (
        <div className="bg-gray-50 border border-dashed border-gray-300 p-10 rounded-lg text-center mb-10 shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-12 w-12 text-gray-400 mb-4"
            fill="rgb(30 121 139 / var(--tw-text-opacity))"
            viewBox="0 0 24 24"
            stroke="rgb(30 121 139 / var(--tw-text-opacity))"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m4 0v-6a6 6 0 00-12 0v6"
            />
          </svg>
          <h3 className="text-lg font-semibold text-gray-600">
            No Reviews Yet
          </h3>
          <p className="text-gray-500 mt-1">
            Be the first to share your experience!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-center mb-10">
          {reviews.slice(0, 3).map((review) => (
            <TourReviewsCard key={review.id} review={review} />
          ))}
        </div>
      )}

      {/* Review Form */}
      {data && !hasReviewed && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex md:items-center gap-2 md:justify-between mb-2 flex-col md:flex-row justify-start">
            <h1 className="font-semibold text-lg text-gray-700">
              Write Your Review
            </h1>
            <div className="flex space-x-2 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  onClick={() => handleRatingChange(star)}
                  className={`w-6 h-6 cursor-pointer ${
                    selectedRating >= star ? "text-yellow-500" : "text-gray-300"
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

          <input
            type="hidden"
            {...register("rating", { required: "Rating is required" })}
          />
          {errors.rating && (
            <p className="text-red-500 text-sm mb-2">{errors.rating.message}</p>
          )}

          <div>
            <textarea
              {...register("review", {
                required: "Review description is required",
                minLength: { value: 10, message: "Minimum 10 characters" },
              })}
              rows="4"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-ptext focus:outline-none mb-2"
              placeholder="Write your review here..."
            ></textarea>
            {errors.review && (
              <p className="text-red-500 text-sm mb-4">
                {errors.review.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="ms-auto block bg-ptext text-white py-2 px-4 rounded-lg hover:bg-ptext/90 transition duration-200"
          >
            {isPending ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      )}
    </div>
  );
}

export default TourReviews;
