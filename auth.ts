// auth.ts
// Author: Austin Couch
// Program Description:
// - Centralized Auth.js v5 configuration
// - Sets up Google OAuth provider
// - Exports auth handlers for use in API routes

import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
})
