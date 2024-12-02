import { ColourType } from "./colourType";

export interface PokemonDetail {
  id: number;
  name: string;
  habitat?: string;
  colour: ColourType;
  description: string;
  imageUri: string;
  // evolutionChain: EvolutionChain;
}
