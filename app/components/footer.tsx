import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandWhatsapp,
  IconBrandYoutube,
} from "@tabler/icons-react"
import {
  ChevronRightCircleIcon,
  ChevronRightIcon,
  Globe2Icon,
  MailPlusIcon,
  PhoneCallIcon,
} from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardAction, CardContent, CardDescription } from "./ui/card"

export default function Footer() {
  return (
    <footer
      className={
        "mx-auto max-w-(--breakpoint-xl) space-y-8 rounded-tl-lg rounded-tr-lg bg-blue-800 px-4 py-8"
      }
    >
      <div className={"grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"}>
        <div className={"space-y-2"}>
          <div className={"flex flex-col items-start justify-center"}>
            <img src="/logo-idol.png" alt="logo" width={70} height={49} />
            <img src="/logo-txt.png" alt="logo" width={196} height={34} />
          </div>

          <p className={"text-background"}>
            <span className={"inline-block"}>Your Health, Our Priority</span>
            <span className={"inline-block"}>
              Smart diagnostics, delivered home.
            </span>
          </p>

          <Button className={"rounded-full"}>
            <IconBrandWhatsapp className={"size-4"} />
            Chat on Whatsapp
          </Button>

          <div className={"flex items-center gap-3"}>
            <IconBrandFacebook className={"size-5 stroke-accent"} />
            <IconBrandLinkedin className={"size-5 stroke-accent"} />
            <IconBrandYoutube className={"size-5 stroke-accent"} />
            <IconBrandInstagram className={"size-5 stroke-accent"} />
          </div>
        </div>
        <div className={"space-y-2"}>
          <h5 className={"font-semibold text-background"}>Quick Links</h5>
          <ul>
            <li>
              <Button
                variant={"link"}
                asChild
                size={"sm"}
                className={"px-0 text-background"}
              >
                <a href="#">
                  <ChevronRightIcon className={"size-4"} />
                  Health Packages
                </a>
              </Button>
            </li>
            <li>
              <Button
                variant={"link"}
                asChild
                size={"sm"}
                className={"px-0 text-background"}
              >
                <a href="#">
                  <ChevronRightIcon className={"size-4"} />
                  Popular Tests
                </a>
              </Button>
            </li>
            <li>
              <Button
                variant={"link"}
                asChild
                size={"sm"}
                className={"px-0 text-background"}
              >
                <a href="#">
                  <ChevronRightIcon className={"size-4"} />
                  Health by Category
                </a>
              </Button>
            </li>
            <li>
              <Button
                variant={"link"}
                asChild
                size={"sm"}
                className={"px-0 text-background"}
              >
                <a href="#">
                  <ChevronRightIcon className={"size-4"} />
                  Blogs
                </a>
              </Button>
            </li>
            <li>
              <Button
                variant={"link"}
                asChild
                size={"sm"}
                className={"px-0 text-background"}
              >
                <a href="#">
                  <ChevronRightIcon className={"size-4"} />
                  Book Home Collection
                </a>
              </Button>
            </li>
          </ul>
        </div>
        <div className={"space-y-2"}>
          <h5 className={"font-semibold text-background"}>Contact</h5>
          <ul>
            <li>
              <Button
                variant={"link"}
                asChild
                size={"sm"}
                className={"px-0 text-background"}
              >
                <a href="tel:+919999911111">
                  <PhoneCallIcon className={"size-4"} />
                  +91 99999 11111
                </a>
              </Button>
            </li>
            <li>
              <Button
                variant={"link"}
                asChild
                size={"sm"}
                className={"px-0 text-background"}
              >
                <a href="tel:+919999911111">
                  <PhoneCallIcon className={"size-4"} />
                  +91 99999 11111
                </a>
              </Button>
            </li>
            <li>
              <Button
                variant={"link"}
                asChild
                size={"sm"}
                className={"px-0 text-background"}
              >
                <a href="mailto:info@bloodpanda.com">
                  <MailPlusIcon className={"size-4"} />
                  info@bloodpanda.com
                </a>
              </Button>
            </li>
            <li>
              <Button
                variant={"link"}
                asChild
                size={"sm"}
                className={"px-0 text-background"}
              >
                <a href="https://www.bloodpanda.com">
                  <Globe2Icon className={"size-4"} />
                  www.bloodpanda.com
                </a>
              </Button>
            </li>
          </ul>
        </div>
        <div className={"space-y-2"}>
          <h5 className={"font-semibold text-background"}>Book now</h5>
          <Card className={""}>
            <CardContent className={"space-y-2"}>
              <CardDescription className={"text-backgroundd"}>
                Book your home collection in 60 seconds on Whatsapp.
              </CardDescription>
              <CardAction>
                <Button type="button" className={"w-full"}>
                  Chat Now <ChevronRightCircleIcon className={"size-4"} />
                </Button>
              </CardAction>
            </CardContent>
          </Card>
        </div>
      </div>
    </footer>
  )
}
