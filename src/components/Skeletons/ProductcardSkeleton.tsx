function ProductCardSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm flex flex-col justify-between h-full">
      <div className="relative">
        <div className="w-full h-60 bg-gray-200 animate-pulse" />

        <div className="absolute top-3 left-3">
          <div className="w-10 h-5 bg-gray-300 animate-pulse rounded" />
        </div>

        <div className="absolute top-3 right-3 flex flex-col space-y-2">
          <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse" />
          <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse" />
          <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse" />
        </div>
      </div>

      <div className="p-4 flex flex-col gap-2">
        <div className="w-16 h-3 bg-gray-200 animate-pulse rounded" />

        <div className="space-y-1.5 min-h-10">
          <div className="w-full h-3.5 bg-gray-200 animate-pulse rounded" />
          <div className="w-4/5 h-3.5 bg-gray-200 animate-pulse rounded" />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-3.5 h-3.5 bg-gray-200 animate-pulse rounded-sm"
              />
            ))}
          </div>
          <div className="w-14 h-3 bg-gray-200 animate-pulse rounded" />
        </div>

        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-2">
            <div className="w-20 h-5 bg-gray-200 animate-pulse rounded" />
            <div className="w-14 h-4 bg-gray-200 animate-pulse rounded" />
          </div>

          <div className="w-9 h-9 rounded-full bg-gray-200 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default ProductCardSkeleton;
