export default function QuantitySelector({ quantity, onChange }) {
  return (
    <div className="inline-flex items-center overflow-hidden rounded-lg border border-slate-200 bg-white">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(quantity - 1)}
        disabled={quantity <= 1}
        className="flex h-9 w-9 items-center justify-center text-lg text-slate-600 transition-colors hover:bg-orange-50 hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-30"
      >
        −
      </button>

      <span className="flex h-9 w-10 items-center justify-center border-x border-slate-200 text-sm font-semibold text-slate-800">
        {quantity}
      </span>

      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(quantity + 1)}
        className="flex h-9 w-9 items-center justify-center text-lg text-slate-600 transition-colors hover:bg-orange-50 hover:text-orange-600"
      >
        +
      </button>
    </div>
  );
}