import { cn } from "@/utils/utils";
import { Label } from "./label";
import React from "react";
interface FormErrorProps  extends React.HtmlHTMLAttributes<HTMLLabelElement>  {
  error?: string;
}
interface LabelFormProps extends React.HtmlHTMLAttributes<HTMLLabelElement> {
  label: string;
  error?: string;
}

export function FormError({ error,className }: FormErrorProps) {
  return (
    <>
      {error && (
        <p className={cn('text-[0.8rem] font-medium text-destructive', className)}>{error}</p>
      )}
    </>
  );
}

export function FormLabel({ label, error, className }: LabelFormProps) {
  return <Label className={cn(error && "text-destructive", className)}>{label}</Label>;
}

export const Form = {
  error: FormError,
  label: FormLabel,
};