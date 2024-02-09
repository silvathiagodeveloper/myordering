'use client'
import UserForm from "@/components/layout/UserForm";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/useProfile";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditUserPage(){
  const {id} = useParams();
  const {loading:profileLoading, data:profileData} = useProfile();
  const [user, setUser] = useState(null);
  const [redirectToUsers, setRedirectToUsers] = useState(false);

  useEffect(() => {
    fetch('/api/users').then(res => {
      res.json().then(users => {
        const user = users.find(u => u._id === id);
        setUser(user);
      })
    })
  },[]);

  function handleUserUpdate(ev, user){
    ev.preventDefault();
    const creationPromise = new Promise( async (resolve, reject) => {
      const data = { _id:id, ...user };
      const response = await fetch('/api/users', {
        method: 'PUT',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(data)
      })
      if(response.ok) {
        setRedirectToUsers(true);
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

  if(redirectToUsers){
    return redirect('/users');
  }

  if(profileLoading){
    return 'Loading user info...';
  }

  if(!profileData.admin){
    return 'Not admin!';
  }

  return (
    <section className="max-w-2xl mx-auto mt-8">
      <UserTabs admin={profileData.admin} />
      <div className="mt-8">
          <UserForm user={user} onSave={handleUserUpdate} />
      </div>
    </section>
  );
}