import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  MapPinLine,
  CurrencyDollar,
  CreditCard,
  Bank,
  Money,
  Trash,
} from '@phosphor-icons/react'
import { useCart } from '@/contexts/CartContext'
import { QuantityControl } from '@/components/QuantityControl'
import { formatCurrency } from '@/utils/formatCurrency'
import { PaymentMethod } from '@/types/coffee'
import styles from './Checkout.module.css'

const checkoutSchema = z.object({
  cep: z.string().min(8, 'CEP inválido').max(9),
  street: z.string().min(3, 'Rua obrigatória'),
  number: z.string().min(1, 'Número obrigatório'),
  complement: z.string().optional(),
  neighborhood: z.string().min(2, 'Bairro obrigatório'),
  city: z.string().min(2, 'Cidade obrigatória'),
  state: z.string().length(2, 'UF inválida'),
  payment: z.enum(['credit', 'debit', 'cash'] as const, {
    errorMap: () => ({ message: 'Selecione uma forma de pagamento' }),
  }),
})

type CheckoutFormData = z.infer<typeof checkoutSchema>

const PAYMENT_OPTIONS: { value: PaymentMethod; label: string; icon: JSX.Element }[] = [
  { value: 'credit', label: 'Cartão de crédito', icon: <CreditCard size={16} /> },
  { value: 'debit', label: 'Cartão de débito', icon: <Bank size={16} /> },
  { value: 'cash', label: 'Dinheiro', icon: <Money size={16} /> },
]

export function Checkout() {
  const navigate = useNavigate()
  const { cartItems, cartTotal, deliveryFee, updateQuantity, removeFromCart, checkout } = useCart()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  })

  const selectedPayment = watch('payment')

  if (cartItems.length === 0) {
    return (
      <div className={styles.empty}>
        <h2>Seu carrinho está vazio</h2>
        <button onClick={() => navigate('/')}>Voltar ao catálogo</button>
      </div>
    )
  }

  function onSubmit(data: CheckoutFormData) {
    checkout({
      address: {
        cep: data.cep,
        street: data.street,
        number: data.number,
        complement: data.complement,
        neighborhood: data.neighborhood,
        city: data.city,
        state: data.state,
      },
      payment: data.payment,
      items: cartItems,
      total: cartTotal,
      deliveryFee,
    })
    navigate('/success')
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Left column */}
      <div className={styles.left}>
        <h2 className={styles.sectionTitle}>Complete seu pedido</h2>

        {/* Address */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.cardIcon} data-color="yellow">
              <MapPinLine size={22} />
            </span>
            <div>
              <h3>Endereço de Entrega</h3>
              <p>Informe o endereço onde deseja receber seu pedido</p>
            </div>
          </div>

          <div className={styles.formGrid}>
            <div className={`${styles.field} ${styles.colFull}`}>
              <input
                {...register('cep')}
                placeholder="CEP"
                className={errors.cep ? styles.fieldError : ''}
              />
              {errors.cep && <span className={styles.errorMsg}>{errors.cep.message}</span>}
            </div>

            <div className={`${styles.field} ${styles.colFull}`}>
              <input
                {...register('street')}
                placeholder="Rua"
                className={errors.street ? styles.fieldError : ''}
              />
              {errors.street && <span className={styles.errorMsg}>{errors.street.message}</span>}
            </div>

            <div className={styles.field}>
              <input
                {...register('number')}
                placeholder="Número"
                className={errors.number ? styles.fieldError : ''}
              />
              {errors.number && <span className={styles.errorMsg}>{errors.number.message}</span>}
            </div>

            <div className={`${styles.field} ${styles.colGrow}`}>
              <input {...register('complement')} placeholder="Complemento (opcional)" />
            </div>

            <div className={styles.field}>
              <input
                {...register('neighborhood')}
                placeholder="Bairro"
                className={errors.neighborhood ? styles.fieldError : ''}
              />
              {errors.neighborhood && <span className={styles.errorMsg}>{errors.neighborhood.message}</span>}
            </div>

            <div className={`${styles.field} ${styles.colGrow}`}>
              <input
                {...register('city')}
                placeholder="Cidade"
                className={errors.city ? styles.fieldError : ''}
              />
              {errors.city && <span className={styles.errorMsg}>{errors.city.message}</span>}
            </div>

            <div className={styles.field}>
              <input
                {...register('state')}
                placeholder="UF"
                maxLength={2}
                className={errors.state ? styles.fieldError : ''}
              />
              {errors.state && <span className={styles.errorMsg}>{errors.state.message}</span>}
            </div>
          </div>
        </div>

        {/* Payment */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.cardIcon} data-color="purple">
              <CurrencyDollar size={22} />
            </span>
            <div>
              <h3>Pagamento</h3>
              <p>O pagamento é feito na entrega. Escolha a forma que deseja pagar</p>
            </div>
          </div>

          <div className={styles.paymentOptions}>
            {PAYMENT_OPTIONS.map(option => (
              <label
                key={option.value}
                className={`${styles.paymentOption} ${selectedPayment === option.value ? styles.selected : ''}`}
              >
                <input
                  type="radio"
                  value={option.value}
                  {...register('payment')}
                  className={styles.hiddenRadio}
                />
                {option.icon}
                {option.label}
              </label>
            ))}
          </div>
          {errors.payment && (
            <span className={styles.errorMsg}>{errors.payment.message}</span>
          )}
        </div>
      </div>

      {/* Right column — Order summary */}
      <div className={styles.right}>
        <h2 className={styles.sectionTitle}>Cafés selecionados</h2>

        <div className={`${styles.card} ${styles.orderCard}`}>
          {cartItems.map(item => (
            <div key={item.id} className={styles.orderItem}>
              <img src={item.image} alt={item.name} className={styles.itemImage} />
              <div className={styles.itemDetails}>
                <span className={styles.itemName}>{item.name}</span>
                <div className={styles.itemActions}>
                  <QuantityControl
                    quantity={item.quantity}
                    onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                    onDecrease={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    size="sm"
                  />
                  <button
                    type="button"
                    className={styles.removeBtn}
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remover ${item.name}`}
                  >
                    <Trash size={16} />
                    Remover
                  </button>
                </div>
              </div>
              <span className={styles.itemPrice}>R$ {formatCurrency(item.price * item.quantity)}</span>
            </div>
          ))}

          <div className={styles.divider} />

          <div className={styles.summary}>
            <div className={styles.summaryRow}>
              <span>Total de itens</span>
              <span>R$ {formatCurrency(cartTotal)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Entrega</span>
              <span>R$ {formatCurrency(deliveryFee)}</span>
            </div>
            <div className={`${styles.summaryRow} ${styles.total}`}>
              <strong>Total</strong>
              <strong>R$ {formatCurrency(cartTotal + deliveryFee)}</strong>
            </div>
          </div>

          <button type="submit" className={styles.submitBtn}>
            Confirmar Pedido
          </button>
        </div>
      </div>
    </form>
  )
}
