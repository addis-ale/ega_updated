"use client";
import {
  DEFAULT_MAX_PRICE,
  DEFAULT_MIN_PRICE,
  purchaseType,
} from "@/constants";
import { Checkbox } from "@/components/ui/checkbox";
import { useSliderWithInput } from "@/hooks/use-slider-with-input";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { useProductsFilter } from "@/hooks/use-products-filter";

export const ProductFilter = () => {
  const minValue = DEFAULT_MIN_PRICE;
  const maxValue = DEFAULT_MAX_PRICE;
  const [{ catIds, rentOrSale }, setFilter] = useProductsFilter();
  //TODO: do the initial min and max by the products min and max from db
  const initialValue = [DEFAULT_MIN_PRICE, DEFAULT_MAX_PRICE];
  const {
    sliderValue,
    inputValues,
    validateAndUpdateValue,
    handleInputChange,
    handleSliderChange,
  } = useSliderWithInput({ minValue, maxValue, initialValue });
  //Input values here
  console.log(inputValues);
  const trpc = useTRPC();
  const { data: gameCategory } = useQuery(
    trpc.productCategories.getMany.queryOptions()
  );
  const toggleCategory = (id: string) => {
    if (catIds.includes(id)) {
      setFilter({ catIds: catIds.filter((cat) => cat !== id) });
    } else {
      setFilter({ catIds: [...catIds, id] });
    }
  };
  return (
    <div className="px-4 py-2 sticky top-44">
      <div className="flex flex-col gap-6">
        {/* category */}
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold">Category</h1>
          <div className="flex flex-col gap-2">
            {gameCategory?.map((cat) => (
              <div
                key={cat.id}
                className="flex gap-2 items-center text-muted-foreground "
              >
                <Checkbox
                  id={cat.id}
                  checked={catIds.includes(cat.id)}
                  onCheckedChange={() => toggleCategory(cat.id)}
                />
                <label htmlFor={cat.id} className="cursor-pointer text-sm">
                  {cat.name}
                </label>
              </div>
            ))}
          </div>
        </div>
        {/* price range */}
        <div className="flex flex-col gap-4">
          <div className="text-2xl font-semibold">Price Range</div>
          <div className="*:not-first:mt-3">
            <div className="grid grid-cols-3 items-center gap-4">
              {/* Min input */}
              <Input
                className="h-8  p-2 text-xs text-muted-foreground text-center"
                type="number"
                inputMode="decimal"
                value={inputValues[0]}
                onChange={(e) => {
                  handleInputChange(e, 0);
                  setFilter({ minPrice: +e.target.value });
                }}
                onBlur={() => validateAndUpdateValue(inputValues[0], 0)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    validateAndUpdateValue(inputValues[0], 0);
                  }
                }}
                aria-label="Enter minimum value"
              />

              {/* Slider */}
              <Slider
                className="grow"
                value={sliderValue}
                onValueChange={(val) => {
                  handleSliderChange(val);
                  setFilter({ minPrice: val[0], maxPrice: val[1] });
                }}
                min={minValue}
                max={maxValue}
                aria-label="Dual range slider with input"
              />

              {/* Max input */}
              <Input
                className="h-8 p-2 text-xs text-muted-foreground text-center"
                type="number"
                inputMode="decimal"
                value={inputValues[1]}
                onChange={(e) => {
                  handleInputChange(e, 1);
                  setFilter({ maxPrice: +e.target.value });
                }}
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
            <RadioGroup
              value={rentOrSale} // sync with state
              onValueChange={(value) =>
                setFilter({ rentOrSale: value as "RENT" | "BUY" | "BOTH" })
              }
            >
              {purchaseType.map((type) => (
                <div key={type} className="flex items-center gap-3">
                  <RadioGroupItem value={type} id={type} />
                  <Label
                    htmlFor={type}
                    className="text-muted-foreground cursor-pointer"
                  >
                    {type}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <Button className="cursor-pointer w-fit p-3 md:hidden">
            Apply filters
          </Button>
          <Button className="cursor-pointer w-fit p-3 ml-auto">
            Reset all
          </Button>
        </div>
      </div>
    </div>
  );
};
