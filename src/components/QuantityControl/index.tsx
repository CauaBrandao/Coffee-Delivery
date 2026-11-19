import { Minus, Plus } from '@phosphor-icons/react'
import styles from './QuantityControl.module.css'

interface QuantityControlProps {
  quantity: number
  onIncrease: () => void
  onDecrease: () => void
  min?: number
  max?: number
  size?: 'sm' | 'md'
}

export function QuantityControl({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  max = 99,
  size = 'md',
}: QuantityControlProps) {
  return (
    <div className={`${styles.container} ${styles[size]}`}>
      <button
        onClick={onDecrease}
        disabled={quantity <= min}
        aria-label="Diminuir quantidade"
        className={styles.btn}
      >
        <Minus weight="bold" />
      </button>
      <span className={styles.quantity}>{quantity}</span>
      <button
        onClick={onIncrease}
        disabled={quantity >= max}
        aria-label="Aumentar quantidade"
        className={styles.btn}
      >
        <Plus weight="bold" />
      </button>
    </div>
  )
}
