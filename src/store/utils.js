import { writable, get } from "svelte/store"

export const autoCompString = writable('')
export const getAutoCompString = () => {
  return get(autoCompString)
}
export const autoCompBookmark = writable([])

export const loading = writable(false)