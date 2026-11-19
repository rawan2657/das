import { motion, useReducedMotion } from "framer-motion";

const SIZES = {
  sm: {
    ring: "h-9 w-9",
    arc: 3,
    core: "h-2 w-2",
    dot: "h-1.5 w-1.5",
    label: "text-xs",
    gap: "gap-4",
    pad: "px-10 py-8",
  },
  md: {
    ring: "h-12 w-12",
    arc: 3,
    core: "h-2 w-2",
    dot: "h-2 w-2",
    label: "text-sm",
    gap: "gap-4",
    pad: "px-10 py-8",
  },
  lg: {
    ring: "h-16 w-16",
    arc: 4,
    core: "h-2.5 w-2.5",
    dot: "h-2.5 w-2.5",
    label: "text-base",
    gap: "gap-4",
    pad: "px-10 py-8",
  },
  zilla: {
    ring: "h-32 w-32 sm:h-44 sm:w-44",
    arc: 8,
    core: "h-5 w-5 sm:h-7 sm:w-7",
    dot: "h-3 w-3 sm:h-4 sm:w-4",
    label: "text-base sm:text-xl",
    gap: "gap-6 sm:gap-8",
    pad: "px-12 py-10 sm:px-20 sm:py-14",
  },
};

export default function Loader({
  label = "Loading",
  size = "md",
  overlay = false,
  className = "",
}) {
  const reduceMotion = useReducedMotion();
  const s = SIZES[size] ?? SIZES.md;

  const spinner = (
    <div className={`flex flex-col items-center justify-center ${s.gap}`}>
      <div className={`relative ${s.ring}`}>
        <span className="absolute inset-0 rounded-full border border-slate-300/60 dark:border-white/10" />
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0 62%, #f97316 82%, #fbbf24 100%)",
            WebkitMask: `radial-gradient(farthest-side, transparent calc(100% - ${s.arc}px), #000 calc(100% - ${s.arc}px))`,
            mask: `radial-gradient(farthest-side, transparent calc(100% - ${s.arc}px), #000 calc(100% - ${s.arc}px))`,
          }}
          animate={reduceMotion ? {} : { rotate: 360 }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
        />
        <span
          className={`absolute left-1/2 top-1/2 ${s.core} -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500 shadow-[0_0_14px_rgba(249,115,22,0.9)]`}
        />
      </div>

      <span className="flex items-center gap-1.5" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className={`${s.dot} rounded-full bg-orange-500`}
            animate={
              reduceMotion
                ? {}
                : {
                    y: [0, size === "zilla" ? -10 : -5, 0],
                    opacity: [0.4, 1, 0.4],
                  }
            }
            transition={{
              duration: 0.9,
              repeat: Infinity,
              delay: i * 0.12,
              ease: "easeInOut",
            }}
          />
        ))}
      </span>

      {label !== false && label != null && (
        <p
          className={`${s.label} font-bold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400`}
        >
          {label}
        </p>
      )}
    </div>
  );

  if (!overlay) {
    return (
      <motion.div
        role="status"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className={`flex w-full items-center justify-center ${className}`}
      >
        {spinner}
      </motion.div>
    );
  }

  return (
    <motion.div
      role="status"
      aria-label={typeof label === "string" ? label : "Loading"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden bg-white/40 p-4 backdrop-blur-md dark:bg-black/40"
    >
      <motion.div
        initial={reduceMotion ? false : { scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={`rounded-3xl border border-white/50 bg-white/75 ${s.pad} shadow-2xl shadow-black/10 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/75 dark:shadow-black/50`}
      >
        {spinner}
      </motion.div>
    </motion.div>
  );
}
