"use client";
import Link from "next/link";
import { forwardRef, LegacyRef, useEffect, useState } from "react";
import { PokemonDetail } from "../types/pokemonDetail";
import { getAllPokemonDetails } from "../actions/getPokemonDetail";
import { PokemonCard } from "./PokemonCard";
import { POKEMON_PER_PAGE } from "../page";
import { Loader } from "lucide-react";
import { useInView } from "react-intersection-observer";

interface PokemonListProps {
  initialPokemon: PokemonDetail[];
}

const GENERATION_ONE_MAX_ID = 151;

const LoadingSpinner = forwardRef(function LoadingSpinner(
  _props,
  ref: LegacyRef<SVGSVGElement> | null
) {
  return (
    <div className="flex justify-center py-5">
      <Loader ref={ref} size={36} color="grey" className="animate-spin" />
    </div>
  );
});

export default function PokemonList({ initialPokemon }: PokemonListProps) {
  const [offset, setOffset] = useState(20);
  const [pokemon, setPokemon] = useState<PokemonDetail[]>(initialPokemon);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [scrollTrigger, isInView] = useInView();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isInView && hasMoreData && !loading) {
      if (isInView && hasMoreData) {
        setLoading(true);
        getAllPokemonDetails(POKEMON_PER_PAGE, offset).then((result) => {
          if (
            result.length === 0 ||
            result[result.length - 1].id >= GENERATION_ONE_MAX_ID
          ) {
            setHasMoreData(false);
            result = result.filter((p) => p.id <= GENERATION_ONE_MAX_ID);
          }

          setOffset((prevOffset) => prevOffset + POKEMON_PER_PAGE);
          setPokemon((prevPokemon) => [...prevPokemon, ...result]);
          setLoading(false);
        });
      }
    }
  }, [isInView, hasMoreData, loading, offset]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pokemon.map((p: PokemonDetail) => (
          <Link key={p.id} href={`/pokemon/view/${p.name}`}>
            <PokemonCard key={p.id} pokemon={p} colour={p.colour}></PokemonCard>
          </Link>
        ))}
      </div>

      {hasMoreData ? <LoadingSpinner ref={scrollTrigger} /> : null}
    </>
  );
}
