import { ColourType } from "./_components/PokemonCard";

interface Language {
  name: string;
  url: string;
}

interface Version {
  name: string;
  url: string;
}

interface FlavorTextEntry {
  flavor_text: string;
  language: Language;
  version: Version;
}

interface Habitat {
  name: string;
  url: string;
}

interface Variety {
  is_default: boolean;
  pokemon: {
    name: string;
    url: string;
  };
}

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

export interface PokemonResponse {
  results: {
    name: string;
    url: string;
  }[];
}

interface EvolutionTrigger {
  name: string;
  url: string;
}

interface EvolutionDetails {
  gender: number | null;
  held_item: any | null;
  item: any | null;
  known_move: any | null;
  known_move_type: any | null;
  location: any | null;
  min_affection: number | null;
  min_beauty: number | null;
  min_happiness: number | null;
  min_level: number | null;
  needs_overworld_rain: boolean;
  party_species: any | null;
  party_type: any | null;
  relative_physical_stats: number | null;
  time_of_day: string;
  trade_species: any | null;
  trigger: EvolutionTrigger;
  turn_upside_down: boolean;
}

interface Species {
  name: string;
  url: string;
}

interface EvolvesTo {
  evolution_details: EvolutionDetails[];
  evolves_to: EvolvesTo[];
  is_baby: boolean;
  species: Species;
}

interface Chain {
  evolution_details: EvolutionDetails[];
  evolves_to: EvolvesTo[];
  is_baby: boolean;
  species: Species;
}

export interface EvolutionChainResponse {
  baby_trigger_item: any | null;
  chain: Chain;
  id: number;
}

export type PokemonDetail = {
  name: string;
  id: number;
  description: string;
  imageUri: string;
  colour: ColourType;
};
