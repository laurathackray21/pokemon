"use client";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "next-themes";

export const ThemeSelector = () => {
  const { setTheme } = useTheme();
  // const setTheme = (theme: string) => {
  //   console.log(`Theme changed to: ${theme}`);
  //   document.body.className = theme;
  // };

  return (
    <div className="flex flex-row items-center gap-3">
      <Label>Theme:</Label>
      <Select onValueChange={(value) => setTheme(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="pokemon">Pokemon</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
