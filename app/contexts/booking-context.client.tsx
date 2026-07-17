import { zodResolver } from "@hookform/resolvers/zod"
import { createContext, useContext, useState } from "react"
import { FormProvider, useForm, useWatch } from "react-hook-form"
import { useLoaderData } from "react-router"
import { toast } from "sonner"
import {
  bookingFormSchema,
  type BookingFormData,
} from "~/lib/validators/booking-schema"
import type { Route } from "../routes/private/+types/booking"
// import { useFormStorage } from "react-hook-form-storage"
import { useFormPersist } from "@liorpo/react-hook-form-persist"

type BookingContextType = {
  step: number
  nextStep: () => void
  prevStep: () => void
  // clearSavedFormData: () => void

  // isLoading: boolean
  // isRestored: boolean
  totalPrice: number
  originalPrice: number
  discountedPrice: number
  discountPercentage: number
}

const BookingContext = createContext<BookingContextType | undefined>(undefined)

type BookingContextProviderProps = {
  children: React.ReactNode
}

export function BookingContextProvider(props: BookingContextProviderProps) {
  const { children } = props
  const [step, setStep] = useState(1) // max 4 steps

  const { user } = useLoaderData<Route.ComponentProps["loaderData"]>()

  const formInstance = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema as any),
    mode: "onChange",
    defaultValues: {
      memberDetails: [
        {
          name: user?.name || "",
          email: user?.email || "",
          phone: "",
          gender: undefined,
          age: "0",
          testItems: undefined,
        },
      ],
      address: {
        location: "",
        houseNo: "",
        landmark: "",
        pincode: "",
        isChecked: false,
        addressType: undefined,
      },
      schedule: {
        scheduleDate: "",
        slotTime: "",
        scheduleStatus: "PENDING",
      },
    },
  })

  const discountPercentage = 30

  const watchBasicDetails = useWatch({
    control: formInstance.control,
    name: `memberDetails`,
    defaultValue: [],
    compute: (member) => {
      const testItems =
        member.map((item) => item?.testItems || [])?.flat() || []

      const originalPrice = testItems.reduce(
        (acc, cur) => acc + (cur?.originalPrice || 0),
        0
      )
      const discountedPrice =
        originalPrice - originalPrice * (discountPercentage / 100)
      // const discountedPrice =
      //   originalPrice - originalPrice * (discountPercentage / 100)

      const totalPrice = discountedPrice * member.length

      return { originalPrice, discountedPrice, totalPrice, member }
    },
  })

  function nextStep() {
    const validatingForm: Promise<boolean> = new Promise(async (resolve) => {
      const ok =
        step === 1
          ? await formInstance.trigger("memberDetails")
          : step === 2
            ? await formInstance.trigger("address")
            : step === 3
              ? await formInstance.trigger("schedule")
              : true

      resolve(ok)
    })

    toast.promise(validatingForm, {
      loading: "Validating form...",
      success: (result) => {
        if (result) {
          setStep((prev) => Math.min(prev + 1, 4))
        }
      },
      error: "Please fix the errors in the form before proceeding.",
    })
  }

  function prevStep() {
    setStep((prev) => Math.max(prev - 1, 1))
  }

  const { clear: c } = useFormPersist("my-form", {
    control: formInstance.control,
    setValue: formInstance.setValue,
    storage: sessionStorage,
    timeout: 24 * 60 * 60 * 1000, // 24 hours
    debounceDelay: 500, // Save after 500ms of inactivity
    onTimeout: () => {
      console.log("Form data expired")
    },
    onDataRestored: (values) => {
      console.log(values)
    },
    validate: true, // Trigger validation when data is restored
    dirty: true, // Mark form as dirty
    touch: true, // Mark fields as touched
  })

  // const { isRestored, isLoading, save, clear, restore } = useFormStorage(
  //   "booking-form",
  //   formInstance,
  //   {
  //     // Options go here
  //     storage: sessionStorage,
  //     validate: true,
  //     autoRestore: true,
  //     dirty: true,
  //     touched: true,
  //     autoSave: true,
  //     debounce: 600,
  //     onRestore(values) {
  //       console.log(values)
  //     },
  //     onSave(values) {
  //       console.log(values)
  //     },
  //   }
  // )

  // const onSubmit = (data: FormData) => {
  //   console.log(data)
  // }

  // if (isLoading) {
  //   return <div>Loading saved data...</div>
  // }

  const values: BookingContextType = {
    step,
    nextStep,
    prevStep,
    // clearSavedFormData: clear,

    // isLoading,
    // isRestored,
    originalPrice: watchBasicDetails.originalPrice,
    discountedPrice: watchBasicDetails.discountedPrice,
    totalPrice: watchBasicDetails.totalPrice,
    discountPercentage,
    // totalMember: watchBasicDetails.member.length,
  }

  return (
    <BookingContext.Provider value={values}>
      <FormProvider {...formInstance}>{children}</FormProvider>
    </BookingContext.Provider>
  )
}

export function useBookingContext() {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error(
      "useBookingContext must be used within a BookingContextProvider"
    )
  }
  return context
}
