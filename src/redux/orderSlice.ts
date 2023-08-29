import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "./store"
import { getOrders } from "../api/orders"

export interface OrderState {
  value: Order[]
  status: "idle" | "loading" | "failed"
}

const initialState: OrderState = {
  value: [],
  status: "idle",
}

export interface Order {
  id: string
  number: string
  date: string
  datetime: Date
  invoiceHref: string
  total: string
  products: Product[]
}

export interface Product {
  id: string
  brand: string
  name: string
  href: string
  price: string
  quantity: number
  status: string
  imageSrc: string
  imageAlt: string
  packageSize: string
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchOrdersAsync = createAsyncThunk(
  "orders/fetchOrders",
  async () => {
    const response = await getOrders()
    // The value we return becomes the `fulfilled` action payload
    return response.data
  },
)

export const orderSlice = createSlice({
  name: "order",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    clear: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = []
    },
    updateProductState(
      state,
      action: PayloadAction<{
        orderId: string
        productId: string
        productStatus: string
      }>,
    ) {
      const updatedState = state.value.map((order) => {
        if (order.id === action.payload.orderId) {
          let updatedProducts = order.products.map((product) => {
            if (product.id === action.payload.productId) {
              // TODO: Add Product Status Map
              return { ...product, status: action.payload.productStatus }
            }
            return product
          })
          order.products = updatedProducts
          return order
        }
        return order
      })
      state.value = updatedState
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.value = action.payload
      })
      .addCase(fetchOrdersAsync.rejected, (state) => {
        state.status = "failed"
      })
  },
})

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectOrders = (state: RootState) => state.orders.value

export const selectOrder = (orderId: string) => (state: RootState) =>
  state.orders.value.find((order) => order.id === orderId)

export const selectProductFromOrder =
  (orderId: string, productId: string) => (state: RootState) =>
    state.orders.value
      .find((order) => order.id === orderId)
      ?.products?.find((p) => p.id === productId)

export const { updateProductState } = orderSlice.actions

export default orderSlice.reducer