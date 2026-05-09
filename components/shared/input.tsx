import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

export const FormInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="w-full flex-1">
        <Input
          ref={ref}
          className={cn(
            'bg-white',
            error && 'border-red-500 focus-visible:ring-red-500',
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-500 mt-1">{error}</p>
        )}
      </div>
    )
  }
)

FormInput.displayName = 'FormInput'
