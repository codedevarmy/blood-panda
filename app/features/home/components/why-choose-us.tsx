import {
  IconClock24,
  IconFileCheck,
  IconShieldCheck,
  IconStar,
} from "@tabler/icons-react"
import { BadgeCheckIcon } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { whyChooseReasons } from "~/constants"

export default function WhyChooseUs() {
  return (
    <section>
      <Card
        className={"rounded-none border-0 bg-transparent shadow-none ring-0"}
      >
        <CardHeader>
          <CardTitle>
            <h3 className={"text-3xl"}>Why Choose Blood Panda?</h3>
          </CardTitle>
          <CardDescription>
            <p>Trusted By Doctors & Patients</p>
          </CardDescription>
        </CardHeader>
        <CardContent className={"w-full max-w-md"}>
          <h4 className={"font-semibold"}>
            Blood Masters built on the principles of accuracy, speed, and trust.
            Every test is processed in NABL accredited labs with the highest
            quality standards.
          </h4>
        </CardContent>
        <CardContent className={"grid grid-cols-1 gap-4 lg:grid-cols-2"}>
          <ul className={"space-y-2"}>
            {whyChooseReasons.map((item) => {
              return (
                <li key={item.id} className={"flex items-center gap-2"}>
                  <BadgeCheckIcon className={"size-4"} />
                  {item.text}
                </li>
              )
            })}
          </ul>

          <Card className={"w-full"}>
            <CardContent className={"grid grid-cols-4"}>
              <Card className={"rounded-none border-r-2 shadow-none ring-0"}>
                <CardContent className={"flex flex-col items-center gap-1"}>
                  <h5 className={"text-lg font-semibold"}>10k+</h5>
                  <IconFileCheck className={"size-6"} />
                </CardContent>
              </Card>

              <Card className={"rounded-none border-r-2 shadow-none ring-0"}>
                <CardContent className={"flex flex-col items-center gap-1"}>
                  <h5 className={"text-lg font-semibold"}>24 Hr</h5>
                  <IconClock24 className={"size-6"} />
                </CardContent>
              </Card>

              <Card className={"rounded-none border-r-2 shadow-none ring-0"}>
                <CardContent className={"flex flex-col items-center gap-1"}>
                  <h5 className={"text-lg font-semibold"}>4.9 Stars</h5>
                  <IconStar className={"size-6"} />
                </CardContent>
              </Card>

              <Card className={"rounded-none shadow-none ring-0"}>
                <CardContent className={"flex flex-col items-center gap-1"}>
                  <h5 className={"text-lg font-semibold"}>NABL</h5>
                  <IconShieldCheck className={"size-6"} />
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </section>
  )
}
