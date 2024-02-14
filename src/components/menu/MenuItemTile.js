import AddToCartButton from "@/components/menu/AddToCartButton";

export default function MenuItemTile({menuItem, onAddToCart}){
  const hasSizesOrIngredients = (menuItem.sizes?.length > 0 || menuItem.ingredients?.length > 0);
  return(
    <div className="bg-gray-200 p-4 text-xl rounded-lg text-center hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
      <div className="text-center">
        <img src={menuItem?.image} alt={menuItem?.name} className="max-h-24 block mx-auto" />
      </div>
      <h4 className="font-semibold my-3">{menuItem?.name}</h4>
      <p className="text-gray-500 text-sm line-clamp-3">{menuItem?.description}</p>
      <AddToCartButton 
        hasSizesOrIngredients={hasSizesOrIngredients} 
        onAddToCart={onAddToCart} 
        basePrice={(menuItem?.sizes[0]) ? menuItem?.basePrice+menuItem?.sizes[0].price : menuItem?.basePrice}
        image={menuItem?.image}
      />
    </div>
  );
}