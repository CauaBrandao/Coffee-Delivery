import { X, ClockCounterClockwise, Package, Trash } from '@phosphor-icons/react'
import { useCart } from '@/contexts/CartContext'
import { formatCurrency } from '@/utils/formatCurrency'
import styles from './OrdersModal.module.css'

interface OrdersModalProps {
  isOpen: boolean
  onClose: () => void
}

export function OrdersModal({ isOpen, onClose }: OrdersModalProps) {
  const { orderHistory, clearOrderHistory } = useCart()

  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.titleWrap}>
            <ClockCounterClockwise size={22} className={styles.headerIcon} />
            <h2 className={styles.title}>Meus Pedidos</h2>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Fechar">
            <X size={20} />
          </button>
        </div>

        <div className={styles.content}>
          {orderHistory.length === 0 ? (
            <div className={styles.empty}>
              <Package size={48} className={styles.emptyIcon} />
              <p className={styles.emptyText}>Você ainda não realizou nenhum pedido.</p>
              <span className={styles.emptySubtext}>Faça seu primeiro pedido e acompanhe seu histórico aqui!</span>
            </div>
          ) : (
            <div className={styles.orderList}>
              {orderHistory.map((order, idx) => (
                <div key={order.id || idx} className={styles.orderCard}>
                  <div className={styles.orderHeader}>
                    <div>
                      <span className={styles.orderId}>{order.id || `#ORD-${idx + 1}`}</span>
                      <span className={styles.orderDate}>{order.createdAt || 'Hoje'}</span>
                    </div>
                    <span className={styles.statusBadge}>Entregue</span>
                  </div>

                  <div className={styles.orderItems}>
                    {order.items.map(item => (
                      <div key={item.id} className={styles.itemRow}>
                        <img src={item.image} alt={item.name} className={styles.itemImg} />
                        <span className={styles.itemName}>
                          {item.quantity}x {item.name}
                        </span>
                        <span className={styles.itemPrice}>
                          R$ {formatCurrency(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className={styles.orderFooter}>
                    <span className={styles.addressSummary}>
                      📍 {order.address.street}, {order.address.number} — {order.address.city}/{order.address.state}
                    </span>
                    <strong className={styles.orderTotal}>
                      Total: R$ {formatCurrency(order.total + order.deliveryFee - (order.discount || 0))}
                    </strong>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {orderHistory.length > 0 && (
          <div className={styles.footer}>
            <button
              type="button"
              className={styles.clearBtn}
              onClick={() => {
                if (window.confirm('Tem certeza que deseja limpar o histórico de pedidos?')) {
                  clearOrderHistory()
                }
              }}
            >
              <Trash size={16} />
              Limpar histórico
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

