"use client";
import { useContext } from "react";
import ThemeContext from "../contexts/theme";
import Select from "./form/Select";

type SelectThemeProps = {
  label: string,
  name: string,
  lightThemeName?: string,
  darkThemeName?: string,
  defaultThemeName?: string,
};

const SelectTheme = ({
  label,
  name,
  lightThemeName = "Light",
  darkThemeName = "Dark",
  defaultThemeName = "Device default",
}: SelectThemeProps) => {
  const { selectedTheme, setTheme } = useContext(ThemeContext);

  const getThemeName = (key: string) => {
    switch (key) {
      case "light": return lightThemeName;
      case "dark": return darkThemeName;
      default: return defaultThemeName;
    }
  };

  return (
    <Select
      label={label}
      name={name}
      options={[
        "",
        "light",
        "dark",
      ]}
      optionName={getThemeName}
      value={selectedTheme ?? ""}
      onChange={t => setTheme(t !== "" ? t : null)}
    />
  );
};

export default SelectTheme;
