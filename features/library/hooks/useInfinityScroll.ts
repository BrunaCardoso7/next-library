'use client'

import {
  useCallback,
  useEffect,
  useRef,
  useState,
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
  const [node, setNode] = useState<HTMLDivElement | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const handleIntersection =
    useCallback(
      (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries

        if (!entry) return

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
    if (typeof IntersectionObserver === 'undefined') return

    observerRef.current = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '200px',
      threshold: 0,
    })

    const currentObserver = observerRef.current

    if (node) {
      currentObserver.observe(node)
    }

    return () => {
      try {
        if (node && currentObserver) currentObserver.unobserve(node)
      } catch (e) {
      }
      try {
        currentObserver && currentObserver.disconnect()
      } catch (e) {
      }
    }
  }, [node, handleIntersection])

  const observerTarget = useCallback((el: HTMLDivElement | null) => {
    setNode(el)
  }, [])

  return {
    observerTarget,
  }
}