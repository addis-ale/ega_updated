"use client";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { Button } from "@/components/ui/button";
import DatePicker from "@/components/date-range";

interface RentalDatePickerProps {
  onConfirm: (date: DateRange) => void;
  onCancel?: () => void;
  defaultValue?: DateRange;
  confirmLabel?: string;
}

export const RentalDatePicker = ({
  onConfirm,
  onCancel,
  defaultValue,
  confirmLabel = "Set",
}: RentalDatePickerProps) => {
  const [date, setDate] = useState<DateRange | undefined>(
    defaultValue ?? {
      from: new Date(),
      to: addDays(new Date(), 3),
    }
  );

  const handleConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (date?.from && date?.to) {
      onConfirm(date);
    }
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (onCancel) onCancel();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="pt-2">
        <DatePicker value={date} onChange={setDate} />
      </div>

      <div className="flex gap-3">
        {onCancel && (
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        )}
        <Button
          className="bg-blue-500 hover:bg-blue-500 cursor-pointer"
          onClick={handleConfirm}
        >
          {confirmLabel}
        </Button>
      </div>
    </div>
  );
};
