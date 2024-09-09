import { cn } from "@/lib/utils";
import Image from "next/image";
import { getDataFromUrl, getPokemonSpecies } from "../api";
import { EvolutionChainResponse } from "../types";

export interface PokemonDetailProps {
  name: string;
} 

interface PokemonDetail {
  id: number;
  name: string;
  habitat: string;
  colour: string;
  description: string;
  // evolutionChain: EvolutionChain;
}


async function getPokemonDetails(name: string): Promise<PokemonDetail> {
  const pokemonSpecies = await getPokemonSpecies(name); //TODO add error handling
  const pokemonEvolutionChain = await getDataFromUrl<EvolutionChainResponse>(pokemonSpecies.evolution_chain.url); //TODO add error handling
  const flavourEntry = pokemonSpecies.flavor_text_entries.find(p => p.language.name === 'en' && p.version.name === 'red')
  return {
    id: pokemonSpecies.id,
    name: name,
    habitat: pokemonSpecies.habitat.name,
    // evolutionChain: pokemonEvolutionChain.chain,
    colour: pokemonSpecies.color.name,
    description: flavourEntry?.flavor_text ?? 'No description available',
  }
}


export const PokemonDetail = async (props: PokemonDetailProps) => {
  const pokemon = await getPokemonDetails(props.name);

  const colourVariants: Record<string, string> = {
    blue: 'bg-blue-50',
    red: 'bg-red-50',
    green: 'bg-green-50 ',
    yellow: 'bg-yellow-50',
    black: 'bg-black-50',
    white: 'bg-white-50',
    brown: 'bg-yellow-800/10',
    purple: 'bg-purple-50',
    pink: 'bg-pink-50',
    gray: 'bg-gray-50',
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="text-xl">{pokemon.name.toUpperCase()}</div>
      <div className="text-gray-500 text-sm">{pokemon.description}</div>
      <div className="flex justify-center">
        <Image className="group-hover:scale-110 transition group-hover:-rotate-6 group"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} 
          alt="Image of pokemon" 
          width={200} 
          height={200}/>    
      </div>
      <div className={cn("text-sm border-2 border-green-950/15 rounded", colourVariants[pokemon.colour])}>
        <div className="p-4">Habitat: {pokemon.habitat}</div>
      </div>
    </div>
  )
}