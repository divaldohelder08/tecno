"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircle } from "lucide-react"
import { registerCategory } from "../actions"
import React, { useState } from "react"
import { cn } from "@/lib/utils"
import SubCategory from "./sub-category"

interface props extends React.HtmlHTMLAttributes<HTMLFormElement> { }

export function NewCategory({ className }: props) {
  const [sub, setSub] = useState<number>(1)

  return (
    <form className={cn("grid w-full items-start gap-6", className)} action={registerCategory}>
      <fieldset className="grid gap-6 rounded-lg border p-4">
        <legend className="-ml-1 px-1 text-sm font-medium">
          Categorie
        </legend>
        <div className="grid gap-3">
          <Label htmlFor="model">Name</Label>
          <Input
            name="category"
            className="items-start [&_[data-description]]:hidden"
            required
            placeholder="Type a category name"
          />
        </div>
        <div className="grid gap-3">
          <span className="gap-2 items-center flex">
            <Label htmlFor="temperature">Temperature</Label>
            <PlusCircle
              className="h-3.5 w-3.5 cursor-pointer"
              onClick={() => {
                setSub((las) => {
                  return las + 1
                })
              }}
            />
          </span>
          <div className="grid gap-3 h-full max-h-48 overflow-scroll py-2">
            {
              Array.from({ length: sub }).map((_, i) => <SubCategory id={Math.random().toString()} name={""} key={i.toString()} />
              )
            }
          </div>
        </div>
        <Button size="sm" className="gap-1" type="submit">
          Save categorie
        </Button>
      </fieldset>
    </form>
  )
}