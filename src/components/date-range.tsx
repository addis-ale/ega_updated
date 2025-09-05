"use client";

import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";

type Props = {
  value?: DateRange;
  onChange: (value: DateRange | undefined) => void;
};

export default function DatePicker({ value, onChange }: Props) {
  return (
    <div className="mx-auto">
      <Calendar
        mode="range"
        selected={value}
        onSelect={onChange}
        className="rounded-md border p-2"
        classNames={{
          day: "relative before:absolute before:inset-y-px before:inset-x-0 [&.range-start:not(.range-end):before]:bg-linear-to-r before:from-transparent before:from-50% before:to-accent before:to-50% [&.range-end:not(.range-start):before]:bg-linear-to-l",
          day_button:
            "rounded-full group-[.range-start:not(.range-end)]:rounded-e-full group-[.range-end:not(.range-start)]:rounded-s-full",
        }}
      />
    </div>
  );
}
