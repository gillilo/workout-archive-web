import axios from "axios"
import _unionBy from 'lodash/unionBy'
import { writable, get } from "svelte/store"

export const user = writable(null)
export const userForm = writable(null)
export async function login(payload) {
  try {
    const res = await axios.post('/.netlify/functions/login/index.html', {...payload})
    if (res.data.result) {
      user.set(res.data.data)
      userForm.set(res.data.data)
      window.localStorage.setItem("user", JSON.stringify(get(user)))
    } else {
      user.set(null)
    }
    return res.data
  } catch (msg) {
    console.log(msg)
    user.set(null)
    return
  }
}

export function logout() {
  user.set(null)
}

export async function signup(payload) {
  try {
    const res = await axios.post('/.netlify/functions/signup/index.html', {...payload})
    return res
  } catch (msg) {
    // console.log(msg)
    return
  }
}

export async function update(payload) {
  try {
    const res = await axios.post('/.netlify/functions/profileupdate/index.html', {...payload})
    return res
  } catch (msg) {
    // console.log(msg)
    return
  }
}