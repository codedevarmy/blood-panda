// import { readFile } from "fs/promises"
import {
  IconCalendarCheck,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react"
import { readFile } from "fs/promises"
import { CheckCircle2Icon } from "lucide-react"
import { Link } from "react-router"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { packageIcons } from "~/constants"
import { capitalizeFirstLetter, formatCurrency } from "~/lib/utils"
import type { PackageDetails } from "~/types"
import type { Route } from "./+types/package"

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `${params.package} | Package Page` },
    { name: "description", content: "Welcome to React Router!" },
  ]
}

export async function loader({ params }: Route.LoaderArgs) {
  const packageDetails = await readFile(
    `./app/constants/packages/${params.package}.json`,
    "utf-8"
  ).then((res) => JSON.parse(res))
  return packageDetails
}

export default function PackagePage({
  params,
  loaderData,
}: Route.ComponentProps) {
  const packageSlug = params.package
  const data = loaderData as PackageDetails

  return (
    <main className={"mx-auto max-w-(--breakpoint-xl) space-y-8 px-4 py-12"}>
      <section className={""}>
        <div
          className={
            "relative aspect-square h-full w-full sm:aspect-video md:aspect-video lg:aspect-26/9"
          }
        >
          <img
            src="/packages/packages-bg.png"
            alt="packages-bg"
            width={"100%"}
            height={"100%"}
            className={"absolute top-0 left-0 -z-10 h-full w-full object-cover"}
          />
          <div
            className={
              "flex h-full w-full flex-col items-start justify-center gap-4 px-4 md:px-8 lg:px-12"
            }
          >
            <h1 className={"space-y-2"}>
              <span className={"block text-4xl font-bold text-primary"}>
                {capitalizeFirstLetter(packageSlug)}
              </span>
              <span
                className={"block text-2xl font-semibold text-muted-foreground"}
              >
                Health Package
              </span>
            </h1>
            <p className={"text-lg text-muted-foreground"}>
              A Complete Health Check for You & Your Family
            </p>

            <div className={"space-y-2"}>
              <div className={"inline-flex items-center gap-2"}>
                <p className={"text-2xl font-semibold text-primary"}>
                  {formatCurrency(data.disPrice)}
                </p>
                <span className={"text-sm text-muted-foreground line-through"}>
                  {formatCurrency(data.orgPrice)}
                </span>
                <Badge>{data.offerPercentage} % Off</Badge>
              </div>
            </div>

            <Button variant={"outline"}>
              <IconCalendarCheck className={"size-4"} />
              {`Book ${capitalizeFirstLetter(packageSlug)} Package Now`}
            </Button>
          </div>
        </div>
      </section>

      <div className={"grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6"}>
        <section className={"col-span-full lg:col-span-9"}>
          <Card>
            <CardHeader>
              <CardTitle>
                <h2 className={"text-xl font-semibold"}>
                  Tests Included ({data.totalTests})
                </h2>
              </CardTitle>
              <CardDescription>
                <p className={"text-sm text-muted-foreground"}>
                  {data.description}
                </p>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion
                type="single"
                collapsible
                defaultValue={data.categories[0].id}
                className="w-full"
              >
                {data.categories.map((category, idx) => {
                  const findIconBasedOnIndex = packageIcons[idx]
                  return (
                    <AccordionItem value={category.id} key={category.id}>
                      <AccordionTrigger className={"gap-3"}>
                        <img
                          src={findIconBasedOnIndex}
                          alt={category.name}
                          className={"h-6 w-auto"}
                        />
                        {idx + 1}. {category.name}
                      </AccordionTrigger>
                      <AccordionContent className={"h-fit"}>
                        <ul className={"in-even:grid in-even:grid-cols-2"}>
                          {category.features.map((feature) => (
                            <li
                              key={crypto.randomUUID()}
                              className={"flex items-center gap-2"}
                            >
                              <CheckCircle2Icon className={"size-4"} />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  )
                })}
              </Accordion>
            </CardContent>
          </Card>
        </section>

        <aside className={"col-span-full lg:col-span-3"}>
          <Card>
            <CardHeader>
              <CardTitle>
                <h3 className={"text-xl font-semibold"}>
                  {capitalizeFirstLetter(packageSlug)} Package
                </h3>
              </CardTitle>
              <CardDescription className={"space-y-2"}>
                <p className={"text-2xl font-semibold"}>
                  {formatCurrency(data.disPrice)}
                </p>
                <div className={"inline-flex items-center gap-2"}>
                  <span
                    className={"text-sm text-muted-foreground line-through"}
                  >
                    {formatCurrency(data.orgPrice)}
                  </span>
                  <Badge>{data.offerPercentage} % Off</Badge>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul>
                {data.extraFeatures.map((feature) => (
                  <li
                    key={crypto.randomUUID()}
                    className={"flex items-center gap-2"}
                  >
                    <CheckCircle2Icon className={"size-4"} />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button className={"w-full"} asChild>
                <Link to="/" viewTransition>
                  <IconChevronLeft className={"size-4"} />
                  Go Back
                </Link>
              </Button>
              <Button className={"w-full"}>
                Book Now <IconChevronRight className={"size-4"} />
              </Button>
            </CardFooter>
          </Card>
        </aside>
      </div>
    </main>
  )
}
