"use client";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cleanCookies } from "./cookies"
export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.log(error, "erro");
  toast.error(error.message, {
    id: error.digest,
    action: {
      label: "Tentar novamente",
      onClick: async() => {
          await cleanCookies()
          reset();
      },
    },
  });
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2 text-center">
      <div className="z-10">
        <div className="flex flex-col items-center space-y-2">
          <h1 className="text-xl font-bold tracking-tighter sm:text-3xl xl:text-6xl/none">
            Uh oh! Aconteceu algum erro.
          </h1>
          <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 text-center">
            Não te preocupes, estamos a tratar disso. Tenta atualizar a pagina
            ou volte dentro de alguns minutos.
          </p>
          <Button
            onClick={() => {
              reset();
            }}
          >
            Tentar novamente
          </Button>
        </div>
      </div>
      <BackgroundBeams />
    </div>
  );
}
