import type { NextAuthConfig } from 'next-auth';
import { getUser } from './auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const publicPages = ['/', '/profile', '/products', '/categories'];
      if (
        publicPages.includes(nextUrl.pathname) ||
        nextUrl.pathname.startsWith('/profile') ||
        nextUrl.pathname.startsWith('/products') ||
        nextUrl.pathname.startsWith('/categories')
      ) {
        return true;
      } else if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
