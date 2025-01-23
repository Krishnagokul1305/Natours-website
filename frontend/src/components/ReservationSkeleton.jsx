function ReservationSkeleton({ count = 1 }) {
    return (
      <>
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="flex w-full items-center gap-4 bg-white rounded-lg border animate-pulse"
          >
            {/* Image skeleton */}
            <div className="h-full w-24 bg-gray-300"></div>
  
            {/* Content skeleton */}
            <div className="flex flex-col flex-1 space-y-4 p-4">
              {/* Title skeleton */}
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
  
              {/* Date skeleton */}
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
  
              {/* Price and status skeleton */}
              <div className="flex justify-between items-center">
                <div className="h-6 bg-gray-300 rounded w-1/4"></div>
                <div className="h-6 bg-gray-300 rounded w-1/6"></div>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }
  
  export default ReservationSkeleton;
  