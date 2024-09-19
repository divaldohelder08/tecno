"use client";
// cSpell:disable 

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Form as Fr } from "@/components/ui/form-components";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createFuncionario } from "@/http/funcionarios";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, ChevronLeft, ChevronRight, ChevronsUpDown, CircleDashed } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const employeeSchema = z.object({
  nome_completo: z.string().min(1, "Nome completo é obrigatório"),
  nome_mae: z.string().min(1, "Nome da mãe é obrigatório"),
  nome_pai: z.string().min(1, "Nome do pai é obrigatório"),
  nascimento: z.coerce.date({
    required_error: "Data de nascimento é obrigatória",
    invalid_type_error: "Data de nascimento inválida",
  }).refine((date) => !isNaN(date.getTime()), "Data de nascimento inválida"),
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
  genero: z.enum(["masculino", "feminino"], { message: "Selecione um gênero" }),
  tipo_identificacao: z.enum(["BI", "Passaporte", "Cartao de Residente", "Outro"], { message: "Selecione um tipo de identificação" }),
  num_identificacao: z.string().min(1, "Número de identificação é obrigatório"),
  nivel_academico: z.enum([
    "Base",
    "Medio",
    "Universitario",
    "Licenciado",
    "Mestrado",
    "Doctoramento",
  ], { message: "Selecione um nível acadêmico" }),
  avatar: z.string().url("Avatar deve ser uma URL válida").optional(),
  telefone1: z.string().min(1, "Telefone principal é obrigatório"),
  telefone2: z.string().optional(),
  linkedin: z.string().url("LinkedIn deve ser uma URL válida").optional(),
  whatsApp: z.string().optional(),
  instagram: z.string().optional(),
  bairro: z.string().min(1, "Bairro é obrigatório"),
  rua: z.string().min(1, "Rua é obrigatória"),
  id_funcao: z.number({ required_error: "A função a exercer é obrigatória" }).min(1, "A função a exercer é obrigatória"),
  id_categoria: z.number({ required_error: "A Categoria é obrigatória" }).min(1, "Categoria é obrigatória"),
  num_conta: z.string({ required_error: "Número da conta é obrigatório" }).min(1, "Número da conta é obrigatório"),
  iban: z.string({ required_error: "IBAN é obrigatório" }).min(1, "IBAN é obrigatório"),
  Id_banco: z.number({ required_error: "Banco é obrigatório" }).min(1, "Banco é obrigatório"),
})

export type formData = z.infer<typeof employeeSchema>;

interface Props {
  bancos: { id: number; nome_banco: string }[];
  fcns: { id: number; nome_funcao: string }[];
  carreiras: any[];
}

