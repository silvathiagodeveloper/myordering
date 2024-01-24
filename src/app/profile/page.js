'use client'
import UserTabs from "@/components/layout/UserTabs";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage(){
  const session = useSession();
  const [userName, setUserName] = useState('');
  const [image, setImage] = useState('');
  const [phone, setPhone] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [admin, setAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);
  const {status} = session;

  useEffect(() => {
    if(status === 'authenticated'){
      setUserName(session?.data?.user?.name ?? '');
      setImage(session?.data?.user?.image??'');
      fetch('/api/profile').then(response => {
        response.json().then(data => {
          setPhone(data.phone);
          setStreetAddress(data.streetAddress);
          setCity(data.city);
          setPostalCode(data.postalCode);
          setCountry(data.country);
          setAdmin(data.admin);
          setProfileFetched(true);
        })
      });
    }
  }, [session, status]);

  async function handleProfileInfoUpdate(ev){
    ev.preventDefault();
    const savePromise = new Promise(async (resolve, reject) =>{
      const response = await fetch('/api/profile',{
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: userName, 
          image,
          phone,
          streetAddress,
          city,
          postalCode,
          country
        })
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

  async function handleFileChange(ev){
    const files = ev.target.files;
    if(files?.length === 1){
      const data = new FormData;
      data.set('file', files[0]);
      const uploadPromise = fetch('/api/upload', {
          method : 'POST',
          body: data
      }).then(response => {
        if(response.ok){
          return response.json().then(link => {
            setImage(link);
          });
        }
        throw new Error('Somthing went wrong!');
      });
      await toast.promise(uploadPromise, {
        loading: 'Uploading...',
        success: 'Upload complete!',
        error: 'Error when uploading!',
      });
    }
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
      <div className="max-w-md mx-auto mt-8">
        <div className="flex gap-4">
          <div>
            <div className="p-2 rounded-lg relative max-w-[120px]">
              {image &&(
                <Image className="rounded-lg w-full h-full mb-1" src={image} alt={'avatar'} width={150} height={150} />
              )}
              <label>
                <input type="file" className="hidden" onChange={handleFileChange}/>
                <span className="block border border-gray-300 cursor-pointer rounded-lg p-2 text-center">Edit</span>
              </label>
            </div>
          </div>
          <form className="grow" onSubmit={handleProfileInfoUpdate}>
            <label>First and last name</label>
            <input type="text" placeholder="First and last name" value={userName} onChange={ev => setUserName(ev.target.value)} />
            <label>Email</label>
            <input type="email" value={session?.data?.user?.email} disabled={true} />
            <label>Phone Number</label>
            <input type="tel" placeholder="Phone number" value={phone} onChange={ev => setPhone(ev.target.value)} />
            <label>Street address</label>
            <input type="text" placeholder="Street address" value={streetAddress} onChange={ev => setStreetAddress(ev.target.value)} />
            <div className="flex gap-2">
              <div>
                <label>Postal code</label>
                <input type="text" placeholder="Postal code"  value={postalCode} onChange={ev => setPostalCode(ev.target.value)} />
              </div>
              <div>
                <label>City</label>
                <input type="text" placeholder="City" value={city} onChange={ev => setCity(ev.target.value)}/>
              </div>
            </div>
            <label>Country</label>
            <input type="text" placeholder="Country"  value={country} onChange={ev => setCountry(ev.target.value)}/>
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
}