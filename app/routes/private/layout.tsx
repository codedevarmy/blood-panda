import { Outlet } from "react-router"
// import { Outlet, redirect, useOutletContext } from "react-router"
// import { userContext, type UserSelect } from "~/context"
// import { getUserFromSession } from "~/lib/data.server"

import Footer from "~/components/footer"
import Header from "~/components/header"
import type { Route } from "../private/+types/layout"

// const authMiddleware: Route.MiddlewareFunction = async (
//   { request, context },
//   next
// ) => {
//   const data = await getUserFromSession(request)
//   if (!data) {
//     throw redirect("/login", {
//       status: 302,
//       headers: { "X-Redirect-Reason": "User not authenticated" },
//     })
//   }
//   context.set(userContext, data.user as UserSelect)
//   return next()
// }

// export const middleware: Route.MiddlewareFunction[] = [authMiddleware]

// export async function loader({ context }: Route.LoaderArgs) {
//   const user = context.get(userContext)
//   // const profile = await getProfile(user)
//   return { user }
// }

// type ContextType = {
//   user: UserSelect
// }

// export function HydrateFallback() {
//   return <p>Loading Private...</p>
// }

export default function PrivateLayout({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <Header />
      {/* <Outlet context={{ user: loaderData.user } satisfies ContextType} /> */}
      <Outlet />
      <Footer />
    </>
  )
}

// export function useUser() {
//   return useOutletContext<ContextType>()
// }
