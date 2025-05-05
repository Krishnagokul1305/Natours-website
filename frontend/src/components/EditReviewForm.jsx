import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import StarRating from "./StarRating";
import { FaSave, FaTimes } from "react-icons/fa";
import { updateReview } from "../service/apiReview";

const ReviewEditForm = ({ review, onCancel }) => {
  const [formData, setFormData] = useState({
    rating: review?.rating || 5,
    review: review?.review || "",
  });
  const [errors, setErrors] = useState({});

  const queryClient = useQueryClient();

  // Update form data when review prop changes
  useEffect(() => {
    if (review) {
      setFormData({
        rating: review.rating || 5,
        review: review.review || "",
      });
    }
  }, [review]);

  const { mutate: updateReviewMutation, isPending } = useMutation({
    mutationFn: (data) => updateReview(review?._id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["userReviews"]);
      toast.success("Review updated successfully");
      onCancel();
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleRatingChange = (newRating) => {
    setFormData((prev) => ({
      ...prev,
      rating: newRating,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.review.trim()) {
      newErrors.review = "Review text is required";
    } else if (formData.review.trim().length < 10) {
      newErrors.review = "Review must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    updateReviewMutation(formData);
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 mb-5 hover:shadow-md transition-shadow relative">
      {isPending && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-xl">
          <div className="p-6">
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg font-medium text-xs md:text-sm">
            {review?.tour?.name || "Tour"}
          </div>

          <div className="flex gap-0 md:gap-3">
            <button
              type="button"
              onClick={onCancel}
              disabled={isPending}
              className="flex items-center gap-1.5 px-3 py-1.5 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors text-sm"
            >
              <FaTimes className="h-3.5 w-3.5" />
              <span>Cancel</span>
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center gap-1.5 px-3 py-1.5 text-blue-600 hover:text-white hover:bg-blue-600 bg-blue-50 rounded-lg transition-colors text-sm"
            >
              <FaSave className="h-3.5 w-3.5" />
              <span>{isPending ? "Saving..." : "Save"}</span>
            </button>
          </div>
        </div>

        {/* Rating selector */}
        <div className="flex items-center gap-3 justify-between">
          <div className="flex items-center gap-2">
            <StarRating
              rating={formData.rating}
              onChange={handleRatingChange}
              editable={true}
            />

            <span className="text-sm text-gray-500">
              ({formData.rating} of 5)
            </span>
          </div>

          <span className="text-sm text-gray-500">Editing review</span>
        </div>

        {/* Review text */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <textarea
            id="review"
            name="review"
            value={formData.review}
            onChange={handleChange}
            disabled={isPending}
            rows={4}
            className={`w-full outline-none focus:outline-none bg-transparent border-0 p-0 focus:ring-0 text-gray-700 leading-relaxed resize-none`}
            placeholder="Share your experience with this tour..."
          />
          {errors.review && (
            <p className="text-sm text-red-600 mt-2">{errors.review}</p>
          )}
        </div>

        {/* Review metadata */}
        <div className="flex flex-wrap justify-between items-center text-xs text-gray-500 pt-2 border-t border-gray-100">
          <span>Review ID: {review?._id?.substring(0, 8)}...</span>
          <span>Editing: {new Date().toLocaleString()}</span>
        </div>
      </form>
    </div>
  );
};

export default ReviewEditForm;
