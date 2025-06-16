import { getAllPokemonDetails } from "./actions/getPokemonDetail";
import PokemonList from "./_components/PokemonList";
import { POKEMON_PER_PAGE } from "./consts/pokedex";
import { SearchParams } from "nuqs/server";
import { loadSearchParams } from "./pageSearchParams";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Home({ searchParams }: PageProps) {
  const { letter } = await loadSearchParams(searchParams);

  const initialPokemon = await getAllPokemonDetails(
    POKEMON_PER_PAGE,
    0,
    letter
  );
  return <PokemonList initialPokemon={initialPokemon}></PokemonList>;
}
