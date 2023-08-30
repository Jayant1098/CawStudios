import { useEffect } from "react"
import Navbar from "./components/Navbar"
import OrderDetails from "./components/OrderDetails"
import { useAppDispatch, useAppSelector } from "./redux/hooks"
import {
  fetchOrdersAsync,
  selectOrder,
  updateProductState,
} from "./redux/orderSlice"

function App() {
  const order = useAppSelector(selectOrder("1"))
  const dispatch = useAppDispatch()

  // Fetch Details
  useEffect(() => {
    dispatch(fetchOrdersAsync())
  }, [])

  if (!order) return <span>Loading Orders</span>

  return (
    <div className="App bg-gray-50">
      <Navbar cartItemsCount={12} />
      <OrderDetails order={order} />
    </div>
  )
}

export default App
