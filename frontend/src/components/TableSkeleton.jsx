function TableSkeleton() {
  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b text-left">
            <div className="skeleton w-12 h-4 bg-gray-300 animate-pulse"></div>
          </th>
          <th className="py-2 px-4 border-b text-left">
            <div className="skeleton w-32 h-4 bg-gray-300 animate-pulse"></div>
          </th>
          <th className="py-2 px-4 border-b text-left">
            <div className="skeleton w-24 h-4 bg-gray-300 animate-pulse"></div>
          </th>
          <th className="py-2 px-4 border-b text-left">
            <div className="skeleton w-32 h-4 bg-gray-300 animate-pulse"></div>
          </th>
          <th className="py-2 px-4 border-b text-left">
            <div className="skeleton w-16 h-4 bg-gray-300 animate-pulse"></div>
          </th>
        </tr>
      </thead>
      <tbody>
        {new Array(5).fill(null).map((_, index) => (
          <tr key={index} className="border-b">
            <td className="py-5 px-4 ">
              <div className="skeleton w-12 h-4 bg-gray-300 animate-pulse"></div>
            </td>
            <td className="py-2 px-4 ">
              <div className="skeleton w-32 h-4 bg-gray-300 animate-pulse"></div>
            </td>
            <td className="py-2 px-4 ">
              <div className="skeleton w-24 h-4 bg-gray-300 animate-pulse"></div>
            </td>
            <td className="py-2 px-4 ">
              <div className="skeleton w-32 h-4 bg-gray-300 animate-pulse"></div>
            </td>
            <td className="py-2 px-4 ">
              <div className="skeleton w-16 h-4 bg-gray-300 animate-pulse"></div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableSkeleton;
