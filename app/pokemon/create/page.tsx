"use client";

import CreatePokemon from "./CreatePokemon";

export type PokemonFormType = {
  name: string;
  description: string;
  colour: string;
  imageFile: FileList;
};
export default function CreatePokemonPage() {
  return <CreatePokemon></CreatePokemon>;
}
