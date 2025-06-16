"use client";
import Link from "next/link";
import { useEffect } from "react";
import { PokemonDetailResponse } from "../types/pokemonDetail";
import { getAllPokemonDetails } from "../actions/getPokemonDetail";
import { PokemonCard } from "./PokemonCard";
import { useInView } from "react-intersection-observer";
import { POKEMON_PER_PAGE } from "../consts/pokedex";
import { Button } from "@/components/ui/button";
import EmptyState from "./EmptyState";
import { cn } from "@/lib/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import LoadingSpinner from "./LoadingSpinner";
import { useQueryState } from "nuqs";

interface PokemonListProps {
  initialPokemon: PokemonDetailResponse;
}

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
  const [letterFilter, setLetterFilter] = useQueryState("letter");
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
          onClick={() => setLetterFilter(null)}
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
      {!data?.pages[0].data.length && !isFetching ? (
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
