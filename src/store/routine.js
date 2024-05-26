import axios from "axios"
import _unionBy from 'lodash/unionBy'
import { writable, get } from "svelte/store"

export const loading = writable(false)
export const routines = writable([])
export const newDtls = writable([{
  setNumber: 1,
  weight: null,
  targetCount: null
}])
export const initNewDtls = () => {
  newDtls.set([{
    setNumber: 1,
    weight: null,
    targetCount: null
  }])
}
export const addNewDtls = () => {
  const arr = get(newDtls)
  arr.push({
    setNumber: arr[arr.length-1].setNumber+1,
    weight: null,
    targetCount: null
  })
  newDtls.set(arr)
}
export const removeDtl = (i) => {
  if (i == 0 && i == get(newDtls).length-1) {
    initNewDtls()
  } else {
    const arr = get(newDtls)
    const removeTarget = arr[i]
    const newArr = arr.filter(a => a.setNumber != removeTarget.setNumber)
    let newSetNumber = 1
    newArr.map(a => a.setNumber = newSetNumber++)
    newDtls.set(newArr)
  }
}

export async function createWorkout(payload) {
  loading.set(true)
  try {
    const res = await axios.post('/.netlify/functions/addroutinedtl/index.html', {...payload})
    newDtls.set([{
      setNumber: 1,
      weight: null,
      targetCount: null
    }])
    return res
  } catch (msg) {
    // console.log(msg)
    return
  }
}

export async function getRoutine(payload) {
  loading.set(true)
  try {
    const res = await axios.post('/.netlify/functions/getRoutine/index.html', {...payload})
    routines.set(res.data.data)
  } catch (msg) {
    // console.log(msg)
    return
  }
  loading.set(false)
}

export async function delRoutine(payload) {
  loading.set(true)
  try {
    const res = await axios.post('/.netlify/functions/delroutinedtl/index.html', {...payload})
    return res
  } catch (msg) {
    // console.log(msg)
    return
  }
}

const d = new Date()
export const year = writable(d.getFullYear())
export const month = writable(d.getMonth()+1)
export const date = writable(d.getDate())
export const nextDate = () => {
    const d = new Date(get(year), get(month)-1, get(date)+1)
    year.set(d.getFullYear())
    month.set(d.getMonth()+1)
    date.set(d.getDate())
}
export const backDate = () => {
    const d = new Date(get(year), get(month)-1, get(date)-1)
    year.set(d.getFullYear())
    month.set(d.getMonth()+1)
    date.set(d.getDate())
}
export const getCalendarDate = () => {
  let y = get(year)
  let m = get(month)
  let d = get(date)
  m = `${m}`.padStart(2, '0')
  d = `${d}`.padStart(2, '0')
  return `${y}-${m}-${d}`
}
export const initCalendar = () => {
  const d = new Date()
  year.set(d.getFullYear())
  month.set(d.getMonth()+1)
  date.set(d.getDate())
}


export const editRoutineDtls = writable([])
export const addEditRoutineDtls = (payload) => {
  const arr = get(editRoutineDtls)
  arr.push(payload)
  editRoutineDtls.set(arr)
}
export const removeEditRoutineDtls = (i) => {
  const arr = get(editRoutineDtls)
  const target = arr[i]
  const newArr = arr.filter(a => a.setNumber != target.setNumber)
  let newSetNumber = 1
  newArr.map(a => a.setNumber = newSetNumber++)
  editRoutineDtls.set(newArr)
}
export async function updateWorkout(payload) {
  loading.set(true)
  try {
    const res = await axios.post('/.netlify/functions/updateroutine/index.html', {...payload})
    editRoutineDtls.set([])
    return res
  } catch (msg) {
    // console.log(msg)
    return
  }
}