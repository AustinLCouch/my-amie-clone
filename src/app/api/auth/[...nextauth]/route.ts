
// File: app/api/auth/[...nextauth]/route.ts
// Author: Austin Couch
// Program Description:
// - NextAuth v5 API route handlers
// - Imports handlers from centralized auth configuration
// - Exports GET and POST handlers -> automatically mapped by Next.js

import { handlers } from "../../../../../auth"

export const { GET, POST } = handlers
