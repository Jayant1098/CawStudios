const stats = [
  { name: "Supplier", value: "405" },
  { name: "Shipping Date", value: "3.65", unit: "mins" },
  { name: "Total", value: "3" },
  { name: "Category", value: "98.5%" },
  { name: "Department", value: "98.5%" },
  { name: "Status", value: "98.5%" },
]

export default function OrderStatus() {
  return (
    <div className="border bg-white rounded-xl p-1">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 divide-x-[1px] py-4 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-6">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white px-4 py-2 sm:px-6 lg:px-8">
              <p className="text-sm font-medium leading-3 text-gray-400">
                {stat.name}
              </p>
              <p className="mt-2 flex items-baseline gap-x-2">
                <span className="text-xl font-semibold tracking-tight text-black">
                  {stat.value}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
