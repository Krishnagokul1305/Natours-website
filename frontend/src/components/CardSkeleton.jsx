function CardSkeleton({ size = 3 }) {
  const skeletonCards = Array.from({ length: size }, (_, index) => (
    <div
      key={index}
      className=" w-full mx-auto bg-white rounded-sm shadow-lg overflow-hidden animate-pulse"
    >
      <div className="w-full h-48 bg-gray-300"></div>
      <div className="p-4 space-y-4">
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>

        <div className="grid grid-cols-2 gap-3 items-center text-sm text-gray-600 ">
          <div className="h-4 bg-gray-300 rounded "></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded "></div>
          <div className="h-4 bg-gray-300 rounded "></div>
        </div>

        <div className="mt-4 grid grid-cols-2">
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
          <div className="h-10 w-3/4 ms-auto bg-teal-500 rounded-md"></div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 max-w-7xl mx-auto justify-center items-center gap-16 ">
      {skeletonCards}
    </div>
  );
}

export default CardSkeleton;
