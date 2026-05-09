import { toast } from "sonner"
import { AlertCircle } from "lucide-react"

export function toastError(message: string) {
  toast.error("Erro", {
    description: message,

    icon: <AlertCircle className="h-5 w-5" />,

    className:
      "!bg-red-600 !border-red-500 !text-white",

    descriptionClassName:
      "!text-red-100",
  })
}