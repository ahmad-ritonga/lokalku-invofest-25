"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { SunFilledIcon, MoonFilledIcon } from "./icons"
import { flushSync } from "react-dom"
import { cn } from "../lib/utils"

interface AnimatedThemeTogglerProps
  extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number
}

export const AnimatedThemeToggler = ({
  className,
  duration = 400,
  ...props
}: AnimatedThemeTogglerProps) => {
  const [isDark, setIsDark] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"))
    }

    updateTheme()

    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [])

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current) return

    // Check if View Transition API is supported
    if (!document.startViewTransition) {
      // Fallback for browsers that don't support View Transition API
      flushSync(() => {
        const newTheme = !isDark
        setIsDark(newTheme)
        document.documentElement.classList.toggle("dark")
        localStorage.setItem("theme", newTheme ? "dark" : "light")
      })
      return
    }

    // Get button position before starting transition
    const { top, left, width, height } = buttonRef.current.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top)
    )

    // Start view transition with improved performance
    const transition = document.startViewTransition(() => {
      flushSync(() => {
        const newTheme = !isDark
        setIsDark(newTheme)
        document.documentElement.classList.toggle("dark")
        localStorage.setItem("theme", newTheme ? "dark" : "light")
      })
    })

    // Wait for transition to be ready and apply circular reveal
    try {
      await transition.ready
      
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      )
    } catch (error) {
      console.warn('View transition animation failed:', error)
    }
  }, [isDark, duration])

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      className={cn(
        "w-10 h-10 rounded-lg transition-all duration-500 hover:scale-110 hover:bg-primary-50 dark:hover:bg-primary-900/20 flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
        className
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      {...props}
    >
      <div className="relative w-5 h-5 overflow-hidden">
        <SunFilledIcon 
          className={`absolute inset-0 w-5 h-5 transition-all duration-700 ease-in-out transform ${
            isDark 
              ? "rotate-180 scale-0 opacity-0" 
              : "rotate-0 scale-100 opacity-100"
          } group-hover:scale-110`}
          aria-hidden="true"
        />
        <MoonFilledIcon 
          className={`absolute inset-0 w-5 h-5 transition-all duration-700 ease-in-out transform ${
            isDark 
              ? "rotate-0 scale-100 opacity-100" 
              : "-rotate-180 scale-0 opacity-0"
          } group-hover:scale-110`}
          aria-hidden="true"
        />
      </div>
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}