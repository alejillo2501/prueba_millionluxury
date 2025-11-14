export default function PropertySkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-300 h-48 rounded-t-xl"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-3 bg-gray-300 rounded w-5/6"></div>
        <div className="h-5 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  );
}