import { PokemonCard } from "@/app/_components/PokemonCard";
import { PokemonDetail } from "@/app/types/pokemonDetail";

import { cn } from "@/lib/utils";

export type PreviewPokemonProps = {
  className?: string;
  pokemonDetail: PokemonDetail;
};

export default function PreviewPokemon(props: PreviewPokemonProps) {
  return (
    <div className={cn(props.className, "grow max-w-96 min-h-[400px]")}>
      <PokemonCard
        pokemon={props.pokemonDetail}
        colour={props.pokemonDetail.colour}
      ></PokemonCard>
    </div>
  );
}
