"use client";
import { useEffect, useState } from "react";

type CopyrightRangeProps = {
  launchYear?: string,
};

const CopyrightRange = ({
  launchYear,
}: CopyrightRangeProps) => {
  const [currentYear, setCurrentYear] = useState(launchYear || "20??");

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  if (!launchYear || launchYear === currentYear) {
    return currentYear;
  }
  return `${launchYear}-${currentYear}`;
};

export default CopyrightRange;
