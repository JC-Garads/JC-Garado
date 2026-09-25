import { useEffect, useLayoutEffect, useState } from 'react'
import { themes, type ThemeName } from '../data/portfolio'

const THEME_STORAGE_KEY = 'portfolio-theme'

function readStoredTheme(): ThemeName {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
    if (stored && Object.hasOwn(themes, stored)) return stored as ThemeName
  } catch {
    // Storage can be unavailable (private mode, blocked site data).
  }
  return 'blue'
}

/** Applies the active theme's tokens to <html> so the page background follows it too. */
export function useTheme() {
  const [theme, setTheme] = useState<ThemeName>(readStoredTheme)

  useLayoutEffect(() => {
    const root = document.documentElement
    const tokens = themes[theme]
    root.style.setProperty('--primary', tokens.primary)
    root.style.setProperty('--on-primary', tokens.onPrimary)
    root.style.setProperty('--primary-soft', tokens.primarySoft)
    root.style.setProperty('--bg', tokens.bg)
    root.style.setProperty('--surface', tokens.surface)
    root.style.setProperty('--text', tokens.text)
    root.style.setProperty('--muted', tokens.muted)
    root.style.setProperty('--border', tokens.border)
    root.style.colorScheme = tokens.mode
    root.dataset.mode = tokens.mode

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch {
      // Ignore — the theme still applies for this visit.
    }
  }, [theme])

  return [theme, setTheme] as const
}

/** Adds `is-visible` to every [data-reveal] element as it scrolls into view. */
export function useReveal(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return

    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [enabled])
}

/** Returns the id of the section currently in the middle of the viewport. */
export function useActiveSection(ids: string[], enabled: boolean) {
  const [active, setActive] = useState('')

  useEffect(() => {
    if (!enabled) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )

    ids.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })
    return () => observer.disconnect()
  }, [ids, enabled])

  return active
}

export function useScrolled(offset = 12) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [offset])

  return scrolled
}
