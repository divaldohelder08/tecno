import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";
import { ReactNode } from "react";

interface props {
  isLoading: boolean
  children?: ReactNode | undefined
}
export default function SkeletContainer({ isLoading, children }: props) {
  return (
    <Skeleton className={cn("w-full h-full", !isLoading && "bg-transparent animate-none")}>
      {children}
    </Skeleton>
  )
}