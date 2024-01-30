'use client';

import Left from "@/components/icons/Left";
import EditableImage from "@/components/layout/EditableImage";
import MenuItemForm from "@/components/layout/MenuItemForm";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/useProfile";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function NewMenuItemPage() {
  const {loading:profileLoading, data:profileData} = useProfile();
  const [redirectToItems, setRedirectToItems] = useState(false);

  function handleFormSubmit(ev, menuItem){
    ev.preventDefault();
    const creationPromise = new Promise( async (resolve, reject) => {
      const response = await fetch('/api/menu-items', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(menuItem)
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
      <MenuItemForm onSubmit={handleFormSubmit} menuItem={null} />
    </section>
  )

}