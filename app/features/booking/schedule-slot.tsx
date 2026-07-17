import { IconClock } from "@tabler/icons-react"
import { format } from "date-fns"
import { CheckCircle2 } from "lucide-react"
import { Fragment, useEffect, useState } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { toast } from "sonner"

import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Calendar } from "~/components/ui/calendar"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { ScrollArea } from "~/components/ui/scroll-area"
import { Separator } from "~/components/ui/separator"
import { disablePastDates, generateTimeSlots } from "~/lib/utils"
import type { BookingFormData } from "~/lib/validators/booking-schema"

function CalendarFooter({
  date,
  slot,
}: {
  date: Date | undefined
  slot: string | undefined
}) {
  return (
    <div>
      <Separator className={"my-4"} />
      <div className={"flex items-center justify-between"}>
        <p className={"text-sm font-medium"}>
          Selected Date:{" "}
          <Badge className={"font-normal"}>
            {date ? format(date, "dd MMM yyyy") : "None"}
          </Badge>
        </p>
        <p className={"text-sm font-medium"}>
          Slot: <Badge>{slot || "Not selected"}</Badge>
        </p>
      </div>
    </div>
  )
}

export default function ScheduleSlot() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [timeZone, setTimeZone] = useState<string | undefined>(undefined)
  const [slot, setSlot] = useState<string | undefined>(undefined)

  useEffect(() => {
    setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone)
  }, [])

  const slots = generateTimeSlots("06:00", "18:00", 15)

  const form = useFormContext<BookingFormData>()

  function handleReset() {
    setDate(undefined)
    setSlot(undefined)
  }

  return (
    <Card className={"mx-auto max-w-2xl gap-3"}>
      <CardHeader>
        <CardTitle>Schedule a session</CardTitle>
        <CardDescription>
          <p>
            Select a date and time slot for your booking. All times are in your
            local timezone:
          </p>
          <Badge>{timeZone}</Badge>
        </CardDescription>
      </CardHeader>

      <CardContent className={""}>
        <Card className={"grid grid-cols-6 gap-0 rounded-md py-0 shadow-none"}>
          {/* <CardDescription
              className={"col-span-full grid grid-cols-subgrid px-4"}
            >
              <p className={"col-span-4"}>
                Date: <Badge>{format(date || new Date(), "dd MMM yyyy")}</Badge>
              </p>
              <p className={"col-span-2 text-center text-sm font-medium"}>
                Slot: <Badge>{slot || "Not selected"}</Badge>
              </p>
            </CardDescription> */}
          <CardContent className={"col-span-4 px-2 ring-1 ring-accent"}>
            <Controller
              control={form.control}
              name="schedule.scheduleDate"
              render={({ field, fieldState }) => (
                <Calendar
                  mode="single"
                  selected={new Date(field.value) || date}
                  onSelect={(date) => {
                    setDate(date)
                    if (date) {
                      field.onChange(date.toISOString())
                      setSlot(undefined)
                    } else {
                      return toast.warning("Please select a date")
                    }
                  }}
                  timeZone={timeZone}
                  className="w-full"
                  navLayout="after"
                  disabled={(date) => disablePastDates(date)}
                  footer={<CalendarFooter date={date} slot={slot} />}
                />
              )}
            />
          </CardContent>
          <CardContent className={"col-span-2 px-2 ring-1 ring-accent"}>
            <div className={"border-b py-4"}>
              <p className={"col-span-2 text-center text-base font-semibold"}>
                <span className={"flex items-center justify-center gap-2"}>
                  <IconClock className={"size-4"} /> Time Slots
                </span>
              </p>
            </div>
            <Controller
              control={form.control}
              name="schedule.slotTime"
              render={({ field, fieldState }) => (
                <ScrollArea className="h-100 w-full">
                  <div className="p-4">
                    {slots.map((slot) => (
                      <Fragment key={slot}>
                        <Button
                          type="button"
                          className="w-full rounded-sm text-sm"
                          variant={slot === field.value ? "outline" : "ghost"}
                          onClick={() => {
                            setSlot(slot)
                            field.onChange(slot)
                          }}
                          aria-invalid={fieldState.invalid}
                        >
                          {slot}
                        </Button>
                        <Separator className="my-2" />
                      </Fragment>
                    ))}
                  </div>
                </ScrollArea>
              )}
            />
          </CardContent>
        </Card>
      </CardContent>
      <CardFooter className={"justify-between"}>
        {date && slot ? (
          <p className={"flex items-center gap-2"}>
            <IconClock className={"size-4"} />
            {format(date, "cccc dd MMM yyyy")} at {slot}
          </p>
        ) : (
          <p className={"flex items-center gap-2"}>
            <CheckCircle2 className={"size-4"} />
            Ready, confirm to book
          </p>
        )}
        <CardAction>
          <Button size={"sm"} variant={"secondary"} onClick={handleReset}>
            Reset
          </Button>
          <Button size={"sm"} variant={"default"}>
            Book session
          </Button>
        </CardAction>
      </CardFooter>
    </Card>
  )
}
