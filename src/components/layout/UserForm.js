'use client'
import EditableImage from "@/components/layout/EditableImage";
import AddressInputs from "@/components/layout/AddressInputs";
import { useState } from "react";
import { useProfile } from "../useProfile";

export default function UserForm({user, onSave}){
  const [name, setName] = useState(user?.name || '');
  const [image, setImage] = useState(user?.image || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || '');
  const [postalCode, setPostalCode] = useState(user?.postalCode || '');
  const [city, setCity] = useState(user?.city || '');
  const [country, setCountry] = useState(user?.country || '');
  const [admin, setAdmin] = useState(user?.admin || false);
  const {data:loggedInUser} = useProfile();

  function handleAddressChange(propName, value){
    switch(propName) {
      case "phone":
        setPhone(value);
        break;
      case "streetAddress":
        setStreetAddress(value);
        break;
      case "postalCode":
        setPostalCode(value);
        break;
      case "city":
        setCity(value);
        break;
      case "country":
        setCountry(value);
        break;
    }
  }

  return(
    <div className="md:flex gap-4">
      <div>
        <div className="p-2 rounded-lg relative max-w-[120px]">
          <EditableImage link={image} setLink={(setImage)}/>
        </div>
      </div>
      <form className="grow" onSubmit={ev => onSave(ev, 
        {name, image, phone, streetAddress, postalCode, city, country, admin})}>
        <label>First and last name</label>
        <input type="text" placeholder="First and last name" value={name??''} onChange={ev => setName(ev.target.value)} />
        <label>Email</label>
        <input type="email" value={user?.email??''} disabled={true} />
        <AddressInputs 
          addressProps={{phone, streetAddress, postalCode, city, country}}
          setAddressProp={handleAddressChange} />
        {loggedInUser && loggedInUser?.admin && (
        <div>
          <label className="p-2 mb-2 inline-flex items-center gap-2" htmlFor="cbAdmin">
            <input id="cbAdmin" type="checkbox" value={'1'}
            checked={admin} onChange={ev => {setAdmin(ev.target.checked)}}/>
            <span>Admin</span>
          </label>
        </div>
        )}
        <button type="submit">Save</button>
      </form>
    </div>
  );
}