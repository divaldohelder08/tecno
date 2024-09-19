import { NavigateBack } from "@/components/client-components";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "404",
};

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2 text-center">
      <div className="z-10">
        <h1 className="border-r border-border inline-block my-0 mr-5 ml-0 py-0 pr-[23px] pl-0  text-2xl font-medium align-top">
          404
        </h1>
        <div className="inline-block">
          <h2 className="text-sm font-normal m-0 text-accent-foreground ">
            Essa pagina não pode ser encontrada,{" "}
            <NavigateBack
              className="text-sky-500 dark:text-sky-400"
              label="voltar"
            />
          </h2>
        </div>
      </div>
      <BackgroundBeams />
    </div>
  );
}
