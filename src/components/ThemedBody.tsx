"use client";
import { type ReactNode, useEffect, useState } from "react";
import ThemeContext, { type Theme } from "../contexts/theme";
import useLocalStorage from "../hooks/useLocalStorage";

type ThemedBodyProps = {
  children: ReactNode,
};

const ThemedBody = ({
  children,
}: ThemedBodyProps) => {
  const [deviceTheme, setDeviceTheme] = useState<Theme>("dark");
  const [theme, setTheme] = useLocalStorage<Theme>("theme");

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!window.matchMedia) return;

    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDeviceTheme(isDark ? "dark" : "light");

    const listener = (event: MediaQueryListEvent) => {
      setDeviceTheme(event.matches ? "dark" : "light");
    };
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", listener);
    return () => {
      window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", listener);
    };
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        selectedTheme: theme,
        actualTheme: theme ?? deviceTheme,
        setTheme,
      }}
    >
      <body data-bs-theme={theme ?? deviceTheme}>
        {children}
      </body>
    </ThemeContext.Provider>
  );
};

export default ThemedBody;
