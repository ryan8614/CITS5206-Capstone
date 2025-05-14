import { useEffect, RefObject } from 'react'

/**
 * Prevents scroll bleed when scrollable container reaches top or bottom.
 *
 * @param containerRef - React ref to the outer container
 * @param scrollSelector - Optional selector for inner scrollable element (e.g., '.ht_master .wtHolder')
 */
export function usePreventScrollBleed<T extends HTMLElement = HTMLElement>(
    containerRef: RefObject<T>,
    scrollSelector?: string
  ) {
    useEffect(() => {
      const outer = containerRef.current
      if (!outer) return
  
      const timeout = setTimeout(() => {
        const scrollTarget = scrollSelector
          ? outer.querySelector(scrollSelector)
          : outer
  
        if (!scrollTarget) return
  
        const handleWheel = (e: Event) => {
          const we = e as WheelEvent
          const { scrollTop, scrollHeight, clientHeight } = scrollTarget
  
          const isScrollable = scrollHeight > clientHeight
          if (!isScrollable) return
  
          const isAtTop = scrollTop === 0 && we.deltaY < 0
          const isAtBottom =
            scrollTop + clientHeight >= scrollHeight && we.deltaY > 0
  
          if (isAtTop || isAtBottom) {
            we.preventDefault()
            we.stopPropagation()
          }
        }
  
        scrollTarget.addEventListener('wheel', handleWheel, { passive: false })
  
        return () => {
          scrollTarget.removeEventListener('wheel', handleWheel)
        }
      }, 300)
  
      return () => clearTimeout(timeout)
    }, [containerRef, scrollSelector])
  }