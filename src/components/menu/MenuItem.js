import { useContext, useState } from "react";
import { CartContext } from "../AppContext";
import MenuItemTile from "@/components/menu/MenuItemTile";
import toast from "react-hot-toast";
import Image from "next/image";

export default function MenuItem({menuItem}){
  const [selectedSize, setSelectedSize] = useState(menuItem.sizes?.[0] || null);
  const [selectedIngrediets, setSelectedIngredients] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const {addToCart} = useContext(CartContext);
  function handleAddToCartClick(){
    const hasOptions = menuItem.sizes?.length !== 0 || menuItem.ingredients?.length !==0;
    if(hasOptions && !showPopup){
      setShowPopup(true);
      return;
    }
    addToCart(menuItem, selectedSize, selectedIngrediets);
    toast.success('Added to cart!');
    setSelectedSize(menuItem.sizes?.[0] || null);
    setSelectedIngredients([]);
    setShowPopup(false);
  }
  function handleIngredientsClick(ev, ingredient){
    const checked = ev.target.checked;
    if(checked) {
      setSelectedIngredients(prev => [...prev, ingredient])
    }else {
      setSelectedIngredients(prev => {
        return prev?.filter(i => i.name !== ingredient.name)});
    }
  }
  let selectedPrice = menuItem.basePrice;
  if(selectedSize){
    selectedPrice += selectedSize.price;
  }
  if(selectedIngrediets?.length > 0){
    selectedIngrediets.forEach(ingredient => {
      selectedPrice += ingredient.price;
    })
  }
  return(
    <>
      {showPopup &&(
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center" onClick={() => setShowPopup(false)}>
          <div className="bg-white p-4 rounded-lg max-w-md" onClick={ev => ev.stopPropagation()}>
            <div className="overflow-y-scroll p-2" style={{maxHeight:'calc(100vh - 100px)'}}>
              <Image src={menuItem.image} alt={menuItem.name} width={300} height={200} className="mx-auto"/>
              <h2 className="text-lg font-bold text-center mb-2">{menuItem.name}</h2>
              <p className="text-center text-gray-500 text-sm mb-0">{menuItem.description}</p>
              {menuItem.sizes?.length > 0 &&(
                <div className="p-2">
                  <h3 className="text-center text-gray-700">Pick your size</h3>
                  {menuItem.sizes.map(size => (
                    <label key={size._id} className="flex items-center gap-2 p-4 border rounded-md mb-1">
                      <input type="radio" name="size" 
                        onChange={() => setSelectedSize(size)}
                        checked={selectedSize?.name === size.name} /> {size.name} ${menuItem.basePrice + size.price}
                    </label>
                  ))}
                </div>
              )}
              {menuItem.ingredients?.length > 0 &&(
                <div className="p-2">
                  <h3 className="text-center text-gray-700">Add extras ingredients</h3>
                  {menuItem.ingredients.map(ingredient => (
                    <label key={ingredient._id} className="flex items-center gap-2 p-4 border rounded-md mb-1">
                      <input type="checkbox" name="ingredient" 
                        onChange={ev => handleIngredientsClick(ev, ingredient)}/> {ingredient.name} + ${ingredient.price}
                    </label>
                  ))}
                </div>
              )}
              <button className="primary sticky bottom-2" type="button" onClick={handleAddToCartClick}>
                Add to cart ${selectedPrice} 
              </button>
              <button className="mt-2" type="button" onClick={() => setShowPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      <MenuItemTile menuItem={menuItem} onAddToCart={handleAddToCartClick}/>
    </>
  );
}