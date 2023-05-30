import axios from '@/util/axios.js'

export function login(username, password) {
  return axios.post("/admin/login", {
    username,
    password
  })
}

export function getInfo() {
  return axios.post("/admin/getinfo")
}