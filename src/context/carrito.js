import { createContext, useState } from "react";

//1. Crear contexto
export const CartContext = createContext()

//2. crear provider
export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  const addToCart = menu => {
    // We should check if product is already in cart
    const productInCartIndex = cart.findIndex(item => item.id === menu.id)

    if (productInCartIndex >= 0) {
      //if product is already in cart, then we create a clone of cart
      const newCart = structuredClone(cart)
      newCart[productInCartIndex].quantity += 1
      return setCart(newCart)
    }

    //product there is not in the cart
    setCart(prevState => ([
      ...prevState,
      {
        ...menu,
        quantity: 1
      }
    ]))
  }

  const removeFromCart = (menu) => {
    setCart(prevState => prevState.filter(item => item.id !== menu.id))
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider 
      value={
        {
          cart,
          addToCart,
          removeFromCart,
          clearCart
        }
      }
    >
      {children}
    </CartContext.Provider>
  )
}