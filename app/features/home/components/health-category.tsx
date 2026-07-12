import { IconHandClick } from "@tabler/icons-react"
import { ScrollTextIcon } from "lucide-react"
import { Button } from "~/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { healthCategories } from "~/constants"

export default function HealthCategory() {
  return (
    <section>
      <Card
        className={"rounded-none border-0 bg-transparent shadow-none ring-0"}
      >
        <CardHeader className={"px-0"}>
          <CardTitle>
            <h2 className={"text-4xl font-semibold"}>
              Browse Tests by Health Category
            </h2>
          </CardTitle>
          <CardDescription>
            <p className={"text-lg"}>
              Find the right diagnostic tests based on your health concern.
            </p>
          </CardDescription>
          <CardAction className={"space-x-2"}>
            <Button variant={"default"}>
              Book Now
              <IconHandClick className={"size-4"} />
            </Button>
            <Button variant={"outline"}>
              View All
              <ScrollTextIcon className={"size-4"} />
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent className={"grid grid-cols-7 gap-4 px-0"}>
          {healthCategories.map((item) => {
            return (
              <div key={item.id} className={"space-y-2 text-center"}>
                <Card
                  className={
                    "rounded-full border-0 bg-destructive/10 shadow-md ring-2 ring-transparent hover:ring-destructive/50"
                  }
                >
                  <CardContent className={""}>
                    <img
                      src={item.img}
                      alt={item.title}
                      width={"100%"}
                      height={"100%"}
                      className={
                        "aspect-square h-full w-full object-center p-2"
                      }
                    />
                  </CardContent>
                </Card>
                <CardDescription>
                  <p className={"text-base font-semibold capitalize"}>
                    {item.title}
                  </p>
                </CardDescription>
              </div>
            )
          })}
        </CardContent>
      </Card>
    </section>
  )
}
