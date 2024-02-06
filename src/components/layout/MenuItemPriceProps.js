import { useState } from "react";
import Plus from "../icons/Plus";
import Trash from "../icons/Trash";
import Up from "../icons/Up";
import Down from "../icons/Down";

export default function MenuItemPriceProps({name, addLabel, props, setProps}){

  const [isOpen, setIsOpen] = useState(false);

  function addProp(){
    setProps(oldProps => {
      return [...oldProps, {name:'', price:0}];
    });
  }

  function editProp(ev, index, prop){
    const newValue = ev.target.value;
    setProps(prevProps => {
      const newProps = [...prevProps];
      newProps[index][prop] = newValue;
      return newProps;
    })
  }

  function removeProp(indexToRemove){
    setProps(prev => prev.filter((v,index) => index !== indexToRemove));
  }  
  return(
    <div className="bg-gray-200 p-2 rounded-md mb-2">
      <button type="button" className="inline-flex p-1 gap-2 justify-start border-0" onClick={() => setIsOpen(prev => !prev)}>
        {isOpen && (<Up />)}
        {!isOpen && (<Down />)}
        <span>{name}</span>
        <span>({props?.length})</span>
      </button>
        <div className={isOpen ? 'block' : 'hidden'}>
          {props?.length > 0 && props.map((prop, index) => (
            <div className="flex gap-2 items-end" key={index}>
              <div>
                <label>Name</label>
                <input type="text" placeholder="Name" value={prop.name} onChange={ev => editProp(ev, index, 'name')} />
              </div>
              <div>
                <label>Extra price</label>
                <input type="text" placeholder="Extra price" value={prop.price} onChange={ev => editProp(ev, index, 'price')}/>
              </div>
              <div>
                <button type="button" onClick={() => removeProp(index)} className="bg-white mb-2 px-2">
                  <Trash className="w-4 h-4 m-1" />
                </button>
              </div>
            </div>
          ))}
          <button onClick={addProp} type="button" className="flex gap-1 bg-white">
            <Plus />
            <span>{addLabel}</span>
          </button>
        </div>
    </div>
  );
}