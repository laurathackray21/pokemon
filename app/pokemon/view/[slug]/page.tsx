import { PokemonDetail } from "@/app/_components/PokemonDetail";

export default function ViewPokemonPage({
  params,
}: {
  params: { slug: string };
}) {
  return <PokemonDetail name={params.slug}></PokemonDetail>;
}
