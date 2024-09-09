"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils";
import Image from "next/image";

export interface PokemonDetail {
  name: string;
  id: number;
  description: string;
  colour: string;
} 


export const PokemonCard = (pokemon: PokemonDetail) => {
  const colourVariants: Record<string, string> = {
    blue: 'bg-blue-50 hover:ring-blue-500 text-blue-900',
    red: 'bg-red-50 hover:ring-red-500',
    green: 'bg-green-50 hover:ring-green-500',
    yellow: 'bg-yellow-50 hover:ring-yellow-500',
    black: 'bg-black-50 hover:ring-black-500',
    white: 'bg-white-50 hover:ring-white-500',
    brown: 'bg-yellow-800/10 hover:ring-yellow-950',
    purple: 'bg-purple-50 hover:ring-purple-500',
    pink: 'bg-pink-50 hover:ring-pink-500',
    gray: 'bg-gray-50 hover:ring-gray-500',
  }

  return (
   
  <Card className={cn("border-2 hover:ring-2 hover:ring-offset-2 hover:cursor-pointer transition group", colourVariants[pokemon.colour])}>
    <CardHeader>
    <CardTitle className="text-black">{pokemon.name.toUpperCase()}</CardTitle>
    <CardDescription>{pokemon.description}</CardDescription>
  </CardHeader>
  <CardContent className="flex justify-center">
    <Image className="group-hover:scale-110 transition group-hover:-rotate-6 group"
    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} 
    alt="Image of pokemon" 
    width={200} 
    height={200}/>    
  </CardContent>
  {/* <CardFooter>
    <p>Card Footer</p>
  </CardFooter> */}
  </Card>)
}