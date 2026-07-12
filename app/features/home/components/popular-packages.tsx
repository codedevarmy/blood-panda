import { IconHandClick } from "@tabler/icons-react"
import {
  CheckIcon,
  ChevronRight,
  FlaskConicalIcon,
  StarIcon,
} from "lucide-react"
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
import { healthPackages } from "~/constants"
import { cn, formatCurrency } from "~/lib/utils"

export default function PopularPackages() {
  function returnStyles(idx: number, path: "title" | "icon") {
    switch (path) {
      case "title":
        return idx + 1 === 1
          ? "text-slate-600"
          : idx + 1 === 2
            ? "text-yellow-600"
            : idx + 1 === 3
              ? "text-gray-500"
              : idx + 1 === 4
                ? "text-slate-700"
                : idx + 1 === 5
                  ? "text-destructive"
                  : ""

      case "icon":
        return idx + 1 === 1
          ? "bg-slate-400/50"
          : idx + 1 === 2
            ? "bg-amber-400/50"
            : idx + 1 === 3
              ? "bg-blue-400/50"
              : idx + 1 === 4
                ? "bg-grey-400/50"
                : idx + 1 === 5
                  ? "bg-destructive/50"
                  : ""

      default:
        break
    }
  }

  return (
    <section>
      <Card
        className={"rounded-none border-0 bg-transparent shadow-none ring-0"}
      >
        <CardHeader className={"px-0"}>
          <CardTitle>
            <h2 className={"text-4xl font-semibold"}>
              Popular Health Packages
            </h2>
          </CardTitle>
          <CardDescription>
            <p className={"text-lg"}>
              Preventive health checkups designed for every stage of life
            </p>
          </CardDescription>
          <CardAction>
            <Button variant={"link"}>
              View all Packages
              <ChevronRight className={"size-4"} />
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent
          className={
            "grid grid-cols-1 gap-4 px-0 py-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          }
        >
          {healthPackages.map((item, idx) => {
            return (
              <div
                key={item.id}
                className={cn(
                  "relative",
                  item.isPopular ? "rounded-lg ring-4 ring-blue-600" : ""
                )}
              >
                <Card>
                  {item.isPopular ? (
                    <Badge
                      className={
                        "absolute -top-5 left-0 z-10 w-full rounded-t-lg rounded-b-none"
                      }
                    >
                      <StarIcon className={"size-3"} />
                      Most Popular
                    </Badge>
                  ) : null}

                  <CardHeader className={"relative"}>
                    <CardAction
                      className={cn(
                        "absolute -top-1 left-0 col-start-1 rounded-lg p-2",
                        returnStyles(idx, "icon")
                      )}
                    >
                      <FlaskConicalIcon className={"size-5"} />
                    </CardAction>
                    <CardTitle className={"ml-12 capitalize"}>
                      <h3
                        className={cn(
                          "text-xl font-semibold",
                          returnStyles(idx, "title")
                        )}
                      >
                        {item.planName}
                      </h3>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className={"list-inside space-y-2"}>
                      {item.features.map((feat) => {
                        return (
                          <li
                            key={crypto.randomUUID()}
                            className={"flex items-center gap-2"}
                          >
                            <CheckIcon
                              className={"size-4 stroke-destructive"}
                            />
                            {feat}
                          </li>
                        )
                      })}
                    </ul>
                  </CardContent>
                  <CardFooter
                    className={
                      "relative flex items-center justify-between px-2 py-2"
                    }
                  >
                    <Badge
                      variant={"ghost"}
                      className={"absolute top-0 left-0 line-through"}
                    >
                      {formatCurrency(item.originalPrice)}
                    </Badge>
                    <h4 className={"mt-2 text-lg font-semibold"}>
                      {formatCurrency(item.discountedPrice)}
                    </h4>

                    <Button
                      type="button"
                      size={"sm"}
                      variant={item.isPopular ? "default" : "outline"}
                    >
                      Book <IconHandClick className={"size-4"} />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            )
          })}
        </CardContent>
      </Card>
    </section>
  )
}
