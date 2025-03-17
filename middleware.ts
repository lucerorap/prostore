import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  const sessionToken = req.cookies.get("authjs.session-token");

  // Array of regex patterns of paths we want to protect
  const protectedPaths = [
    /\/shipping-address/,
    /\/payment-method/,
    /\/place-order/,
    /\/profile/,
    /\/user\/(.*)/,
    /\/order\/(.*)/,
    /\/admin/,
  ];

  // Get pathname from the req URL object
  const { pathname, href } = req.nextUrl;

  // Check if user is not authenticated and accessing a protected path
  if (!sessionToken && protectedPaths.some((p) => p.test(pathname))) {
    // Generate the sign-in URL with the current path as a callbackUrl
    const callbackUrl = encodeURIComponent(href);
    const signInUrl = new URL(`/sign-in?callbackUrl=${callbackUrl}`, req.url);

    return NextResponse.redirect(signInUrl);
  }

  // Check for session cart cookie
  if (!req.cookies.get("sessionCartId")) {
    // Generate new session cart id cookie
    const sessionCartId = crypto.randomUUID();

    // Create new response and add the new headers
    const response = NextResponse.next({
      request: {
        headers: new Headers(req.headers),
      },
    });

    // Set newly generated sessionCartId in the response cookies
    response.cookies.set("sessionCartId", sessionCartId);

    return response;
  }

  return NextResponse.next();
}
