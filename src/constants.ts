export const productStatus = {
  APPROVED: { value: 0, label: "Approved", hex: "#00ff00" },
  Missing: { value: 1, label: "Missing", hex: "#f20" },
  "Missing-Urgent": { value: 2, label: "Missing - Urgent", hex: "#f00" },
  "Price-Updated": { value: 3, label: "Price is not the same", hex: "#0f0" },
  "Quantity-Updated": { value: 2, label: "Quantity Updated", hex: "#0f0" },
  "Price-Quantity-Updated": {
    value: 2,
    label: "Price & Quantity Updated",
    hex: "#0f0",
  },
  Other: { value: 5, label: "Other", hex: "#0f0" },
}
