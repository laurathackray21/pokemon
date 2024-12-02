export interface Language {
  name: string;
  url: string;
}

export interface Version {
  name: string;
  url: string;
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: Language;
  version: Version;
}

export interface Habitat {
  name: string;
  url: string;
}

export interface Variety {
  is_default: boolean;
  pokemon: {
    name: string;
    url: string;
  };
}

export interface EvolutionTrigger {
  name: string;
  url: string;
}

export interface EvolutionDetails {
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

export interface Species {
  name: string;
  url: string;
}

export interface EvolvesTo {
  evolution_details: EvolutionDetails[];
  evolves_to: EvolvesTo[];
  is_baby: boolean;
  species: Species;
}

export interface Chain {
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
