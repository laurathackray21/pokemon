"use client";

import { ColourType } from "@/app/_components/PokemonCard";
import CreatePokemon from "./CreatePokemon";

export type PokemonFormType = {
  name: string;
  description: string;
  colour: ColourType;
  imageFile: FileList;
};
export default function CreatePokemonPage() {
  return <CreatePokemon></CreatePokemon>;
}
