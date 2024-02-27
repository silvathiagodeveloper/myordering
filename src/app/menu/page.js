'use client'
import SectionHeaders from "@/components/layout/SectionHeaders";
import MenuItem from "@/components/menu/MenuItem";
import { useEffect, useState } from "react";

export default function MenuPage(){
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    fetch('/api/categories').then(res=>{
      res.json().then(categories => setCategories(categories));
    });
    fetch('/api/menu-items').then(res => {
      res.json().then(menuItems => setMenuItems(menuItems));
    });
  },[])
  return (
    <section className="mt-8">
      {categories?.length > 0 && categories.map(category => (
        <div key={category._id}>
          <div className="text-center">
            <SectionHeaders mainHeader={category.name} />
          </div>
          <div className="grid sm:grid-cols-3 gap-4 mt-6 mb-12">
            {menuItems?.length > 0 && menuItems.filter(m => m.category === category._id).map(menuItem => (
              <MenuItem key={menuItem._id} menuItem={menuItem} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}