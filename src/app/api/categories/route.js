import { Category } from "@/app/models/Category";

export async function POST(req){
  const {name} = await req.json();
  const category = await Category.create({name});
  return Response.json(category);
}

export async function PUT(req){
  const {_id, name} = await req.json();
  await Category.updateOne({_id}, {name});
  return Response.json(true);
}

export async function GET(req){
  return Response.json(
    await Category.find()
  );
}