import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "./_components/ThemeProvider";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import QueryClientProvider from "./_providers/QueryClientProvider";
import MenuBar from "./_components/MenuBar";

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
            <main>
              <MenuBar />
              <div className="flex min-h-screen w-full flex-col container rounded-xl pb-8 mb-8 mt-4 bg-background">
                {modal}
                {children}
              </div>
            </main>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
