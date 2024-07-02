'use client'
import { Checkbox } from "@/components/ui/checkbox";
import { permissionProps } from "@/types";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useRef, useState } from "react";
import { send } from "./ola";


export default function Permission({ id, slug, description }: permissionProps) {
  const [ola, setOla] = useState<CheckedState>()
  const divEle = useRef<HTMLDivElement | null>(null)
  return (
    <form className='bg-secondary w-full  rounded-sm flex justify-between px-4 py-2 items-center' action={send}>
      <div className="flex gap-1.5 items-start">
        <h4 >{slug}:</h4>
        <input className="hidden" name='id' value={id} />
        <input type='submit' className="hidden" ref={divEle} />
        {
            ola && <input name={slug} className="hidden" value={ola} />
            
        }
        <p onClick={(e) => divEle.current?.click()} className="text-muted-foreground">{description}</p>
      </div>
      <Checkbox name={slug} onCheckedChange={(e) => {
        setOla(e)
        divEle.current?.click()
      }} />
    </form>
  )
}