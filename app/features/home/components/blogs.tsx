import { ArrowRightIcon } from "lucide-react"
import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { blogs } from "~/constants"
import { formattedDate } from "~/lib/utils"

export default function Blogs() {
  // const d = new Date();
  // let setNew = d.setDate(10);
  // setNew = d.setMonth(5);
  // setNew = d.setFullYear(2026);
  // console.log('setted', setNew);
  // const formatted = new Intl.DateTimeFormat('en-In', {
  //   dateStyle: 'medium',
  // }).format(setNew);

  return (
    <section>
      <Card
        className={"rounded-none border-0 bg-transparent shadow-none ring-0"}
      >
        <CardHeader className={"px-0"}>
          <CardTitle>
            <h3 className={"text-3xl"}>Health Tips & Blogs</h3>
          </CardTitle>
          <CardDescription>
            <p>Stay informed with our latest health articles</p>
          </CardDescription>
        </CardHeader>

        <CardContent
          className={
            "grid grid-cols-1 gap-4 px-0 sm:grid-cols-2 lg:grid-cols-4"
          }
        >
          {blogs.map((blog) => {
            return (
              <Card key={blog.id} className={"pt-0"}>
                <CardContent className={"scroll-fade-b px-0"}>
                  <img
                    src={blog.cover}
                    alt={blog.title}
                    width={"100%"}
                    height={"100%"}
                    className={"h-full w-full"}
                  />
                </CardContent>
                <CardHeader>
                  <CardDescription>{formattedDate(blog.date)}</CardDescription>
                  <CardTitle>
                    <h4>{blog.title}</h4>
                  </CardTitle>
                </CardHeader>
                <CardFooter className={"mt-auto"}>
                  <Button type="button" variant={"link"}>
                    Read more <ArrowRightIcon className={"size-4"} />
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </CardContent>
      </Card>
    </section>
  )
}
