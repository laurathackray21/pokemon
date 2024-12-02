import { ColourType } from "./colourType";

export type PokemonFormType = {
  name: string;
  description: string;
  colour: ColourType;
  imageFiles: FileList;
};
