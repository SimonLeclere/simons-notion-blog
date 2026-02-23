export default function CatSeparator({ className }: { className?: string }) {
  return (
    <div className={`cat-separator ${className || ''}`}>
      <div className="cat-separator__line" />
      <div className="cat-separator__cat" />
    </div>
  )
}
