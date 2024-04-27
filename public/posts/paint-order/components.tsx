export function TextWithPaintOrder({ text }) {
  const styles = {
    WebkitTextStrokeColor: "black",
    WebkitTextStrokeWidth: "2px",
    paintOrder: "stroke fill",
    textShadow: "1px 2px black",
  }

  return (
    <div
      className="text-center text-6xl font-bold 
    text-amber-500 drop-shadow-md"
      style={styles}
    >
      {text}
    </div>
  )
}
