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
}

export interface PokemonResponse {
  results: {
    name: string;
    url: string;
  }[];
}
