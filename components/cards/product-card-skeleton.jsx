export const ProductCardSkeleton = () => {
  return (
    <div className="flex flex-col rounded-xl bg-secondary-200 shadow-sm">
      <div className="px-6 py-3">
        <div className="h-4 w-[80%] animate-pulse rounded-lg bg-secondary-400" />
        <div className="mt-1.5 h-4 w-[75%] animate-pulse rounded-lg bg-secondary-400" />
        <div className="mt-1.5 h-7 w-14 animate-pulse rounded-lg bg-secondary-400" />
      </div>
      <div className="mt-3 flex-1 p-6 pb-1.5 pt-0">
        <div className="h-[200px] w-full animate-pulse rounded-lg bg-secondary-400" />
      </div>
      <div className="mt-1 flex flex-col items-center p-6 pt-0">
        <div className="flex w-full justify-between gap-2.5">
          <div className="h-10 flex-1 animate-pulse rounded-lg bg-secondary-400" />
          <div className="h-10 w-10 animate-pulse rounded-lg bg-secondary-400" />
          <div className="h-10 w-10 animate-pulse rounded-lg bg-secondary-400" />
        </div>
      </div>
    </div>
  );
};
