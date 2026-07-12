import { Link, redirect } from "react-router"
import { authContext } from "~/auth-context"
import { buttonVariants } from "~/components/ui/button"
import { getUserFromSession } from "~/lib/data.server"
import type { SelectUser } from "~/types/db-types"
import type { Route } from "./+types/profile"

const authMiddleware: Route.MiddlewareFunction = async (
  { request, context },
  next
) => {
  const data = await getUserFromSession(request)
  if (!data) {
    throw redirect("/login", {
      status: 302,
      headers: { "X-Redirect-Reason": "User not authenticated" },
    })
  }
  context.set(authContext, data.user as SelectUser)
  return next()
}

export const middleware: Route.MiddlewareFunction[] = [authMiddleware]

// Client-side timing middleware
const timingMiddleware: Route.ClientMiddlewareFunction = async ({}, next) => {
  const start = performance.now()
  await next()
  const duration = performance.now() - start
  console.log(`Profile Navigation took ${duration}ms`)
}

export const clientMiddleware: Route.ClientMiddlewareFunction[] = [
  timingMiddleware,
]

export async function loader({ context }: Route.LoaderArgs) {
  const user = context.get(authContext)
  // const profile = await getProfile(user)
  return { user }
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: `Profile Page` },
    { name: "description", content: "Welcome to React Router!" },
  ]
}

export default function ProfilePage({ loaderData }: Route.ComponentProps) {
  return (
    <main className={"mx-auto max-w-(--breakpoint-xl) space-y-8 px-4 py-12"}>
      <h1>ProfilePage</h1>

      <pre>{JSON.stringify(loaderData, null, 2)}</pre>
      <Link
        to="/"
        viewTransition
        className={buttonVariants({ variant: "link" })}
      >
        Go back
      </Link>
    </main>
  )
}
