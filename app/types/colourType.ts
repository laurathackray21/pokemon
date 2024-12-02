export const colourTypes = [
  "blue",
  "red",
  "green",
  "yellow",
  "black",
  "white",
  "brown",
  "purple",
  "pink",
  "gray",
] as const;
export type ColourType = (typeof colourTypes)[number];
