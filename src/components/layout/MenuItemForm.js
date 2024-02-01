import { useState } from "react";
import EditableImage from "./EditableImage";
import MenuItemPriceProps from "./MenuItemPriceProps";

export default function MenuItemForm({onSubmit, menuItem}){
  const [image, setImage] = useState(menuItem?.image || '');
  const [name, setName] = useState(menuItem?.name || '');
  const [description, setDescription] = useState(menuItem?.description || '');
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');
  const [sizes, setSizes] = useState([]);

  return(
    <form className="mt-8" onSubmit={ev => onSubmit(ev, {image, name, description, basePrice})}>
      <div className="grid gap-4 items-start"
        style={{gridTemplateColumns: '.3fr .7fr'}}>
        <div className="max-w-[200px]">
          <EditableImage link={image} setLink={setImage} />
        </div>
        <div className="grow">
          <label>Item name</label>
          <input type="text" value={name} onChange={ev => setName(ev.target.value)} />
          <label>Description</label>
          <input type="text" value={description} onChange={ev => setDescription(ev.target.value)} />
          <label>Base Price</label>
          <input type="text" value={basePrice} onChange={ev => setBasePrice(ev.target.value)} />
          <MenuItemPriceProps name="Sizes" addLabel="Add size" props={sizes} setProps={setSizes}/>
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
}