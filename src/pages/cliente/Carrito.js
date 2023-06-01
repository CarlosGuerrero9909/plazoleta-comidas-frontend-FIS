import { useId, useEffect, useState } from 'react';
import transService from '../../services/transaccion'
import './Carrito.css'

import Button from '@mui/material/Button';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '../../hooks/useCart';

function CartItem ({ imagen, precioTotal, nombre, quantity, addToCart }) {
  return (
    <li>
      <img
        src={imagen}
        alt={nombre}
      />
      <div>
        <strong>{nombre}</strong> - ${precioTotal}
      </div>

      <footer>
        <small >
          Qty: {quantity}
        </small>
        <button onClick={addToCart}>+</button>
      </footer>
    </li>
  )
}

export default function Cart() {
  const [user, setUser] = useState({})
  const cartCheckboxId = useId()
  const { cart, clearCart, addToCart } = useCart()

  useEffect(() => {
    const loggedUserJSON = JSON.parse(sessionStorage.getItem('usuario'))
    if (loggedUserJSON) {
      const user = loggedUserJSON
      setUser(user)
      transService.setToken(user.token)
    }
  }, [])

  const handleClickTransaction = async () => {
    const cartSend = cart
    const dispResponse = await transService.consultarDisponibilidad(cartSend)
    const pagoResponse = await transService.hacerPago()
    console.log(dispResponse)
    console.log(pagoResponse)
    alert(`Hay diponibilidad: ${dispResponse.resultado} su pago fue ${pagoResponse.resultado}`)
    clearCart()
  }

  return (
    <>
      <label className='cart-button' htmlFor={cartCheckboxId}>
        <ShoppingCartIcon />
      </label>
      <input id={cartCheckboxId} type='checkbox' hidden />
      <aside className='cart'>
        <ul>
          {
            cart.map(menu => (
              <CartItem 
                key={menu.id} 
                addToCart={() => addToCart(menu)}  
                {...menu}
              />
            ))
          }
        </ul>
        <button onClick={clearCart}>
          <RemoveShoppingCartIcon />
        </button>
        <Button onClick={handleClickTransaction} variant="contained" color="success">
          Comprar
        </Button>
      </aside>
    </>
  )
}