export default function Form({ bancos, fcns: before, carreiras }: Props) {
  const [step, setStep] = useState(1);
  const [currentCarr, setCurrentCarr] = useState<string | null>(null);

  const [openFcns, setOpenFcns] = useState(false);
  const [openBank, setOpenBank] = useState(false);

  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [selectedF, setSelectedF] = useState<string | null>(null);
  const [selectedCat, setSelectedCat] = useState<string | null>(null);

  const {
    control, register, handleSubmit, setValue, getValues, trigger, reset, formState: { errors, isSubmitting }
  } = useForm<formData>({
    resolver: zodResolver(employeeSchema),
    mode: "onChange",
    defaultValues: {
      genero: "masculino"
    },
  });

  const fcns = before.map((f) => ({
    value: f.id,
    label: f.nome_funcao,
  }));

  const banks = bancos.map((f) => ({
    value: f.id,
    label: f.nome_banco,
  }));

  const onSubmit = async (data: formData) => {
    const result = await createFuncionario(data)
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Funcionario cadastrado com sucesso");
      setSelectedBank(null)
      setSelectedCat(null)
      setCurrentCarr(null)
      setSelectedF(null)
      reset()
    }
  };

  const handleNext = async () => {
    const fieldsToValidate = getFieldsForStep(step);
    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handlePrevious = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const getFieldsForStep = (step: number): (keyof formData)[] => {
    switch (step) {
      case 1:
        return ["nome_completo", "nome_mae", "nascimento", "email", "genero"];
      case 2:
        return ["tipo_identificacao", "num_identificacao", "nivel_academico"];
      case 3:
        return ["telefone1", "bairro", "rua"];
      case 4:
        return ["id_funcao", "id_categoria", "Id_banco", "num_conta", "iban"];
      default:
        return [];
    }
  };

  const steps = [
    { title: "Informações Pessoais", description: "Dados básicos do funcionário" },
    { title: "Documentação", description: "Documentos e qualificações" },
    { title: "Contato e Endereço", description: "Informações de contato e localização" },
    { title: "Informações Profissionais", description: "Dados funcionais e bancários" },
  ];

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { id: "nome_completo", label: "Nome Completo", required: true, placeholder: "Insira o nome completo" },
                { id: "nome_mae", label: "Nome da Mãe", required: true, placeholder: "Insira o nome da mãe" },
                { id: "nome_pai", label: "Nome do Pai", required: true, placeholder: "Insira o nome do pai" },
                { id: "nascimento", label: "Data de Nascimento", type: "date", required: true, placeholder: "Selecione a data de nascimento" },
                { id: "email", label: "Email", type: "email", required: true, placeholder: "Insira o email" },
              ].map((field) => (
                <div key={field.id} className="space-y-2">
                  <Label htmlFor={field.id} className="text-sm font-medium">
                    {field.label}
                  </Label>
                  <Input
                    id={field.id}
                    type={field.type || "text"}
                    placeholder={field.placeholder}
                    {...register(field.id as any)}
                    className="mt-1"
                  />
                  <Fr.error error={errors[field.id as keyof formData]?.message} />
                </div>
              ))}
              <div className="space-y-2">
                <Label htmlFor='genero' className="text-sm font-medium">
                  Gênero
                </Label>
                <RadioGroup
                  {...register('genero')}
                  defaultValue="masculino"
                  className="flex flex-wrap gap-2 items-center"
                >
                  <>
                    <RadioGroupItem
                      key='masculino'
                      value='masculino'
                      id='masculino'
                      className="peer"
                    >
                      {'masculino'.charAt(0).toUpperCase() + 'masculino'.slice(1)}
                    </RadioGroupItem>
                    <Label htmlFor='masculino' isReq={false} className="text-sm font-medium">
                      masculino
                    </Label>
                  </>
                  <>
                    <RadioGroupItem
                      key='feminino'
                      value='feminino'
                      id='feminino'
                      className="peer"
                    >
                      {'feminino'.charAt(0).toUpperCase() + 'feminino'.slice(1)}
                    </RadioGroupItem>
                    <Label htmlFor='masculino' isReq={false} className="text-sm font-medium">
                      feminino
                    </Label>
                  </>
                </RadioGroup>
                <Fr.error error={errors.genero?.message} />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="tipo_identificacao">Tipo de Identificação</Label>
                <Select onValueChange={(value) => setValue("tipo_identificacao", value as "BI" | "Passaporte")}>
                  <SelectTrigger>
                    <SelectValue placeholder={getValues("tipo_identificacao") ?? "Selecione o tipo"} />
                  </SelectTrigger>
                  <SelectContent>
                    {["BI", "Passaporte", "Cartao de Residente", "Outro"].map((e) => <SelectItem key={e} value={e}>{e}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Fr.error error={errors.tipo_identificacao?.message} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="num_identificacao">Número de Identificação</Label>
                <Input
                  id="num_identificacao"
                  {...register("num_identificacao")}
                  placeholder="Insira o número de identificação"
                  required
                />
                <Fr.error error={errors.num_identificacao?.message} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nivel_academico">Nível Acadêmico</Label>
                <Select onValueChange={(value) => setValue("nivel_academico", value as "Base")}>
                  <SelectTrigger>
                    <SelectValue placeholder={getValues("nivel_academico") ?? "Selecione o nível"} />
                  </SelectTrigger>
                  <SelectContent>
                    {["Base",
                      "Medio",
                      "Universitario",
                      "Licenciado",
                      "Mestrado",
                      "Doctoramento"].map((nivel) => (
                        <SelectItem key={nivel} value={nivel}>
                          {nivel}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <Fr.error error={errors.nivel_academico?.message} />
              </div>
            </div>
          </div >
        );
      case 3:
        return (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { id: "telefone1", label: "Telefone (principal)", required: true, placeholder: "Insira o telefone principal" },
              { id: "telefone2", label: "Telefone (secundario)", required: false, placeholder: "Insira o telefone secundario" },
              { id: "bairro", label: "Bairro", required: true, placeholder: "Insira o bairro" },
              { id: "rua", label: "Rua", required: true, placeholder: "Insira a rua" },
            ].map((field) => (
              <div key={field.id} className="space-y-2">
                <Label htmlFor={field.id} isReq={field.required} className="text-sm font-medium">
                  {field.label}
                </Label>
                <Input
                  id={field.id}
                  type="text"
                  placeholder={field.placeholder}
                  {...register(field.id as any)}
                  className="mt-1"
                />
                <Fr.error error={errors[field.id as keyof formData]?.message} />
              </div>
            ))}
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Função</Label>
                <Popover open={openFcns} onOpenChange={setOpenFcns}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between h-9 text-sm"
                      aria-expanded={openFcns}
                    >
                      {selectedF ? selectedF : "Selecione o funcionario supervisor"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Command>
                      <CommandInput placeholder="Selecione uma função..." />
                      <CommandList >
                        <CommandEmpty>Nenhuma função encontrada</CommandEmpty>
                        <CommandGroup>
                          {fcns.map(({ label, value }) => (
                            <CommandItem
                              key={value}
                              onSelect={() => {
                                setValue("id_funcao", value);
                                setSelectedF(label)
                                setOpenFcns(false);
                              }}
                            >
                              {label}
                              {selectedF === label && (
                                <CheckIcon className="ml-auto h-4 w-4" />
                              )}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <Fr.error error={errors.id_funcao?.message} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="carreira">Carreira</Label>
                <Select onValueChange={setCurrentCarr}>
                  <SelectTrigger>
                    <SelectValue placeholder={currentCarr ?? "Selecione a carreira"} />
                  </SelectTrigger>
                  <SelectContent>
                    {carreiras.map(({ id, nome_carreira }) => <SelectItem
                      key={id}
                      value={nome_carreira}
                    >
                      {nome_carreira}
                    </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="id_categoria">Categoria</Label>
                <Controller
                  name="id_categoria"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value ? String(field.value) : undefined}  // Converte o número para string
                      onValueChange={(value) => field.onChange(Number(value))}  // Converte de volta para número ao selecionar
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {carreiras.map((e) => {
                          return e.nome_carreira === currentCarr &&
                            e.categoria.map((b: { id: number; nome_categoria: string }) => {
                              return <SelectItem key={b.id} value={String(b.id)}>{b.nome_categoria}</SelectItem>;  // Converte `id` para string
                            })
                        })}
                      </SelectContent>
                    </Select>
                  )}
                />

                <Fr.error error={errors.id_categoria?.message} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="Id_banco">Banco</Label>
                <Popover open={openBank} onOpenChange={setOpenBank}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between h-9 text-sm"
                      aria-expanded={openBank}
                    >
                      {selectedBank ? selectedBank : "Selecione o banco"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Command>
                      <CommandInput placeholder="Selecione um banco..." />
                      <CommandList >
                        <CommandEmpty>Nenhum banco encontrado</CommandEmpty>
                        <CommandGroup>
                          {banks.map((f) => (
                            <CommandItem
                              key={f.value}
                              onSelect={() => {
                                setValue("Id_banco", f.value);
                                setSelectedBank(f.label);
                                setOpenBank(false);
                              }}
                            >
                              {f.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <Fr.error error={errors.Id_banco?.message} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="num_conta">Número da Conta</Label>
                <Input id="num_conta" {...register("num_conta")} required />
                <Fr.error error={errors.num_conta?.message} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="iban">IBAN</Label>
                <Input id="iban" {...register("iban")} required />
                <Fr.error error={errors.iban?.message} />
              </div>
            </div>
          </div >
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent>
        <div className="mb-8">
          <Progress value={(step / 4) * 100} className="w-full" />
          <div className="flex justify-between mt-2">
            {steps.map((s, index) => (
              <div key={index} className={`text-sm ${step === index + 1 ? 'font-bold' : 'text-muted-foreground'}`}>
                Passo {index + 1}
              </div>
            ))}
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-4">{steps[step - 1].title}</h2>
        <p className="text-muted-foreground mb-6">{steps[step - 1].description}</p>
        {renderStep()}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button type='button' variant="outline" onClick={handlePrevious} disabled={step === 1}>
          <ChevronLeft className="mr-2 h-4 w-4" /> Anterior
        </Button>
        {step < 4 ? (
          <Button onClick={handleNext} type='button'>
            Próximo <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button type="submit" disabled={isSubmitting}

            className="gap-1.5 flex"

          >
            {isSubmitting ? (
              <CircleDashed className="motion-reduce:hidden animate-spin" size="20" />
            ) : 'Salvar'}

          </Button>
        )}
      </CardFooter>
    </form>
  );
}
