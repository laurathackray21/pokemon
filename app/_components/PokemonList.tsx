"use client";
import { useEffect } from "react";
import { PokemonDetailResponse } from "../types/pokemonDetail";
import { getAllPokemonDetails } from "../actions/getPokemonDetail";
import { PokemonCard } from "./PokemonCard";
import { useInView } from "react-intersection-observer";
import { POKEMON_PER_PAGE } from "../consts/pokedex";
import EmptyState from "./EmptyState";
import { useInfiniteQuery } from "@tanstack/react-query";
import LoadingSpinner from "./LoadingSpinner";
import { useQueryState } from "nuqs";
import LetterFilter from "./LetterFilter";
import { PokemonDetailModal } from "./PokemonDetailModal";

interface PokemonListProps {
  initialPokemon: PokemonDetailResponse;
}

export default function PokemonList({ initialPokemon }: PokemonListProps) {
  const [scrollTrigger, isInView] = useInView();
  const [letterFilter, setLetterFilter] = useQueryState("letter");
  const [name, setName] = useQueryState("name");
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
  });

  useEffect(() => {
    if (isInView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [isInView, hasNextPage, isFetching, fetchNextPage]);

  const handlePokemonClick = (pokemonName: string) => {
    setName(pokemonName);
  };

  if (isFetching && !!letterFilter) {
    return <LoadingSpinner />;
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <LetterFilter
        letterFilter={letterFilter}
        setLetterFilter={setLetterFilter}
      />
      {!data?.pages[0].data.length && !isFetching ? (
        <EmptyState
          title="No Pokémon Found"
          description="Try searching for a different Pokémon or create your own!"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data?.pages.map((p: PokemonDetailResponse) =>
            p.data.map((pokemon) => (
              <div
                key={pokemon.id}
                onClick={() => handlePokemonClick(pokemon.name)}
              >
                <PokemonCard
                  key={pokemon.id}
                  pokemon={pokemon}
                  colour={pokemon.colour}
                ></PokemonCard>
              </div>
            ))
          )}
        </div>
      )}

      {hasNextPage ? <LoadingSpinner ref={scrollTrigger} /> : null}

      <PokemonDetailModal />
    </div>
  );
}
