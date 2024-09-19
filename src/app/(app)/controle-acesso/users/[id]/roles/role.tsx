'use client';

import { Checkbox } from "@/components/ui/checkbox";
import { updateUserRole } from "@/http/members";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface props {
  id: number
  name: string
  description: string | null
  val?: boolean;
  userId: number;
}

const formSchema = z.object({
  id: z.number(),
  userId: z.number(),
  value: z.boolean()
});

type formData = z.infer<typeof formSchema>;

export default function Role({ id, name, description, val, userId }: props) {
  const { register, handleSubmit, setValue, formState: { isSubmitting } } = useForm<formData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: val,
      userId,
      id
    }
  });

  async function send({ id, userId, value }: formData) {
    const result = await updateUserRole({
      roleId: id,
      userId,
      value
    })
    if (result && result.error) {
      toast.error(result.error);
    } else {
      setValue("value", value)
      value ? toast.success("Perfil adicionado com sucesso")
        : toast.success("Perfil removido com sucesso")
    }
  }

  const handleChange = (checked: boolean) => {
    const data = {
      value: checked,
      userId,
      id,
    };
    try {
      send(data);
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <tr className="bg-background border-b hover:bg-muted/50">
      <td className="px-6 py-4 font-medium text-foreground">{id}</td>
      <td className="px-6 py-4 font-medium text-foreground">{name}</td>
      <td className="px-6 py-4">{description ?? 'N/A'}</td>
      <td className="px-6 py-4">
        <form onSubmit={handleSubmit(send)}>
          <Checkbox
            defaultChecked={val}
            disabled={isSubmitting}
            onCheckedChange={(checked: boolean) => {
              setValue('value', checked);
              handleChange(checked);
            }}
            {...register('value')}
          />
        </form>
      </td>
    </tr>
  );
}
