import { Link, Outlet, redirect } from "react-router"

import { FieldDescription } from "~/components/ui/field"
import type { Route } from "../auth/+types/layout"

import { getUserFromSession } from "~/lib/data.server"

const authRecheckMiddleware: Route.MiddlewareFunction = async (
  { request },
  next
) => {
  const data = await getUserFromSession(request)
  if (data) {
    throw redirect("/", {
      status: 302,
      headers: { "X-Redirect-Reason": "User authenticated" },
    })
  }
  return next()
}

export const middleware: Route.MiddlewareFunction[] = [authRecheckMiddleware]

export default function AuthLayout() {
  return (
    <main
      className={
        "mx-auto my-auto flex h-dvh max-w-(--breakpoint-xl) flex-col justify-center space-y-4 px-4"
      }
    >
      <div className="">
        <Outlet />
      </div>

      <FieldDescription className="text-center">
        By clicking continue, you agree to our{" "}
        <Link to="/terms-and-condition" viewTransition>
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link to="/privacy-policy" viewTransition>
          Privacy Policy
        </Link>
        .
      </FieldDescription>
    </main>
  )
}
