import { User } from "@/app/models/User";
import mongoose from "mongoose";
import NextAuth, { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/libs/mongoConnect";

export const authOptions = {
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const {email, password} = credentials;
        mongoose.connect(process.env.DATABASE_HOST);
        const user = await User.findOne({email});
        const passwordOk = await user && bcrypt.compareSync(password, user.password);
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
  ],
  session: {
    strategy: 'jwt'
  }
}

export async function isAdmin() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  if(!userEmail){
    return false;
  }
  const user = await User.findOne({email: userEmail});
  if(!user) {
    return false;
  }
  return user.admin;
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }