import Header from '../Header'
import CartListView from '../CartListView'
import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'
import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, clearCart} = value
      const cartLength = cartList.length

      const orderTotal = cartList.reduce(
        (s, each) => s + each.quantity * each.price,
        0,
      )

      return (
        <>
          <Header />
          {cartLength === 0 ? (
            <EmptyCartView />
          ) : (
            <div className="cart-container">
              <div className="cart-content-container">
                <div className="cart-heading-remove">
                  <h1 className="cart-heading">My Cart</h1>
                  <button onClick={clearCart} className="remove-heading">
                    RemoveAll
                  </button>
                </div>
                <CartListView />
              </div>
              <div className="cart-total-prict-details">
                <h1 className="order-total-heading">
                  Order Total:{orderTotal} -/
                </h1>
                <p className="items-in-cart">{cartLength} items in cart</p>
                <button className="checkout-button">Checkout</button>
              </div>
            </div>
          )}
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
