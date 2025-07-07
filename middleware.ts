import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/actions/user.actions";

export async function middleware(req: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) throw new Error("User not found!");

    return NextResponse.next();
  } catch {
    const signInUrl = req.nextUrl.clone();
    signInUrl.pathname = "/sign-in";
    return NextResponse.redirect(signInUrl);
  }
}

export const config = {
  matcher: ["/", "/documents", "/images", "/media", "/others"],
};
