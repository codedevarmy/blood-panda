import type { Route } from "../public/+types/home"

import Blogs from "~/features/home/components/blogs"
import BookingSteps from "~/features/home/components/booking-steps"
import CTA from "~/features/home/components/cta"
import FAQs from "~/features/home/components/faqs"
import Features from "~/features/home/components/features"
import HealthCategory from "~/features/home/components/health-category"
import Hero from "~/features/home/components/hero"
import HowItWorks from "~/features/home/components/how-it-works"
import IndividualCategory from "~/features/home/components/individual-category"
import PopularPackages from "~/features/home/components/popular-packages"
import Testimonials from "~/features/home/components/testimonials"
import WhyChooseUs from "~/features/home/components/why-choose-us"

export function meta({}: Route.MetaArgs) {
  return [
    { title: `Blood Panda | Home` },
    { name: "description", content: "Welcome to React Router!" },
  ]
}

export default function Home({}: Route.ComponentProps) {
  return (
    <main className={"mx-auto max-w-(--breakpoint-xl) space-y-8 px-4"}>
      <Hero />
      <Features />
      <PopularPackages />
      <HealthCategory />
      <IndividualCategory />
      <BookingSteps />
      <WhyChooseUs />
      <Testimonials />
      <HowItWorks />
      <Blogs />
      <CTA />
      <FAQs />
    </main>
  )
}
