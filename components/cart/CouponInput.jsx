import { useState } from "react";
import useCart from "../../hooks/useCart";

export default function CouponInput() {
  const { coupon, applyCoupon, removeCoupon } = useCart();
  const [code, setCode] = useState("");
  const [feedback, setFeedback] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!code.trim()) return;

    const result = applyCoupon(code);
    setFeedback(result);

    if (result.ok) setCode("");
  }

  if (coupon) {
    return (
      <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-green-200 bg-green-50 px-3 py-3 text-sm text-green-800">
        <span>
          Coupon <strong>{coupon.code}</strong> applied successfully
        </span>

        <button
          type="button"
          onClick={() => {
            removeCoupon();
            setFeedback(null);
          }}
          className="font-medium underline underline-offset-2 transition-colors hover:text-green-950"
        >
          Remove
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-5">
      <label
        htmlFor="coupon-code"
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        Coupon Code
      </label>

      <div className="flex gap-2">
        <input
          id="coupon-code"
          type="text"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setFeedback(null);
          }}
          placeholder="Enter coupon code"
          className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm uppercase outline-none transition-all placeholder:normal-case focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
        />

        <button
          type="submit"
          className="rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
        >
          Apply
        </button>
      </div>

      {feedback && !feedback.ok && (
        <p className="mt-2 text-sm text-red-500">{feedback.message}</p>
      )}
    </form>
  );
}