'use client'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Book } from "../types/library.types"

export function BookItem({ nm_title, nm_author }: Book) {

  return (
    <Item className="bg-white rounded-md p-4" >
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <ItemMedia variant="icon">
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{nm_title}</ItemTitle>
        <ItemDescription>{nm_author}</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button>Action</Button>
      </ItemActions>
    </Item>
  )
}