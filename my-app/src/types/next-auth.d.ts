import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      email?: string | null;
      fullname?: string;
    };
  }

  interface User {
    fullname?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    email?: string | null;
    fullname?: string;
  }
}
