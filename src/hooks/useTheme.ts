"use client";
import { useContext } from "react";
import ThemeContext from "../contexts/theme";

export default function useTheme() {
  const { actualTheme } = useContext(ThemeContext);
  return actualTheme;
}
