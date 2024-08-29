"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
//import { updateProfile } from '@/api/update-profile'

import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const userProfileSchema = z.object({
  name: z.string().min(1),
  email: z.string().nullable(),
})

interface props {
  session: any
}
type userProfileSchema = z.infer<typeof userProfileSchema>

export function UserProfile({ session }: props) {
  const queryClient = useQueryClient()
  /*
    const { data: storeProfile, isLoading: isLoadingStoreProfile } = useQuery({
      queryKey: ['managed-restaurant'],
      queryFn: getManagedRestaurant,
      staleTime: Infinity,
    })*/

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<userProfileSchema>({
    resolver: zodResolver(userProfileSchema),
    values: {
      name: session.user.name ?? '',
      email: session.user.email ?? '',
    },
  })

  /* function updateProfileDataOnCache({ name, description }: userProfileSchema) {
     const cached = queryClient.getQueryData<GetManagedRestaurantResponse>([
       'managed-restaurant',
     ])
 
     if (cached) {
       queryClient.setQueryData<GetManagedRestaurantResponse>(
         ['managed-restaurant'],
         {
           ...cached,
           name,
           description,
         },
       )
     }
 
     return { cached }
   }
 
   const { mutateAsync: updateProfileFn } = useMutation({
     mutationFn: updateProfile,
     onMutate: ({ name, description }) => {
       const { cached } = updateProfileDataOnCache({
         name,
         description,
       })
 
       return { previousProfile: cached }
     },
     onError(_, __, context) {
       if (context?.previousProfile) {
         updateProfileDataOnCache(context.previousProfile)
       }
     },
   })
 */

  async function handleUpdateProfile({
    name,
    email,
  }: userProfileSchema) {
    try {
      /*   await updateProfileFn({
           name,
           description,
         })
   */
      toast.success('Perfil atualizado com sucesso!')
    } catch {
      toast.error('Falha ao atualizar o perfil, tente novamente!')
    }
  }
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Editar perfil</DialogTitle>
        <DialogDescription>
          Faça alterações em seu perfil aqui. Clique em salvar quando terminar.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Nome
          </Label>
          <Input id="name" className="col-span-3" {...register('name')} />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">
            Email
          </Label>
          <Input id="email" {...register('email')} className="col-span-3" />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Salver alterações</Button>
      </DialogFooter>
    </DialogContent>
  )
}
