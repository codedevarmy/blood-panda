// import clsx from "clsx"
import { NuqsAdapter } from "nuqs/adapters/react-router/v7"
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
} from "react-router"
// import { PreventFlashOnWrongTheme, ThemeProvider, useTheme } from "remix-themes"

import { TooltipProvider } from "~/components/ui/tooltip"
import "./app.css"

import type { Route } from "./+types/root"
// import { themeSessionResolver } from "./.server/sessions.server"
import { Toaster } from "./components/ui/sonner"
// import { Spinner } from "./components/ui/spinner"

// Client-side timing middleware
const timingMiddleware: Route.ClientMiddlewareFunction = async ({}, next) => {
  const start = performance.now()
  await next()
  const duration = performance.now() - start
  console.log(`Navigation took ${duration}ms`)
}

export const clientMiddleware: Route.ClientMiddlewareFunction[] = [
  timingMiddleware,
]

// Return the theme from the session storage using the loader
// export async function loader({ request }: LoaderFunctionArgs) {
//   const { getTheme } = await themeSessionResolver(request)
//   return {
//     theme: getTheme(),
//   }
// }

// Wrap your app with ThemeProvider.
// `specifiedTheme` is the stored theme in the session storage.
// `themeAction` is the action name that's used to change the theme in the session storage.
export default function AppWithProviders() {
  // const data = useLoaderData<typeof loader>()
  return (
    <>
      {/* <ThemeProvider specifiedTheme={data.theme} themeAction="/action/set-theme"> */}
      <App />
      {/* </ThemeProvider> */}
    </>
  )
}

export function App() {
  // const data = useLoaderData<typeof loader>()
  // const [theme] = useTheme()
  // const navigation = useNavigation()
  // const isNavigating = Boolean(navigation.location)

  return (
    <html
      lang="en"
      // className={clsx(theme)}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        {/* <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} /> */}
        <Links />
      </head>
      <body className={"relative"}>
        <NuqsAdapter>
          <TooltipProvider>
            {/* {isNavigating ? (
              <div className="fixed inset-0 z-9999 flex h-screen w-screen animate-pulse items-center justify-center gap-4 bg-accent/50 backdrop-blur-sm">
                <Spinner className={"size-6"} />
              </div>
            ) : (
            )} */}
            <Outlet />
          </TooltipProvider>
          <Toaster richColors closeButton position="top-center" />
        </NuqsAdapter>
        <ScrollRestoration />
        <Scripts />
        {/* <LiveReload /> */}
      </body>
    </html>
  )
}

// export function Layout({ children }: { children: React.ReactNode }) {
//   const data = useLoaderData<typeof loader>()
//   const [theme] = useTheme()

//   return (
//     <html lang="en" className={clsx(theme)}>
//       <head>
//         <meta charSet="utf-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <Meta />
//         <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
//         <Links />
//       </head>
//       <body>
//         <TooltipProvider>{children}</TooltipProvider>
//         <ScrollRestoration />
//         <Scripts />
//       </body>
//     </html>
//   )
// }

// export function App() {
//   return (
//     <NuqsAdapter>
//       <Outlet />
//     </NuqsAdapter>
//   )
// }

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!"
  let details = "An unexpected error occurred."
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error"
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}
