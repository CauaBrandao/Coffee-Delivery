import { useState } from 'react'
import { ShoppingCartSimple, Heart } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'
import { Coffee } from '@/types/coffee'
import { useCart } from '@/contexts/CartContext'
import { useToast } from '@/contexts/ToastContext'
import { QuantityControl } from '@/components/QuantityControl'
import { formatCurrency } from '@/utils/formatCurrency'
import styles from './CoffeeCard.module.css'

interface CoffeeCardProps {
  coffee: Coffee
}

export function CoffeeCard({ coffee }: CoffeeCardProps) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart, toggleFavorite, isFavorite } = useCart()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const favorited = isFavorite(coffee.id)

  function handleAddToCart() {
    addToCart(coffee, quantity)
    showToast(
      `${quantity}x ${coffee.name} adicionado ao carrinho!`,
      'Ver Carrinho',
      () => navigate('/checkout')
    )
    setQuantity(1)
  }

  return (
    <article className={styles.card}>
      <button
        type="button"
        className={`${styles.favoriteBtn} ${favorited ? styles.favorited : ''}`}
        onClick={() => toggleFavorite(coffee.id)}
        aria-label={favorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        title={favorited ? 'Remover dos favoritos' : 'Favoritar'}
      >
        <Heart size={18} weight={favorited ? 'fill' : 'regular'} />
      </button>

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
