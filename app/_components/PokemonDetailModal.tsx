"use client";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { PokemonDetails } from "./PokemonDetails";
import { useQuery } from "@tanstack/react-query";
import { getPokemonDetails } from "../actions/getPokemonDetail";
import LoadingSpinner from "./LoadingSpinner";
import { useQueryState } from "nuqs";

export function PokemonDetailModal() {
  const [name, setName] = useQueryState("name");

  const { data, isFetching, isError, isPending } = useQuery({
    queryKey: ["pokemonDetail"],
    queryFn: () => getPokemonDetails(name),
    enabled: !!name,
  });

  if (isFetching || isPending) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <div>Error!</div>;
  }

  return (
    <Dialog open={name !== null} onOpenChange={() => setName(null)}>
      <DialogContent>
        <VisuallyHidden>
          <DialogHeader>
            <DialogTitle>{data?.name}</DialogTitle>
            <DialogDescription>{data?.description}</DialogDescription>
          </DialogHeader>
        </VisuallyHidden>
        <PokemonDetails pokemonDetails={data}></PokemonDetails>
      </DialogContent>
    </Dialog>
  );
}
