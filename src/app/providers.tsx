import { ThemeProvider } from "@/lib/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PropsWithChildren } from "react";
import { Toaster as Sonner } from "sonner";
import { EdgeStoreProvider } from "@/lib/edgestore";

export function Provider({ children }: PropsWithChildren) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
        <EdgeStoreProvider>
      <TooltipProvider delayDuration={0}>
        {children}
        <Sonner richColors/>
      </TooltipProvider>
         </EdgeStoreProvider>
    </ThemeProvider >
  )
}