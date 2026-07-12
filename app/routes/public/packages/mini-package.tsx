import { readFile } from "fs/promises"

import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react"
import { CheckCircle2Icon } from "lucide-react"
import { Link, type LoaderFunctionArgs } from "react-router"
import type { ExtendedContext } from "react-router-devtools"
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
import { capitalizeFirstLetter, formatCurrency, formatSlug } from "~/lib/utils"
import type { MiniPackage } from "~/types"
import type { Route } from "./+types/mini-package"

declare module "react-router" {
  interface LoaderFunctionArgs {
    params: {
      miniPackage: string
    }
  }
  interface ActionFunctionArgs {
    params: {
      miniPackage: string
    }
  }

  namespace Route {
    interface LoaderArgs {
      // keep the original properties from LoaderFunctionArgs
      devTools: ExtendedContext
      // devTools: ExtendedContext
    }
    interface ActionArgs {
      devTools: ExtendedContext
    }
  }
}

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `${capitalizeFirstLetter(params.miniPackage)} Package Page` },
    { name: "description", content: "Welcome to React Router!" },
  ]
}

export async function loader({ params, devTools }: LoaderFunctionArgs) {
  const path = "./app/constants/mini-packages"

  const routeId = devTools?.routeId
  const tracing = devTools?.tracing
  // tracing is a set of utilities to be used in your data fetching functions to trace events
  // in network tab of react-router-devtools
  const end = tracing?.start("loader: mini-package")
  const packageDetails = await readFile(
    `${path}/${params.miniPackage}.json`,
    "utf-8"
  ).then((res) => JSON.parse(res))
  end?.()
  console.log("loader: mini-package", { routeId })
  return packageDetails
}

export default function MiniPackage({
  params,
  loaderData,
}: Route.ComponentProps) {
  const packageName = params.miniPackage
  const data = loaderData as MiniPackage

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
                {formatSlug(packageName)}
              </span>
            </h1>
            <p className={"text-lg text-muted-foreground"}>
              A Complete Health Check for You & Your Family
            </p>
          </div>
        </div>
      </section>

      <div className={"grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6"}>
        <section className={"col-span-full lg:col-span-9"}>
          <Card>
            <CardHeader>
              <CardTitle>
                <h2 className={"text-lg font-semibold"}>
                  {formatSlug(packageName)}
                </h2>
              </CardTitle>
            </CardHeader>

            <CardContent className={"space-y-4"}>
              {data.benefits.map((benefit, idx) => (
                <Card key={crypto.randomUUID()}>
                  <CardHeader>
                    <CardTitle>
                      <p>
                        {idx + 1}. {benefit}
                      </p>
                    </CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </CardContent>
          </Card>
        </section>

        <aside className={"col-span-full lg:col-span-3"}>
          <Card>
            <CardHeader>
              <CardTitle>
                <h3 className={"text-xl font-semibold"}>
                  {formatSlug(packageName)} Package
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
                  <Badge>{data.offerPercent} % Off</Badge>
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
