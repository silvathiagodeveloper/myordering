import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/app/models/User";

export async function PUT(req){
    mongoose.connect(process.env.DATABASE_HOST);
    const data = await req.json();
    const {user} = await getServerSession(authOptions);
    if('name' in data){
        await User.updateOne({email: user.email}, {name: data.name, password: 'teste2'});
    }
    return Response.json(true);
}