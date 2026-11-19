import { Loader2, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchProductsQuery } from "../../../redux/features/products/productsApiSlice";

const MIN_CHARS = 2;
const DEBOUNCE_MS = 350;
const MAX_RESULTS = 6;

const listOf = (res) => {
  const list =
    res?.data?.products ??
    res?.products ??
    res?.data?.items ??
    res?.items ??
    res?.data?.results ??
    res?.results ??
    res?.data ??
    res;
  return Array.isArray(list) ? list : [];
};

const idOf = (p) => p?._id ?? p?.id;
const nameOf = (p) => p?.name ?? p?.title ?? "Product";
const imageOf = (p) => {
  const img =
    p?.images?.[0] ?? p?.image ?? p?.imageCover ?? p?.thumbnail ?? p?.photo;
  return typeof img === "string" ? img : (img?.url ?? img?.secure_url ?? null);
};
const priceOf = (p) => p?.priceAfterDiscount ?? p?.price;

export default function SearchBox({
  className = "",
  autoFocus = false,
  onDone,
}) {
  const navigate = useNavigate();
  const wrapRef = useRef(null);
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(query.trim()), DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [query]);

  const enabled = debounced.length >= MIN_CHARS;

  const params = useMemo(
    () => ({
      q: debounced,
      search: debounced,
      keyword: debounced,
      name: debounced,
      limit: MAX_RESULTS,
    }),
    [debounced],
  );

  const { data, isFetching, isError } = useSearchProductsQuery(params, {
    skip: !enabled,
  });

  const results = useMemo(
    () => (enabled ? listOf(data).slice(0, MAX_RESULTS) : []),
    [data, enabled],
  );
  const waiting =
    query.trim().length >= MIN_CHARS && debounced !== query.trim();
  const showPanel = open && query.trim().length >= MIN_CHARS;

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  useEffect(() => {
    const onPointer = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target))
        setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, []);

  const finish = () => {
    setOpen(false);
    setActive(-1);
    onDone?.();
  };

  const goToProduct = (p) => {
    const id = idOf(p);
    finish();
    if (id) navigate(`/products/${id}`);
  };

  const seeAll = () => {
    const q = query.trim();
    finish();
    navigate(q ? `/shop?search=${encodeURIComponent(q)}` : "/shop");
  };

  const submit = (e) => {
    e.preventDefault();
    if (active >= 0 && results[active]) return goToProduct(results[active]);
    seeAll();
  };

  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      setOpen(false);
    } else if (e.key === "ArrowDown" && results.length) {
      e.preventDefault();
      setOpen(true);
      setActive((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp" && results.length) {
      e.preventDefault();
      setActive((i) => (i <= 0 ? results.length - 1 : i - 1));
    }
  };

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <form
        role="search"
        onSubmit={submit}
        className="flex h-10 items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 pl-3.5 pr-1.5 shadow-sm backdrop-blur-md transition focus-within:border-orange-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-orange-500/30 dark:border-white/10 dark:bg-white/5 dark:focus-within:bg-white/10"
      >
        <button
          type="submit"
          aria-label="Search"
          className="grid shrink-0 place-items-center text-slate-500 transition hover:text-orange-500 dark:text-slate-300"
        >
          {isFetching || waiting ? (
            <Loader2 size={16} className="animate-spin text-orange-500" />
          ) : (
            <Search size={16} />
          )}
        </button>
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActive(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder="Search products"
          aria-label="Search products"
          autoComplete="off"
          enterKeyHint="search"
          className="min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-500 dark:text-white dark:placeholder:text-slate-400"
        />
        {query && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => {
              setQuery("");
              setDebounced("");
              inputRef.current?.focus();
            }}
            className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-slate-400 transition hover:bg-slate-200/70 hover:text-slate-700 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <X size={14} />
          </button>
        )}
      </form>

      {showPanel && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 min-w-[18rem] overflow-hidden rounded-2xl border border-orange-500 bg-white/95 shadow-xl shadow-black/10 backdrop-blur-xl dark:border-orange-400 dark:bg-black md:left-auto md:w-80">
          {isError ? (
            <p className="px-4 py-3 text-sm text-red-500">
              Couldn't reach the store. Try again.
            </p>
          ) : isFetching || waiting ? (
            <p className="px-4 py-3 text-sm text-orange-500 dark:text-orange-400">
              Searching…
            </p>
          ) : results.length === 0 ? (
            <p className="px-4 py-3 text-sm text-orange-500 dark:text-orange-400">
              No products found for “{query.trim()}”
            </p>
          ) : (
            <ul>
              {results.map((p, i) => {
                const img = imageOf(p);
                const price = priceOf(p);
                return (
                  <li key={idOf(p) ?? i}>
                    <button
                      type="button"
                      onMouseEnter={() => setActive(i)}
                      onClick={() => goToProduct(p)}
                      className={`flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors ${
                        i === active
                          ? "bg-orange-500/10"
                          : "hover:bg-slate-100 dark:hover:bg-white/5"
                      }`}
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-lg bg-slate-100 dark:bg-white/10">
                        {img ? (
                          <img
                            src={img}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <Search size={14} className="text-slate-400" />
                        )}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-slate-900 dark:text-white">
                          {nameOf(p)}
                        </span>
                        {price != null && (
                          <span className="block text-xs font-bold text-orange-500">
                            {price} EGP
                          </span>
                        )}
                      </span>
                    </button>
                  </li>
                );
              })}
              <li className="border-t border-slate-200/70 dark:border-white/10">
                <button
                  type="button"
                  onClick={seeAll}
                  className="w-full px-4 py-2.5 text-left text-xs font-bold text-orange-600 transition hover:bg-orange-500/10 dark:text-orange-400"
                >
                  See all results for “{query.trim()}”
                </button>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
