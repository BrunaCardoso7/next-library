'use client'

import {
  useCallback,
  useEffect,
  useRef,
} from 'react'

type UseInfiniteScrollProps = {
  hasMore: boolean
  isLoading: boolean
  onLoadMore?: () => void
}

export function useInfiniteScroll({
  hasMore,
  isLoading,
  onLoadMore,
}: UseInfiniteScrollProps) {
  const observerTarget =
    useRef<HTMLDivElement>(null)

  const handleIntersection =
    useCallback(
      (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries

        if (
          entry.isIntersecting &&
          hasMore &&
          !isLoading &&
          onLoadMore
        ) {
          onLoadMore()
        }
      },
      [hasMore, isLoading, onLoadMore]
    )

  useEffect(() => {
    const observer =
      new IntersectionObserver(
        handleIntersection,
        {
          threshold: 0.1,
        }
      )

    const currentTarget =
      observerTarget.current

    if (currentTarget) {
      observer.observe(currentTarget)
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget)
      }
    }
  }, [handleIntersection])

  return {
    observerTarget,
  }
}