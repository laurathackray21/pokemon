import { PokemonCard, ColourType } from "./_components/PokemonCard";
import Link from "next/link";
import { getPokemon, getPokemonSpecies } from "./api";
import { PokemonDetail } from "./types";

async function getAllPokemon(): Promise<PokemonDetail[]> {
  const response = await getPokemon();
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

export default async function Home() {
  const pokemon = await getAllPokemon();

  return (
    <main className="flex min-h-screen flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pokemon.map((p: PokemonDetail) => (
          <Link key={p.id} href={`/pokemon/view/${p.name}`}>
            <PokemonCard key={p.id} pokemon={p} colour={p.colour}></PokemonCard>
          </Link>
        ))}
      </div>
    </main>
  );
}
