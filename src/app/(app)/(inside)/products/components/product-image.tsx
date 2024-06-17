"use client"

import { SingleImageDropzone } from "@/components/single-image-dropzone"
import { Upload, X } from "lucide-react"
import Image from "next/image"
import { useRef, useState } from "react"

export default function ProductImage() {
  const [image, setImage] = useState<string | null>(null)
  const ipt = useRef<HTMLInputElement | null>(null)

  return (
    <div className="grid gap-2 relative">
      <input
        required
        ref={ipt}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={({ target: { files } }) => {
          if (files) {
            files && setImage(URL.createObjectURL(files[0]));
          }
        }}
        name={`product-image`}
      />
      {
        image ?
          <Image
            alt="Product image"
            className="aspect-square w-full rounded-md object-cover"
            src={image}
            height="84"
            width="84"
            onClick={() => {
              ipt.current?.click()
            }}
          /> :
          <button
            onClick={() => {
              ipt.current?.click()
            }}
            className="flex aspect-square w-full items-center justify-center rounded-md border-2 border-dashed transition-all shadow-sm hover:bg-secondary/80" type="button">
            <Upload className="h-6 w-6 text-muted-foreground" />
            <span className="sr-only">Upload</span>
          </button>
      }
      {
        image && <div
          className="group absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 transform"
          onClick={(e) => {
            setImage(null);
          }}
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
  )
}