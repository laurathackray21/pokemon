import { getAllPokemonDetails } from "./actions/getPokemonDetail";
import PokemonList from "./_components/PokemonList";
import { POKEMON_PER_PAGE } from "./consts/pokedex";

export default async function Home() {
  const initialPokemon = await getAllPokemonDetails(POKEMON_PER_PAGE, 0);
  return (
    <main className="flex min-h-screen flex-col">
      <PokemonList initialPokemon={initialPokemon}></PokemonList>
    </main>
  );
}
