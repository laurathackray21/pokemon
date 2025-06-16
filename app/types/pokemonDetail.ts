import { ColourType } from "./colourType";

export const GENERATION_ONE_MAX_ID = 151;

export interface PokemonDetail {
  id: number;
  name: string;
  habitat?: string;
  colour: ColourType;
  description: string;
  imageUri: string;
}

export interface PokemonDetailResponse {
  data: PokemonDetail[];  
  previousCursor?: number;
  nextCursor?: number;
}
