import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function splitName(name: string) {
  const partesNome = name.split(" ");
  return partesNome[0][0] + partesNome[partesNome.length - 1][0];
}

export function splitData(data: Date) {
  return data.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
}
