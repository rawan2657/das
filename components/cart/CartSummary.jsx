import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";
import { formatPrice } from "../../utils/formatPrice";

const SHIPPING_FEE = 50;
const FREE_SHIPPING_FROM = 1000;

export default function CartSummary() {
  const { subtotal, totalItems } = useCart();

  const shipping =
    subtotal >= FREE_SHIPPING_FROM || subtotal === 0 ? 0 : SHIPPING_FEE;

  const total = subtotal + shipping;

  return (
    <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      {/* Title */}
      <h2 className="mb-5 text-xl font-bold text-slate-800">
        Order Summary
      </h2>

      {/* Prices */}
      <dl className="space-y-4 text-sm">
        <div className="flex items-center justify-between gap-3">
          <dt className="text-slate-500">Items ({totalItems})</dt>
          <dd className="font-medium text-slate-800">{formatPrice(subtotal)}</dd>
        </div>

        <div className="flex items-center justify-between gap-3">
          <dt className="text-slate-500">Shipping</dt>
          <dd className="font-medium text-slate-800">
            {shipping === 0 ? (
              <span className="font-semibold text-green-600">Free</span>
            ) : (
              formatPrice(shipping)
            )}
          </dd>
        </div>
      </dl>

      {/* Free Shipping Message */}
      {subtotal > 0 && subtotal < FREE_SHIPPING_FROM && (
        <div className="mt-4 rounded-xl bg-orange-50 p-3">
          <p className="text-xs leading-5 text-orange-700">
            Add{" "}
            <span className="font-bold">
              {formatPrice(FREE_SHIPPING_FROM - subtotal)}
            </span>{" "}
            more for free shipping.
          </p>
        </div>
      )}

      {/* Total */}
      <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-5">
        <span className="text-base font-semibold text-slate-700">Total</span>
        <span className="text-xl font-bold text-orange-600">
          {formatPrice(total)}
        </span>
      </div>

      {/* Checkout */}
      <Link
        to="/checkout"
        className="mt-6 block w-full rounded-xl bg-orange-500 py-3 text-center font-semibold text-white transition-colors hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
      >
        Proceed to Checkout
      </Link>

      {/* Secure Checkout Note */}
      <p className="mt-3 text-center text-xs text-slate-400">
        Secure checkout · Fast & easy payment
      </p>
    </aside>
  );
}