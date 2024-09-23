import { PokemonCard, PokemonDetail } from "./_components/PokemonCard";
import Link from "next/link";
import { getPokemon, getPokemonSpecies } from "./api";

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
      colour: pokemonSpeciesData.color.name,
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
          <Link key={p.id} href={`/pokemon/${p.name}`}>
            <PokemonCard key={p.id} {...p}></PokemonCard>
          </Link>
        ))}
      </div>
    </main>
  );
}
