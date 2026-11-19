import { CartItem, Coffee, Order } from '@/types/coffee'

interface CartState {
  cartItems: CartItem[]
  lastOrder: Order | null
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: { coffee: Coffee; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: { id: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'CHECKOUT'; payload: { order: Order } }

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { coffee, quantity } = action.payload
      const existing = state.cartItems.find(item => item.id === coffee.id)
      if (existing) {
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.id === coffee.id
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          ),
        }
      }
      return {
        ...state,
        cartItems: [...state.cartItems, { ...coffee, quantity }],
      }
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload.id),
      }
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item,
        ),
      }
    case 'CLEAR_CART':
      return { ...state, cartItems: [] }
    case 'CHECKOUT':
      return { cartItems: [], lastOrder: action.payload.order }
    default:
      return state
  }
}
