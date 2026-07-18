import { format } from "date-fns"
import { Clock10, MapPinCheck } from "lucide-react"
import { useFormContext, useWatch } from "react-hook-form"
import { Button } from "~/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "~/components/ui/field"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "~/components/ui/item"
import { Switch } from "~/components/ui/switch"
import type { BookingFormData } from "~/lib/validators/booking-schema"

export default function ReviewStep() {
  const form = useFormContext<BookingFormData>()

  const watchedAddressValues = useWatch({
    name: "address",
    control: form.control,
  })

  const watchedScheduleValues = useWatch({
    name: "schedule",
    control: form.control,
  })

  return (
    <Card className={"gap-0 rounded-none shadow-none ring-0"}>
      <CardHeader>
        <CardTitle>
          <h3>Review your order</h3>
        </CardTitle>
        <CardDescription>
          <p>Order Summary</p>
        </CardDescription>
        <CardAction>0.00</CardAction>
      </CardHeader>
      <CardContent className="px-0">
        <Card className={"gap-2 rounded-none shadow-none ring-0"}>
          <CardHeader>
            <CardTitle>
              <h4 className={"text-sm"}>Sample Collection</h4>
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <ItemGroup>
              <Item variant="outline" size={"xs"}>
                <ItemMedia variant="image">
                  <MapPinCheck />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>From Home</ItemTitle>
                  <ItemDescription>
                    {/* Bengaluru, Karnataka 560002, India */}
                    {watchedAddressValues?.location},{" "}
                    {watchedAddressValues?.pincode}, India
                  </ItemDescription>
                </ItemContent>
                <ItemActions>
                  <Button type="button" size="sm" variant="outline">
                    Edit
                  </Button>
                </ItemActions>
              </Item>
              <Item variant="outline" size={"xs"}>
                <ItemMedia variant="image">
                  <Clock10 />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>1st Collection</ItemTitle>
                  <ItemDescription>
                    {format(
                      new Date(watchedScheduleValues?.scheduleDate),
                      "dd MMM yyyy"
                    )}{" "}
                    at {watchedScheduleValues?.slotTime}
                  </ItemDescription>
                </ItemContent>
                <ItemActions>
                  <Button type="button" size="sm" variant="outline">
                    Edit
                  </Button>
                </ItemActions>
              </Item>
            </ItemGroup>
          </CardContent>
          <CardContent>
            <FieldGroup className="gap-2">
              <FieldLabel htmlFor="cod">
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle>COD</FieldTitle>
                    <FieldDescription>
                      Pay with cash upon delivery.
                    </FieldDescription>
                  </FieldContent>
                  <Switch id="cod" />
                </Field>
              </FieldLabel>
              <FieldLabel htmlFor="online-payment">
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle>Online Payment</FieldTitle>
                    <FieldDescription>
                      Pay securely using your credit card, debit card, or UPI.
                    </FieldDescription>
                  </FieldContent>
                  <Switch id="online-payment" defaultChecked />
                </Field>
              </FieldLabel>
            </FieldGroup>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}
