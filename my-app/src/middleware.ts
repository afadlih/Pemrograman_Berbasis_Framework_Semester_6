import { NextResponse } from "next/server";

import withAuth from "./middleware/withAuth";

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  ["/profile", "/about", "/produk"],
);

export const config = {
  matcher: [
    "/profile",
    "/profile/:path*",
    "/about",
    "/about/:path*",
    "/produk",
    "/produk/:path*",
  ],
};