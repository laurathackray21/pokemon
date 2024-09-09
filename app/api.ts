import { PokemonSpeciesResponse } from "./types";

export async function getDataFromUrl<TResponse>(
  url: string
): Promise<TResponse> {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

export async function getPokemonSpecies(
  name: string
): Promise<PokemonSpeciesResponse> {
  return getDataFromUrl(`https://pokeapi.co/api/v2/pokemon-species/${name}/`);
}
