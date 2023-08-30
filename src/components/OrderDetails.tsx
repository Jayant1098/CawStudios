import { useState } from "react"
import OrderStatus from "./OrderStatus"
import SearchBar from "./SearchBar"
import OrderTable from "./OrderTable"
import { Order, updateProductState } from "../redux/orderSlice"
import { PrinterIcon } from "@heroicons/react/24/outline"
import { useAppDispatch } from "../redux/hooks"
import { productStatus } from "../constants"
import BottomPrompt from "./BottomPrompt"
// import EditProduct from "./components/EditProduct"

export default function OrderDetails({ order }: { order: Order }) {
  const [currentlyEditingProductId, setCurrentlyEditingProductId] = useState<
    null | string
  >(null)
  const [productToBeMarkedAsMissing, setProductToBeMarkedAsMissing] = useState<
    null | string
  >(null)
  const dispatch = useAppDispatch()

  const handleUpdateProductState = ({
    productId,
    productStatus,
  }: {
    productId: string
    productStatus: number
  }) => {
    dispatch(
      updateProductState({
        orderId: order.id,
        productId,
        productStatus,
      }),
    )
  }

  const handleOnClickEdit = (productId: string) => {
    setCurrentlyEditingProductId(productId)
  }
  const handleOnClickApprove = (productId: string) => {
    handleUpdateProductState({
      productId,
      productStatus: productStatus.APPROVED.value,
    })
  }
  const handleOnClickCross = (productId: string) => {
    setProductToBeMarkedAsMissing(productId)
  }
  const handleOnClickAddItem = () => {}
  const handleMarkProductAsMissingAndUrgent = () => {
    if (productToBeMarkedAsMissing) {
      handleUpdateProductState({
        productId: productToBeMarkedAsMissing,
        productStatus: productStatus["Missing-Urgent"].value,
      })
      setProductToBeMarkedAsMissing(null)
    }
  }
  const handleMarkProductAsMissing = () => {
    if (productToBeMarkedAsMissing) {
      handleUpdateProductState({
        productId: productToBeMarkedAsMissing,
        productStatus: productStatus.Missing.value,
      })
      setProductToBeMarkedAsMissing(null)
    }
  }

  return (
    <>
      <div>
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:pb-24 ">
          <div className="max-w-xl">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Order history
            </h1>
          </div>
          <OrderStatus />

          <div className="mt-16">
            <div className="space-y-20">
              <div className="border bg-white p-4 px-8">
                <div className="flex justify-between w-full items-center ">
                  <SearchBar />
                  <span className="flex  space-x-4 text-green-800">
                    <button
                      onClick={handleOnClickAddItem}
                      className="border-green-800 border-2 font-bold  px-4 py-2 rounded-full text-xs"
                    >
                      Add Item
                    </button>
                    <PrinterIcon className="w-7 " />
                  </span>
                </div>

                <OrderTable
                  order={order}
                  handleOnClickEdit={handleOnClickEdit}
                  handleOnClickApprove={handleOnClickApprove}
                  handleOnClickCross={handleOnClickCross}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {productToBeMarkedAsMissing && (
        <BottomPrompt
          handleOnClickNo={handleMarkProductAsMissing}
          handleOnClickYes={handleMarkProductAsMissingAndUrgent}
          handleClose={() => setProductToBeMarkedAsMissing(null)}
        />
      )}
      {/* {currentlyEditingProductId && (
        <EditProduct
          onClose={() => setCurrentlyEditingProductId(null)}
          productId={currentlyEditingProductId}
          orderId={"1"}
        />
      )} */}
    </>
  )
}
