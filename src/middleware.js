import {
  clerkMiddleware,
  createRouteMatcher
} from '@clerk/nextjs/server';
import { checkPatient } from './utils/logic/logic';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher([
  '/user(.*)', '/:lang/app(.*)', '/:lang/pat(.*)', '/:lang/admin(.*)'
]);

export default clerkMiddleware(async (auth, req) => {
  const { pathname } = req.nextUrl;
  const urlSegments = pathname.split('/');
  if (urlSegments.length >= 3 && urlSegments[2] === 'pat') {
    const patId = urlSegments[3];
    const { userId } = await auth()
    const hasAccess = await checkPatient(patId, userId);
    if (!hasAccess) {
      return NextResponse.redirect(new URL('/'+urlSegments[1]+'/app', req.url));
    }
  }

  if (isProtectedRoute(req)) auth.protect();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};