import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { Separator } from "~/components/ui/separator"
import { howItWorks } from "~/constants"
import { cn } from "~/lib/utils"

export default function HowItWorks() {
  return (
    <section>
      <Card
        className={"rounded-none border-0 bg-transparent shadow-none ring-0"}
      >
        <CardHeader>
          <CardTitle className={"flex items-center justify-center"}>
            <Separator
              orientation="vertical"
              className={"my-auto h-1 min-w-xs scroll-fade-e"}
            />
            <h3 className={"text-center text-3xl"}>How it Works</h3>
            <Separator
              orientation="vertical"
              className={"my-auto h-1 min-w-xs scroll-fade-s"}
            />
          </CardTitle>
        </CardHeader>

        <CardContent className={"flex items-center justify-between px-2"}>
          {howItWorks.map((step, idx) => {
            const isLastItem =
              howItWorks.lastIndexOf(howItWorks[idx + 1]) === idx + 1

            return (
              <div key={step.id} className={"flex items-center gap-2"}>
                <div className={"flex flex-col items-center gap-1"}>
                  <span
                    className={cn(
                      // `${step.coverColor}`,
                      "px-4.5 py-3",
                      "rounded-full",
                      "ring-1 ring-blue-500"
                      // "text-background"
                    )}
                  >
                    {idx + 1}
                  </span>
                  <span className={"font-semibold capitalize"}>
                    {step.stepName}
                  </span>
                </div>
                <div className={"mb-4"}>
                  {isLastItem ? (
                    <Separator
                      orientation="vertical"
                      className={
                        "h-1 min-w-xs scroll-fade-e rounded-full -bg-linear-270 from-blue-400 from-25% via-lime-300 via-40% to-yellow-300 to-35%"
                      }
                    />
                  ) : null}
                </div>
              </div>
            )
          })}
        </CardContent>

        <CardContent
          className={
            "grid grid-cols-1 gap-4 px-0 sm:grid-cols-2 lg:grid-cols-4"
          }
        >
          {howItWorks.map((item) => {
            return (
              <Card key={item.id} className={"pt-0"}>
                <CardContent className={cn("pt-4", `${item.coverColor}`)}>
                  <img
                    src={item.cover}
                    alt={`${item.title}-cover`}
                    width={"100%"}
                    height={"100%"}
                    className={"h-full w-full"}
                  />
                </CardContent>

                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.desc}</CardDescription>
                </CardHeader>
              </Card>
            )
          })}
        </CardContent>
      </Card>
    </section>
  )
}
