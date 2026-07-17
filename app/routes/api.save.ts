import prisma from "~/.server/prisma"
import { authContext } from "~/auth-context"
import { type MemberDetailsFormData } from "~/lib/validators/booking-schema"
import type { Route } from "./private/+types/booking"

export async function action({ request, context }: Route.ActionArgs) {
  const user = context.get(authContext)
  const payload = (await request.json()) as MemberDetailsFormData
  console.log("Received payload:", payload)

  /*

  how to handle this two scenario to make sure the data is always in array format
  1. when the data is sent as an object with numeric keys (e.g., { '0': {...}, '1': {...} })
  2. when the data is sent as an array (e.g., [{...}, {...}])


  →  Received payload: {
  basicDetails: {
    '0': {
      name: 'Idola Fisher',
      email: 'sufibicyf@gmail.com',
      phone: '9999911111',
      age: '55'
    }
  }
}

→  Received payload: {
  basicDetails: [
    {
      name: 'Idola Fisher',
      email: 'sufibicyf@gmail.com',
      phone: '9999911111',
      gender: 'male',
      age: '55',
      testItems: [Array]
    }
  ]
}
  */

  // const savingData = formData.basicDetails.map((member) => ({
  //   name: member.name,
  //   email: member.email,
  //   phone: member.phone,
  //   gender: member.gender,
  //   age: member.age,
  //   // packages: member.testItems.map((test) => ({
  //   //   id: test.id,
  //   //   name: test.testName,
  //   //   originalPrice: parseFloat(test.orgPrice),
  //   //   discountedPrice: parseFloat(test.disPrice),
  //   // })),
  // }))

  const savingData = Array.isArray(payload.memberDetails)
    ? payload.memberDetails
    : (Object.values(
        payload.memberDetails
      ) as MemberDetailsFormData["memberDetails"])

  console.log("Processed savingData:", savingData)

  const preparedForSave = savingData.map((member) => ({
    name: member.name,
    email: member.email,
    phone: member.phone,
    gender: member.gender,
    age: member.age,
    // packages: member.testItems.map((test) => ({
    //   id: test.id,
    //   name: test.testName,
    //   originalPrice: parseFloat(test.orgPrice),
    //   discountedPrice: parseFloat(test.disPrice),
    // })),
  }))

  try {
    const data = await prisma.booking.update({
      where: {
        id: "6a26ae35-6a2a-4bba-b271-84cdc9397029",
        userId: user.id,
      },
      data: {
        members: {
          create: [...preparedForSave],
        },
      },
      include: {
        members: true,
      },
    })
    return new Response(
      JSON.stringify({ message: "Data received and processed", savingData }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error processing data", error }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    )
  }
}
