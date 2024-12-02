"use server";
import { getDataFromUrl } from "../helpers/api";
import { PokemonResponse } from "../types/pokemon";

export async function getPokemon(
  limit: number = 50,
  offset: number = 0
): Promise<PokemonResponse> {
  return getDataFromUrl(
    `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
  );
}
