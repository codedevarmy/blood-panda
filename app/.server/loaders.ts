import { serverOnly$ } from "vite-env-only/macros"

import prisma from "./prisma"

function getUsersList() {
  return prisma.user.findMany()
}

function getBookingsList() {
  return prisma.booking.findMany()
}

async function getTestsList() {
  return await prisma.bloodTest.findMany({
    select: {
      id: true,
      name: true,
      originalPrice: true,
      discountedPrice: true,
      discountAmount: true,
      primaryCategory: {
        select: {
          name: true,
        },
      },
      secondaryCategory: {
        select: {
          name: true,
        },
      },
      isFastingRequired: true,
    },
  })
}

function getBookingsListByUserId(userId: string) {
  return prisma.booking.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      // userId: true,
      members: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          gender: true,
          packages: {
            select: {
              id: true,
              name: true,
              originalPrice: true,
              discountedPrice: true,
            },
          },
          age: true,
        },
      },
      address: true,
      schedule: true,
    },
  })
}

export const getBookings = serverOnly$(getBookingsList)

export const getTests = serverOnly$(getTestsList)

export const getUsers = serverOnly$(getUsersList)

export const getBookingsByUserId = serverOnly$(getBookingsListByUserId)

export const serverMessage = serverOnly$("i only exist on the server")
