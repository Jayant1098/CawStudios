import axios from "axios"

export async function getOrders() {
  return axios.get("./orders.json")
}
