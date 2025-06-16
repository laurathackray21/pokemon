import { createLoader, parseAsString } from "nuqs/server";

export const searchParams = {
  letter: parseAsString,
};

export const loadSearchParams = createLoader(searchParams);
