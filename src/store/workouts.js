import axios from "axios"
import { writable, get } from "svelte/store"

export const workouts = writable([])
export const loading = writable(false)
export const theWorkout = writable({})
export const message = writable("Search for Workout!")

export const searchParams = writable({})

export function initWorkouts() {
  workouts.set([])
  message.set("Search for Workout!")
  loading.set(false)
  theWorkout.set({})
}

export async function searchWorkouts(payload) {
  if (get(loading)) return // 중복요청 막기
  loading.set(true)
  message.set('')
  try {
    const res = await axios.post('/.netlify/functions/workouts', {...payload})
    workouts.set(res.data)
    searchParams.set({...payload})
  } catch (msg) {
    workouts.set([])
    message.set(msg)
    loading.set(false)
    return
  }

  loading.set(false)
}

export async function moreWorkouts(payload) {
  if (get(loading)) return // 중복요청 막기
  loading.set(true)
  message.set('')
  try {
    const res = await axios.post('/.netlify/functions/workouts', {...payload})
    // workouts.set(res.data)
    const arr = [...get(workouts), ...res.data]
    workouts.set(arr)
    searchParams.set({...payload})
  } catch (msg) {
    workouts.set([])
    message.set(msg)
    loading.set(false)
    return
  }

  loading.set(false)
}

export const workoutList = writable([])