import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        fullname: { label: "Full Name", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Simulasi data user sementara
        const user: any = {
          email: credentials?.email,
          password: credentials?.password,
          fullname: credentials?.fullname,
        };

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }: any) {
      // Jika login menggunakan credentials, masukkan data user ke dalam token
      if (account?.provider === "credentials" && user) {
        token.email = user.email;
        token.fullname = user.fullname;
      }
      // console.log("JWT Callback - Token:", {token, account, user});
      return token;
    },
    async session({ session, token }: any) {
      // Masukkan data dari token ke dalam session agar bisa diakses di frontend
      if (token.email) {
        session.user.email = token.email;
      }
      if (token.fullname) {
        session.user.fullname = token.fullname;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);