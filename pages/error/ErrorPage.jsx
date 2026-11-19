import Cookies from "js-cookie";
import { AlertTriangle, ArrowLeft, RotateCcw } from "lucide-react";
import { useNavigate, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  const handleBackToSafety = () => {
    const token = Cookies.get("token");
    navigate(token ? "/home" : "/login", { replace: true });
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#121211] px-4 text-[#F5F2EB]">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[#D96B27]/15 blur-[120px]" />

      <div className="relative z-10 w-full max-w-md rounded-2xl border border-[#2E2C29] bg-[#1A1A18]/90 p-8 text-center shadow-2xl backdrop-blur-md">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#D96B27]/30 bg-[#D96B27]/10 text-[#E07A2E] shadow-inner">
          <AlertTriangle className="h-8 w-8" />
        </div>

        {error?.status && (
          <span className="mb-2 inline-block rounded-full border border-[#D96B27]/30 bg-[#D96B27]/10 px-3 py-1 text-xs font-semibold tracking-wider text-[#E88D48] uppercase">
            Error {error.status}
          </span>
        )}

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#F5F2EB] sm:text-3xl">
          Oops! Something went wrong
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-[#A39E93]">
          {error?.statusText ||
            error?.message ||
            "An unexpected error occurred while loading this page."}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={handleBackToSafety}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#D96B27] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#D96B27]/20 transition-all hover:bg-[#E07A2E] active:scale-[0.98]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Store
          </button>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#33302B] bg-[#22211E] px-5 py-2.5 text-sm font-medium text-[#D6D1C7] transition-all hover:border-[#D96B27]/50 hover:text-white active:scale-[0.98]"
          >
            <RotateCcw className="h-4 w-4" />
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
