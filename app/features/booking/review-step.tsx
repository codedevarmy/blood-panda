import { Button } from "~/components/ui/button"

export default function ReviewStep() {
  const onSubmit = () => {
    // You can handle the submission logic here, e.g., send data to an API
  }
  return (
    <div>
      <p>This is the Review step. Review your information before submission.</p>
      <Button onClick={onSubmit} type="button">
        Submit Booking
      </Button>
    </div>
  )
}
