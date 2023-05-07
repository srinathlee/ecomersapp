import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addCartItem: () => {},
  deleteCartItem: () => {},
  clearCart: () => {},
  incrementCartItem: () => {},
  decrementCartItem: () => {},
})

export default CartContext
