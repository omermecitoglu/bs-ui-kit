"use client";
import { createContext } from "react";

export type Theme = "light" | "dark";

type ThemeContextData = {
  selectedTheme: Theme | null,
  actualTheme: Theme,
  setTheme: (theme: Theme | null) => void,
};

const ThemeContext = createContext<ThemeContextData>({
  selectedTheme: null,
  actualTheme: "dark",
  setTheme: () => null,
});

export default ThemeContext;
