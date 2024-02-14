'use client'
import { CartContext, cartProductPrice } from "@/components/AppContext";
import SectionHeaders from "@/components/layout/SectionHeaders";
import Trash from "@/components/icons/Trash";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import AddressInputs from "@/components/layout/AddressInputs";
import { useProfile } from "@/components/useProfile";

export default function CartPage(){
  const {cartProducts, removeCartProduct} = useContext(CartContext);
  const [address, setAddress] = useState({});
  const {data:profileData} = useProfile();

  useEffect(() => {
    if(profileData?.city) {
      const {phone, streetAddress, city, postalCode, country} = profileData;
      const addressFromProfile = {phone, streetAddress, city, postalCode, country};
      setAddress(addressFromProfile);
    }
  },[profileData]);

  let total = 0;
  cartProducts?.forEach(product => {
    total += cartProductPrice(product);
  });
  function handeRemoveProductClick(index){
    removeCartProduct(index);
    toast.success('Product removed!');
  }
  function handleAddressChange(propName, value){
    setAddress(prevAddress => ({...prevAddress, [propName]:value}));
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
            <div key={product._id+'_'+index} className="flex gap-4 border-b py-4 items-center">
              <div className="w-24">
                <Image src={product.image} alt={product.name} width="100" height="100" />
              </div>
              <div className="grow">
                <h3 className="font-semibold">
                  {product.name}
                </h3>
                {product?.size && (
                  <div className="text-sm text-gray-700">
                    Size: <span>{product?.size.name}</span>
                  </div>
                )}
                {product?.ingredients?.length > 0 && (
                  <div className="text-sm text-gray-500">
                    {product?.ingredients.map(i => (
                      <div key={product._id+'_'+index+'_'+i._id}>{i.name} ${i.price}</div>
                    ))}
                  </div>
                )}
              </div>
              <div className="text-lg font-semibold">
                ${cartProductPrice(product)}
              </div>
              <div className="ml-2">
                <button type="button" className="p-2" onClick={() => handeRemoveProductClick(index)}><Trash /></button>
              </div>
            </div>
          ))}
          <div className="py-2 text-right pr-16">
            <span className="text-gray-500">
              Subtotal: 
            </span>
            <span className="text-jg font-semibold pl-2">
              ${total}
            </span>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2>Checkout</h2>
          <form>
            <AddressInputs 
              addressProps={address}
              setAddressProp={handleAddressChange} />
            <button type="submit">Pay ${total}</button>
          </form>
        </div>
      </div>
    </section>
  );
}