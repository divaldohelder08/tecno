'use client';

import { Checkbox } from "@/components/ui/checkbox";
import { updateRolePermission } from "@/http/roles";
import { Permission as permissionProps } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface props extends permissionProps {
  val?: boolean;
  roleId: string;
}

const formSchema = z.object({
  roleId: z.number(),
  permissionId: z.number(),
  has: z.boolean()
});

type formData = z.infer<typeof formSchema>;

export default function Permission({ id, slug, description, val, roleId }: props) {
  const { register, handleSubmit, setValue, formState: {  isSubmitting } } = useForm<formData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      has: val,
      permissionId: id,
      roleId: Number(roleId)
    }
  });

  async function send(data: formData) {
      const result = await updateRolePermission(data)
      if (result && result.error) toast.error(result.error)
      else {
         setValue("has",data.has)
         data.has 
         ? toast.success("Permissão adicionada com sucesso")
         : toast.success("Permissão removida com sucesso")      
    }
  }

  const handleChange = (checked: boolean) => {
    const data = {
      permissionId: id,
      roleId: Number(roleId),
      has: checked,
    };
    send(data);
  };

  return (
    <form className='bg-secondary w-full rounded-sm flex justify-between px-4 py-2 items-center' onSubmit={handleSubmit(send)}>
      <div className="flex gap-1.5 items-start">
        <h4>{slug}:</h4>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <Checkbox
        checked={val}
        disabled={isSubmitting} // Desabilita o Checkbox enquanto está enviando
        onCheckedChange={(checked:boolean) => {
          setValue('has', checked); // Atualiza o valor do campo no formulário
          handleChange(checked);
        }}
        {...register('has')}
      />
    </form>
  );
}
