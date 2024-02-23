'use client'
import { cartProductPrice } from "@/components/AppContext";
import Trash from "@/components/icons/Trash";
import Image from "next/image";

export default function CartProduct({product, index, onRemove}){
  return (
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
      {!!onRemove && (
        <div className="ml-2">
          <button type="button" className="p-2" onClick={() => onRemove(index)}><Trash /></button>
        </div>
      )}
    </div>
  );
}