"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { colourTypes } from "@/app/types/colourType";
import { PokemonFormType } from "@/app/types/pokemonForm";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name must be no more than 50 characters" }),
  description: z
    .string()
    .min(2, { message: "Description must be at least 2 characters" })
    .max(1000, { message: "Name must be no more than 1000 characters" }),
  colour: z.enum(colourTypes),
  imageFiles: z.unknown().transform((value) => {
    return value as FileList;
  }),
});

export type CreatePokemonFormProps = {
  updatePokemon: (pokemon: PokemonFormType) => void;
  className?: string;
};

export default function CreatePokemonForm({
  updatePokemon,
  className,
}: CreatePokemonFormProps) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      colour: "white",
      imageFiles: undefined,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const fileRef = form.register("imageFiles");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(className, "space-y-8 grow")}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter name"
                  {...field}
                  onChange={(ev) => {
                    field.onChange(ev);
                    updatePokemon(form.getValues());
                  }}
                />
              </FormControl>
              <FormDescription>
                This is the display name of your pokemon.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter description"
                  {...field}
                  onChange={(ev) => {
                    field.onChange(ev);
                    updatePokemon(form.getValues());
                  }}
                />
              </FormControl>
              <FormDescription>
                This is the description of your pokemon.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="colour"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Colour</FormLabel>
              <Select
                onValueChange={(ev) => {
                  field.onChange(ev);
                  updatePokemon(form.getValues());
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a colour" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="red">Red</SelectItem>
                  <SelectItem value="green">Green</SelectItem>
                  <SelectItem value="blue">Blue</SelectItem>
                  <SelectItem value="yellow">Yellow</SelectItem>
                  <SelectItem value="black">Black</SelectItem>
                  <SelectItem value="white">White</SelectItem>
                  <SelectItem value="purple">Purple</SelectItem>
                  <SelectItem value="pink">Pink</SelectItem>
                  <SelectItem value="gray">Grey</SelectItem>
                  <SelectItem value="brown">Brown</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                This is the colour of your pokemon.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageFiles"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Add an image"
                  {...fileRef}
                  onChange={(ev) => {
                    const files = ev.target.files;
                    if (!files) {
                      return;
                    }
                    const file = files[0];

                    if (!file.type.startsWith("image/")) {
                      return;
                    }

                    field.onChange(files);
                    updatePokemon(form.getValues());
                  }}
                />
              </FormControl>
              <FormDescription>
                This is the image of your pokemon.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
