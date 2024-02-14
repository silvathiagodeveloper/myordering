import FlyingButton from 'react-flying-item'

export default function AddToCartButton({hasSizesOrIngredients, basePrice, onAddToCart, image}){
  if(!hasSizesOrIngredients){
    return (
      <div className='flying-button-parent'>
        <FlyingButton 
          targetTop={'5%'}
          targetLeft={'95%'}
          src={image}>
            <div onClick={onAddToCart}>Add to cart R$ {basePrice}</div>
        </FlyingButton>
      </div>
    );
  }
  return(
    <button className="bg-primary text-white rounded-full mt-4 px-8 py-2"
      onClick={onAddToCart}>
      <span>Add to cart (from ${basePrice}) </span>
    </button>
  );
}