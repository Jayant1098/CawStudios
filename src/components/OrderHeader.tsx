import { ChevronRightIcon } from "@heroicons/react/24/outline"
import React from "react"
import { Order } from "../redux/orderSlice"
import { orderStatus } from "../constants"

function OrderHeader({
  handleApproveOrder,
  order,
}: {
  handleApproveOrder: () => void
  order: Order
}) {
  const isOrderApproved = order.status === orderStatus.Approved.value
  return (
    <div className="flex flex-col space-y-4 py-3 shadow-xl h-24 bg-white w-full px-36">
      <div className="w-full flex space-x-1 items-center text-gray-400 font-bold text-sm">
        <p className="">Orders</p>
        <ChevronRightIcon className="w-3" />
        <p className="underline">{`Order ${order.id}`}</p>
      </div>
      <div className="flex w-full justify-between">
        <p className="text-3xl font-bold">{`Order ${order.id}`}</p>
        <div className="space-x-3">
          <button
            onClick={() => {}}
            className="border-green-800 cursor-not-allowed border-2 font-bold  px-4 py-2 rounded-full text-xs"
          >
            Back
          </button>
          <button
            disabled={isOrderApproved}
            onClick={handleApproveOrder}
            className={`bg-green-800 text-white border-2 font-bold  px-4 py-2 rounded-full text-xs disabled:opacity-40 ${
              isOrderApproved && "cursor-not-allowed"
            }`}
          >
            {!isOrderApproved ? "Approve" : "Approved"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrderHeader
