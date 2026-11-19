import { createContext, useContext, useReducer, useEffect, useState, ReactNode } from 'react'
import { CartItem, Coffee, Order } from '@/types/coffee'
import { cartReducer } from '@/reducers/cartReducer'

interface CouponResult {
  success: boolean
  message: string
}

interface CartContextType {
  cartItems: CartItem[]
  cartCount: number
  cartTotal: number
  deliveryFee: number
  coupon: string | null
  discount: number
  finalTotal: number
  lastOrder: Order | null
  orderHistory: Order[]
  favorites: string[]
  addToCart: (coffee: Coffee, quantity: number) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  checkout: (order: Order) => void
  applyCoupon: (code: string) => CouponResult
  removeCoupon: () => void
  toggleFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
  clearOrderHistory: () => void
}

const CartContext = createContext<CartContextType>({} as CartContextType)

const STORAGE_KEY = 'coffee-delivery:cart-v1'
const ORDER_KEY = 'coffee-delivery:last-order-v1'
const HISTORY_KEY = 'coffee-delivery:orders-history-v1'
const FAVORITES_KEY = 'coffee-delivery:favorites-v1'

const VALID_COUPONS: Record<string, { type: 'percent' | 'fixed' | 'shipping'; value: number; description: string }> = {
  COFFEE10: { type: 'percent', value: 0.1, description: '10% de desconto no total' },
  FRETEGRATIS: { type: 'shipping', value: 3.5, description: 'Entrega Grátis' },
  PRIMEIRACOMPRA: { type: 'fixed', value: 5.0, description: 'R$ 5,00 de desconto' },
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    cartItems: [],
    lastOrder: null,
  }, (initial) => {
    try {
      const isDemo =
        window.location.href.includes('demo=1') ||
        window.location.href.includes('checkout.html') ||
        window.location.href.includes('success.html')
      const stored = localStorage.getItem(STORAGE_KEY)
      const storedOrder = localStorage.getItem(ORDER_KEY)

      let items = stored ? JSON.parse(stored) : initial.cartItems
      let order = storedOrder ? JSON.parse(storedOrder) : initial.lastOrder

      if (isDemo && items.length === 0) {
        items = [
          {
            id: '1',
            name: 'Expresso Tradicional',
            description: 'O tradicional café feito com água quente e grãos moídos',
            tags: ['Tradicional'],
            price: 9.90,
            image: './images/coffees/expresso.svg',
            quantity: 2,
          },
          {
            id: '6',
            name: 'Latte',
            description: 'Uma dose de café expresso com o dobro de leite e espuma cremosa',
            tags: ['Tradicional', 'Com Leite'],
            price: 9.90,
            image: './images/coffees/latte.svg',
            quantity: 1,
          },
        ]
      }

      if (isDemo && !order) {
        order = {
          id: '#ORD-9842',
          createdAt: new Date().toLocaleDateString('pt-BR'),
          address: {
            cep: '90010-000',
            street: 'Rua das Flores',
            number: '123',
            complement: 'Apto 402',
            neighborhood: 'Centro',
            city: 'Porto Alegre',
            state: 'RS',
          },
          payment: 'credit',
          items,
          total: 29.70,
          deliveryFee: 3.50,
        }
      }

      return {
        cartItems: items,
        lastOrder: order,
      }
    } catch {
      return initial
    }
  })

  // Order history
  const [orderHistory, setOrderHistory] = useState<Order[]>(() => {
    try {
      const stored = localStorage.getItem(HISTORY_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY)
      return stored ? JSON.parse(stored) : ['1', '6']
    } catch {
      return ['1', '6']
    }
  })

  // Coupon
  const [coupon, setCoupon] = useState<string | null>(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cartItems))
  }, [state.cartItems])

  useEffect(() => {
    if (state.lastOrder) {
      localStorage.setItem(ORDER_KEY, JSON.stringify(state.lastOrder))
    }
  }, [state.lastOrder])

  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(orderHistory))
  }, [orderHistory])

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
  }, [favorites])

  const cartCount = state.cartItems.reduce((acc, item) => acc + item.quantity, 0)
  const cartTotal = state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const rawDeliveryFee = state.cartItems.length > 0 ? 3.5 : 0

  // Calculate discount
  let discount = 0
  let deliveryFee = rawDeliveryFee

  if (coupon && VALID_COUPONS[coupon] && state.cartItems.length > 0) {
    const c = VALID_COUPONS[coupon]
    if (c.type === 'percent') {
      discount = cartTotal * c.value
    } else if (c.type === 'fixed') {
      discount = Math.min(c.value, cartTotal)
    } else if (c.type === 'shipping') {
      deliveryFee = 0
      discount = rawDeliveryFee
    }
  }

  const finalTotal = Math.max(0, cartTotal + deliveryFee - (VALID_COUPONS[coupon || '']?.type === 'shipping' ? 0 : discount))

  function addToCart(coffee: Coffee, quantity: number) {
    dispatch({ type: 'ADD_TO_CART', payload: { coffee, quantity } })
  }

  function removeFromCart(id: string) {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id } })
  }

  function updateQuantity(id: string, quantity: number) {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  }

  function clearCart() {
    dispatch({ type: 'CLEAR_CART' })
    setCoupon(null)
  }

  function checkout(order: Order) {
    const enrichedOrder: Order = {
      ...order,
      id: `#ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }),
      coupon: coupon || undefined,
      discount: discount > 0 ? discount : undefined,
    }
    dispatch({ type: 'CHECKOUT', payload: { order: enrichedOrder } })
    setOrderHistory(prev => [enrichedOrder, ...prev.slice(0, 9)])
    setCoupon(null)
  }

  function applyCoupon(code: string): CouponResult {
    const clean = code.trim().toUpperCase()
    if (!clean) return { success: false, message: 'Digite um cupom' }
    if (VALID_COUPONS[clean]) {
      setCoupon(clean)
      return { success: true, message: `Cupom ${clean} aplicado: ${VALID_COUPONS[clean].description}!` }
    }
    return { success: false, message: 'Cupom inválido. Experimente COFFEE10 ou FRETEGRATIS' }
  }

  function removeCoupon() {
    setCoupon(null)
  }

  function toggleFavorite(id: string) {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  function isFavorite(id: string) {
    return favorites.includes(id)
  }

  function clearOrderHistory() {
    setOrderHistory([])
    localStorage.removeItem(HISTORY_KEY)
  }

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        cartCount,
        cartTotal,
        deliveryFee,
        coupon,
        discount,
        finalTotal,
        lastOrder: state.lastOrder,
        orderHistory,
        favorites,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        checkout,
        applyCoupon,
        removeCoupon,
        toggleFavorite,
        isFavorite,
        clearOrderHistory,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  return useContext(CartContext)
}
