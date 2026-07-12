export const canUseDOM = typeof window !== "undefined"

export const hasWebGL = !!window.WebGLRenderingContext

export const supportsVibrationAPI = "vibrate" in window.navigator
// server: undefined
// client: true | false

export const isBrowser = typeof window !== "undefined"

export const isNavigator = typeof navigator !== "undefined"

export const supportsLocalStorage =
  typeof window !== "undefined" && typeof window.localStorage !== "undefined"

export const supportsSessionStorage =
  typeof window !== "undefined" && typeof window.sessionStorage !== "undefined"
