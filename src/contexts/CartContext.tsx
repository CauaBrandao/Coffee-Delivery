import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { CartItem, Coffee, Order } from '@/types/coffee'
import { cartReducer } from '@/reducers/cartReducer'

interface CartContextType {
  cartItems: CartItem[]
  cartCount: number
  cartTotal: number
  deliveryFee: number
  lastOrder: Order | null
  addToCart: (coffee: Coffee, quantity: number) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  checkout: (order: Order) => void
}

const CartContext = createContext<CartContextType>({} as CartContextType)

const STORAGE_KEY = 'coffee-delivery:cart-v1'
const ORDER_KEY = 'coffee-delivery:last-order-v1'

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
            image: '/images/coffees/expresso.svg',
            quantity: 2,
          },
          {
            id: '6',
            name: 'Latte',
            description: 'Uma dose de café expresso com o dobro de leite e espuma cremosa',
            tags: ['Tradicional', 'Com Leite'],
            price: 9.90,
            image: '/images/coffees/latte.svg',
            quantity: 1,
          },
        ]
      }

      if (isDemo && !order) {
        order = {
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

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cartItems))
  }, [state.cartItems])

  useEffect(() => {
    if (state.lastOrder) {
      localStorage.setItem(ORDER_KEY, JSON.stringify(state.lastOrder))
    }
  }, [state.lastOrder])

  const cartCount = state.cartItems.reduce((acc, item) => acc + item.quantity, 0)
  const cartTotal = state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const deliveryFee = state.cartItems.length > 0 ? 3.5 : 0

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
  }

  function checkout(order: Order) {
    dispatch({ type: 'CHECKOUT', payload: { order } })
  }

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        cartCount,
        cartTotal,
        deliveryFee,
        lastOrder: state.lastOrder,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        checkout,
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
