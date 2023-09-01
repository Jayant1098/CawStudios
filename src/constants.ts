export const productStatus = {
  APPROVED: { value: 0, label: "Approved", hex: "bg-green-600" },
  Missing: { value: 1, label: "Missing", hex: "bg-orange-600" },
  "Missing-Urgent": {
    value: 2,
    label: "Missing - Urgent",
    hex: "bg-red-600",
  },
  "Price-Updated": {
    value: 3,
    label: "Price is not the same",
    hex: "bg-green-600",
  },
  "Quantity-Updated": {
    value: 4,
    label: "Quantity Updated",
    hex: "bg-green-600",
  },
  "Price-Quantity-Updated": {
    value: 5,
    label: "Price & Quantity Updated",
    hex: "#0f0",
  },
  Other: { value: 5, label: "Other", hex: "bg-green-600" },
}

export const orderStatus = {
  Awaiting: { value: 0, label: "Awaiting your approval" },
  Approved: { value: 1, label: "Approved" },
}
