'use client'
import { CartContext, cartProductPrice } from "@/components/AppContext";
import SectionHeaders from "@/components/layout/SectionHeaders";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import AddressInputs from "@/components/layout/AddressInputs";
import CartProduct from "@/components/menu/CartProduct";

export default function OrderPage(){
  const {clearCart} = useContext(CartContext);
  const [order, setOrder] = useState('');
  const [subtotal, setSubtotal] = useState(0);
  const {id} = useParams();
  const delivery = 5;
  useEffect(() => {
    if(typeof window.console !== undefined){
      if(window.location.href.includes('clear-cart=1')){
        clearCart();
      }
    }
    if(id){
      fetch('/api/orders?_id='+id).then(response => {
        response.json().then(orderData => {
          setOrder(orderData);
          let subtotal = 0;
          orderData.cartProducts?.forEach(product => {
            subtotal += cartProductPrice(product);
          });
          setSubtotal(subtotal);
        })
      })
    }
  },[]);
  return(
    <section className="max-w-2xl mx-auto">
      <div className="text-center">
        <SectionHeaders mainHeader="Your order" />
        <div className="my-4">
          <p>Thanks for your order</p>
          <p>We will call you when your order is on its way.</p>
        </div>
      </div>
      {order && (
        <div className="grid grid-cols-2 gap-16">
          <div>
            {order.cartProducts?.length > 0 && order.cartProducts.map((product, index) => (
              <CartProduct product={product} index={index} />
            ))}
            <div className="pt-2 text-right pr-16">
              <span className="text-gray-500">
                Subtotal: 
              </span>
              <span className="text-jg font-semibold pl-2">
                ${subtotal}
              </span>
            </div>
            <div className="text-right pr-16">
              <span className="text-gray-500">
                Delivery: 
              </span>
              <span className="text-jg font-semibold pl-2">
                ${delivery}
              </span>
            </div>
            <div className="text-right pr-16">
              <span className="text-gray-500">
                Total: 
              </span>
              <span className="text-jg font-semibold pl-2">
                ${subtotal+delivery}
              </span>
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <AddressInputs disabled={true} addressProps={...order} />
          </div>
        </div>
      )}
    </section>
  );
}