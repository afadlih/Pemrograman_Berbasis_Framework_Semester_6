import { NextResponse } from "next/server";

import withAuth from "./middleware/withAuth";

export default withAuth(
  function proxy() {
    return NextResponse.next();
  },
  ["/profile", "/about", "/produk", "/admin", "/editor"],
);

export const config = {
  matcher: [
    "/profile",
    "/profile/:path*",
    "/about",
    "/about/:path*",
    "/produk",
    "/produk/:path*",
    "/admin",
    "/admin/:path*",
    "/editor",
    "/editor/:path*",
  ],
};
