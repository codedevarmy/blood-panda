import { useFormContext, useWatch } from "react-hook-form"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { Separator } from "~/components/ui/separator"
import { useBookingContext } from "~/contexts/booking-context.client"
import { formatCurrency } from "~/lib/utils"
import type { MemberDetailsFormData } from "~/lib/validators/booking-schema"

export default function BookingFormSidebar() {
  const form = useFormContext<MemberDetailsFormData>()
  const {
    prevStep,
    nextStep,
    canGoToPreviousStep,
    totalPrice,
    originalPrice,
    discountPercentage,
    discountedPrice,
    canGoToNextStep,
  } = useBookingContext()

  const totalMembers = useWatch({
    control: form.control,
    name: `memberDetails`,
    defaultValue: [],
  })

  return (
    <Card className={"col-span-full grid h-fit content-start lg:col-span-1"}>
      <CardHeader>
        <CardTitle>{totalMembers.length ?? 0} Member added</CardTitle>
        <CardAction>{formatCurrency(String(totalPrice))}</CardAction>
      </CardHeader>

      <CardContent className={"space-y-4"}>
        <p className={"flex items-center justify-between"}>
          <span className={"font-medium"}>Total MRP</span>
          <span className={"font-semibold"}>
            {formatCurrency(String(originalPrice))}
          </span>
        </p>
        <Separator />
        <p className={"flex items-center justify-between"}>
          <span className={"font-medium"}>
            Discount on MRP
            <Badge className={"text-xs"}>{discountPercentage}%</Badge>
          </span>
          <span className={"font-semibold"}>
            {formatCurrency(String(discountedPrice))}
          </span>
        </p>
        <Separator />
        <p className={"flex items-center justify-between"}>
          <span className={"font-medium"}>Collection Charges</span>
          <span className={"font-semibold"}>{formatCurrency("0")}</span>
        </p>
      </CardContent>

      <CardFooter className={"flex-col gap-4"}>
        <Button
          type="button"
          className={"w-full"}
          onClick={() => prevStep()}
          disabled={!canGoToPreviousStep}
        >
          Previous
        </Button>
        <Button type="button" className={"w-full"} onClick={() => nextStep()}>
          {canGoToNextStep ? "Continue" : "Book Now"}
        </Button>
      </CardFooter>
    </Card>
  )
}
