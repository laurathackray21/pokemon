"use client";
import { useState } from "react";
import CreatePokemonForm from "./CreatePokemonForm";
import PreviewPokemon from "./PreviewPokemon";
import { PokemonDetail } from "@/app/types/pokemonDetail";
import { PokemonFormType } from "@/app/types/pokemonForm";

export default function CreatePokemon() {
  const [pokemon, setPokemon] = useState<PokemonDetail>({
    name: "",
    description: "",
    colour: "white",
    id: 0,
    imageUri: "",
  });

  function updatePokemon(pokemonDetail: PokemonFormType) {
    let imageUri = "";
    if (pokemonDetail.imageFiles?.[0]) {
      imageUri = URL.createObjectURL(pokemonDetail.imageFiles?.[0]);
    }

    setPokemon({
      colour: pokemonDetail.colour ?? null,
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
      <PreviewPokemon className="grow" pokemonDetail={pokemon}></PreviewPokemon>
    </div>
  );
}
