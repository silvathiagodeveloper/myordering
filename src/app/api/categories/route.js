import { Category } from "@/app/models/Category";
import mongoose from "mongoose";

export async function POST(req){
  mongoose.connect(process.env.DATABASE_HOST);
  const {name} = await req.json();
  const category = await Category.create({name});
  return Response.json(category);
}

export async function PUT(req){
  mongoose.connect(process.env.DATABASE_HOST);
  const {_id, name} = await req.json();
  await Category.updateOne({_id}, {name});
  return Response.json(true);
}

export async function GET(req){
  mongoose.connect(process.env.DATABASE_HOST);
  return Response.json(
    await Category.find()
  );
}