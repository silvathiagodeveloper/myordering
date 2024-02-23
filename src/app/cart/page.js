'use client'
import { CartContext, cartProductPrice } from "@/components/AppContext";
import SectionHeaders from "@/components/layout/SectionHeaders";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import AddressInputs from "@/components/layout/AddressInputs";
import { useProfile } from "@/components/useProfile";
import CartProduct from "../../components/menu/CartProduct";

export default function CartPage(){
  const {cartProducts, removeCartProduct} = useContext(CartContext);
  const [address, setAddress] = useState({});
  const [delivery, setDelivery] = useState(5);
  const {data:profileData} = useProfile();

  useEffect(() => {
    if(window.location.href.includes('canceled=1')){
      toast.error('Payment Failed');
    }
  },[]);

  useEffect(() => {
    if(profileData?.city) {
      const {phone, streetAddress, city, postalCode, country} = profileData;
      const addressFromProfile = {phone, streetAddress, city, postalCode, country};
      setAddress(addressFromProfile);
    }
  },[profileData]);

  let subtotal = 0;
  cartProducts?.forEach(product => {
    subtotal += cartProductPrice(product);
  });
  function handleRemoveProductClick(index){
    removeCartProduct(index);
    toast.success('Product removed!');
  }
  function handleAddressChange(propName, value){
    setAddress(prevAddress => ({...prevAddress, [propName]:value}));
  }
  async function handleSubmitCheckout(ev){
    ev.preventDefault();
    //address and shopping cart
    const promise = new Promise((resolve, reject) => {
      fetch('/api/checkout',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          address,
          cartProducts,
        })
      }).then(async (response) => {
        if(response.ok) {
          resolve();
          window.location = await response.json();
        } else {
          reject();
        }
      });
    });
    await toast.promise(promise, {
      loading: 'Preparing your order...',
      success: 'Redirecting to payment...',
      error: 'Something went wrong'
    })
  }
  if(cartProducts?.length === 0){
    return (
      <section className="mt-8">
        <div className="text-center">
          <SectionHeaders mainHeader="Cart" />
          <p className="mt-4">Your shopping cart is empty</p>
        </div>
      </section>
    )
  }
  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Cart" />
      </div>
      <div className="mt-8 grid grid-cols-2 gap-8">
        <div>
          {cartProducts?.length === 0 && (
            <div>No products in your cart</div>
          )}
          {cartProducts?.length > 0 && cartProducts.map((product, index) => (
            <CartProduct product={product} index={index} onRemove={handleRemoveProductClick} />
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
          <h2>Checkout</h2>
          <form onSubmit={handleSubmitCheckout}>
            <AddressInputs 
              addressProps={address}
              setAddressProp={handleAddressChange} />
            <button type="submit">Pay ${subtotal+delivery}</button>
          </form>
        </div>
      </div>
    </section>
  );
}