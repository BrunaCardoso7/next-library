'use client'

import { useEffect, useRef, useCallback } from "react"
import { BookItem } from "./BookItem"
import { Book } from "../types/library.types"
import Load from "@/components/shared/load"
import { useInfiniteScroll } from "../hooks/useInfinityScroll"

type BookListProps = {
  data?: { books: Book[] } | Book[] | undefined
  onLoadMore?: () => void
  hasMore?: boolean
  isLoading?: boolean
}

export function BookList({
  data,
  onLoadMore,
  hasMore = false,
  isLoading = false,
}: BookListProps) {
  const books = Array.isArray(data) ? data : data?.books || []
  const { observerTarget } = useInfiniteScroll({ hasMore, isLoading, onLoadMore })
  if (!books || books.length === 0) return null;
  
  return (
    <div className="space-y-4">
      {books.map((book) => (
        <BookItem
          key={book.id}
          {...book} 
        />
      ))}
      {hasMore && (
        <div 
          ref={observerTarget} 
          className="h-10 flex items-center justify-center"
        >
          <Load isLoading={isLoading} />
        </div>
      )}
    </div>
  )
}