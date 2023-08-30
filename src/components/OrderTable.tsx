import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { Order, Product } from "../redux/orderSlice"
import { useMemo } from "react"
import { productStatus } from "../constants"

type Props = {
  order: Order
  handleOnClickEdit: (productId: string) => void
  handleOnClickApprove: (productId: string) => void
  handleOnClickCross: (productId: string) => void
}

export default function OrderTable({
  order,
  handleOnClickEdit,
  handleOnClickApprove,
  handleOnClickCross,
}: Props) {
  return (
    <table className="mt-4 w-full text-gray-500 sm:mt-6">
      <caption className="sr-only">Products</caption>
      <OrderTable.Header />
      <tbody className="divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t">
        {order.products.map((product) => (
          <OrderTable.ProductRow
            product={product}
            handleOnClickEdit={handleOnClickEdit}
            handleOnClickApprove={handleOnClickApprove}
            handleOnClickCross={handleOnClickCross}
          />
        ))}
      </tbody>
    </table>
  )
}

type ProductRowProps = {
  product: Product
  handleOnClickEdit: (productId: string) => void
  handleOnClickApprove: (productId: string) => void
  handleOnClickCross: (productId: string) => void
}

OrderTable.ProductRow = function ProductRow({
  product,
  handleOnClickEdit,
  handleOnClickApprove,
  handleOnClickCross,
}: ProductRowProps) {
  const status = useMemo(() => {
    const statusWithLabelAndHex = Object.values(productStatus).find(
      (op) => op.value === product.status,
    )
    return (
      <span
        className={`bg-[#f00] text-white w-min rounded-full px-2 py-2 text-xs`}
      >
        {statusWithLabelAndHex?.label}
      </span>
    )
  }, [product.status])

  return (
    <tr key={product.id}>
      {/* Product Name */}
      <td className="py-2 pr-8">
        <div className="flex items-center">
          <img
            src={product.imageSrc}
            alt={product.imageAlt}
            className="mr-6 h-16 w-16 rounded object-cover object-center"
          />
          <div>
            <div className="font-medium text-gray-900">{product.name}</div>
            <div className="mt-1 sm:hidden">{product.price}</div>
          </div>
        </div>
      </td>
      <td className="hidden py-2 pr-8 sm:table-cell">{product.brand}</td>
      <td className="hidden py-2 pr-8 sm:table-cell">{`${product.price} / ${product.packageSize}`}</td>
      <td className="hidden py-2 pr-8 sm:table-cell">
        {product.quantity}
        <span className="opacity-60">{` X ${product.packageSize}`}</span>
      </td>
      {/* Total */}
      <td className="">sss</td>
      <td className="hidden py-8 text-center sm:table-cell bg-slate-100">
        {status}
      </td>

      <td className="hidden  sm:table-cell bg-slate-100">
        <div className="flex w-full justify-between">
          <CheckIcon
            onClick={() => handleOnClickApprove(product.id)}
            className={`w-5 h-5 font-bold cursor-pointer ${
              // TODO: This can be passed as an prop value.
              [
                productStatus["APPROVED"].value,
                productStatus["Price-Updated"].value,
                productStatus.Other.value,
                productStatus["Quantity-Updated"].value,
                productStatus["Price-Quantity-Updated"].value,
              ].includes(product.status)
                ? "text-green-600"
                : "opacity-70"
            }`}
          />
          <XMarkIcon
            onClick={() => handleOnClickCross(product.id)}
            className={`w-5 h-5 cursor-pointer font-extrabold ${
              // TODO: This can be passed as an prop value.
              [
                productStatus["Missing-Urgent"].value,
                productStatus.Missing.value,
              ].includes(product.status)
                ? "text-red-600"
                : ""
            }`}
          />
          <span
            className="cursor-pointer"
            onClick={() => {
              handleOnClickEdit(product.id)
            }}
          >
            Edit
          </span>
        </div>
      </td>
    </tr>
  )
}

OrderTable.Header = function Header() {
  return (
    <thead className="sr-only text-left text-sm text-gray-500 sm:not-sr-only">
      <tr>
        <th scope="col" className="py-3 pr-8 font-normal sm:w-3/5 lg:w-1/4">
          Product
        </th>
        <th
          scope="col"
          className="hidden w-1/8 py-3 pr-8 font-normal sm:table-cell"
        >
          Brand
        </th>
        <th
          scope="col"
          className="hidden w-1/8 py-3 pr-8 font-normal sm:table-cell"
        >
          Price
        </th>
        <th
          scope="col"
          className="hidden w-1/8 py-3 pr-8 font-normal sm:table-cell"
        >
          Quantity
        </th>
        <th
          scope="col"
          className="hidden w-1/8 py-3 pr-8 font-normal sm:table-cell"
        >
          Total
        </th>
        <th
          scope="col"
          className="hidden py-3 pr-8 font-normal sm:table-cell lg:w-1/5"
        >
          Status
        </th>
        <th
          scope="col"
          className="hidden py-3 pr-8 font-normal sm:table-cell lg:w-1/7"
        ></th>
      </tr>
    </thead>
  )
}
