import type { LinkProps } from "../../types/link";
import type { ReactNode } from "react";

type BrandProps = {
  name: string,
  logo: ReactNode,
  link: (props: LinkProps) => ReactNode,
  href?: string,
};

const Brand = ({
  name,
  logo,
  link: Link,
  href = "/",
}: BrandProps) => (
  <Link href={href} className="navbar-brand d-flex align-items-center m-0 p-0">
    {logo}
    <div className="d-none d-sm-block mx-2">
      {name}
    </div>
  </Link>
);

export default Brand;
