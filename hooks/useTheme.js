import Cookies from "js-cookie";
import { useCallback, useEffect, useRef, useState } from "react";

const COOKIE = "veroya-theme";
const DARK_META = "#0b0b0f";
const LIGHT_META = "#f8fafc";

const systemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const readTheme = () => {
  const saved = Cookies.get(COOKIE);
  if (saved === "dark" || saved === "light") return saved;
  return systemTheme();
};

const applyTheme = (theme, persist = true) => {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", theme === "dark" ? DARK_META : LIGHT_META);

  if (persist) Cookies.set(COOKIE, theme, { expires: 365, sameSite: "Lax" });
};

export default function useTheme() {
  const [theme, setTheme] = useState(readTheme);
  const userPicked = useRef(false);

  useEffect(() => {
    const root = document.documentElement;
    const persist = userPicked.current;

    if (!persist && root.classList.contains("dark") === (theme === "dark")) {
      applyTheme(theme, false);
      return;
    }

    if (document.startViewTransition && !document.hidden) {
      document.startViewTransition(() => applyTheme(theme, persist));
    } else {
      root.classList.add("no-theme-transition");
      applyTheme(theme, persist);
      requestAnimationFrame(() =>
        requestAnimationFrame(() =>
          root.classList.remove("no-theme-transition"),
        ),
      );
    }
  }, [theme]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (!Cookies.get(COOKIE)) setTheme(systemTheme());
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggleTheme = useCallback(() => {
    userPicked.current = true;
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  return { theme, isDark: theme === "dark", toggleTheme };
}
