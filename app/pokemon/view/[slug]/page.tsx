"use server";
import { PokemonDetails } from "@/app/_components/PokemonDetails";
import { getPokemonDetails } from "@/app/actions/getPokemonDetail";

interface ViewPokemonPageProps {
  params: {
    slug: string;
  };
}

export default async function ViewPokemonPage({
  params,
}: ViewPokemonPageProps) {
  const pokemonDetails = await getPokemonDetails(params.slug);
  return <PokemonDetails pokemonDetails={pokemonDetails}></PokemonDetails>;
}
