'use client'
import { Button } from "@/components/ui/button"
import { Flame, WavesVertical } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useBookReaction } from '@/features/follow/hooks/useBookReaction'
import { ReactionType } from '../types/library.types'
import { useOnboardingContext } from "@/features/onboarding/providers/onboarding-provider"

type BookActionsProps = {
  id_book: number
  user_reaction?: ReactionType
  nr_followup_count: number
  nr_followdown_count: number
  ie_role?: string
}

export function BookActions({
  id_book,
  user_reaction,
  nr_followup_count,
  nr_followdown_count,
  ie_role
}: BookActionsProps) {
  const {data: user} = useOnboardingContext()
  const { handleReaction, isLoading } = useBookReaction({
    id_book,
    id_onboarding_user: user?.id ?? 0,
    currentReaction: user_reaction,
    ie_role
  })

  const isUpActive = user_reaction === 'UP'
  const isDownActive = user_reaction === 'DOWN'

  const handleLike = () => {
    handleReaction('UP')
  }

  const handleDislike = () => {
    handleReaction('DOWN')
  }

  return (
    <div className="flex gap-2 items-center">
      <div className="flex items-center gap-1">
        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLike}
              disabled={isLoading}
              className={isUpActive ? "bg-red-100 text-red-600 hover:bg-red-200" : ""}
            >
              <Flame />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isUpActive ? 'Remover foguinho' : 'Foguinho na postagem'}</p>
          </TooltipContent>
        </Tooltip>
        <span className="text-sm font-medium text-gray-600 min-w-6">
          {nr_followup_count}
        </span>
      </div>

      <div className="flex items-center gap-1">
        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDislike}
              disabled={isLoading}
              className={isDownActive ? "bg-slate-200 text-slate-600 hover:bg-slate-300" : ""}
            >
              <WavesVertical />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isDownActive ? 'Remover reação' : 'Apagar foguinho da postagem'}</p>
          </TooltipContent>
        </Tooltip>
        <span className="text-sm font-medium text-gray-600 min-w-6">
          {nr_followdown_count}
        </span>
      </div>
    </div>
  )
}
