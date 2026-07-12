import { allPosts } from "content-collections"

import { format } from "date-fns"
import { ArrowRightIcon } from "lucide-react"
import { Link } from "react-router"
import { Badge } from "~/components/ui/badge"
import { buttonVariants } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import type { Route } from "./+types/blogs"

export function meta({}: Route.MetaArgs) {
  return [
    { title: `Blogs Page` },
    { name: "description", content: "Welcome to React Router!" },
  ]
}

export default function BlogsPage() {
  return (
    <main className={"mx-auto max-w-(--breakpoint-xl) space-y-8 px-4 py-12"}>
      <Card
        className={"space-y-8 rounded-none bg-transparent shadow-none ring-0"}
      >
        <CardHeader className={"rounded-none bg-accent py-6"}>
          <CardTitle>
            <h1 className={"text-center text-3xl font-semibold"}>
              Health & fitness insights for a healthier you
            </h1>
          </CardTitle>
        </CardHeader>

        <CardContent className={"grid grid-cols-3 gap-4"}>
          {allPosts.map((post) => (
            <Card key={post._meta.path} className={"gap-4 pt-0 pb-2"}>
              <CardContent className={"scroll-fade-b px-0"}>
                <img
                  src={post.image}
                  alt={post.title}
                  width={"100%"}
                  height={"100%"}
                  className={"h-full w-full"}
                />
              </CardContent>

              <CardHeader className={"rounded-none"}>
                <CardDescription>
                  <Badge variant={"outline"}>
                    {format(new Date(post.createdAt), "MMMM dd, yyyy")}
                  </Badge>
                </CardDescription>
                <CardTitle>
                  <h2 className={"text-2xl font-medium"}>{post.title}</h2>
                </CardTitle>

                <CardDescription>
                  <p className={"line-clamp-3"}>{post.summary}</p>
                </CardDescription>

                <CardDescription
                  className={"flex flex-wrap items-center gap-2"}
                >
                  {post.categories.map((category) => (
                    <Badge key={crypto.randomUUID()}>{category}</Badge>
                  ))}
                </CardDescription>
              </CardHeader>
              <CardFooter className={"flex justify-end rounded-none"}>
                <Link
                  to={`/blogs/${post._meta.path}`}
                  className={buttonVariants({ variant: "link" })}
                >
                  Read more <ArrowRightIcon className={"size-4"} />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </CardContent>
      </Card>
    </main>
  )
}
