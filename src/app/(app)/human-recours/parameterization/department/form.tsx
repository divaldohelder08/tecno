"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createRole } from "@/http/roles";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleDashed } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  name: z.string(),
  description: z.string().nullable(),
});

type FormData = z.infer<typeof formSchema>;

export default function Form() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  async function send(data: FormData) {
    const result = await createRole(data);
    if (result?.error) {
      toast.error(result.error);
    }
  }

  return (
    <div className="relative flex-col items-start gap-8">
      <form className="grid w-full items-start gap-6" onSubmit={handleSubmit(send)}>
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">
            Novo Perfil
          </legend>
          <div className="grid gap-3">
            <Label htmlFor="role">Role</Label>
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
          <Button type="submit" size="sm" className="ml-auto gap-1.5 flex" disabled={isSubmitting}>
            {isSubmitting ? (
              <CircleDashed className="motion-reduce:hidden animate-spin" size="20" />
            ) :
              'Salvar'
            }
          </Button>
        </fieldset>
      </form>
    </div>
  );
}
