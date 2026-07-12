import { useLocation } from "react-router"
import LoginForm from "~/features/auth/login-form"
import type { Route } from "./+types/login"

export function meta({}: Route.MetaArgs) {
  return [
    { title: `Login Page` },
    { name: "description", content: "Welcome to React Router!" },
  ]
}

export default function LoginPage() {
  const linkdata = useLocation()
  console.log("linkdata", linkdata)
  return <LoginForm />
}
