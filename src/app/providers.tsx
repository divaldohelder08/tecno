import { ThemeProvider } from "@/lib/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PropsWithChildren } from "react";
import { Toaster as Sonner } from "sonner";

export function Provider({ children }: PropsWithChildren) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>
        {children}
        <Sonner richColors />
      </TooltipProvider>
    </ThemeProvider >
  )
}