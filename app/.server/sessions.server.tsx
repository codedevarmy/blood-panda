import { createCookieSessionStorage } from "react-router"
import { createThemeSessionResolver } from "remix-themes"

// You can default to 'development' if process.env.NODE_ENV is not set
const isProduction = import.meta.env.PROD

const THEME_SECRET = import.meta.env.VITE_THEME_COOKIE_SECRET
if (!THEME_SECRET) {
  throw new Error("THEME_COOKIE_SECRET environment variable is not set")
}

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "theme",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secrets: [THEME_SECRET],
    // Set domain and secure only if in production
    ...(isProduction ? { domain: "bloodpanda.com", secure: true } : {}),
  },
})

export const themeSessionResolver = createThemeSessionResolver(sessionStorage)
