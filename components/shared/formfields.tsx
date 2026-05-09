import { FieldLabel } from "@/components/ui/field"
import { FieldError } from "./fielderror"

export function FormField({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1 w-full">
      <FieldLabel>{label}</FieldLabel>
      {children}
      <FieldError message={error} />
    </div>
  )
}