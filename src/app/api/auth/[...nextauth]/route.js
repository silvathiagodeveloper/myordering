import { User } from "@/app/models/User";
import mongoose from "mongoose";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/libs/mongoConnect";

const handler = NextAuth({
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        username: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const {email, password} = credentials;
        mongoose.connect(process.env.DATABASE_HOST);
        const user = await User.findOne({email});
        const passwordOk = user && bcrypt.compareSync(password, user.password);
        
        if(passwordOk){
          return user;
        }
        return null
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ]
})

export { handler as GET, handler as POST }