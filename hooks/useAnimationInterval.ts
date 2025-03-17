"use client"

import { useState, useEffect } from "react"

export function useAnimationInterval(initialState = false, interval = 4000, delay = 0) {
  const [isAnimating, setIsAnimating] = useState(initialState)

  useEffect(() => {
    // Initial delay before starting the animation cycle
    const initialDelayTimeout = setTimeout(() => {
      // Start the animation cycle
      const timer = setInterval(() => {
        setIsAnimating(true)

        // Reset animation after 1 second
        const resetTimer = setTimeout(() => {
          setIsAnimating(false)
        }, 1000)

        return () => clearTimeout(resetTimer)
      }, interval)

      return () => clearInterval(timer)
    }, delay)

    return () => clearTimeout(initialDelayTimeout)
  }, [interval, delay])

  return isAnimating
}

