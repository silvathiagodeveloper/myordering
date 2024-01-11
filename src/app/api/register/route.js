import { User } from "@/app/models/User";
import mongoose from "mongoose";

export async function POST(req){
  const body = await req.json();
  mongoose.connect(process.env.DATABASE_HOST);
  await User.create(body);
  return Response.json('ok');
}