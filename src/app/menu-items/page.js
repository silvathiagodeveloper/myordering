'use client';

import Right from "@/components/icons/Right";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/useProfile";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MenuItemsPage(){
  const {loading:profileLoading, data:profileData} = useProfile();
  const [menuItems, setMenuItems] = useState(null);

  useEffect(() => {
    fetchMenuItems()
  }, []);

  function fetchMenuItems(){
    fetch('/api/menu-items').then(res => {
      res.json().then(data => {
        setMenuItems(data);
      })
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
        <UserTabs admin={profileData.admin} />
        <div className="mt-8">
          <Link className="button flex gap-2 justify-center" href={'/menu-items/new'}>
            Create new menu item
            <Right />
          </Link>
        </div>
        <div>
          <h2 className="text-sm text-gray-500 mt-8">Edit menu item</h2>
          {menuItems?.length > 0 && menuItems.map(menuItem => (
            <Link href={'/menu-items/edit/'+menuItem._id} className="button mb-1" key={menuItem._id}>
              {menuItem.name}
            </Link>
          ))}
        </div>
    </section>
  );
}