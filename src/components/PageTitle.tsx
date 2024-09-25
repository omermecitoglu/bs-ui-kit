import type { ReactNode } from "react";

type PageTitleProps = {
  name: string,
  secondary?: boolean,
  children?: ReactNode,
};

/**
 * @deprecated use PageSection instead
 */
const PageTitle = ({
  name,
  secondary = false,
  children,
}: PageTitleProps) => (
  <>
    <div className="d-flex justify-content-between align-items-center">
      {!secondary ? (
        <h1 className="fs-2 m-0">{name}</h1>
      ) : (
        <h2 className="m-0">{name}</h2>
      )}
      <div className="d-flex gap-3 text-nowrap">
        {children}
      </div>
    </div>
    <hr className="mt-2 mb-3" />
  </>
);

export default PageTitle;
