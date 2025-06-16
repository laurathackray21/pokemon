"use client";
import Link from "next/link";
import { forwardRef, LegacyRef, useEffect, useState } from "react";
import { PokemonDetail, PokemonDetailResponse } from "../types/pokemonDetail";
import {
  filterPokemonByLetter as getFilteredPokemonDetailsByLetter,
  getAllPokemonDetails,
} from "../actions/getPokemonDetail";
import { PokemonCard } from "./PokemonCard";
import { Loader } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { POKEMON_PER_PAGE } from "../consts/pokedex";
import { Button } from "@/components/ui/button";
import EmptyState from "./EmptyState";
import { cn } from "@/lib/utils";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

interface PokemonListProps {
  initialPokemon: PokemonDetailResponse;
}

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

const letters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

export default function PokemonList({ initialPokemon }: PokemonListProps) {
  const [scrollTrigger, isInView] = useInView();
  const [letterFilter, setLetterFilter] = useState<string>("");
  const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["pokemon", letterFilter],
    queryFn: ({ pageParam = 0 }) =>
      getAllPokemonDetails(POKEMON_PER_PAGE, pageParam, letterFilter),
    initialPageParam: 0,
    initialData: {
      pages: [initialPokemon],
      pageParams: [0],
    },
    getNextPageParam: (
      lastPage: PokemonDetailResponse,
      allPages: PokemonDetailResponse[]
    ) => {
      if (lastPage?.data?.length < POKEMON_PER_PAGE) {
        return undefined; // No more data
      }

      // Calculate next offset
      return allPages.length * POKEMON_PER_PAGE;
    },
    staleTime: 0, // forces fresh fetch
  });

  useEffect(() => {
    if (isInView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [isInView, hasNextPage, isFetching, fetchNextPage]);

  function addFilterToQuery(letter: string) {
    setLetterFilter(letter);
  }

  if (isFetching && !!letterFilter) {
    return <LoadingSpinner />;
  }
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="flex justify-between items-center mb-4 gap-2">
        <Button
          variant="secondary"
          className="font-bold mt-4 mb-2"
          onClick={() => setLetterFilter("")}
        >
          All
        </Button>
        {letters.map((letter) => (
          <Button
            variant="secondary"
            key={letter}
            className={cn(
              "font-bold mt-4 mb-2 ring ring-transparent",
              letterFilter === letter && "ring-blue"
            )}
            onClick={() => addFilterToQuery(letter)}
          >
            {letter}
          </Button>
        ))}
      </div>
      {data?.pages.length === 0 && !isFetching ? (
        <EmptyState
          title="No Pokémon Found"
          description="Try searching for a different Pokémon or create your own!"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data?.pages.map((p: PokemonDetailResponse) =>
            p.data.map((pokemon) => (
              <Link key={pokemon.id} href={`/pokemon/view/${pokemon.name}`}>
                <PokemonCard
                  key={pokemon.id}
                  pokemon={pokemon}
                  colour={pokemon.colour}
                ></PokemonCard>
              </Link>
            ))
          )}
        </div>
      )}

      {hasNextPage ? <LoadingSpinner ref={scrollTrigger} /> : null}
    </div>
  );
}
