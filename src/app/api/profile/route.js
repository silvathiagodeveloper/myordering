import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/app/models/User";

export async function PUT(req){
    mongoose.connect(process.env.DATABASE_HOST);
    const data = await req.json();
    const {user} = await getServerSession(authOptions);
    await User.updateOne({email: user.email}, data);
    return Response.json(true);
}

export async function GET() {
    mongoose.connect(process.env.DATABASE_HOST)
    const {user} = await getServerSession(authOptions);
    return Response.json(
        await User.findOne({email: user.email})
    )
}