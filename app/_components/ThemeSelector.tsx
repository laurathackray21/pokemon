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
  const { setTheme, themes } = useTheme();
  return (
    <div className="flex flex-row items-center gap-3">
      <Label>Theme:</Label>
      <Select onValueChange={(value) => setTheme(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {themes.map((theme) => (
              <SelectItem key={theme} value={theme}>
                {theme.charAt(0).toUpperCase() + theme.slice(1)}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
