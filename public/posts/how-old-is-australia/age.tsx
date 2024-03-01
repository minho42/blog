export function Age() {
  // result is static output from build time, not dynamic from client side

  const currentYear = new Date().getFullYear()
  const age = currentYear - 1901
  return (
    <div>
      Australia is <span className="px-0.5 font-semibold bg-amber-200 rounded">{age}</span> years old in{" "}
      {currentYear}
    </div>
  )
}
