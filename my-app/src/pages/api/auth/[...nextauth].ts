import NextAuth, { Account, NextAuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn, signInWithOAuth } from "@/utils/db/servicefirebase";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { JWT } from "next-auth/jwt";

type FirebaseSignInUser = {
  id: string;
  email: string;
  fullname?: string;
  role?: string;
  password: string;
};

type OAuthUserPayload = {
  fullname?: string | null;
  email: string;
  image?: string | null;
  type?: string;
};

type OAuthCallbackResult = {
  status: boolean;
  data: {
    fullname?: string | null;
    email: string;
    image?: string | null;
    type?: string;
    role?: string;
  };
};

type AuthUser = User & {
  fullname?: string;
  role?: string;
  type?: string;
};

type AuthToken = JWT & {
  email?: string | null;
  fullname?: string;
  image?: string | null;
  type?: string;
  role?: string;
};

type AuthSession = Session & {
  user: {
    email?: string | null;
    fullname?: string;
    image?: string | null;
    type?: string;
    role?: string;
  };
};

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        // fullname: { label: "Full Name", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = (await signIn(credentials.email)) as FirebaseSignInUser | null;
        if (user) {
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password,
          );
          if (isPasswordValid) {
            // Pastikan mengembalikan objek user yang bersih
            return {
              id: user.id,
              email: user.email,
              fullname: user.fullname,
              role: user.role,
            };
          }
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || process.env.GITHUB_CLIENT_ID || "",
      clientSecret:
        process.env.GITHUB_SECRET || process.env.GITHUB_CLIENT_SECRET || "",
    }),
  ],

  callbacks: {
    async jwt({
      token,
      account,
      user,
    }: {
      token: AuthToken;
      account: Account | null;
      user?: AuthUser;
    }) {
      if (account?.provider === "credentials" && user) {
        token.email = user.email;
        token.fullname = user.fullname;
        token.role = user.role;
      }
      // console.log("jwt callback", {token, account, profile, user});
      // Jika login dengan Google, tambahkan informasi yang diperlukan ke token
      if (account?.provider === "google" && user?.email) {
        const data: OAuthUserPayload = {
          fullname: user.name,
          email: user.email,
          image: user.image,
          type: account.provider,
        };

        const result = (await signInWithOAuth(
          "google",
          data,
        )) as OAuthCallbackResult;

        if (result.status) {
          token.fullname = result.data.fullname || undefined;
          token.email = result.data.email;
          token.image = result.data.image || undefined;
          token.type = result.data.type;
          token.role = result.data.role;
        }
      }
      // Jika login dengan GitHub, tambahkan informasi yang diperlukan ke token
      if (account?.provider === "github" && user?.email) {
        const data: OAuthUserPayload = {
          fullname: user.name,
          email: user.email,
          image: user.image,
          type: account.provider,
        };

        const result = (await signInWithOAuth(
          "github",
          data,
        )) as OAuthCallbackResult;

        if (result.status) {
          token.fullname = result.data.fullname || undefined;
          token.email = result.data.email;
          token.image = result.data.image || undefined;
          token.type = result.data.type;
          token.role = result.data.role;
        }
      }
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: AuthSession;
      token: AuthToken;
    }) {
      if (token.email) {
        session.user.email = token.email;
      }
      if (token.fullname) {
        session.user.fullname = token.fullname;
      }
      if (token.image) {
        session.user.image = token.image;
      }
      if (token.role) {
        session.user.role = token.role;
      }
      if (token.type) {
        session.user.type = token.type;
      }
      // console.log("session callback", {session, token});
      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);