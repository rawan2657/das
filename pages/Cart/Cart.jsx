import useCart from "../../hooks/useCart";
import CartItem from "../../components/cart/CartItem";
import CartSummary from "../../components/cart/CartSummary";
import EmptyCart from "../../components/cart/EmptyCart";
import CouponInput from "../../components/cart/CouponInput";
export default function Cart() {
  const { items, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <main className="mx-auto min-h-[60vh] max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <EmptyCart />
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-7xl bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">
            Shopping Cart
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Review your items before proceeding to checkout.
          </p>
        </div>

        <button
          type="button"
          onClick={clearCart}
          className="w-fit rounded-lg px-4 py-2 text-sm font-medium text-orange-600 transition-colors hover:bg-orange-50 hover:text-red-600"
        >
          Clear cart
        </button>
      </div>

      {/* Cart Content */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_350px] lg:gap-8">
        {/* Cart Items */}
        <section className="min-w-0">
          <ul className="space-y-4">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </ul>
          <CouponInput />
        </section>

        {/* Order Summary */}
        <aside className="w-full lg:sticky lg:top-6">
          <CartSummary />
        </aside>
      </div>
    </main>
  );
}