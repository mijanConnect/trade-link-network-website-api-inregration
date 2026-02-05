import { Skeleton } from "@/components/ui/skeleton";

export default function MyJobSkeleton() {
  return (
    <div>
      {" "}
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={`pending-skeleton-${index}`}
          className="border border-primary rounded-lg p-4"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-3">
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-full" />
            </div>
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}
