"use client";
import { useState } from "react";
import CreatePokemonForm from "./CreatePokemonForm";
import { PokemonDetail } from "@/app/_components/PokemonCard";
import PreviewPokemon from "./previewPokemon";

export default function CreatePokemonPage() {
  const [pokemon, setPokemon] = useState<PokemonDetail>({
    name: "",
    description: "",
    colour: "",
    id: 0,
    imageUri: "",
  });

  function updatePokemon(PokemonDetail: Omit<PokemonDetail, "id">) {
    setPokemon({ ...PokemonDetail, id: pokemon.id });
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
