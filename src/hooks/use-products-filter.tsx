import {
  parseAsString,
  parseAsInteger,
  useQueryStates,
  parseAsArrayOf,
  parseAsStringEnum,
} from "nuqs";
import {
  DEFAULT_MAX_PRICE,
  DEFAULT_MIN_PRICE,
  DEFAULT_PAGE,
} from "@/constants";

export const useProductsFilter = () => {
  return useQueryStates({
    search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
    page: parseAsInteger
      .withDefault(DEFAULT_PAGE)
      .withOptions({ clearOnDefault: true }),
    minPrice: parseAsInteger
      .withDefault(DEFAULT_MIN_PRICE)
      .withOptions({ clearOnDefault: true }),
    maxPrice: parseAsInteger
      .withDefault(DEFAULT_MAX_PRICE)
      .withOptions({ clearOnDefault: true }),
    catIds: parseAsArrayOf(parseAsString)
      .withDefault([])
      .withOptions({ clearOnDefault: true }),
    rentOrSale: parseAsStringEnum(["RENT", "BUY", "BOTH"])
      .withDefault("BOTH")
      .withOptions({ clearOnDefault: true }),
  });
};
