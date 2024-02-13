export default function MenuItemTile({menuItem, onAddToCart}){
  return(
    <div className="bg-gray-200 p-4 text-xl rounded-lg text-center hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
      <div className="text-center">
        <img src={menuItem?.image} alt={menuItem?.name} className="max-h-24 block mx-auto" />
      </div>
      <h4 className="font-semibold my-3">{menuItem?.name}</h4>
      <p className="text-gray-500 text-sm line-clamp-3">{menuItem?.description}</p>
      <button className="bg-primary text-white rounded-full mt-4 px-8 py-2"
        onClick={onAddToCart}>
        {(menuItem.sizes?.length > 0 || menuItem.ingredients?.length > 0) ? (
          <span>Add to cart (from ${menuItem?.basePrice}) </span>
        ) : (
          <span>Add to cart R$ {menuItem?.basePrice}</span>
        )}
      </button>
    </div>
  );
}