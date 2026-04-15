import { getToken } from "next-auth/jwt";
import {NextFetchEvent, NextMiddleware, NextRequest, NextResponse} from "next/server";

const hanyaAdmin = ["/admin"];
const hanyaEditor = ["/editor"];

function matchesPathname(pathname: string, basePaths: string[]) {
  return basePaths.some(
    (basePath) => pathname === basePath || pathname.startsWith(`${basePath}/`),
  );
}

export default function withAuth(
  middleware: NextMiddleware,
  requireAuth: string[] = [],
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;
    // console.log("PATH:", pathname);
    
    if (matchesPathname(pathname, requireAuth)) {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });
      // console.log("Token:", token);
      if (!token) {
        const loginUrl = new URL("/auth/login", req.url);
        loginUrl.searchParams.set("callbackUrl", encodeURI(req.url));
        return NextResponse.redirect(loginUrl);
      }
      if (token.role !== "admin" && matchesPathname(pathname, hanyaAdmin)) {
        return NextResponse.redirect(new URL("/", req.url));
      }
      if (
        token.role !== "admin" &&
        token.role !== "editor" &&
        matchesPathname(pathname, hanyaEditor)
      ) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
    return middleware(req, next);
  };
}