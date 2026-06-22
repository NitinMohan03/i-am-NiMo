"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { MotionConfig } from "framer-motion";

type Theme = "dark" | "light";
type Ctx = { theme: Theme; toggle: () => void };

const ThemeContext = createContext<Ctx>({ theme: "dark", toggle: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  // Read stored preference on mount (dark is the default).
  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
    }
  }, []);

  // Reflect theme onto <html> + persist.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("light", theme === "light");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = useCallback(
    () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    []
  );

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
