"use server";
import { PokemonDetailModal } from "@/app/_components/PokemonDetailModal";
import { PokemonDetails } from "@/app/_components/PokemonDetails";
import { getPokemonDetails } from "@/app/actions/getPokemonDetail";

interface PokemonModalProps {
  params: {
    slug: string;
  };
}

export default async function PokemonModal(props: PokemonModalProps) {
  const pokemonDetails = await getPokemonDetails(props.params.slug);
  return (
    <PokemonDetailModal
      title={pokemonDetails.name}
      description={pokemonDetails.description}
    >
      <PokemonDetails pokemonDetails={pokemonDetails}></PokemonDetails>
    </PokemonDetailModal>
  );
}
