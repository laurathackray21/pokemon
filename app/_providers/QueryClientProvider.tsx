"use client";
import {
  QueryClient,
  QueryClientProvider as BaseProvider,
} from "@tanstack/react-query";
import { PropsWithChildren } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchInterval: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    },
  },
});

export default function QueryClientProvider({ children }: PropsWithChildren) {
  return <BaseProvider client={queryClient}>{children}</BaseProvider>;
}
