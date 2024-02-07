'use client';

import Left from "@/components/icons/Left";
import MenuItemForm from "@/components/layout/MenuItemForm";
import UserTabs from "@/components/layout/UserTabs";
import DeleteButton from "@/components/DeleteButton";
import { useProfile } from "@/components/useProfile";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditMenuItemPage() {
  const {id} = useParams();
  const {loading:profileLoading, data:profileData} = useProfile();
  const [menuItem, setMenuItem] = useState(null);
  const [redirectToItems, setRedirectToItems] = useState(false);

  useEffect(() => {
    fetch('/api/menu-items').then(res => {
      res.json().then(items => {
        const item = items.find(i => i._id == id);
        setMenuItem(item);
      });
    });
  }, []);

  function handleFormSubmit(ev, menuItem){
    ev.preventDefault();
    const creationPromise = new Promise( async (resolve, reject) => {
      const data = { _id:id, ...menuItem };
      const response = await fetch('/api/menu-items', {
        method: 'PUT',
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

  function handleDeleteClick() {
    const creationPromise = new Promise( async (resolve, reject) => {
      const response = await fetch('/api/menu-items?_id='+id, {
        method: 'DELETE',
        headers: {'Content-Type' : 'application/json'}
      })
      if(response.ok) {
        setRedirectToItems(true);
        resolve();
      }else {
        reject();
      }
    });
    toast.promise(creationPromise,{
        loading: 'Deleting...',
        success: 'Deleted',
        error: 'Error deleting'
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
      <MenuItemForm onSubmit={handleFormSubmit} menuItem={menuItem} />
      <div className="max-w-md mx-auto mt-2">
        <div className="max-w-xs ml-auto pl-4">
          <DeleteButton label="Delete" onDelete={handleDeleteClick}/>
        </div>
      </div>
    </section>
  )
}