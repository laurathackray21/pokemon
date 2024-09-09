import { cn } from "@/lib/utils";
import Image from "next/image";

export interface PokemonDetailProps {
  name: string;
} 


async function getPokemonDetails(name: string) {
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

export const PokemonDetail = async (props: PokemonDetailProps) => {
  const pokemon = await getPokemonDetails(props.name);

  const colourVariants: Record<string, string> = {
    blue: 'bg-blue-50 hover:ring-blue-500 text-blue-900',
    red: 'bg-red-50 hover:ring-red-500',
    green: 'bg-green-50 hover:ring-green-500',
    yellow: 'bg-yellow-50 hover:ring-yellow-500',
    black: 'bg-black-50 hover:ring-black-500',
    white: 'bg-white-50 hover:ring-white-500',
    brown: 'bg-yellow-800/10 hover:ring-yellow-950',
    purple: 'bg-purple-50 hover:ring-purple-500',
    pink: 'bg-pink-50 hover:ring-pink-500',
    gray: 'bg-gray-50 hover:ring-gray-500',
  }

  return (
    <>
      <div>{pokemon.name}</div>
      <div>Habitat: {pokemon.habitat.name}</div>      
    </>
  )
}