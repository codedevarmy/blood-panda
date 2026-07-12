import { IconStarFilled } from "@tabler/icons-react"

// Import Swiper React components
import {
  A11y,
  Autoplay,
  // Keyboard,
  Navigation,
} from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/a11y"
import "swiper/css/autoplay"
import "swiper/css/navigation"
// import "swiper/css/keyboard"
// import "swiper/css/navigation"
// import "swiper/css/thumbs"

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { testimonies } from "~/constants"

export default function Testimonials() {
  return (
    <section>
      <Card
        className={"rounded-none border-0 bg-transparent shadow-none ring-0"}
      >
        <CardHeader>
          <CardTitle>
            <h3 className={"text-3xl"}>What Our Patients Say</h3>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Swiper
            modules={[Navigation, A11y, Autoplay]}
            grabCursor={true}
            navigation={true}
            a11y={{ enabled: true }}
            loop={true}
            rewind={true}
            autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
            spaceBetween={30}
            slidesPerView={3}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {testimonies.map((item) => {
              return (
                <SwiperSlide key={item.id} className={"py-4"}>
                  <Card className={"h-full w-full"}>
                    <CardHeader>
                      <CardDescription
                        className={"flex flex-row items-center gap-0.5"}
                      >
                        <IconStarFilled
                          className={"size-3 fill-amber-300 stroke-amber-300"}
                        />
                        <IconStarFilled
                          className={"size-3 fill-amber-300 stroke-amber-300"}
                        />
                        <IconStarFilled
                          className={"size-3 fill-amber-300 stroke-amber-300"}
                        />
                        <IconStarFilled
                          className={"size-3 fill-amber-300 stroke-amber-300"}
                        />
                        <IconStarFilled
                          className={"size-3 fill-amber-300 stroke-amber-300"}
                        />
                      </CardDescription>
                    </CardHeader>

                    <CardContent>{item.msg}</CardContent>

                    <CardFooter className={"mt-auto gap-2"}>
                      <Avatar size="lg">
                        <AvatarImage
                          src={item.author.avatar}
                          alt={item.author.name}
                        />
                        <AvatarFallback
                          className={"bg-destructive text-background"}
                        >
                          {item.author.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <CardDescription className={"flex flex-col gap-px"}>
                        <span>{item.author.name}</span>
                        <span>{item.author.location}</span>
                      </CardDescription>
                    </CardFooter>
                  </Card>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </CardContent>
      </Card>
    </section>
  )
}
