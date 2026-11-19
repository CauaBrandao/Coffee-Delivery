import { useState } from 'react'
import { ShoppingCart, ClockCounterClockwise } from '@phosphor-icons/react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '@/contexts/CartContext'
import { ThemeSelector } from '@/components/ThemeSelector'
import { OrdersModal } from '@/components/OrdersModal'
import styles from './Header.module.css'

export function Header() {
  const { cartCount, orderHistory } = useCart()
  const navigate = useNavigate()
  const [isOrdersOpen, setIsOrdersOpen] = useState(false)

  return (
    <>
      <header className={styles.header}>
        <div className={styles.content}>
          <Link to="/" className={styles.logo} aria-label="Coffee Delivery - Página Inicial">
            <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="Coffee Delivery" className={styles.logoImg} />
          </Link>

          <nav className={styles.actions}>
            {/* Theme & Palette Selector */}
            <ThemeSelector />

            {/* Orders History Button */}
            <button
              className={styles.ordersButton}
              onClick={() => setIsOrdersOpen(true)}
              aria-label="Ver histórico de pedidos"
              title="Meus Pedidos"
            >
              <ClockCounterClockwise size={20} weight="bold" />
              {orderHistory.length > 0 && (
                <span className={styles.ordersBadge}>{orderHistory.length}</span>
              )}
            </button>

            {/* Cart Button */}
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

      <OrdersModal isOpen={isOrdersOpen} onClose={() => setIsOrdersOpen(false)} />
    </>
  )
}
