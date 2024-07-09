"use client"
import {
  CircleX,
  Upload,
  X
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  TableCell,
  TableRow
} from "@/components/ui/table"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import Image from "next/image"
import { useRef, useState } from "react"

interface props {
  name?: string
  stock?: number
  price?: number
  size?: string
  index: number
}

export default function VariantRow({ name, stock, price, size, index }: props) {
  const [image, setImage] = useState<string | null>(null)
  const ipt = useRef<HTMLInputElement | null>(null)
  return (
    <TableRow id={`variant-${index}`}>
      <TableCell>
        <input
          required
          ref={ipt}
          type="file"
          onChange={({ target: { files } }) => {
            if (files) {
              console.log(files[0])
              files && setImage(URL.createObjectURL(files[0]));
            }
          }}
          accept="image/*"
          className="hidden"
          name='variant-image'
        />
        <div className="relative">
          {
            image ? <Image
              alt="Product image"
              className="aspect-square w-full rounded-md object-cover"
              height="84"
              src={image}
              width="84"
              onClick={() => ipt.current?.click()}
            /> :
              <button
                type="button"
                onClick={() => ipt.current?.click()}
                className="flex aspect-square w-full items-center justify-center rounded-md border-2 border-dashed transition-all shadow-sm hover:bg-secondary/80">
                <Upload className="h-4 w-4 text-muted-foreground" />
                <span className="sr-only">Upload</span>
              </button>
          }
          {
            image && <div
              className="group absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 transform"
              onClick={() => setImage(null)}
            >
              <div className="flex h-5 w-5 items-center justify-center rounded-md border border-solid border-gray-500 bg-white transition-all duration-300 hover:h-6 hover:w-6 dark:border-gray-400 dark:bg-black">
                <X
                  className="text-gray-500 dark:text-gray-400"
                  width={16}
                  height={16}
                />
              </div>
            </div>
          }
        </div>

      </TableCell>
      <TableCell className="font-semibold">
        <Input
          required
          defaultValue={name}
          className="p-0 border-none"
          name={`variant-${index}-name`}
        />
      </TableCell>
      <TableCell>
        <Label htmlFor={`stock-${index}`} className="sr-only">
          Stock
        </Label>
        <Input
          required
          type="number"
          defaultValue={stock}

          placeholder="insira a categoria"
          name={`variant-${index}-stock`}
        />
      </TableCell>
      <TableCell>
        <Label htmlFor={`price-${index}`} className="sr-only">
          Price
        </Label>
        <Input
          required
          type="number"
          defaultValue={price}
          placeholder="insira o preço"
          name={`variant-${index}-price`}
        />
      </TableCell>
      <TableCell>
        <ToggleGroup
          type="single"
          defaultValue={size}
          variant="outline"
        >
          <ToggleGroupItem value="s" name={`variant-${index}-size`} >S</ToggleGroupItem>
          <ToggleGroupItem value="m" name={`variant-${index}-size`}>M</ToggleGroupItem>
          <ToggleGroupItem value="l" name={`variant-${index}-size`}>L</ToggleGroupItem>
        </ToggleGroup>
      </TableCell>
      <TableCell>
        <CircleX className="w-4 h-4 text-muted-foreground" onClick={() => document.getElementById(`variant-${index}`)?.remove()} />
      </TableCell>
    </TableRow>
  )
}