import { FlavorTextEntry, Habitat, Variety } from "./api.types";

export interface PokemonSpeciesResponse {
  base_happiness: number;
  capture_rate: number;
  color: {
    name: string;
    url: string;
  };
  flavor_text_entries: FlavorTextEntry[];
  habitat: Habitat;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  order: number;
  varieties: Variety[];
  evolution_chain: {
    url: string;
  };
}
