import { createContext } from "react";

export type Theme = "light" | "dark";

type ThemeContextData = {
  theme: Theme | null,
  setTheme: (theme: Theme | null) => void,
};

const ThemeContext = createContext<ThemeContextData>({
  theme: "dark",
  setTheme: () => null,
});

export default ThemeContext;
