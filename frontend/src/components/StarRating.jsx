const StarRating = ({ rating, onChange, editable = false }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => editable && onChange(star)}
          className={`${editable ? "cursor-pointer" : "cursor-default"}`}
        >
          <svg
            className={`w-6 h-6 ${
              rating >= star ? "text-yellow-500" : "text-gray-300"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        </button>
      ))}
    </div>
  );
};

export default StarRating;
