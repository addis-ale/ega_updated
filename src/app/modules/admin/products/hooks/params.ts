import {
  createLoader,
  parseAsInteger,
  parseAsString,
  parseAsArrayOf,
} from "nuqs/server";
import { DEFAULT_PAGE } from "@/constants";

export const productFilterParams = {
  search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
  page: parseAsInteger
    .withDefault(DEFAULT_PAGE)
    .withOptions({ clearOnDefault: true }),
  catIds: parseAsArrayOf(parseAsString)
    .withDefault([])
    .withOptions({ clearOnDefault: true }),
};
export const loadSearchParams = createLoader(productFilterParams);
