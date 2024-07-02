'use client'
import { Accordion, AccordionContent, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { categoriesProps } from "@/types"
import { AccordionItem } from "@radix-ui/react-accordion"
import { useState } from "react"
import SubCategory from "./components/sub-category"
interface props {
  categories: categoriesProps[]
}
export default function AvaliabelsCategories({ categories: cate }: props) {
  const [categories, setCategories] = useState<categoriesProps[]>(cate)
  async function register(data: FormData) {
    console.log(Object.fromEntries(data), "ola")
  }
  return (
    <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
      <div className="flex-1 space-y-2">
        {
          categories.map(cat => {
            return (
              <div className="relative overflow-scroll bg-background w-full rounded-md border border-input px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring p-3 shadow-none" key={cat.id}>
                <Accordion type="single" collapsible>
                  <AccordionItem value={cat.name}>
                    <form action={register}>
                      <AccordionTrigger className="py-0">
                        <Input
                          type="text"
                          placeholder="insert the sub-categorie name"
                          defaultValue={cat.name}
                          name="category"
                          required
                          className="px-2 border-none shadow-none font-semibold leading-none tracking-tight underline-none w-46"
                        />
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pl-4 py-1.5 h-46 gap-2 grid h-full" id={cat.id}>
                        <div className="p-1.5 h-46 overflow-scroll gap-2 grid h-full max-h-48">
                          {
                            cat.subCategory.map(sub =>
                              <SubCategory id={sub.id} name={sub.name} key={sub.id} />
                            )
                          }
                        </div>
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="secondary" size="sm" type="button" onClick={() => {
                            const val = {
                              id: `sub-${Math.random()}`,
                              name: ""
                            }
                            const b = categories.map(e => {
                              if (e.id === cat.id) {
                                e.subCategory.push(val)
                                return e
                              } else return e
                            })
                            setCategories(b)
                          }}>add subcategorie</Button>
                          <Button size="sm" type="submit">Save</Button>
                        </div>
                      </AccordionContent>
                    </form>
                  </AccordionItem>
                </Accordion>
              </div>
            )
          })
        }
      </div>

    </div>
  )
}