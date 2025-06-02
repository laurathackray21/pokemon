"use server";
import { ColourType } from "../types/colourType";
import { PokemonDetail } from "../types/pokemonDetail";
import { getPokemon } from "./getPokemon";
import { getPokemonSpecies } from "./getPokemonSpecies";

export async function getAllPokemonDetails(
  limit: number = 50,
  offset: number = 0
): Promise<PokemonDetail[]> {
  const response = await getPokemon(limit, offset);
  const summaries: PokemonDetail[] = [];
  for (const pokemon of response.results) {
    const pokemonSpeciesData = await getPokemonSpecies(pokemon.name);
    const flavourEntry = pokemonSpeciesData.flavor_text_entries.find(
      (p) => p.language.name === "en" && p.version.name === "red"
    );
    summaries.push({
      name: pokemon.name,
      id: pokemonSpeciesData.id,
      description: flavourEntry?.flavor_text ?? "No description available",
      colour: pokemonSpeciesData.color.name as ColourType,
      imageUri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonSpeciesData.id}.png`,
    });
  }

  return summaries;
}

export async function getPokemonDetails(name: string): Promise<PokemonDetail> {
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

export async function filterPokemonByLetter(letter: string): Promise<PokemonDetail[]> {
  const allPokemon = await getPokemon(151, 0);
  const filteredPokemon = allPokemon.results.filter((p) => p.name.startsWith(letter.toLowerCase()));
 
  const pokemonDetails: PokemonDetail[] = [];
  for (const p of filteredPokemon) {
    const details = await getPokemonDetails(p.name)    
    console.log(details)
    pokemonDetails.push(details);
  }
   console.log(pokemonDetails)

  return pokemonDetails;
}