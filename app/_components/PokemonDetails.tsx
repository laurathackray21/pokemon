"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { PokemonDetail } from "../types/pokemonDetail";

export interface PokemonDetailProps {
  pokemonDetails: PokemonDetail;
}

export const PokemonDetails = ({ pokemonDetails }: PokemonDetailProps) => {
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
      <div className="text-xl">{pokemonDetails.name.toUpperCase()}</div>
      <div className="text-muted-foreground text-sm">
        {pokemonDetails.description}
      </div>
      <div className="flex justify-center">
        <Image
          className="group-hover:scale-110 transition group-hover:-rotate-6 group"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonDetails.id}.png`}
          alt="Image of pokemon"
          width={200}
          height={200}
        />
      </div>
      <div
        className={cn(
          "text-sm border-2 rounded",
          colourVariants[pokemonDetails.colour]
        )}
      >
        <div className="p-4">Habitat: {pokemonDetails.habitat}</div>
      </div>
    </div>
  );
};
