'use client'
import { forwardRef, InputHTMLAttributes, useState } from "react"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  resultsCount?: number
  onSearch?: (value: string) => void
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, resultsCount = 0, onSearch, ...props }, ref) => {
    const [value, setValue] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setValue(newValue)
      onSearch?.(newValue)
    }

    return (
      <InputGroup className={cn("w-full bg-white", className)}>
        <InputGroupInput
          ref={ref}
          placeholder="Busque por titulos interessantes..."
          value={value}
          onChange={handleChange}
          {...props}
        />
        <InputGroupAddon>
          <Search className="size-4" />
        </InputGroupAddon>
        {resultsCount > 0 && (
          <InputGroupAddon align="inline-end">
            {resultsCount} result{resultsCount !== 1 ? 's' : ''}
          </InputGroupAddon>
        )}
      </InputGroup>
    )
  }
)

SearchInput.displayName = 'SearchInput'