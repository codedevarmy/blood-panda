import { auth } from "~/.server/auth.server"

export async function getUserFromSession(request: Request) {
  return auth.api.getSession({ headers: request.headers })
}
