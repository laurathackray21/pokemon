import { getAllPokemonDetails } from "./actions/getPokemonDetail";
import PokemonList from "./_components/PokemonList";

export const POKEMON_PER_PAGE = 20;

export default async function Home() {
  const initialPokemon = await getAllPokemonDetails(POKEMON_PER_PAGE, 0);
  console.log(initialPokemon);
  return (
    <main className="flex min-h-screen flex-col">
      <PokemonList initialPokemon={initialPokemon}></PokemonList>
    </main>
  );
}
