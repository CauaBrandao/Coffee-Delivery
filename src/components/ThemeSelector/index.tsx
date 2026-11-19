import { useState, useRef, useEffect } from 'react'
import { Palette, Sun, Moon, Check } from '@phosphor-icons/react'
import { useTheme, COLOR_PALETTES, ColorPalette } from '@/contexts/ThemeContext'
import styles from './ThemeSelector.module.css'

export function ThemeSelector() {
  const { theme, palette, toggleTheme, setPalette } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={styles.container} ref={dropdownRef}>
      <button
        type="button"
        className={`${styles.trigger} ${isOpen ? styles.active : ''}`}
        onClick={() => setIsOpen(prev => !prev)}
        aria-label="Personalizar tema e cores"
        title="Personalizar tema e cores"
      >
        <Palette size={20} weight="fill" />
        <span className={styles.paletteBadge} style={{ backgroundColor: COLOR_PALETTES.find(p => p.id === palette)?.primaryColor }} />
      </button>

      {isOpen && (
        <div className={styles.popover}>
          <div className={styles.popoverHeader}>
            <span className={styles.popoverTitle}>Personalizar Visual</span>
          </div>

          <div className={styles.section}>
            <span className={styles.sectionLabel}>Modo de exibição</span>
            <div className={styles.themeToggleRow}>
              <button
                type="button"
                className={`${styles.modeBtn} ${theme === 'light' ? styles.modeActive : ''}`}
                onClick={() => { if (theme !== 'light') toggleTheme() }}
              >
                <Sun size={18} weight="fill" />
                <span>Claro</span>
              </button>
              <button
                type="button"
                className={`${styles.modeBtn} ${theme === 'dark' ? styles.modeActive : ''}`}
                onClick={() => { if (theme !== 'dark') toggleTheme() }}
              >
                <Moon size={18} weight="fill" />
                <span>Escuro</span>
              </button>
            </div>
          </div>

          <div className={styles.section}>
            <span className={styles.sectionLabel}>Paleta de Cores</span>
            <div className={styles.palettesList}>
              {COLOR_PALETTES.map(p => {
                const isSelected = palette === p.id
                return (
                  <button
                    key={p.id}
                    type="button"
                    className={`${styles.paletteOption} ${isSelected ? styles.paletteSelected : ''}`}
                    onClick={() => {
                      setPalette(p.id as ColorPalette)
                      setIsOpen(false)
                    }}
                  >
                    <span className={styles.paletteIcon}>{p.icon}</span>
                    <span className={styles.paletteName}>{p.name}</span>
                    <div className={styles.swatches}>
                      <span className={styles.swatch} style={{ backgroundColor: p.primaryColor }} />
                      <span className={styles.swatch} style={{ backgroundColor: p.accentColor }} />
                    </div>
                    {isSelected && <Check size={16} weight="bold" className={styles.checkIcon} />}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

