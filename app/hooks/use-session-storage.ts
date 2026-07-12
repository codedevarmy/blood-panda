import { useEffect, useState } from "react"
import { isBrowser } from "~/.client/browser-features"

const useSessionStorage = <T>(
  key: string,
  initialValue?: T,
  raw?: boolean
): [T, (value: T) => void] => {
  const [state, setState] = useState<T>(() => {
    if (!isBrowser) {
      return initialValue as T
    }

    try {
      const sessionStorageValue = sessionStorage.getItem(key)
      if (typeof sessionStorageValue !== "string") {
        let serializedInitialValue: string

        if (raw) {
          serializedInitialValue = String(initialValue)
        } else {
          serializedInitialValue = JSON.stringify(initialValue)
        }

        sessionStorage.setItem(key, serializedInitialValue)
        return initialValue
      } else {
        if (raw) {
          return sessionStorageValue
        }

        let parsedSessionStorageValue = sessionStorageValue

        if (parsedSessionStorageValue === "") {
          parsedSessionStorageValue = "null"
        }

        return JSON.parse(parsedSessionStorageValue)
      }
    } catch {
      // If user is in private mode or has storage restriction
      // sessionStorage can throw. JSON.parse and JSON.stringify
      // can throw, too.
      return initialValue
    }
  })

  useEffect(() => {
    if (!isBrowser) {
      return
    }

    try {
      let serializedState: string

      if (raw) {
        serializedState = String(state)
      } else {
        serializedState = JSON.stringify(state)
      }

      sessionStorage.setItem(key, serializedState)
    } catch {
      // If user is in private mode or has storage restriction
      // sessionStorage can throw. Also JSON.stringify can throw.
    }
  }, [key, state, raw])

  return [state, setState]
}

export default useSessionStorage
