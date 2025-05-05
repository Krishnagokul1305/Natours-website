import { useState } from "react";
import ReviewItem from "../../../components/ReviewItem";
import { getUserReviews } from "../../../service/apiReview";
import { useQuery } from "@tanstack/react-query";
import ReviewEditForm from "../../../components/EditReviewForm";

function UserReviews() {
  const [editingReview, setEditingReview] = useState(null);

  //   Fetch user reviews
  const {
    data: reviews = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userReviews"],
    queryFn: getUserReviews,
  });

  // const deleteMutation = useMutation({
  //   mutationFn: deleteReview,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["userReviews"] })
  //     showToast("Review deleted successfully", "success")
  //   },
  //   onError: (error) => {
  //     showToast(error.message || "Failed to delete review", "error")
  //   },
  // })

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 text-red-600 p-4 rounded-md">
          Error loading reviews: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="md:py-6 md:px-10 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-ptext">Your Reviews</h2>
        <p className="text-gray-600 text-sm mt-1">
          Manage all your product reviews
        </p>
      </div>

      {reviews?.length === 0 ? (
        <div className="bg-gray-50 p-8 text-center rounded-lg border border-dashed border-gray-300">
          <p className="text-gray-500">
            You haven&apos;t written any reviews yet.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews?.map((review) => (
            <ReviewItem
              key={review._id}
              review={review}
              onEdit={setEditingReview}
            />
          ))}
        </div>
      )}

      {editingReview && (
        <ReviewEditForm
          review={editingReview}
          onCancel={() => setEditingReview(null)}
          //   onSubmit={handleUpdate}
        />
      )}
    </div>
  );
}

export default UserReviews;
