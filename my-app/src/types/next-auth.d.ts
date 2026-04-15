import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      email?: string | null;
      fullname?: string;
      image?: string | null;
      type?: string;
      role?: string;
    };
  }

  interface User {
    fullname?: string;
    image?: string | null;
    type?: string;
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    email?: string | null;
    fullname?: string;
    image?: string | null;
    type?: string;
    role?: string;
  }
}
