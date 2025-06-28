import { NextResponse, NextRequest } from 'next/server'

//Protection of routes
export function middleware(request: NextRequest) {
  const path=request.nextUrl.pathname
  const isPublicPath=path==='/login' || path==='/signup'

  const token=request.cookies.get("token")?.value || ""
   if(isPublicPath && token){
    return NextResponse.redirect(new URL('/profile',request.url))
   }
   if(!isPublicPath && !token){
    return NextResponse.redirect(new URL('/login',request.url))
   }
  return NextResponse.next()
}
 
export const config = {
  matcher: [
    '/login',
    '/signup',
    '/profile',
    '/addpost'
  ]
}