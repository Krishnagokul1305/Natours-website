import { FaPencilAlt, FaTrash } from "react-icons/fa";
import StarRating from "./StarRating";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReview } from "../service/apiReview";
import toast from "react-hot-toast";

const ReviewItem = ({ review, onEdit = () => {} }) => {
  const queryClient = useQueryClient();
  const { mutate: deleteReviewMutation, isPending } = useMutation({
    mutationFn: (id) => deleteReview(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["userReviews"]);
      toast.success("Review deleted successfully");
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong");
    },
  });
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

      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg font-medium text-xs md:text-sm">
            {review?.tour?.name || "Tour"}
          </div>

          <div className="flex gap-0 md:gap-3">
            <button
              onClick={() => onEdit(review)}
              disabled={isPending}
              className="flex items-center gap-1.5 px-3 py-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm"
            >
              <FaPencilAlt className="h-3.5 w-3.5" />
              <span>Edit</span>
            </button>
            <button
              disabled={isPending}
              onClick={() => deleteReviewMutation(review._id)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm"
            >
              <FaTrash className="h-3.5 w-3.5" />
              <span>Delete</span>
            </button>
          </div>
        </div>

        {/* Rating and date */}
        <div className="flex items-center gap-3 justify-between">
          <StarRating rating={review.rating} />
          <span className="text-sm text-gray-500">
            {new Date(review.createdAt).toLocaleDateString()}
          </span>
        </div>

        {/* Review content */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-700 leading-relaxed">
            {review?.review || ""}
          </p>
        </div>

        {/* Review metadata */}
        <div className="flex flex-wrap justify-between items-center text-xs text-gray-500 pt-2 border-t border-gray-100">
          <span>Review ID: {review._id?.substring(0, 8)}...</span>
          <span>Posted: {new Date(review.createdAt).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
