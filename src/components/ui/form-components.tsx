import { cn } from "@/utils/utils";
import React from "react";
import { Label, LabelProps } from "./label";
interface FormErrorProps extends React.HtmlHTMLAttributes<HTMLLabelElement> {
  error?: string;
}
interface LabelFormProps extends LabelProps {
  label: string;
  error?: string;
}

export function FormError({ error, className }: FormErrorProps) {
  return (
    <>
      {error && (
        <p className={cn('text-[0.8rem] font-medium text-destructive', className)}>{error}</p>
      )}
    </>
  );
}

export function FormLabel({ label, error, className, ...props }: LabelFormProps) {
  return <Label className={cn(error && "text-destructive", className)} {...props}>{label}</Label>;
}

export const Form = {
  error: FormError,
  label: FormLabel,
};