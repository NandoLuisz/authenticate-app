import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'

export async function middleware(request: NextRequest) {
    const cookieStore = cookies();
    const token = cookieStore.get('authenticate-app-astro');


    if ((request.nextUrl.pathname === '/login' 
        || request.nextUrl.pathname === '/register' 
        || request.nextUrl.pathname === '/') && token) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    if (!token && (request.nextUrl.pathname === '/dashboard' || request.nextUrl.pathname === '/')) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard', '/', '/login', '/register'],  
}
