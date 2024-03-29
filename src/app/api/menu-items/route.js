import { MenuItem } from "@/app/models/MenuItem";
import mongoose from "mongoose";
import { isAdmin } from "../auth/[...nextauth]/route";

export async function POST(req){
  if (!(await isAdmin())){
    return Response.json({});
  }
  mongoose.connect(process.env.DATABASE_HOST);
  const data = await req.json();
  const menuItem = await MenuItem.create(data);
  return Response.json(menuItem);
}

export async function PUT(req){
  if (!(await isAdmin())){
    return Response.json(false);
  }
  mongoose.connect(process.env.DATABASE_HOST);
  const {_id, ...data} = await req.json();
  await MenuItem.findByIdAndUpdate(_id, data);
  return Response.json(true);
}

export async function GET(req){
  mongoose.connect(process.env.DATABASE_HOST);
  return Response.json(
    await MenuItem.find()
  );
}

export async function DELETE(req){
  if (!(await isAdmin())){
    return Response.json(false);
  }
  mongoose.connect(process.env.DATABASE_HOST);
  const url = new URL(req.url);
  const _id = url.searchParams.get('_id');
  await MenuItem.deleteOne({_id});
  return Response.json(true);
} 