'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Flame, WavesVertical } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'


export function BookActions() {
  const [isLiked, setIsLiked] = useState(false)
  const [isDisliked, setIsDisliked] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
    if (isDisliked) setIsDisliked(false)
  }

  const handleDislike = () => {
    setIsDisliked(!isDisliked)
    if (isLiked) setIsLiked(false)
  }

  return (
    <div className="flex gap-2">
      <Tooltip>
        <TooltipTrigger>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLike}
            className={isLiked ? "bg-red-100 text-red-600 hover:bg-red-200" : ""}
          >
            <Flame />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Foguinho na postagem</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDislike}
            className={isDisliked ? "bg-slate-200 text-slate-600 hover:bg-slate-300" : ""}
          >
            <WavesVertical />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Apagar foguinho da postagem</p>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
