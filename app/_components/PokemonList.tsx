"use client";
import Link from "next/link";
import { forwardRef, LegacyRef, useEffect, useState } from "react";
import { PokemonDetail } from "../types/pokemonDetail";
import { filterPokemonByLetter as getFilteredPokemonDetailsByLetter, getAllPokemonDetails } from "../actions/getPokemonDetail";
import { PokemonCard } from "./PokemonCard";
import { Loader } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { POKEMON_PER_PAGE } from "../consts/pokedex";
import { Button } from "@/components/ui/button";
import EmptyState from "./EmptyState";

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

const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

export default function PokemonList({ initialPokemon }: PokemonListProps) {
  const [offset, setOffset] = useState(20);
  const [pokemon, setPokemon] = useState<PokemonDetail[]>(initialPokemon);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [scrollTrigger, isInView] = useInView();
  const [loading, setLoading] = useState(false);
  const [letterFilter, setLetterFilter] = useState<string | null>(null);


  const filterByLetter = async (letter: string) => {
    setLoading(true);
    setLetterFilter(letter);
    const filteredPokemon = await getFilteredPokemonDetailsByLetter(letter);
    if (filteredPokemon.length > POKEMON_PER_PAGE) {
      setHasMoreData(true);
    } else {
      setHasMoreData(false);
    }
    setPokemon(filteredPokemon);
    setLoading(false);
  }
  const clearLetterFilter = () => {
    setLetterFilter(null);
    setPokemon(initialPokemon);
    setHasMoreData(true);
  }

  useEffect(() => {
    if (isInView && hasMoreData && !loading) {
      setLoading(true);
      const loadMorePokemon = async () => {
        let result: PokemonDetail[] = [];
        if (letterFilter) {
          result = await getFilteredPokemonDetailsByLetter(letterFilter);          
        }
        else {
          result = await getAllPokemonDetails(POKEMON_PER_PAGE, offset);
        } 

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
      };

      loadMorePokemon();
    }
  }, [isInView, hasMoreData, loading, offset, letterFilter]);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="flex justify-between items-center mb-4 gap-2">
        <Button variant="secondary" className="font-bold mt-4 mb-2" onClick={()=>clearLetterFilter()}>All</Button>
        {letters.map((letter) => (
          <Button variant="secondary" key={letter} className="font-bold mt-4 mb-2" onClick={() => filterByLetter(letter)}>
            {letter}
          </Button>
      ))}
      </div>
      {pokemon.length === 0 && !loading ? (<EmptyState title="No Pokémon Found" description="Try searching for a different Pokémon or create your own!"/>) :
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pokemon.map((p: PokemonDetail) => (
          <Link key={p.id} href={`/pokemon/view/${p.name}`}>
            <PokemonCard key={p.id} pokemon={p} colour={p.colour}></PokemonCard>
          </Link>
        ))}
      </div>}

      {hasMoreData ? <LoadingSpinner ref={scrollTrigger} /> : null}
    </div>
  );
}
