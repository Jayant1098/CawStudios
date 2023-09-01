import { Fragment, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { useAppSelector } from "../redux/hooks"
import { selectProductFromOrder } from "../redux/orderSlice"
import { productStatus } from "../constants"

export default function EditProduct({ productId, orderId, onClose }) {
  const productFromStore = useAppSelector(
    selectProductFromOrder(orderId, productId),
  )

  // For performance, instead of using state, we can directly use refs to get values once the form submits.
  const [formData, setFormData] = useState({
    price: productFromStore?.price,
    reason: productFromStore?.status,
    quantity: productFromStore?.quantity,
  })

  if (!productFromStore) return null

  const handleUpdateProductDetails = () => {
    // TODO: This logic can be optimised to update all values at once
    if (formData.price) {
    }
  }

  console.log(formData)
  const handleChangePrice = (e) =>
    setFormData((prevData) => ({
      ...prevData,
      price: e.target.valueAsNumber,
    }))
  const handleChangeReason = (e) =>
    setFormData((prevData) => ({ ...prevData, reason: e.target.value }))
  const handleChangeQuantity = (e) =>
    setFormData((prevData) => ({
      ...prevData,
      quantity: e.target.valueAsNumber,
    }))

  const { name, price, quantity, imageSrc, imageAlt } = productFromStore

  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <Dialog.Panel className="w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl rounded-md">
                <div className="relative w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <h2 className="text-2xl font-bold text-gray-900 sm:pr-12 mb-5">
                    {name}
                  </h2>

                  <button
                    type="button"
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <div className="grid w-full grid-cols-12 gap-x-8">
                    <div className="sm:col-span-2 lg:col-span-2">
                      <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100">
                        <img
                          src={imageSrc}
                          alt={imageAlt}
                          className="object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-8 lg:col-span-5">
                      <section className="flex flex-col space-y-5">
                        <span className="font-medium">Price ($)</span>
                        <span className="font-medium">Quantity</span>
                        <span className="font-medium">Total</span>
                      </section>
                    </div>

                    {/* Input Forms */}
                    <div className="col-span-5">
                      <section className="flex flex-col space-y-5">
                        <input
                          type="number"
                          value={formData.price}
                          placeholder={price}
                          onChange={handleChangePrice}
                        />
                        <input
                          type="number"
                          value={formData.quantity}
                          // @ts-ignore
                          placeholder={quantity}
                          onChange={handleChangeQuantity}
                        />
                        <span className="font-medium">
                          {/* Choose whatever is filled in the form. */}
                          {/*  @ts-ignore */}
                          {(formData.price || price) *
                            (formData.quantity || quantity)}
                        </span>
                      </section>
                    </div>
                    <div className="col-span-12 mt-7">
                      <span className="font-bold">
                        Choose reason
                        <span className="font-normal text-gray-600">
                          (Optional)
                        </span>
                      </span>

                      <div className="flex space-x-5 mt-4">
                        {[
                          productStatus.Missing,
                          productStatus.Other,
                          productStatus["Quantity-Updated"],
                          productStatus["Price-Updated"],
                        ].map((reason) => (
                          <span className="cursor-pointer inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                            {reason.label}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex col-span-12 ali">
                      <button onClick={onClose} className="text-green-800 px-4">
                        Cancel
                      </button>
                      <button className="text-green-800 rounded-full px-4">
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
