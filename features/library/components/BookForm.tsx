'use client'

import { BookOpen } from 'lucide-react';
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { FormInput } from '@/components/shared/input'
import { FormField } from '@/components/shared/formfields';
import { Controller } from "react-hook-form"
import { useLibrary } from '../hooks/useLibrary';



export function BookForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { form, onSubmit, router } = useLibrary()
  const error = form.formState.errors
  return (
    <div className={cn("flex flex-1 flex-col gap-12 h-full", className)} {...props}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className='flex flex-col gap-24'>
          <div className="flex flex-col items-center gap-1 text-center">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium p-4  bg-white rounded-full"
            >
              <div className="flex size-8 items-center rounded-full  justify-center">
                <BookOpen className="size-6" />
              </div>
            </a>
            <h1 className="text-xl font-bold">Gerar recomendação de livro</h1>
          </div>
          <div className='flex flex-col gap-12'>
            <div className='flex flex-row'>
              <FormField label="Nome" error={error.nm_title?.message}>
                <Controller
                  name="nm_title"
                  control={form.control}
                  render={({ field }) => (
                    <FormInput
                      {...field}
                      placeholder="Digite aqui..."
                    />
                  )}
                />
              </FormField>
            </div>
            <div className='flex flex-row gap-8'>
                <Field>
                    <FieldLabel htmlFor="nm_author">Autor</FieldLabel>
                    <Controller
                      name="nm_author"
                      control={form.control}
                      render={({ field }) => (
                        <FormInput
                          {...field}
                          placeholder="Nome do autor..."
                        />
                      )}
                    />
                </Field>
                <Field>
                    <FieldLabel htmlFor="dt_published_year">Ano de publicação</FieldLabel>
                    <Controller
                      name="dt_published_year"
                      control={form.control}
                      render={({ field }) => (
                        <FormInput
                          {...field}
                          type="number"
                          placeholder="Ano de publicação..."
                        />
                      )}
                    />
                </Field>
            </div>
          </div>
          <div className='flex flex-row gap-4 justify-end'>
            <Field>
              <Button type="button" className="bg-gray-400 hover:bg-gray-500" onClick={() => router.back()}>
                Voltar
              </Button>
            </Field>
            <Field>
              <Button type="submit">Criar Recomendação</Button>
            </Field>
          </div>
        </FieldGroup>
      </form>
      <FieldSeparator />
      <FieldDescription className='text-center w-1/2 mx-auto'>
        O público irá interagir com sua postagem
        interagindo com o conteúdo, e a partir disso, o sistema irá gerar uma recomendação de livro personalizada para cada usuário.
        </FieldDescription>
    </div>
  )
}