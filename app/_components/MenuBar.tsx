import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ThemeSelector } from "./ThemeSelector";

export default function MenuBar() {
  return (
    <div className="bg-header border-b sticky top-0 backdrop-blur-sm">
      <div className="container flex gap-4 px-4 py-2 ">
        <Image src="/pokemon.svg" alt="Pokemon Logo" width={200} height={12} />
        <div className="flex grow justify-between items-center">
          <div className="items-center gap-4">
            <Link href="/" passHref>
              <Button variant="ghost">Pokedex</Button>
            </Link>
            <Link href="/pokemon/create" passHref>
              <Button variant="ghost">Create your own!</Button>
            </Link>
          </div>
          <ThemeSelector />
        </div>
      </div>
    </div>
  );
}
