import type { ReactNode } from "react";

export type LinkProps = {
  href: string,
  prefetch?: boolean,
  scroll?: boolean,
  className?: string,
  children: ReactNode,
};
