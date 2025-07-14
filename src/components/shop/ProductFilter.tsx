"use client";
import { gameCategory, purchaseType } from "@/constants";
import { Checkbox } from "../ui/checkbox";
import { useSliderWithInput } from "@/hooks/use-slider-with-input";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "../ui/button";

const ProductFilter = () => {
  const minValue = 0;
  const maxValue = 10000;
  const initialValue = [50, 150];
  const {
    sliderValue,
    inputValues,
    validateAndUpdateValue,
    handleInputChange,
    handleSliderChange,
  } = useSliderWithInput({ minValue, maxValue, initialValue });
  //Input values here
  console.log(inputValues);
  return (
    <div>
      <div className="flex flex-col gap-6">
        {/* category */}
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold">Category</h1>
          <div className="flex flex-col gap-2">
            {gameCategory.map((cat) => (
              <div
                key={cat.id}
                className="flex gap-2 items-center text-muted-foreground "
              >
                <Checkbox id={cat.id} />
                <label htmlFor={cat.id} className="cursor-pointer text-sm">
                  {cat.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        {/* price range */}
        <div className="flex flex-col gap-4">
          <div className="text-2xl font-semibold">Price Range</div>
          <div className="*:not-first:mt-3">
            <div className="flex items-center gap-4">
              <Input
                className="h-8 w-28 p-2 text-xs text-muted-foreground text-center"
                type="text"
                inputMode="decimal"
                value={inputValues[0]}
                onChange={(e) => handleInputChange(e, 0)}
                onBlur={() => validateAndUpdateValue(inputValues[0], 0)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    validateAndUpdateValue(inputValues[0], 0);
                  }
                }}
                aria-label="Enter minimum value"
              />
              <Slider
                className="grow"
                value={sliderValue}
                onValueChange={handleSliderChange}
                min={minValue}
                max={maxValue}
                aria-label="Dual range slider with input"
              />
              <Input
                className="h-8 w-28 p-2 text-xs text-muted-foreground text-center"
                type="text"
                inputMode="decimal"
                value={inputValues[1]}
                onChange={(e) => handleInputChange(e, 1)}
                onBlur={() => validateAndUpdateValue(inputValues[1], 1)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    validateAndUpdateValue(inputValues[1], 1);
                  }
                }}
                aria-label="Enter maximum value"
              />
            </div>
          </div>
        </div>
        {/* type select */}
        <div className="flex flex-col gap-4">
          <div className="text-2xl font-semibold">Purchase Type</div>
          <div className="flex flex-col gap-2">
            <RadioGroup defaultValue="Both">
              {purchaseType.map((type) => (
                <div key={type} className="flex items-center gap-3 ">
                  <RadioGroupItem value={type} id={type} />
                  <Label htmlFor={type} className="text-muted-foreground">
                    {type}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
        <div className="flex">
          <Button className="cursor-pointer w-fit p-3 ml-auto">
            Reset all
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
