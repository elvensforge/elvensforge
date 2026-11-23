import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";
import { isAuthConfigured } from "@/lib/auth-config";

const isAccountRoute = createRouteMatcher(["/my-account(.*)"]);
const isAuthRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)", "/my-account(.*)"]);

const withClerk = clerkMiddleware(async (auth, request) => {
  if (isAccountRoute(request)) {
    await auth.protect();
  }
}, { signInUrl: "/sign-in/", signUpUrl: "/sign-up/" });

export default function proxy(request: NextRequest, event: NextFetchEvent) {
  if (isAuthConfigured) return withClerk(request, event);

  if (isAuthRoute(request)) {
    return new NextResponse("Account access is temporarily unavailable.", { status: 503 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
