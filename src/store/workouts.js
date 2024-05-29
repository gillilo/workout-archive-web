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
    // const res = await axios.post('/.netlify/functions/workouts', {...payload})
    // workouts.set(res.data);
    const { name, type, muscle, difficulty, offset } = payload
    // const res = await axios.get(`${process.env.REQUEST_URL}/workout/ls?n=${name}&t=${type}&m=${muscle}&d=${difficulty}&o=${offset}&l=10`)
    const res = await axios.get(`https://woa.rlaghlwns.com/workout/ls?n=${name}&t=${type}&m=${muscle}&d=${difficulty}&o=${offset}&l=10`)
    workouts.set(res.data.data);
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
    // const res = await axios.post('/.netlify/functions/workouts', {...payload})
    // workouts.set(res.data)
    // const arr = [...get(workouts), ...res.data]
    const { name, type, muscle, difficulty, offset } = payload
    // const res = await axios.get(`${process.env.REQUEST_URL}/workout/ls?n=${name}&t=${type}&m=${muscle}&d=${difficulty}&o=${offset}&l=10`)
    const res = await axios.get(`https://woa.rlaghlwns.com/workout/ls?n=${name}&t=${type}&m=${muscle}&d=${difficulty}&o=${offset}&l=10`)
    const arr = [...get(workouts), ...res.data.data]
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