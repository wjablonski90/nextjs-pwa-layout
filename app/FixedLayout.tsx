'use client'

import { useEffect } from 'react'

export function FixedLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const updateAppHeight = () => {
      const height = window.visualViewport?.height ?? window.innerHeight
      document.documentElement.style.setProperty('--app-height', `${height}px`)
    }

    updateAppHeight()

    window.visualViewport?.addEventListener('resize', updateAppHeight)
    window.visualViewport?.addEventListener('scroll', updateAppHeight)

    return () => {
      window.visualViewport?.removeEventListener('resize', updateAppHeight)
      window.visualViewport?.removeEventListener('scroll', updateAppHeight)
    }
  }, [])

  return (
    <div className="fixed-layout">{children}</div>
  )
}
