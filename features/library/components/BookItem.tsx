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

export function BookItem({
  className,
  ...props
}: React.ComponentProps<"div">) {

  return (
    <Item className="bg-white rounded-md p-4" >
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <ItemMedia variant="icon">
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Title</ItemTitle>
        <ItemDescription>Description</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button>Action</Button>
      </ItemActions>
    </Item>
  )
}