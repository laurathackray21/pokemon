import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

export default function LetterFilter({
  letterFilter,
  setLetterFilter,
}: {
  letterFilter: string | null;
  setLetterFilter: (letter: string | null) => void;
}) {
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
            onClick={() => setLetterFilter(letter)}
          >
            {letter}
          </Button>
        ))}
      </div>
    </div>
  );
}
