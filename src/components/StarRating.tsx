"use client";
import { useState } from "react";
import { Star } from "lucide-react";

type StarRatingProps = {
  totalStars?: number;
  initialRating?: number;
  onChange?: (rating: number) => void;
  readOnly?: boolean;
};

const StarRating = ({
  totalStars = 5,
  initialRating = 0,
  onChange,
  readOnly = false,
}: StarRatingProps) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [rating, setRating] = useState(initialRating);

  const handleClick = (index: number) => {
    if (readOnly) return;
    setRating(index);
    onChange?.(index);
  };

  return (
    <div className="flex items-center space-x-1">
      {[...Array(totalStars)].map((_, i) => {
        const index = i + 1;
        return (
          <Star
            key={index}
            size={24}
            onClick={() => handleClick(index)}
            onMouseEnter={() => !readOnly && setHovered(index)}
            onMouseLeave={() => !readOnly && setHovered(null)}
            className={`cursor-pointer transition-colors ${
              (hovered ?? rating) >= index
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            } ${readOnly ? "cursor-default" : "hover:scale-110"}`}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
