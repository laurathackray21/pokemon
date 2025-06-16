import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "./_components/ThemeProvider";
import { ThemeSelector } from "./_components/ThemeSelector";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import QueryClientProvider from "./_providers/QueryClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pokemon",
};

const themes = ["light", "dark", "pokemon"];

// Create a client
const queryClient = new QueryClient();

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={cn(inter.className, "bg-background-alt")}>
        <QueryClientProvider>
          <ReactQueryDevtools initialIsOpen={false} />
          <ThemeProvider
            attribute="class"
            themes={themes}
            defaultTheme="system"
          >
            <div className="bg-header border-b sticky top-0 backdrop-blur-sm">
              <div className="container flex gap-4 px-4 py-2 ">
                <Image
                  src="/pokemon.svg"
                  alt="Pokemon Logo"
                  width={200}
                  height={12}
                />
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
            <div className="container rounded-xl pb-8 mb-8 mt-4 flex bg-background">
              {modal}
              {children}
            </div>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
