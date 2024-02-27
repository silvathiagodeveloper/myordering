import { User } from "@/app/models/User";
import mongoose from "mongoose";
import { isAdmin } from "../auth/[...nextauth]/route";

export async function GET(){
  if(!(await isAdmin())){
    return Response.json([]);
  }
  mongoose.connect(process.env.DATABASE_HOST);
  const users = await User.find();
  return Response.json(users);
}

export async function PUT(req){
  mongoose.connect(process.env.DATABASE_HOST);
  const {_id, ...data} = await req.json();
  if('admin' in data){
    data.admin = data.admin && await isAdmin();
  }
  await User.findByIdAndUpdate(_id, data);
  return Response.json(true);
}