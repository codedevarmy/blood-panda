import { createContext } from "react-router"
import type { SelectUser } from "./types/db-types"

export const authContext = createContext<SelectUser>()
