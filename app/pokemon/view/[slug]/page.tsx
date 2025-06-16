"use server";
import { PokemonDetails } from "@/app/_components/PokemonDetails";
import { getPokemonDetails } from "@/app/actions/getPokemonDetail";

interface ViewPokemonPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ViewPokemonPage(props: ViewPokemonPageProps) {
  const params = await props.params;
  const pokemonDetails = await getPokemonDetails(params.slug);
  return <PokemonDetails pokemonDetails={pokemonDetails}></PokemonDetails>;
}
