import { redirect } from "react-router"
import { getUsers } from "~/.server/loaders"
import { authContext } from "~/auth-context"
import { getUserFromSession } from "~/lib/data.server"
import type { SelectUser } from "~/types/db-types"
import type { Route } from "./+types/cart"

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
  console.log(`Cart Navigation took ${duration}ms`)
}

export const clientMiddleware: Route.ClientMiddlewareFunction[] = [
  timingMiddleware,
]

export async function loader({ context }: Route.LoaderArgs) {
  const user = context.get(authContext)
  const users = await getUsers?.()
  // console.log("serverMessage", serverMessage)
  return { user, users }
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: `Cart Page` },
    { name: "description", content: "Welcome to React Router!" },
  ]
}

export default function CartPage({ loaderData }: Route.ComponentProps) {
  return (
    <main className={"mx-auto max-w-(--breakpoint-xl) space-y-8 px-4 py-12"}>
      <h1>Cart Page</h1>
      <div className={"grid grid-cols-2 gap-4"}>
        <div>
          <h2>Logged in user</h2>
          <pre className={"rounded-lg bg-accent p-4 text-sm"}>
            {JSON.stringify(loaderData.user, null, 2)}
          </pre>
        </div>

        <div>
          <h2>All users</h2>
          <pre className={"rounded-lg bg-accent p-4 text-sm"}>
            {JSON.stringify(loaderData.users, null, 2)}
          </pre>
        </div>
      </div>
    </main>
  )
}
