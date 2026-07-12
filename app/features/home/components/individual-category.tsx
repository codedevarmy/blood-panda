import { IconArrowUpRight } from "@tabler/icons-react"
import { PlusCircle } from "lucide-react"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { individualCategories } from "~/constants"
import { formatCurrency } from "~/lib/utils"

export default function IndividualCategory() {
  return (
    <section>
      <Card
        className={"rounded-none border-0 bg-transparent shadow-none ring-0"}
      >
        <CardHeader className={"px-0"}>
          <CardTitle>
            <h2 className={"text-4xl font-semibold"}>
              Browse Tests by Individual Category
            </h2>
          </CardTitle>
          <CardDescription>
            <p className={"text-lg"}>
              Find the right diagnostic tests based on your health concern.
            </p>
          </CardDescription>
          <CardAction className={"space-x-2"}>
            <Button variant={"outline"}>
              View All
              <IconArrowUpRight className={"size-4"} />
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent className={"flex items-center gap-4 px-0"}>
          {individualCategories.map((item) => {
            return (
              <Card key={item.id} className={"w-full"}>
                <CardHeader>
                  <CardTitle>
                    <h4>{item.title}</h4>
                  </CardTitle>
                  <CardDescription>
                    <p>{item.desc}</p>
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <Badge variant={"ghost"} className={"line-through"}>
                    {formatCurrency(item.originalPrice)}
                  </Badge>
                  <h5 className={"text-lg font-semibold"}>
                    {formatCurrency(item.discountedPrice)}
                  </h5>
                </CardContent>
                <CardFooter>
                  <Button variant={"outline"} className={"w-full rounded-full"}>
                    Add <PlusCircle className={"size-4"} />
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
