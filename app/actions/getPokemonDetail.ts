"use server";
import { ColourType } from "../types/colourType";
import {
  GENERATION_ONE_MAX_ID,
  PokemonDetail,
  PokemonDetailResponse,
} from "../types/pokemonDetail";
import { getPokemon } from "./getPokemon";
import { getPokemonSpecies } from "./getPokemonSpecies";

export async function getAllPokemonDetails(
  limit: number = 50,
  offset: number = 0,
  letterFilter: string | null = null
): Promise<PokemonDetailResponse> {
  let pokemons;
  if (letterFilter) {
    const allPokemon = await getPokemon(GENERATION_ONE_MAX_ID, 0);
    pokemons = allPokemon.results.filter((p) =>
      p.name.startsWith(letterFilter.toLowerCase())
    );
  } else {
    const results = await getPokemon(limit, offset);
    pokemons = results.results;
  }
  const summaries: PokemonDetail[] = [];
  for (const pokemon of pokemons) {
    const pokemonSpeciesData = await getPokemonSpecies(pokemon.name);
    const flavourEntry = pokemonSpeciesData.flavor_text_entries.find(
      (p) => p.language.name === "en" && p.version.name === "red"
    );
    if (pokemonSpeciesData.id > GENERATION_ONE_MAX_ID) {
      continue; // Skip Pokémon that are not in Generation 1
    }
    summaries.push({
      name: pokemon.name,
      id: pokemonSpeciesData.id,
      description: flavourEntry?.flavor_text ?? "No description available",
      colour: pokemonSpeciesData.color.name as ColourType,
      imageUri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonSpeciesData.id}.png`,
    });
  }

  return {
    data: summaries,
  };
}

export async function getPokemonDetails(
  name: string | null
): Promise<PokemonDetail> {
  if (name == null) {
    throw new Error("Pokemon name cannot be null");
  }
  const pokemonSpecies = await getPokemonSpecies(name); //TODO add error handling
  // const pokemonEvolutionChain = await getDataFromUrl<EvolutionChainResponse>(
  //   pokemonSpecies.evolution_chain.url
  // ); //TODO add error handling
  const flavourEntry = pokemonSpecies.flavor_text_entries.find(
    (p) => p.language.name === "en" && p.version.name === "red"
  );
  return {
    id: pokemonSpecies.id,
    name: name,
    habitat: pokemonSpecies.habitat.name,
    imageUri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonSpecies.id}.png`,
    // evolutionChain: pokemonEvolutionChain.chain,
    colour: pokemonSpecies.color.name as ColourType,
    description: flavourEntry?.flavor_text ?? "No description available",
  };
}
