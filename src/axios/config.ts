import axios from "axios"
import { parseCookies } from 'nookies'

const { 'screen-token': token } = parseCookies()

export const userFetch = axios.create({
    baseURL: "http://localhost:8080/",
    headers: {
        'Content-Type': 'application/json', 
      },
})

if (token) {
  userFetch.defaults.headers["Authorization"] = `Bearer ${token}`
}