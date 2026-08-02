import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  console.log("Cookies:", request.cookies.getAll());

  return NextResponse.next();
}