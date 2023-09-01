import { useMemo, useState } from "react"
import OrderStatus from "./OrderStatus"
import SearchBar from "./SearchBar"
import OrderTable from "./OrderTable"
import { Order, approveOrder, updateProductState } from "../redux/orderSlice"
import { ChevronRightIcon, PrinterIcon } from "@heroicons/react/24/outline"
import { useAppDispatch } from "../redux/hooks"
import { orderStatus, productStatus } from "../constants"
import BottomPrompt from "./BottomPrompt"
import EditProduct from "./EditProduct"
import OrderHeader from "./OrderHeader"
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

  const handleApproveOrder = () => {
    dispatch(approveOrder({ orderId: order.id }))
  }

  const orderDetailsForHeader = useMemo(() => {
    return {
      Supplier: order.supplier,
      "Shipping Date": new Date(order.shippingDate).toLocaleDateString(),
      Total: order.total,
      Category: "x å å  x",
      Department: order.department,
      "Order Status":
        order.status === orderStatus.Approved.value
          ? "Approved"
          : "Awaiting Approval",
    }
  }, [order])

  return (
    <>
      <div>
        <OrderHeader handleApproveOrder={handleApproveOrder} order={order} />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:pb-24 ">
          <OrderStatus orderDetailsToRender={orderDetailsForHeader} />

          <div className="mt-16">
            <div className="space-y-20">
              <div className="border bg-white p-4 px-8">
                <div className="flex justify-between w-full items-center ">
                  <SearchBar />
                  <span className="flex  space-x-4 text-green-800">
                    <button
                      disabled={order.status === orderStatus.Approved.value}
                      onClick={handleOnClickAddItem}
                      className="border-green-800 border-2 font-bold  px-4 py-2 rounded-full text-xs disabled:cursor-not-allowed"
                    >
                      Add Item
                    </button>
                    <PrinterIcon className="w-7 " />
                  </span>
                </div>

                <OrderTable
                  order={order}
                  allowEditing={order.status === orderStatus.Awaiting.value}
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
          productId={productToBeMarkedAsMissing}
          orderId={order.id}
          handleOnClickNo={handleMarkProductAsMissing}
          handleOnClickYes={handleMarkProductAsMissingAndUrgent}
          handleClose={() => setProductToBeMarkedAsMissing(null)}
        />
      )}
      {currentlyEditingProductId && (
        <EditProduct
          orderId={order.id}
          productId={currentlyEditingProductId}
          onClose={() => setCurrentlyEditingProductId(null)}
        />
      )}
    </>
  )
}
