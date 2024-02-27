import { Category } from "@/app/models/Category";
import mongoose from "mongoose";
import { isAdmin } from "../auth/[...nextauth]/route";

export async function POST(req){
  if (!(await isAdmin())){
    return Response.json({});
  }
  mongoose.connect(process.env.DATABASE_HOST);
  const {name} = await req.json();
  const category = await Category.create({name});
  return Response.json(category);
}

export async function PUT(req){
  if (!(await isAdmin())){
    return Response.json(false);
  }
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

export async function DELETE(req){
  if (!(await isAdmin())){
    return Response.json(false);
  }
  mongoose.connect(process.env.DATABASE_HOST);
  const url = new URL(req.url);
  const _id = url.searchParams.get('_id');
  await Category.deleteOne({_id});
  return Response.json(true);
} 