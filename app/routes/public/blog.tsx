import { MDXContent } from "@content-collections/mdx/react"
import { allPosts } from "content-collections"
import { format } from "date-fns"
import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react"
import { Link, redirect } from "react-router"
import { Badge } from "~/components/ui/badge"
import { buttonVariants } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import type { Route } from "./+types/blog"

export async function loader({ params }: Route.LoaderArgs) {
  const post = allPosts.find((post) => post._meta.path === params.blogSlug)

  if (!post) {
    return redirect("/blogs", 302)
  }

  return { allPosts, post }
}

export function meta({ params, loaderData }: Route.MetaArgs) {
  const { post } = loaderData

  return [
    { title: `${params.blogSlug} Page` },
    { name: "description", content: post.summary },
  ]
}

export default function BlogPage(props: Route.ComponentProps) {
  const { params, loaderData } = props

  const { post, allPosts } = loaderData

  const sortedPosts = allPosts.sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime()
    const dateB = new Date(b.createdAt).getTime()
    // const dateA = new Date(a.lastModified).getTime()
    // const dateB = new Date(b.lastModified).getTime()
    return dateA - dateB // Sort by last modified date (oldest to newest)
  })

  const currentIndex = sortedPosts.findIndex((post) => post.slug === post.slug)

  const previousPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null
  const nextPost =
    currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null

  return (
    <main className={"mx-auto max-w-(--breakpoint-lg) space-y-8 px-4 py-12"}>
      <Card className={"rounded-none bg-transparent shadow-none ring-0"}>
        <CardHeader>
          <CardTitle>
            <h1 className={"text-center text-3xl font-semibold"}>
              {post.title}
            </h1>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <img
            src={post.image}
            alt={post.title}
            width={"100%"}
            height={"100%"}
            className={"h-full w-full"}
          />
        </CardContent>

        <CardContent className={"flex items-center justify-between"}>
          <Link to={"/blogs"} className={buttonVariants()} viewTransition>
            <ChevronLeftCircle className={"size-4"} />
            Go back to blogs
          </Link>
        </CardContent>

        <CardContent className={"border-t border-b py-2"}>
          <div className={"flex items-center justify-between gap-2"}>
            <p>
              By
              <Badge variant={"outline"}>{post.author}</Badge>
            </p>

            <p>{post.readTime} min read</p>

            <p>
              Published on
              <Badge variant={"outline"}>
                {format(new Date(post.createdAt), "MMMM dd, yyyy")}
              </Badge>
            </p>
          </div>
        </CardContent>

        <CardContent>
          <article className="prose prose-sm max-w-none md:prose-base lg:prose-lg dark:prose-invert">
            <MDXContent code={post.mdx} />
          </article>
        </CardContent>

        <CardFooter className={"justify-between"}>
          <Link
            // to={previousPost ? `blogs/${previousPost.slug}` : "#"}
            to={previousPost ? `/blogs/${previousPost._meta.path}` : "#"}
            className={buttonVariants()}
            viewTransition
          >
            <ChevronLeftCircle className={"size-4"} />
            Prev
          </Link>
          <Link
            to={nextPost ? `/blogs/${nextPost._meta.path}` : "#"}
            className={buttonVariants()}
            viewTransition
          >
            Next
            <ChevronRightCircle className={"size-4"} />
          </Link>
        </CardFooter>
      </Card>
    </main>
  )
}
