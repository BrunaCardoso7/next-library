'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldGroup,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useOnboarding } from "../hooks/useOnboarding"
import { useCPFLookup } from "../hooks/useCPFLookup"
import { Controller } from "react-hook-form"
import { TabsTrigger, Tabs, TabsList } from "@/components/ui/tabs"
import { Logo } from "@/components/shared/logo"
import { FieldError } from "../../../components/shared/fielderror"
import { Separator } from "@/components/ui/separator"
import { useCpfAutoLookup } from "../hooks/useCPFAutoLookup"
import { FormField } from "./FormFields"

export function OnboardingForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const { form, onSubmit, isLoading, setRole, setUserId } = useOnboarding()
  const { errors } = form.formState
  const { lookupByCPF, isLoading: isLookingUp } = useCPFLookup(
    form.setValue,
    setUserId
  )
  const cpf = form.watch('nr_cpf')
  useCpfAutoLookup(cpf, lookupByCPF)
  
  return (
    <div className={cn("flex flex-col gap-6 w-full max-w-md mx-auto", className)} {...props}>
      <Card className="rounded-4xl">
        <CardHeader className="text-center flex flex-col items-center py-4">
          <Logo
            src="/logo/juridiq_logo.webp"
            alt="Juridiq Livraria Logo"
            className="shrink-0 h-1/3"
          />
          <CardTitle className="text-xl">
            Visitando ou escrevendo?
          </CardTitle>
          <CardDescription>
            Antes de iniciar, nos informe seu perfil:
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 py-1">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <Tabs
                  value={form.watch('ie_role')}
                  onValueChange={(value) => {
                    form.setValue("ie_role", value as "visitor" | "writer")
                  }}
                  className="min-w-full"
                >
                  <TabsList className="grid w-full grid-cols-2 rounded-2xl">
                    <TabsTrigger value="visitor" className="rounded-2xl">
                      Visitante
                    </TabsTrigger>
                    <TabsTrigger value="writer" className="rounded-2xl">
                      Escritor
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </Field>
              <FormField label="CPF" error={errors.nr_cpf?.message}>
                <Controller
                  name="nr_cpf"
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <Input
                        {...field}
                        placeholder="000.000.000-00"
                        disabled={isLookingUp}
                      />
                      {isLookingUp && <p className="text-xs text-blue-600 mt-1">Buscando...</p>}
                    </>
                  )}
                />
              </FormField>
              <FormField label="Nome" error={errors.nm_user?.message}>
                <Controller
                  name="nm_user"
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <Input
                        {...field}
                        placeholder="Digite aqui..."
                      />
                    </>
                  )}
                />
              </FormField>
              <Button type="submit" className="mt-4" disabled={isLoading}>
                {isLoading ? 'Criando...' : 'Avançar'}
              </Button>
            </FieldGroup>
          </form>
          <Separator />
          {form.watch('ie_role') === 'visitor' ? (
            <div className="text-muted-foreground text-center">
              Acompanhe e interaja com as recomendações de livros!
            </div>
          ) : (
            <div className="text-muted-foreground text-center">
              Gerencie e compartilhe suas leituras!
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}