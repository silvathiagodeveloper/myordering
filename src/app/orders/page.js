'use client';
import {dbTimeForHuman} from "@/libs/datetime-functions";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/useProfile";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function OrdersPage(){
  const [orders, setOrders] = useState([]);
  const {loading:profileLoading, data:profileData} = useProfile();
  const [loadingOrders, setLoadingOrders] = useState(true);
  useEffect(() => {
    fetchOders();
  },[]);

  function fetchOders(){
    setLoadingOrders(true);
    fetch('/api/orders').then(res=>{
      res.json().then(orders => {
        setOrders(orders.reverse());
        setLoadingOrders(false);
      })
    })
  }

  if(profileLoading){
    return 'Loading user info...';
  }
  
  if(!profileData){
    return 'Not permission!';
  }


  return (
    <section className="mt-8 max-e-2xl mx-auto">
      <UserTabs admin={profileData.admin} />
      <div className="mt-8">
        {loadingOrders && (
          <div>Loading orders...</div>
        )}
        {orders?.length > 0 && orders.map(order => (
          <div key={order._id} className="rounded-lg mb-2 p-4 bg-gray-100 grid sm:grid-cols-3 gap-4 grow">
            <div className="justify-center flex items-center whitespace-nowrap">
              <span className={(!!order.paid? 'bg-green-400' : 'bg-red-400') +
                ' p-2 rounded-md text-white'}>
                  {!!order.paid ? 'Paid' : 'Not Paid'}
              </span>
            </div>
            <div>
              <div className="text-gray-900">
                {order.userEmail}
              </div> 
              <div className="text-gray-500 text-sm">
                {order?.cartProducts.map(p => p.name).join(', ')}
              </div>
            </div>
            <div className="justify-end sm:flex gap-2 items-center whitespace-nowrap text-sm">
              {dbTimeForHuman(order.createdAt)}
              <Link className="button" href={'/orders/'+order._id}>Show</Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}