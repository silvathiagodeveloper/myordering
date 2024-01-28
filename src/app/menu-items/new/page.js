'use client';

import Left from "@/components/icons/Left";
import EditableImage from "@/components/layout/EditableImage";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/useProfile";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function NewMenuItemPage() {
  const {loading:profileLoading, data:profileData} = useProfile();
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const [redirectToItems, setRedirectToItems] = useState(false);

  function handleFormSubmit(ev){
    ev.preventDefault();
    const creationPromise = new Promise( async (resolve, reject) => {
      const data = { image, name, description, basePrice };
      const response = await fetch('/api/menu-items', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(data)
      })
      if(response.ok) {
        setRedirectToItems(true);
        resolve();
      }else {
        reject();
      }
    });
    toast.promise(creationPromise,{
        loading: 'Saving...',
        success: 'Saved',
        error: 'Error saving'
      }
    );
  }

  if(redirectToItems){
    return redirect('/menu-items');
  }

  if(profileLoading){
    return 'Loading user info...';
  }
  
  if(!profileData.admin){
    return 'Not admin!';
  }

  return(
    <section className="mt-8 max-w-md mx-auto">
      <UserTabs admin={profileData.admin} />
      <div className="mt-8">
        <Link className="button flex gap-2 justify-center" href={'/menu-items'}>
          <Left />
          Show all menu item
         </Link>
      </div>
      <form className="mt-8" onSubmit={handleFormSubmit}>
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
            <button type="submit">Save</button>
          </div>
        </div>
      </form>
    </section>
  )

}