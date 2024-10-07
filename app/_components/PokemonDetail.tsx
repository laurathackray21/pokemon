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
  const pokemonEvolutionChain = await getDataFromUrl<EvolutionChainResponse>(
    pokemonSpecies.evolution_chain.url
  ); //TODO add error handling
  const flavourEntry = pokemonSpecies.flavor_text_entries.find(
    (p) => p.language.name === "en" && p.version.name === "red"
  );
  return {
    id: pokemonSpecies.id,
    name: name,
    habitat: pokemonSpecies.habitat.name,
    // evolutionChain: pokemonEvolutionChain.chain,
    colour: pokemonSpecies.color.name,
    description: flavourEntry?.flavor_text ?? "No description available",
  };
}

export const PokemonDetail = async (props: PokemonDetailProps) => {
  const pokemon = await getPokemonDetails(props.name);

  const colourVariants: Record<string, string> = {
    blue: "bg-pokemon-blue",
    red: "bg-pokemon-red",
    green: "bg-pokemon-green ",
    yellow: "bg-pokemon-yellow",
    black: "bg-pokemon-black",
    white: "bg-pokemon-white",
    brown: "bg-pokemon-brown",
    purple: "bg-pokemon-purple",
    pink: "bg-pokemon-pink",
    gray: "bg-pokemon-gray",
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="text-xl">{pokemon.name.toUpperCase()}</div>
      <div className="text-muted-foreground text-sm">{pokemon.description}</div>
      <div className="flex justify-center">
        <Image
          className="group-hover:scale-110 transition group-hover:-rotate-6 group"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
          alt="Image of pokemon"
          width={200}
          height={200}
        />
      </div>
      <div
        className={cn(
          "text-sm border-2 rounded",
          colourVariants[pokemon.colour]
        )}
      >
        <div className="p-4">Habitat: {pokemon.habitat}</div>
      </div>
    </div>
  );
};
