export interface CartItem {
  product_id: string
  name: string
  slug: string
  price: number
  quantity: number
  image: string
  stock: number
}

export interface Cart {
  items: CartItem[]
}

export interface CartSummary {
  subtotal: number
  shipping: number
  discount: number
  total: number
  item_count: number
}

export interface AddToCartInput {
  product_id: string
  quantity: number
}

export interface UpdateCartInput {
  quantity: number
}
