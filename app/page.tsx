import { getAllPokemonDetails } from "./actions/getPokemonDetail";
import PokemonList from "./_components/PokemonList";
import { POKEMON_PER_PAGE } from "./consts/pokedex";
import { createLoader, parseAsString, SearchParams } from "nuqs/server";

export const searchParams = {
  letter: parseAsString,
};

export const loadSearchParams = createLoader(searchParams);

interface PageProps {
  searchParams: Promise<SearchParams>;
}

export default async function Home({ searchParams }: PageProps) {
  const { letter } = await loadSearchParams(searchParams);

  const initialPokemon = await getAllPokemonDetails(
    POKEMON_PER_PAGE,
    0,
    letter
  );
  return <PokemonList initialPokemon={initialPokemon}></PokemonList>;
}
