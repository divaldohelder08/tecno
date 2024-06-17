import { LabelHTMLAttributes } from "react";

export function Label(props: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className="text-sm text-muted-foreground flex items-center justify-between"
      {...props}
    />
  )
}
