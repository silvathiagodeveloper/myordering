import { User } from "@/app/models/User";
import mongoose from "mongoose";

export async function GET(){
    mongoose.connect(process.env.DATABASE_HOST);
    const users = await User.find();
    return Response.json(users);
}

export async function PUT(req){
    mongoose.connect(process.env.DATABASE_HOST);
    const {_id, ...data} = await req.json();
    await User.findByIdAndUpdate(_id, data);
    return Response.json(true);
}