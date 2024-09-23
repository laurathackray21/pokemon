import { PokemonCard, PokemonDetailType } from "@/app/_components/PokemonCard";
import { cn } from "@/lib/utils";

export type PreviewPokemonProps = {
  className?: string;
  pokemonDetail: PokemonDetailType;
};

export default function PreviewPokemon(props: PreviewPokemonProps) {
  return (
    <div className={cn(props.className, "grow max-w-96 min-h-[400px]")}>
      <PokemonCard pokemon={props.pokemonDetail.pokemon}></PokemonCard>
    </div>
  );
}
