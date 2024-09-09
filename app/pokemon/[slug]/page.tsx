import { PokemonDetail } from "@/app/_components/PokemonDetail";

export default function Page({ params }: { params: { slug: string } }) {
  return <div className="container">
    <PokemonDetail name={params.slug}></PokemonDetail>
  </div>
}
