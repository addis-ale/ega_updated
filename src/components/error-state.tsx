"use client";

import { AlertCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ErrorState = () => {
  // Optional reload handler
  const handleReload = () => {
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  return (
    <div className="py-4 px-8 flex flex-1 items-center justify-center h-[50vh] mt-44">
      <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-2xl p-10 shadow-sm border">
        <AlertCircleIcon className="size-8 text-red-500" />
        <div className="flex flex-col gap-y-2 text-center">
          <h6 className="text-lg font-semibold">Something went wrong</h6>
          <p className="text-sm text-muted-foreground max-w-sm">
            We couldn’t load this content. Please try again or refresh the page.
          </p>
        </div>
        <Button variant="outline" onClick={handleReload}>
          Refresh Page
        </Button>
      </div>
    </div>
  );
};
