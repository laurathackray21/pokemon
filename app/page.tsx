import Image from "next/image";
import { PokemonCard, PokemonDetail } from "./_components/pokemon-card";
import { PokemonResponse, PokemonSpeciesResponse } from "./types";

async function getPokemonSpecies(name: string): Promise<PokemonSpeciesResponse> {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}/`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  return response.json();
}

async function getAllPokemon(): Promise<PokemonDetail[]> {  
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=50`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  const response = await res.json() as PokemonResponse;
  
  const summaries: PokemonDetail[] = [];
  for (const pokemon of response.results) {   
    const pokemonSpeciesData = await getPokemonSpecies(pokemon.name)
    const flavourEntry = pokemonSpeciesData.flavor_text_entries.find(p => p.language.name === 'en' && p.version.name === 'red')
    summaries.push( {
      name: pokemon.name,
      id: pokemonSpeciesData.id,
      description: flavourEntry?.flavor_text ?? 'No description available',
      colour: pokemonSpeciesData.color.name
    })
  }
  
  return summaries;
}

export default async function Home() {

  const pokemon = await getAllPokemon();

  return (
    <main className="flex min-h-screen flex-col ">
      <div className="container">
        <div className="flex gap-4 p-8">
          <Image
            src='/pokemon.svg'
            alt="Pokemon Logo"
            width={200}
            height={24}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pokemon.map((p: PokemonDetail) => (
            <PokemonCard 
              key={p.id} 
              {...p}>            
            </PokemonCard>))}      
        </div>
      </div>      
    </main>
  );
}



