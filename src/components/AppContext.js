'use client'
import { SessionProvider } from "next-auth/react";
import { useState, createContext, useEffect } from "react";

export const CartContext = createContext({});

export function cartProductPrice(cartProduct) {
  let price = cartProduct.basePrice;
  if(cartProduct.size) {
    price += cartProduct.size.price;
  }
  if(cartProduct.ingredients?.length > 0){
    cartProduct.ingredients.forEach(ingredient => {
      price += ingredient.price;
    });
  }
  return price;
}

export function AppProvider({children}){
  const [cartProducts, setCartProducts] = useState([]);
  const ls = typeof window !== 'undefined' ? window.localStorage : null;

  useEffect(() => {
    if(ls && ls.getItem('cart')){
      setCartProducts(JSON.parse(ls.getItem('cart')));
    }
  }, []);

  function saveCartProductsToLocalStorage(cartProducts){
    if(ls){
      ls.setItem('cart', JSON.stringify(cartProducts));
    }
  }

  function clearCart(){
    setCartProducts([]);
    saveCartProductsToLocalStorage([]);
  }

  function removeCartProduct(indexRemove){
    setCartProducts(prev => {
      const newCartProducts = prev.filter((v, index) => index !== indexRemove);
      saveCartProductsToLocalStorage(newCartProducts);
      return newCartProducts;
    });
  }

  function addToCart(product, size=null, extras=[]) {
    setCartProducts(prevProducts => {
      const cartProduct = {...product, size, extras};
      const newProducts = [...prevProducts, cartProduct];
      saveCartProductsToLocalStorage(newProducts);
      return newProducts;
    });
  }
  return(
    <SessionProvider>
      <CartContext.Provider value={{
        cartProducts, addToCart, removeCartProduct, clearCart
      }}>
        {children}
      </CartContext.Provider>
    </SessionProvider>
  );
}