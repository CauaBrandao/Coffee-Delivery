import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type ThemeMode = 'light' | 'dark'
export type ColorPalette = 'classic' | 'matcha' | 'berry' | 'caramel' | 'cyber'

export interface PaletteInfo {
  id: ColorPalette
  name: string
  primaryColor: string
  accentColor: string
  icon: string
}

export const COLOR_PALETTES: PaletteInfo[] = [
  { id: 'classic', name: 'Clássico Coffee', primaryColor: '#DBAC2C', accentColor: '#8047F8', icon: '☕' },
  { id: 'matcha', name: 'Matcha & Menta', primaryColor: '#2E7D32', accentColor: '#00897B', icon: '🍵' },
  { id: 'berry', name: 'Frutas Vermelhas', primaryColor: '#C2185B', accentColor: '#E64A19', icon: '🍓' },
  { id: 'caramel', name: 'Caramelo & Avelã', primaryColor: '#D97706', accentColor: '#78350F', icon: '🍯' },
  { id: 'cyber', name: 'Cyber & Neon', primaryColor: '#06B6D4', accentColor: '#8B5CF6', icon: '⚡' },
]

interface ThemeContextType {
  theme: ThemeMode
  palette: ColorPalette
  toggleTheme: () => void
  setTheme: (mode: ThemeMode) => void
  setPalette: (palette: ColorPalette) => void
}

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType)

const STORAGE_THEME_KEY = 'coffee-delivery:theme'
const STORAGE_PALETTE_KEY = 'coffee-delivery:palette'

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (document.documentElement.getAttribute('data-theme') === 'dark') return 'dark'
    if (window.location.href.includes('theme=dark') || window.location.href.includes('dark')) return 'dark'
    if (window.location.href.includes('theme=light') || window.location.href.includes('light')) return 'light'
    const stored = localStorage.getItem(STORAGE_THEME_KEY)
    if (stored === 'dark' || stored === 'light') return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  const [palette, setPaletteState] = useState<ColorPalette>(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const urlPalette = urlParams.get('palette') as ColorPalette | null
    if (urlPalette && COLOR_PALETTES.some(p => p.id === urlPalette)) return urlPalette
    const stored = localStorage.getItem(STORAGE_PALETTE_KEY) as ColorPalette | null
    if (stored && COLOR_PALETTES.some(p => p.id === stored)) return stored
    return 'classic'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(STORAGE_THEME_KEY, theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.setAttribute('data-palette', palette)
    localStorage.setItem(STORAGE_PALETTE_KEY, palette)
  }, [palette])

  function toggleTheme() {
    setThemeState(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  function setTheme(mode: ThemeMode) {
    setThemeState(mode)
  }

  function setPalette(newPalette: ColorPalette) {
    setPaletteState(newPalette)
  }

  return (
    <ThemeContext.Provider value={{ theme, palette, toggleTheme, setTheme, setPalette }}>
      {children}
    </ThemeContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  return useContext(ThemeContext)
}
