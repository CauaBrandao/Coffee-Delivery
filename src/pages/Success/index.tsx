import { useNavigate } from 'react-router-dom'
import { Timer, MapPin, CurrencyDollar } from '@phosphor-icons/react'
import { useCart } from '@/contexts/CartContext'
import styles from './Success.module.css'

const PAYMENT_LABELS: Record<string, string> = {
  credit: 'Cartão de Crédito',
  debit: 'Cartão de Débito',
  cash: 'Dinheiro',
}

export function Success() {
  const navigate = useNavigate()
  const { lastOrder } = useCart()

  if (!lastOrder) {
    navigate('/')
    return null
  }

  const { address, payment } = lastOrder

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>Uhu! Pedido confirmado</h1>
          <p className={styles.subtitle}>
            Agora é só aguardar que logo o café chegará até você
          </p>
        </div>

        <div className={styles.details}>
          <div className={styles.card}>
            <div className={styles.infoItem}>
              <span className={`${styles.infoIcon} ${styles.purple}`}>
                <MapPin size={16} weight="fill" />
              </span>
              <div>
                <p>
                  Entrega em{' '}
                  <strong>
                    {address.street}, {address.number}
                  </strong>
                </p>
                <p>
                  {address.neighborhood} – {address.city}, {address.state}
                </p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <span className={`${styles.infoIcon} ${styles.yellow}`}>
                <Timer size={16} weight="fill" />
              </span>
              <div>
                <p>Previsão de entrega</p>
                <strong>20 min – 30 min</strong>
              </div>
            </div>

            <div className={styles.infoItem}>
              <span className={`${styles.infoIcon} ${styles.yellowDark}`}>
                <CurrencyDollar size={16} weight="fill" />
              </span>
              <div>
                <p>Pagamento na entrega</p>
                <strong>{PAYMENT_LABELS[payment] ?? payment}</strong>
              </div>
            </div>
          </div>

          <img
            src={`${import.meta.env.BASE_URL}success-delivery.svg`}
            alt="Entregador de bicicleta"
            className={styles.illustration}
          />
        </div>

        <button className={styles.backBtn} onClick={() => navigate('/')}>
          Fazer novo pedido
        </button>
      </div>
    </div>
  )
}
