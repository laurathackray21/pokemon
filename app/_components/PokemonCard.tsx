"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import Image from "next/image";

export type PokemonCardProps = {
  pokemon: {
    name: string;
    id: number;
    description: string;
    imageUri: string;
  };
} & VariantProps<typeof pokemonCardVariants>;

const pokemonCardVariants = cva(
  "min-h-96 border-2 hover:ring-2 hover:ring-offset-2 hover:ring-offset-background hover:cursor-pointer transition group",
  {
    variants: {
      colour: {
        blue: "bg-pokemon-blue hover:ring-pokemon-blue-foreground",
        red: "bg-pokemon-red hover:ring-pokemon-red-foreground",
        green: "bg-pokemon-green hover:ring-pokemon-green-foreground",
        yellow: "bg-pokemon-yellow hover:ring-pokemon-yellow-foreground",
        black: "bg-pokemon-black hover:ring-pokemon-black-foreground",
        white: "bg-pokemon-white hover:ring-pokemon-white-foreground",
        brown: "bg-pokemon-brown hover:ring-pokemon-brown-foreground",
        purple: "bg-pokemon-purple hover:ring-pokemon-purple-foreground",
        pink: "bg-pokemon-pink hover:ring-pokemon-pink-foreground",
        gray: "bg-pokemon-gray hover:ring-pokemon-gray-foreground",
      },
    },
    defaultVariants: {
      colour: "white",
    },
  }
);

export const PokemonCard = ({ pokemon, colour }: PokemonCardProps) => {
  return (
    <Card className={cn(pokemonCardVariants({ colour }))}>
      <CardHeader>
        <CardTitle className="text-foreground">
          {pokemon.name ? (
            pokemon.name.toUpperCase()
          ) : (
            <div className="h-8 w-full rounded-xl">Enter a name</div>
          )}
        </CardTitle>
        <CardDescription>
          {pokemon.description ? (
            pokemon.description
          ) : (
            <div className="h-8 w-full rounded-xl">Enter a description</div>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className={cn("flex justify-center")}>
        {pokemon.imageUri ? (
          <Image
            className="group-hover:scale-110 transition group-hover:-rotate-6 group"
            src={pokemon.imageUri}
            alt="Image of pokemon"
            width={200}
            height={200}
          />
        ) : (
          <div className="h-72 w-full rounded-xl bg-muted items-center justify-center text-center flex">
            Add an image
          </div>
        )}
      </CardContent>
    </Card>
  );
};
