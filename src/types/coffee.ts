export interface Coffee {
  id: string
  name: string
  description: string
  tags: string[]
  price: number
  image: string
}

export interface CartItem extends Coffee {
  quantity: number
}

export type PaymentMethod = 'credit' | 'debit' | 'cash'

export interface OrderAddress {
  cep: string
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
}

export interface Order {
  id?: string
  createdAt?: string
  address: OrderAddress
  payment: PaymentMethod
  items: CartItem[]
  total: number
  deliveryFee: number
  coupon?: string
  discount?: number
}
