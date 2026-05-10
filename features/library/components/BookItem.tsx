'use client'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Book } from "../types/library.types"
import { BookActions } from "./BookActions"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

type BookItemProps = Book & {
  ie_role?: string
}

export function BookItem({
  id,
  nm_title,
  nm_author,
  user_reaction,
  dt_published_year,
  nm_user_cri,
  nr_followup_count,
  nr_followdown_count,
  ie_role
}: BookItemProps) {
  return (
    <Item className="bg-white rounded-md p-4">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <ItemMedia variant="icon"></ItemMedia>
      <ItemContent>
        <ItemTitle>{nm_title}</ItemTitle>
        <ItemDescription>{nm_author}</ItemDescription>
      </ItemContent>
      <div  className="flex flex-col items-end gap-2">
        <div className="flex gap-2">
          <Tooltip >
            <TooltipTrigger>
              <Badge variant="secondary">{nm_user_cri}</Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>Usuário que recomendou</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <Badge>{dt_published_year}</Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>Ano de publicação</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <ItemActions>
          {id && (
            <BookActions
              id_book={Number(id)}
              user_reaction={user_reaction}
              nr_followup_count={nr_followup_count}
              nr_followdown_count={nr_followdown_count}
              ie_role={ie_role}
            />
          )}
        </ItemActions>
      </div>
    </Item>
  )
}