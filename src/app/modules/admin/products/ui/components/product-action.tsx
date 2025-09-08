"use client";

import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  disabled: boolean;
  isPosted: boolean;
  onRemove: () => void;
  onPublish: (value: boolean) => void;
}
export const ProductActions = ({
  disabled,
  isPosted,
  onRemove,
  onPublish,
}: Props) => {
  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={() => onPublish(isPosted)}
        disabled={disabled}
        variant={"outline"}
        size={"sm"}
      >
        {isPosted ? "Unpost" : "Post"}
      </Button>
      <Button size={"sm"} variant={"destructive"} onClick={onRemove}>
        <Trash />
      </Button>
    </div>
  );
};
