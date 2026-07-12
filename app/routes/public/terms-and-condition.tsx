import { MDXContent } from "@content-collections/mdx/react"
import { termsAndCondition } from "content-collections"
import { format } from "date-fns"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"

export default function TermsAndCondition() {
  return (
    <main className={"mx-auto max-w-(--breakpoint-lg) space-y-8 px-4 py-12"}>
      <Card className={"rounded-none bg-transparent shadow-none ring-0"}>
        <CardHeader>
          <CardTitle>
            <h1>Terms and Conditions</h1>
          </CardTitle>
          <CardDescription>
            {/* new Date().toISOString() */}
            <p>{format(new Date(), "MMMM dd, yyyy")}</p>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <article className="prose prose-sm max-w-none md:prose-base lg:prose-lg dark:prose-invert">
            <MDXContent code={termsAndCondition.mdx} />
          </article>
        </CardContent>
      </Card>
    </main>
  )
}
