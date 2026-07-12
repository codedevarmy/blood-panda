import { MDXContent } from "@content-collections/mdx/react"
import { privacyPolicy } from "content-collections"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"

export default function PrivacyPolicy() {
  return (
    <main className={"mx-auto max-w-(--breakpoint-lg) space-y-8 px-4 py-12"}>
      <Card className={"rounded-none bg-transparent shadow-none ring-0"}>
        <CardHeader>
          <CardTitle>
            <h1>Privacy Policy</h1>
          </CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>

        <CardContent>
          <article className="prose prose-sm max-w-none md:prose-base lg:prose-lg dark:prose-invert">
            <MDXContent code={privacyPolicy.mdx} />
          </article>
        </CardContent>
      </Card>
    </main>
  )
}
