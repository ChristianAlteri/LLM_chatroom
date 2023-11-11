import bcrypt from "bcrypt"
import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"

import prisma from "@/app/libs/prismadb"

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }), 
    CredentialsProvider({
        // id: "username-login",

        name: "credentials",
        credentials: {
            email: { label: 'email', type: 'text' },
            password: { label: 'password', type: 'password' }
        },
        async authorize(credentials) {

            try {
                if (!credentials?.email || !credentials?.password) {
                  throw new Error('Invalid credentials')
                }
      
                const user = await prisma.user.findUnique({
                  where: {
                    email: credentials.email
                  }
                });
      
                if (!user || !user.hashedPassword) {
                  throw new Error('Invalid credentials');
                }
      
                const isCorrectPassword = await bcrypt.compare(
                  credentials.password,
                  user.hashedPassword
                  );
                  console.log('Input Password:', credentials.password);
                  console.log('Hashed Password:', user.hashedPassword);
                  console.log('Password Comparison Result:', isCorrectPassword);
      
                if (!isCorrectPassword) {
                  throw new Error('Invalid credentials');
                }
      
                return user;
              } catch (error) {
                console.error('Error in authorization:', error);
                throw error; // rethrow the error to be caught by NextAuth
              }
            }
    })
    ], 
    debug: process.env.NODE_ENV === "development",
    session: {
        strategy: 'jwt',

    },
    secret: process.env.NEXTAUTH_SECRET, 
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };



