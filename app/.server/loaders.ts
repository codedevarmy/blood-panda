import { serverOnly$ } from "vite-env-only/macros"

import prisma from "./prisma"

function getUsersList() {
  return prisma.user.findMany()
}

export const getUsers = serverOnly$(getUsersList)

export const serverMessage = serverOnly$("i only exist on the server")
