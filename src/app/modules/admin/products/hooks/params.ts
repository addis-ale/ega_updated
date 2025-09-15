import {
  createLoader,
  parseAsInteger,
  parseAsString,
  parseAsArrayOf,
  parseAsStringEnum,
} from "nuqs/server";
import {
  DEFAULT_MAX_PRICE,
  DEFAULT_MIN_PRICE,
  DEFAULT_PAGE,
} from "@/constants";

export const productFilterParams = {
  search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
  page: parseAsInteger
    .withDefault(DEFAULT_PAGE)
    .withOptions({ clearOnDefault: true }),
  catIds: parseAsArrayOf(parseAsString)
    .withDefault([])
    .withOptions({ clearOnDefault: true }),
  minPrice: parseAsInteger
    .withDefault(DEFAULT_MIN_PRICE)
    .withOptions({ clearOnDefault: true }),
  maxPrice: parseAsInteger
    .withDefault(DEFAULT_MAX_PRICE)
    .withOptions({ clearOnDefault: true }),
  rentOrSale: parseAsStringEnum(["RENT", "BUY", "BOTH"])
    .withDefault("BOTH")
    .withOptions({ clearOnDefault: true }),
  sort: parseAsStringEnum([
    "NEWEST",
    "POPULAR",
    "PRICE_LOW_HIGH",
    "PRICE_HIGH_LOW",
  ])
    .withDefault("NEWEST")
    .withOptions({ clearOnDefault: true }),
};
export const loadSearchParams = createLoader(productFilterParams);
