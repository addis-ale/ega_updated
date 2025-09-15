import { DEFAULT_PAGE } from "@/constants";
import {
  parseAsString,
  parseAsInteger,
  useQueryStates,
  parseAsArrayOf,
} from "nuqs";

export const useProductsFilter = () => {
  return useQueryStates({
    search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
    page: parseAsInteger
      .withDefault(DEFAULT_PAGE)
      .withOptions({ clearOnDefault: true }),
    catIds: parseAsArrayOf(parseAsString)
      .withDefault([])
      .withOptions({ clearOnDefault: true }),
  });
};
