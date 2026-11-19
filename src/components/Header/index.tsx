import { ShoppingCart, Sun, Moon } from '@phosphor-icons/react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '@/contexts/CartContext'
import { useTheme } from '@/contexts/ThemeContext'
import styles from './Header.module.css'

export function Header() {
  const { cartCount } = useCart()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Link to="/" className={styles.logo}>
          <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="Coffee Delivery" className={styles.logoImg} />
          <span className={styles.logoText}>Coffee Delivery</span>
        </Link>

        <nav className={styles.actions}>
          <button
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label="Alternar tema"
            title={theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
          >
            {theme === 'light' ? (
              <Moon size={22} weight="fill" />
            ) : (
              <Sun size={22} weight="fill" />
            )}
          </button>

          <button
            className={styles.cartButton}
            onClick={() => navigate('/checkout')}
            aria-label={`Carrinho com ${cartCount} itens`}
          >
            <ShoppingCart size={22} weight="fill" />
            {cartCount > 0 && (
              <span className={styles.cartBadge}>{cartCount > 99 ? '99+' : cartCount}</span>
            )}
          </button>
        </nav>
      </div>
    </header>
  )
}
