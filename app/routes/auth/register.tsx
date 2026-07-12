import RegisterForm from "~/features/auth/register-form"
import type { Route } from "./+types/register"

export function meta({}: Route.MetaArgs) {
  return [
    { title: `Register Page` },
    { name: "description", content: "Welcome to React Router!" },
  ]
}

export default function RegisterPage() {
  return <RegisterForm />
}
