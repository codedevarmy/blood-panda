import type { Route } from "./+types/contact"

export function meta({}: Route.MetaArgs) {
  return [
    { title: `Silver | Package Page` },
    { name: "description", content: "Welcome to React Router!" },
  ]
}

export default function ContactPage() {
  return (
    <main className={"mx-auto max-w-(--breakpoint-xl) space-y-8 px-4 py-12"}>
      ContactPage
    </main>
  )
}
