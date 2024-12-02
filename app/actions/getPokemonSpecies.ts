"use server";
import { getDataFromUrl } from "../helpers/api";
import { PokemonSpeciesResponse as PokemonSpecies } from "../types/pokemonSpecies";

export async function getPokemonSpecies(name: string): Promise<PokemonSpecies> {
  return getDataFromUrl(`https://pokeapi.co/api/v2/pokemon-species/${name}/`);
}
