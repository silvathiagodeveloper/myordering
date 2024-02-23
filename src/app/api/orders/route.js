import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { User } from "@/app/models/User";
import { Order } from "@/app/models/Order";
import { authOptions } from "../auth/[...nextauth]/route";

export async function  GET(req){
  mongoose.connect(process.env.DATABASE_HOST);
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  let admin = false;
  let orderId = '';
  let filter = {};
  const url = new URL(req.url);

  if(!userEmail){
    return Response.json({'error':'No permission'});
  }

  if(url.searchParams.get('_id')){
    orderId = url.searchParams.get('_id');
  }

  if(userEmail){
    const user = await User.findOne({email:userEmail});
    if(user){
      admin = user.admin;
    }
  }

  if(!admin){
    filter = {...filter, userEmail};
  }
  if(orderId !== ''){
    filter = {...filter, _id:orderId};
    return Response.json(await Order.findOne(filter));
  }
  return Response.json(await Order.find(filter));
}