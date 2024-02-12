'use client'
import Image from "next/image";
import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";
import { useEffect, useState } from "react";

export default function HomeMenu(){
  const [bestSellers, setBestSellers] = useState([]);
  useEffect(() => {
    fetch('/api/menu-items').then(response => {
      response.json().then(menuItems => {
        const bestSellers = menuItems.slice(-3);
        setBestSellers(bestSellers);
      })
    })
  },[]);
  return(
    <section>
      <div className="absolute left-0 right-0 -z-10">
        <div className="h-48 w-48 absolute left-0 -top-8">
          <Image src={'/sallad1.png'} layout={'fill'} objectFit={'contain'} alt={'sallad'} />
        </div>
        <div className="h-48 w-48 absolute right-0 -top-8">
          <Image src={'/sallad2.png'} layout={'fill'} objectFit={'contain'} alt={'sallad'} />
        </div>
      </div>
      <div className="text-center py-4">
        <SectionHeaders subHeader={'Check out'} mainHeader={'Our Best Sellers'} />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {bestSellers?.length > 0 && bestSellers.map(menuItem => (
          <MenuItem key={menuItem._id} menuItem={menuItem}/>
        ))}
      </div>
    </section>
  );
}