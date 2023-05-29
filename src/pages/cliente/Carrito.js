import { useId } from 'react';
import './Carrito.css'

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
  const cartCheckboxId = useId()
  const { cart, clearCart, addToCart } = useCart()

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
      </aside>
    </>
  )
}