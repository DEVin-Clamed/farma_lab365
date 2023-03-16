// inicializar o contexto
import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';
import { priceFormat } from "../utils/priceFormat";

export const CartContext = createContext()

// Montar o provedor

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState([])

  const addProduct = (product, observations, amount, priceWithDiscount) => {

    const data = {
      itemId: uuidv4(),
      product,
      priceWithDiscountFormatted: priceFormat(priceWithDiscount),
      priceWithDiscount,
      observations,
      amount,
      subTotal: priceWithDiscount * amount,
      subTotalFormatted: priceFormat(priceWithDiscount * amount)
    }

    setCart([...cart, data])
  }

  const changeAmount = (itemId, amount) => {
    setCart(cart.map(item => {
      if (item.itemId === itemId) {
        item.amount = amount
        item.subTotal = item.priceWithDiscount * amount
        item.subTotalFormatted = priceFormat(item.priceWithDiscount * amount)
      }
      return item
    }))
  }

  const removeItem = (itemId) => {
    setCart(cart.filter(item => {
      if (item.itemId !== itemId) {
        return true
      } else {
        return false
      }
    }))
    toast.success('Deletado com sucesso')
  }

  const resetCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider value={{
      cart: cart,
      addProduct: addProduct,
      removeItem: removeItem,
      changeAmount: changeAmount,
      resetCart: resetCart
    }}>
      {children}
    </CartContext.Provider>
  )
}
