import {Component} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = product => {
    let {cartList} = this.state
    const getId = cartList.findIndex(obj => obj.id === product.id)
    if (getId === -1) {
      cartList.push(product)
    } else {
      cartList = cartList.map(each => {
        if (each.id === product.id) {
          return {...product, quantity: each.quantity + 1}
        }
        return each
      })
    }

    this.setState({cartList})

    // if (cartList.length === 0) {
    //   this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    // } else {
    //   this.setState(prevState => ({
    //     cartList: [
    //       ...prevState.cartList.foreach(each => {
    //         if (each.id === product.id) {
    //           return {...product, quantity: each.quantity + 1}
    //         }
    //         return product
    //       }),
    //     ],
    //   }))
    // }
  }

  deleteCartItem = id => {
    const {cartList} = this.state
    const filterData = cartList.filter(each => each.id !== id)
    this.setState({cartList: filterData})
  }

  clearCart = () => {
    this.setState({cartList: []})
  }

  incrementCartItem = id => {
    let {cartList} = this.state

    cartList = cartList.map(each => {
      if (each.id === id) {
        return {...each, quantity: each.quantity + 1}
      }
      return each
    })

    this.setState({cartList})
  }

  decrementCartItem = id => {
    let {cartList} = this.state

    cartList = cartList.map(each => {
      if (each.id === id) {
        if (each.quantity < 1) {
          return {...each, quantity: 1}
        }
        return {...each, quantity: each.quantity - 1}
      }
      return each
    })

    this.setState({cartList})
  }

  render() {
    const {cartList} = this.state

    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartList,
            addCartItem: this.addCartItem,
            deleteCartItem: this.deleteCartItem,
            clearCart: this.clearCart,
            incrementCartItem: this.incrementCartItem,
            decrementCartItem: this.decrementCartItem,
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/products" component={Products} />
            <ProtectedRoute
              exact
              path="/products/:id"
              component={ProductItemDetails}
            />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
