import { Category } from "@/app/models/Category";

export async function POST(req){
  const {name} = await req.json();
  const category = await Category.create({name});
  return Response.json(category);
}