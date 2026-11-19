import useCart from "../../hooks/useCart";
import { formatPrice } from "../../utils/formatPrice";
import QuantitySelector from "./QuantitySelector";

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <li className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition-shadow hover:shadow-sm sm:flex-row sm:gap-5 sm:p-5">
      {/* Product Image */}
      <div className="flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-50 sm:h-32 sm:w-32">
        <img
          src={item.image}
          alt={item.name}
          className="h-28 w-full object-cover sm:h-32 sm:w-32"
        />
      </div>

      {/* Product Details */}
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-4">
        {/* Name & Price */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold leading-6 text-slate-800 sm:text-lg">
            {item.name}
          </h3>

          <p className="shrink-0 font-bold text-orange-600">
            {formatPrice(item.price * item.quantity)}
          </p>
        </div>

        {/* Unit Price */}
        <p className="text-sm text-slate-500">
          {formatPrice(item.price)} <span>per item</span>
        </p>

        {/* Quantity & Remove */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <QuantitySelector
            quantity={item.quantity}
            onChange={(q) => updateQuantity(item.id, q)}
          />

          <button
            type="button"
            onClick={() => removeFromCart(item.id)}
            className="text-sm font-medium text-slate-400 transition-colors hover:text-red-500"
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}