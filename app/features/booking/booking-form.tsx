import {
  useFormContext,
  useWatch,
  type SubmitErrorHandler,
  type SubmitHandler,
} from "react-hook-form"
import { toast } from "sonner"
import type { MemberDetailsFormData } from "~/lib/validators/booking-schema"
import BookingWizard from "./booking-wizard"
// import { DevTool } from "@hookform/devtools"
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
import WizardHeader from "./wizard-header"

export default function BookingForm() {
  const form = useFormContext<MemberDetailsFormData>()
  const {
    nextStep,
    totalPrice,
    originalPrice,
    discountPercentage,
    discountedPrice,
  } = useBookingContext()

  const totalMembers = useWatch({
    control: form.control,
    name: `memberDetails`,
    defaultValue: [],
  })

  const onError: SubmitErrorHandler<MemberDetailsFormData> = (errors) => {
    // console.log("Form errors:", errors)
    Object.entries(errors).forEach(([key, value]) => {
      console.log(`Error in ${key}:`, value)
      return toast.error(
        `Error in ${key}: ${value?.message || "Unknown error"}`
      )
    })
    return
  }

  const handleManualSave = async () => {
    // const result = await flush() // Save immediately
    // console.log("Manual save result:", result)
    // if (result.ok) {
    //   toast.success("Saved!")
    // }
  }

  const onSubmit: SubmitHandler<MemberDetailsFormData> = (data) => {
    toast.promise(form.trigger(), {
      loading: "Validating form...",
      success: (result) => {
        if (result) {
          nextStep()
        }
        return "Form is valid! Moving to next step..."
      },
      error: "Please fix the errors in the form before proceeding.",
    })

    console.log("Form submitted successfully:", data)
  }

  return (
    <Card className={"grid gap-4 lg:grid-cols-3"}>
      <Card className={"col-span-full grid h-fit content-start lg:col-span-2"}>
        <WizardHeader />
        <form onSubmit={form.handleSubmit(onSubmit, onError)}>
          <BookingWizard />
        </form>
      </Card>

      {/* Side bar */}

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

        <CardFooter>
          <Button type="button" className={"w-full"} onClick={() => nextStep()}>
            Continue
          </Button>
        </CardFooter>
      </Card>
    </Card>
  )
}
