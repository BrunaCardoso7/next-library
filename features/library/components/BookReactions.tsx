'use client'
import { ThumbsUp, ThumbsDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useBookReaction } from '@/features/follow/hooks/useBookReaction'
import { ReactionType } from '../types/library.types'

type BookReactionsProps = {
  id_book: number
  id_onboarding_user: number
  user_reaction?: ReactionType
  nr_followup_count: number
  nr_followdown_count: number
}

export function BookReactions({
  id_book,
  id_onboarding_user,
  user_reaction,
  nr_followup_count,
  nr_followdown_count,
}: BookReactionsProps) {
  const { handleReaction, isLoading } = useBookReaction({
    id_book,
    id_onboarding_user,
    currentReaction: user_reaction,
  })

  const isUpActive = user_reaction === 'UP'
  const isDownActive = user_reaction === 'DOWN'

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleReaction('UP')}
              disabled={isLoading}
              className={`transition-colors ${
                isUpActive
                  ? 'bg-green-100 text-green-600 hover:bg-green-200'
                  : 'hover:bg-muted'
              } disabled:opacity-50`}
            >
              <ThumbsUp className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isUpActive ? 'Remover reação' : 'Gostei'}</p>
          </TooltipContent>
        </Tooltip>

        <span className="text-sm font-medium text-gray-600 min-w-6 text-center">
          {nr_followup_count}
        </span>
      </div>

      <div className="flex gap-1">
        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleReaction('DOWN')}
              disabled={isLoading}
              className={`transition-colors ${
                isDownActive
                  ? 'bg-red-100 text-red-600 hover:bg-red-200'
                  : 'hover:bg-muted'
              } disabled:opacity-50`}
            >
              <ThumbsDown className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isDownActive ? 'Remover reação' : 'Não gostei'}</p>
          </TooltipContent>
        </Tooltip>

        <span className="text-sm font-medium text-gray-600 min-w-6 text-center">
          {nr_followdown_count}
        </span>
      </div>
    </div>
  )
}
