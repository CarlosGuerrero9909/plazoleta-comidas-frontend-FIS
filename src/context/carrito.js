import { createContext, useReducer, useState } from "react";
import { cartReducer, cartInitialState } from "../reducers/carritoReducer";

//1. Crear contexto
export const CartContext = createContext()

function useCartReducer() {
  // dispatch sends the actions to reducer
  const [state, dispatch] = useReducer(cartReducer, cartInitialState)

  const addToCart = menu => dispatch({
    type: 'ADD_TO_CART',
    payload: menu
  })

  const removeFromCart = menu => dispatch({
    type: 'REMOVE_FROM_CART',
    payload: menu
  })

  const clearCart = () => dispatch({
    type: 'CLEAR_CART'
  })

  return {state, addToCart, removeFromCart, clearCart}
}

//2. crear provider
export function CartProvider({ children }) {
  const {state, addToCart, removeFromCart, clearCart} = useCartReducer()

  return (
    <CartContext.Provider 
      value={
        {
          cart: state,
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

//useReducer is better because we extract the logic of update a state in only a function
//useReducer is a good practice
//for testing the update of a state is better useREducer
//useReducer is utility when we have multiple states in a component