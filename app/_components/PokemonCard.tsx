"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Description } from "@radix-ui/react-dialog";
import Image from "next/image";

export type PokemonDetail = {
  name: string;
  id: number;
  description: string;
  colour: string;
  imageUri: string;
};
export type PokemonDetailType = {
  pokemon: PokemonDetail;
};

export const PokemonCard = ({ pokemon }: PokemonDetailType) => {
  const colourVariants: Record<string, string> = {
    blue: "bg-blue-50 hover:ring-blue-500 text-blue-900",
    red: "bg-red-50 hover:ring-red-500",
    green: "bg-green-50 hover:ring-green-500",
    yellow: "bg-yellow-50 hover:ring-yellow-500",
    black: "bg-black-50 hover:ring-black-500",
    white: "bg-white-50 hover:ring-white-500",
    brown: "bg-yellow-800/10 hover:ring-yellow-950",
    purple: "bg-purple-50 hover:ring-purple-500",
    pink: "bg-pink-50 hover:ring-pink-500",
    gray: "bg-gray-50 hover:ring-gray-500",
  };

  return (
    <Card
      className={cn(
        "min-h-96 border-2 hover:ring-2 hover:ring-offset-2 hover:cursor-pointer transition group",
        colourVariants[pokemon.colour]
      )}
    >
      <CardHeader>
        <CardTitle className="text-black">
          {pokemon.name ? pokemon.name.toUpperCase() : "Name not found"}
        </CardTitle>
        <CardDescription>
          {pokemon.description ? pokemon.description : "Description not found"}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        {pokemon.imageUri ? (
          <Image
            className="group-hover:scale-110 transition group-hover:-rotate-6 group"
            src={pokemon.imageUri}
            alt="Image of pokemon"
            width={200}
            height={200}
          />
        ) : (
          <div>Image not found</div>
        )}
      </CardContent>
      {/* <CardFooter>
    <p>Card Footer</p>
  </CardFooter> */}
    </Card>
  );
};
