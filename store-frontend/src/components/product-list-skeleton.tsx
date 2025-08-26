import { Skeleton } from "@/components/ui/skeleton";

export default function ProductListSkeleton() {
  return (
    <div className="flex flex-col space-y-3 mt-4">
      <Skeleton className="h-[116px] w-full rounded-xl" />
      <Skeleton className="h-[116px] w-full rounded-xl" />
      <Skeleton className="h-[116px] w-full rounded-xl" />
    </div>
  );
}
