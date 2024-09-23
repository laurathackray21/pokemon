"use client";
import { useState } from "react";
import CreatePokemonForm from "./CreatePokemonForm";
import { PokemonDetail } from "@/app/_components/PokemonCard";
import PreviewPokemon from "./PreviewPokemon";

export type PokemonFormType = {
  name: string;
  description: string;
  colour: string;
  imageFile: FileList;
};
export default function CreatePokemonPage() {
  const [pokemon, setPokemon] = useState<PokemonDetail>({
    name: "",
    description: "",
    colour: "",
    id: 0,
    imageUri: "",
  });

  function updatePokemon(pokemonDetail: PokemonFormType) {
    let imageUri = "";
    if (pokemonDetail.imageFile[0]) {
      imageUri = URL.createObjectURL(pokemonDetail.imageFile[0]);
    }

    setPokemon({
      colour: pokemonDetail.colour,
      description: pokemonDetail.description,
      id: pokemon.id,
      imageUri: imageUri,
      name: pokemonDetail.name,
    });
  }
  return (
    <div className="flex grow gap-8">
      <CreatePokemonForm
        className="grow"
        updatePokemon={updatePokemon}
      ></CreatePokemonForm>
      <PreviewPokemon
        className="grow"
        pokemonDetail={{ pokemon: pokemon }}
      ></PreviewPokemon>
    </div>
  );
}
