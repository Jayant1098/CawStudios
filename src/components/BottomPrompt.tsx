import { XMarkIcon } from "@heroicons/react/24/outline"

export default function BottomPrompt({
  handleOnClickYes,
  handleOnClickNo,
  handleClose,
}) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 px-6 pb-6">
      <div className="pointer-events-auto mx-auto max-w-xl rounded-xl bg-white p-6 shadow-lg ring-1 ring-gray-900/10">
        <div className="flex justify-between">
          <p className="font-bold">Missing Item</p>
          <span className="cursor-pointer">
            <XMarkIcon onClick={handleClose} className="w-5" />
          </span>
        </div>
        <p className="text-sm leading-6 text-gray-900">Is Chicken urgent?</p>
        <div className="mt-4 flex items-center  justify-end gap-x-5">
          <button
            onClick={handleOnClickNo}
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            No
          </button>

          <button
            onClick={handleOnClickYes}
            type="button"
            className="rounded-md px-3 py-2 text-sm font-semibold text-black hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  )
}
