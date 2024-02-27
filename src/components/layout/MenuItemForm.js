import { useEffect, useState } from "react";
import EditableImage from "./EditableImage";
import MenuItemPriceProps from "./MenuItemPriceProps";

export default function MenuItemForm({onSubmit, menuItem}){
  const [image, setImage] = useState(menuItem?.image || '');
  const [name, setName] = useState(menuItem?.name || '');
  const [description, setDescription] = useState(menuItem?.description || '');
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');
  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [ingredients, setIngredients] = useState(menuItem?.ingredients || []);
  const [category, setCategory] = useState(menuItem?.category || '');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('/api/categories').then(res => {
      res.json().then(categories => {
        setCategories(categories);
        if(!menuItem || menuItem?.category == '' && categories.length > 0){
          setCategory(categories[0]._id);
        }
      })
    })
  },[])

  return(
    <form className="mt-8" onSubmit={ev => onSubmit(ev, {image, name, description, category, basePrice, sizes, ingredients})}>
      <div className="md:grid gap-4 items-start"
        style={{gridTemplateColumns: '.3fr .7fr'}}>
        <div className="max-w-[200px]">
          <EditableImage link={image} setLink={setImage} />
        </div>
        <div className="grow">
          <label>Item name</label>
          <input type="text" value={name} onChange={ev => setName(ev.target.value)} />
          <label>Description</label>
          <input type="text" value={description} onChange={ev => setDescription(ev.target.value)} />
          <label>Category</label>
          <select value={category} onChange={ev => setCategory(ev.target.value)}>
            {categories?.length > 0 && categories.map(cat =>(
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
          <label>Base Price</label>
          <input type="text" value={basePrice} onChange={ev => setBasePrice(ev.target.value)} />
          <MenuItemPriceProps name="Sizes" addLabel="Add size" props={sizes} setProps={setSizes}/>
          <MenuItemPriceProps name="Extra Ingredients" addLabel="Add ingredient" props={ingredients} setProps={setIngredients}/>
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
}