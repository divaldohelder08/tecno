"use client";
import { getErrorMessage } from "@/utils/get-error-message";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@/lib/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PropsWithChildren } from "react";
import { Toaster as Sonner } from "sonner";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { useState } from "react"

export function Provider({ children }: PropsWithChildren) {
  let displayedNetworkFailureError = false;
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry(failureCount) {
          if (failureCount >= 3) {
            if (!displayedNetworkFailureError) {
              displayedNetworkFailureError = true;
              toast.error(
                'A aplicação está demorando mais que o esperado para carregar, tente novamente em alguns minutos.',
                {
                  onDismiss: () => {
                    displayedNetworkFailureError = false;
                  },
                },
              );
            }
            return false;
          }
          return true;
        },
      },
      mutations: {
        onError(error) {
          toast.error(getErrorMessage(error));
        },
      },
    },
  }));
  return (
      <QueryClientProvider client={queryClient}>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
        <EdgeStoreProvider>
          <TooltipProvider delayDuration={0}>
            {children}
            <Sonner richColors />
          </TooltipProvider>
        </EdgeStoreProvider>
    </ThemeProvider >
      <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
  )
}






export default function Providers({ children }: PropsWithChildren) {
  let displayedNetworkFailureError = false;
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry(failureCount) {
          if (failureCount >= 3) {
            if (!displayedNetworkFailureError) {
              displayedNetworkFailureError = true;
              toast.error(
                'A aplicação está demorando mais que o esperado para carregar, tente novamente em alguns minutos.',
                {
                  onDismiss: () => {
                    displayedNetworkFailureError = false;
                  },
                },
              );
            }
            return false;
          }
          return true;
        },
      },
      mutations: {
        onError(error) {
          toast.error(getErrorMessage(error));
        },
      },
    },
  }));

  return (
   <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        <EdgeStoreProvider>
          <TooltipProvider delayDuration={0}>
            {children}
            <Sonner richColors />
          </TooltipProvider>
        </EdgeStoreProvider>
      <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
    </ThemeProvider >
    
  );
}
