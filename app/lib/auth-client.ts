import { inferAdditionalFields } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"
import type { Auth } from "~/.server/auth.server"

// export const authClient = createAuthClient({
//   /** The base URL of the server (optional if you're using the same domain) */
//   baseURL: import.meta.env.VITE_BETTER_AUTH_URL,
//   plugins: [inferAdditionalFields<Auth>()],
// })

export const { signIn, signUp, signOut, useSession } = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: import.meta.env.VITE_BETTER_AUTH_URL,
  plugins: [inferAdditionalFields<Auth>()],
})

export type ClientSession = ReturnType<typeof useSession>["data"]
