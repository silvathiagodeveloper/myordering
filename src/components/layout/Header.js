'use client';
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useState } from "react";
import { CartContext } from "../AppContext";
import Cart from "@/components/icons/Cart";
import Bars from "@/components/icons/Bars";

function AuthLinks({status, userName}){
  return (
    <>
      <Link href={'/'}>Home</Link>
      <Link href={'/menu'}>Menu</Link>
      <Link href={'/#about'}>About</Link>
      <Link href={'/#contact'}>Contact</Link>
      {status === 'authenticated' && (
        <>
          <Link href={'/profile'} className="whitespace-nowrap">
            Hello, {userName}
          </Link>
          <button onClick={() => signOut()} href={'/logout'} className="bg-primary rounded-full text-white px-8 py-2">
            Logout
          </button>
        </>
      )}
      {status !== 'authenticated' && (
        <>
          <Link href={'/login'}>Login</Link>
          <Link href={'/register'} className="bg-primary rounded-full text-white px-8 py-2">
            Register
          </Link>
        </>
      )}
    </>
  )
}

export default function Header(){
    const session = useSession();
    const status = session.status;
    const {cartProducts} = useContext(CartContext);
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const userData = session.data?.user;
    let userName = userData?.name || userData?.email;
    if(userName && userName.includes(' ')) {
      userName = userName.split(' ')[0];
    }
    return(
      <header>
        <div className="flex items-center md:hidden justify-between">
          <Link href={'/'} className="text-primary font-semibold text-2xl">My Ordering</Link>
          <div className="flex gap-8 items-center">
            <Link href={'/cart'} className="relative">
              <Cart />
              {cartProducts?.length > 0 && (
                <span className="absolute -top-2 -right-4 bg-primary text-white text-sm py-1 px-1 rounded-full leading-3">
                  {cartProducts.length}
                </span>
              )}
            </Link>
            <button className="p-1" onClick={() => setMobileNavOpen(prev => !prev)}>
              <Bars />
            </button>
          </div>
        </div>
        {mobileNavOpen && (
          <div
            onClick={() => setMobileNavOpen(false)}
            className="md:hidden p-4 bg-gray-200 rounded-lg mt-2 flex flex-col gap-2 text-center">
            <AuthLinks status={status} userName={userName} />
          </div>
        )}
        <div className="hidden md:flex items-center justify-between">
          <Link href={'/'} className="text-primary font-semibold text-2xl">My Ordering</Link>
          <nav className="flex items-center gap-8 text-gray-500 font-semibold">
            <AuthLinks status={status} userName={userName} />
          </nav>
          <nav className="flex items-center gap-4 text-gray-500 font-semibold">
            <Link href={'/cart'} className="relative">
              <Cart />
              {cartProducts?.length > 0 && (
                <span className="absolute -top-2 -right-4 bg-primary text-white text-sm py-1 px-1 rounded-full leading-3">
                  {cartProducts.length}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </header>
    );
}