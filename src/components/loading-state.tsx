"use client";

import { Spinner, type SpinnerProps } from "@/components/ui/kibo-ui/spinner";

const variants: SpinnerProps["variant"][] = ["bars"];

const LoadingState = () => (
  <div className="mt-44">
    <div className="flex items-center justify-center h-full w-full">
      {variants.map((variant) => (
        <div
          className="flex flex-col items-center justify-center gap-4"
          key={variant}
        >
          <Spinner key={variant} variant={variant} size={64} />
          <span className="font-mono text-muted-foreground text-lg">
            Loading
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default LoadingState;
