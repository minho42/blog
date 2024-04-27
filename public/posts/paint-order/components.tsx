export function TextWithPaintOrder({ text }) {
  const styles = {
    WebkitTextStrokeColor: "black",
    WebkitTextStrokeWidth: "3px",
    paintOrder: "stroke fill",
  }

  return (
    <div
      className="text-center text-6xl font-bold 
    text-amber-500"
      style={styles}
    >
      {text}
    </div>
  )
}
