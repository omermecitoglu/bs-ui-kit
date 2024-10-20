import type { ReactNode } from "react";

type ResponsiveBoxProps = {
  height?: number,
  children: ReactNode,
};

const ResponsiveBox = ({
  height = 100,
  children,
}: ResponsiveBoxProps) => (
  <div
    className="w-100 position-relative"
    style={{ height: 0, paddingBottom: `${height}%` }}
  >
    <div className="position-absolute w-100 h-100">
      {children}
    </div>
  </div>
);

export default ResponsiveBox;
