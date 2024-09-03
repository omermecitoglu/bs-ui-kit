"use client";
import { type ReactNode, useEffect, useState } from "react";
import ThemeContext, { type Theme } from "../contexts/theme";

type ThemedBodyProps = {
  children: ReactNode,
};

const ThemedBody = ({
  children,
}: ThemedBodyProps) => {
  const [deviceTheme, setDeviceTheme] = useState<Theme>("dark");
  const [theme, setTheme] = useState<Theme | null>(null);

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

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    if (!localTheme) return;
    setTheme(localTheme as Theme);
  }, []);

  const updateTheme = (t: Theme | null) => {
    if (t) {
      localStorage.setItem("theme", t);
    } else {
      localStorage.removeItem("theme");
    }
    setTheme(t);
  };

  return (
    <ThemeContext.Provider
      value={{
        selectedTheme: theme,
        actualTheme: theme ?? deviceTheme,
        setTheme: updateTheme,
      }}
    >
      <body data-bs-theme={theme ?? deviceTheme}>
        {children}
      </body>
    </ThemeContext.Provider>
  );
};

export default ThemedBody;
