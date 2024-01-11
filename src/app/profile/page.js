'use client'
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage(){
  const session = useSession();
  const [userName, setUserName] = useState('');
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const {status} = session;
  const userImage = session.data?.user?.image??'';

  useEffect(() => {
    if(status === 'authenticated'){
      setUserName(session?.data?.user?.name ?? '');
    }
  }, [session, status]);

  async function handleProfileInfoUpdate(ev){
    ev.preventDefault();
    setSaved(false);
    setSaving(true);
    const response = await fetch('/api/profile',{
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name: userName})
    })
    if(response.ok){
      setSaved(true);
    }
    setSaving(false);
  }

  if(status === 'loading'){
    return 'Loading...';
  }

  if(status === 'unauthenticated') {
    return redirect('/login');
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">
        Profile
      </h1>
      <div className="max-w-md mx-auto">
      {saved && (
          <h2 className="text-center bg-green-100 p-4 rounded-lg border border-green-300">Profile saved</h2>        
        )}
        {saving && (
          <h2 className="text-center bg-blue-100 p-4 rounded-lg border border-blue-300">Salving...</h2>        
        )}
        <div className="flex gap-4 items-center">
          <div>
            <div className="p-2 rounded-lg relative">
              <Image className="rounded-lg w-full h-full mb-1" src={userImage} alt={'avatar'} width={150} height={150} />
              <button type="button">Edit</button>
            </div>
          </div>
          <form className="grow" onSubmit={handleProfileInfoUpdate}>
            <input type="text" placeholder="First and last name" value={userName} onChange={ev => setUserName(ev.target.value)} />
            <input type="email" value={session?.data?.user?.email} disabled={true} />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
}