import { cn } from "@/lib/utils";
import Image from "next/image";
import { getPokemonDetails } from "../actions/getPokemonDetail";

export interface PokemonDetailProps {
  name: string;
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
