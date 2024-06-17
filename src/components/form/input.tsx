import { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import { Input as InputShadcn } from "../ui/input";
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
}

export function Input(props: InputProps) {
  const { register } = useFormContext()

  return (
    <InputShadcn
      id={props.name}
      {...register(props.name)}
      {...props}
    />
  )
}