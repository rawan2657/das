import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "./Loader";

const SILENT_ENDPOINTS = ["getMyCart", "getMyWishlist", "searchProducts"];
const DELAY_MS = 200;
const MIN_VISIBLE_MS = 500;

export default function GlobalLoader() {
  const isFetching = useSelector((state) => {
    const queries = Object.values(state.api?.queries || {});
    const mutations = Object.values(state.api?.mutations || {});
    return (
      queries.some(
        (q) =>
          q?.status === "pending" && !SILENT_ENDPOINTS.includes(q.endpointName),
      ) || mutations.some((m) => m?.status === "pending")
    );
  });

  const [show, setShow] = useState(false);
  const shownAtRef = useRef(0);

  useEffect(() => {
    if (!show) return;
    const html = document.documentElement;
    const gap = window.innerWidth - html.clientWidth;
    const prevOverflow = html.style.overflow;
    const prevPadding = html.style.paddingRight;
    html.style.overflow = "hidden";
    if (gap > 0) html.style.paddingRight = `${gap}px`;
    return () => {
      html.style.overflow = prevOverflow;
      html.style.paddingRight = prevPadding;
    };
  }, [show]);

  useEffect(() => {
    if (!isFetching) {
      const heldFor = Date.now() - shownAtRef.current;
      if (shownAtRef.current && heldFor < MIN_VISIBLE_MS) {
        const t = setTimeout(() => {
          setShow(false);
          shownAtRef.current = 0;
        }, MIN_VISIBLE_MS - heldFor);
        return () => clearTimeout(t);
      }
      setShow(false);
      shownAtRef.current = 0;
      return;
    }
    const t = setTimeout(() => {
      shownAtRef.current = Date.now();
      setShow(true);
    }, DELAY_MS);
    return () => clearTimeout(t);
  }, [isFetching]);

  return (
    <AnimatePresence>
      {show && (
        <Loader key="global-loader" label="VEROYA STORE" overlay={true} />
      )}
    </AnimatePresence>
  );
}