"use client"

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Country } from "@/types"
import { useState } from "react"

interface props {
  countries: Country[]
  current: string
}
export function CountryComponent({ countries: before, current }: props) {
  const countries = before.flatMap((country) => [
    ...country.provincias.map((provincia) => ({
      value: `${country.id}-${provincia.id}`,
      label: `${country.name} - ${provincia.name}`,
    })),
  ])
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(current ?? '')

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? countries.find((country) => country.value === value)?.label
            : "Selecione o pais e provincia..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Pesquise pais e provincia..." className="h-9" />
          <CommandEmpty>País nem provincia encontrada.</CommandEmpty>
          <CommandGroup>
            {countries.map((country) => (
              <CommandItem
                key={country.value}
                value={country.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
              >
                {country.label}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === country.value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}