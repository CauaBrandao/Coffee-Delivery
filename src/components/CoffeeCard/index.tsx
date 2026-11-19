import { useState } from 'react'
import { ShoppingCartSimple } from '@phosphor-icons/react'
import { Coffee } from '@/types/coffee'
import { useCart } from '@/contexts/CartContext'
import { QuantityControl } from '@/components/QuantityControl'
import { formatCurrency } from '@/utils/formatCurrency'
import styles from './CoffeeCard.module.css'

interface CoffeeCardProps {
  coffee: Coffee
}

export function CoffeeCard({ coffee }: CoffeeCardProps) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  function handleAddToCart() {
    addToCart(coffee, quantity)
    setQuantity(1)
  }

  return (
    <article className={styles.card}>
      <img src={coffee.image} alt={coffee.name} className={styles.image} />

      <div className={styles.tags}>
        {coffee.tags.map(tag => (
          <span key={tag} className={styles.tag}>{tag}</span>
        ))}
      </div>

      <h3 className={styles.name}>{coffee.name}</h3>
      <p className={styles.description}>{coffee.description}</p>

      <footer className={styles.footer}>
        <div className={styles.price}>
          <span className={styles.priceLabel}>R$</span>
          <span className={styles.priceValue}>{formatCurrency(coffee.price)}</span>
        </div>

        <div className={styles.actions}>
          <QuantityControl
            quantity={quantity}
            onIncrease={() => setQuantity(q => Math.min(q + 1, 99))}
            onDecrease={() => setQuantity(q => Math.max(q - 1, 1))}
            size="sm"
          />

          <button
            className={styles.addButton}
            onClick={handleAddToCart}
            aria-label={`Adicionar ${coffee.name} ao carrinho`}
          >
            <ShoppingCartSimple size={22} weight="fill" />
          </button>
        </div>
      </footer>
    </article>
  )
}
