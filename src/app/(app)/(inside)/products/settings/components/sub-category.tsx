"use client"

import { Input } from "@/components/ui/input"
import { CircleX } from "lucide-react"

export default function SubCategory({ id, name, key }: { id: string, name: string, key: string }) {
  return (
    <div className="relative" key={key} id={id}>
      <Input
        type="text"
        placeholder=""
        defaultValue={name}
        required
        name={`sub-${id}`}
        className="w-full appearance-none bg-background pr-8 shadow-none"
      />
      < CircleX className="absolute right-2.5 top-2.5 h-4 text-muted-foreground" onClick={() => document.getElementById(id)?.remove()} />
    </div>
  )
}
