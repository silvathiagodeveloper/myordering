'use client'
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/useProfile";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CategoriesPage(){
  const [newCategoryName, setNewCategoryName] = useState('');
  const {loading:profileLoading, data:profileData} = useProfile();

  function handleNewCategorySubmit(ev){
    ev.preventDefault();
    const creationPromise = new Promise(async (resolve, reject) => {
        const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({name:newCategoryName})
      });
      if(response.ok) {
        resolve();
      } else {
        reject();
      }
    });
    toast.promise(creationPromise, {
      loading: 'Creating...',
      success: 'Category created!',
      error: 'Error when creating!',
    });
  }

  if(profileLoading){
    return 'Loading user info...';
  }

  if(!profileData.admin){
    return 'Not admin!';
  }

  return (
    <section className="mt-8 max-w-md mx-auto">
      <UserTabs admin={true} />
      <form className="mt-8" onSubmit={handleNewCategorySubmit}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label>New category name</label>
            <input type="text" value={newCategoryName} onChange={ev => setNewCategoryName(ev.target.value)} />
          </div>
          <div className="pb-2">
            <button type="submit">Create</button>
          </div>
        </div>
      </form>
    </section>
  );
}