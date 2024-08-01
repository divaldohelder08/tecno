"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateRole } from "@/http/roles";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleDashed } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional()
})

type formData = z.infer<typeof formSchema>

export default function RoleForm({ id, name, description }: formData) {

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<formData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: Number(id),
      name,
      description,
    }
  })

  async function send(data: formData) {
    const result = await updateRole(data)
    if (result && result.error) {
      toast.error(result.error);
    } else {
      toast.success("Perfil atualizado com sucesso")
    }
  }
  return (
    <form className="grid w-full items-start gap-6" onSubmit={handleSubmit(send)}>
      <fieldset className="grid gap-6 rounded-lg border p-4">
        <legend className="-ml-1 px-1 text-sm font-medium">
          Perfil {name}
        </legend>
        <div className="grid gap-3">
          <Label htmlFor="role">Perfil</Label>
          <Input placeholder="Informe o nome da role" required {...register('name')} />
          {errors.name && (
            <p className="text-sm font-medium text-red-500 dark:text-red-400">
              {errors.name.message}
            </p>
          )}
        </div>
        <div className="grid gap-3">
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            {...register("description")}
            placeholder="Descrição da role"
            className="min-h-[9.5rem]"
          />
          {errors.description && (
            <p className="text-sm font-medium text-red-500 dark:text-red-400">
              {errors.description.message}
            </p>
          )}
        </div>
        <div className="w-full h-full flex gap-4">
          <Button type="submit" size="sm" className="ml-auto gap-1.5 flex" disabled={isSubmitting} >
Button
        </Button>
        <Button type="submit" size="sm" className="ml-auto gap-1.5 flex" disabled={isSubmitting} >

          {isSubmitting ? (
            <CircleDashed className="motion-reduce:hidden animate-spin" size="20" />
          ) :
            'Salvar'
          }
        </Button>
        </div>
        
      </fieldset>
    </form>
  )
}