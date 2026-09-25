import { useEffect, useRef, useState } from 'react'
import { navLinks, profile, themes, type ThemeName } from '../data/portfolio'
import { useScrolled } from '../hooks/usePortfolioEffects'
import { CloseIcon, MenuIcon } from './icons'

type HeaderProps = {
  theme: ThemeName
  onThemeChange: (theme: ThemeName) => void
  activeSection: string
}

function ThemeSwitcher({ theme, onThemeChange }: Pick<HeaderProps, 'theme' | 'onThemeChange'>) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setIsOpen(false)
    }
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  return (
    <div className="theme-switcher" ref={menuRef}>
      <button
        type="button"
        className={isOpen ? 'theme-toggle open' : 'theme-toggle'}
        onClick={() => setIsOpen((current) => !current)}
        aria-label="Toggle color themes"
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        <span className="swatch" style={{ background: themes[theme].primary }} />
        <span className="theme-toggle-label">{themes[theme].label}</span>
      </button>

      {isOpen && (
        <div className="theme-menu" role="menu" aria-label="Theme options">
          <p className="theme-menu-title">Appearance</p>
          {(Object.entries(themes) as [ThemeName, (typeof themes)[ThemeName]][]).map(([key, value]) => (
            <button
              key={key}
              type="button"
              className={theme === key ? 'theme-option active' : 'theme-option'}
              onClick={() => {
                onThemeChange(key)
                setIsOpen(false)
              }}
              aria-label={`Switch to ${value.label} theme`}
              role="menuitem"
            >
              <span className="theme-option-preview" style={{ background: value.bg, borderColor: value.border }}>
                <span style={{ background: value.primary }} />
              </span>
              <span>{value.label}</span>
              <span className="theme-option-mode">{value.mode}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export function Header({ theme, onThemeChange, activeSection }: HeaderProps) {
  const scrolled = useScrolled()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className={scrolled ? 'topbar scrolled' : 'topbar'}>
      <div className="topbar-inner">
        <a className="brand" href="#top" aria-label={`${profile.name} — back to top`}>
          <span className="brand-mark">{profile.initials}</span>
          <span className="brand-name">{profile.name}</span>
        </a>

        <nav className={isMenuOpen ? 'nav open' : 'nav'} aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={activeSection === link.id ? 'active' : undefined}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="topbar-actions">
          <ThemeSwitcher theme={theme} onThemeChange={onThemeChange} />
          <button
            type="button"
            className="menu-toggle"
            onClick={() => setIsMenuOpen((current) => !current)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
    </header>
  )
}
