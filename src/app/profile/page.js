'use client'
import UserTabs from "@/components/layout/UserTabs";
import UserForm from "@/components/layout/UserForm";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage(){
  const session = useSession();
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);
  const {status} = session;

  useEffect(() => {
    if(status === 'authenticated'){
      fetch('/api/profile').then(response => {
        response.json().then(data => {
          setUser(data)
          setAdmin(data.admin);
          setProfileFetched(true);
        })
      });
    }
  }, [session, status]);

  async function handleProfileInfoUpdate(ev, data){
    ev.preventDefault();
    const savePromise = new Promise(async (resolve, reject) =>{
      const response = await fetch('/api/profile',{
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      });
      if(response.ok){
        resolve();
      }else {
        reject();
      }
    })
    toast.promise(savePromise, {
      loading: 'Saving...',
      success: 'Profile saved!',
      error: 'Error when saving!',
    });
  }

  if(status === 'loading' || !profileFetched){
    return 'Loading...';
  }

  if(status === 'unauthenticated') {
    return redirect('/login');
  }

  return (
    <section className="mt-8">
      <UserTabs admin={admin} />
      <div className="max-w-xl mx-auto mt-8">
        <UserForm user={user} onSave={handleProfileInfoUpdate} />
      </div>
    </section>
  );
}