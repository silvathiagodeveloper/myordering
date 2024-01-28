import { MenuItem } from "@/app/models/MenuItem";
import mongoose from "mongoose";

export async function POST(req){
  mongoose.connect(process.env.DATABASE_HOST);
  const data = await req.json();
  const menuItem = await MenuItem.create(data);
  return Response.json(menuItem);
}

export async function GET(req){
  mongoose.connect(process.env.DATABASE_HOST);
  return Response.json(
    await MenuItem.find()
  );
}