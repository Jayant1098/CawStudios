export default function OrderStatus({ orderDetailsToRender }) {
  return (
    <div className="border bg-white rounded-xl p-1">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 divide-x-[1px] py-4 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-6">
          {Object.keys(orderDetailsToRender).map((key) => (
            <div key={key} className="bg-white px-4 py-2 sm:px-6 lg:px-8">
              <p className="text-sm font-medium leading-3 text-gray-400">
                {key}
              </p>
              <p className="mt-2 flex items-baseline gap-x-2">
                <span className="text-xl font-semibold tracking-tight text-black">
                  {orderDetailsToRender[key]}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
