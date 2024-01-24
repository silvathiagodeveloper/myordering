import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/app/models/User";

export async function PUT(req){
  mongoose.connect(process.env.DATABASE_HOST);
  const data = await req.json();
  const session = await getServerSession(authOptions);
  if (session && 'user' in session){
    await User.updateOne({email: session.user.email}, data);
    return Response.json(true);
  }
  return Response.json(false);
}

export async function GET() {
  mongoose.connect(process.env.DATABASE_HOST)
  const session = await getServerSession(authOptions);
  if (session && 'user' in session){
    return Response.json(
        await User.findOne({email: session.user.email})
    );
  }
  return Response.json({error : 'User unauthenticated'})
}