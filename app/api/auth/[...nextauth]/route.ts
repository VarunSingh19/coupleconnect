import NextAuth, { DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import clientPromise from "@/lib/mongodb";

// Extend the Session interface to include id and partnerId
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      partnerId: string;
    } & DefaultSession["user"];
  }
}

const handler = NextAuth({
  // IMPORTANT: Set the secret so NextAuth can sign and verify JWTs
  secret: process.env.JWT_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Authorize credentials:", credentials);
        if (!credentials?.email || !credentials?.password) {
          console.log("Missing email or password");
          return null;
        }

        try {
          const client = await clientPromise;
          const db = client.db("couples_app");
          const user = await db
            .collection("users")
            .findOne({ email: credentials.email });

          if (!user) {
            console.log("User not found for email:", credentials.email);
            return null;
          }

          // Compare the provided password with the hashed password from DB
          const isPasswordValid = await compare(
            credentials.password,
            user.password
          );
          if (!isPasswordValid) {
            console.log("Invalid password for user:", credentials.email);
            return null;
          }

          console.log("User authenticated:", user.email);
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            partnerId: user.partnerId,
          };
        } catch (error) {
          console.error("Error in authorize:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub as string;
        session.user.partnerId = token.partnerId as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.partnerId = (user as any).partnerId;
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST };
