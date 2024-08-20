import PageItem from "react-bootstrap/PageItem";
import type { LinkProps } from "../types/link";
import type { ReactNode } from "react";

type PaginationLinkProps = {
  as: (props: LinkProps) => ReactNode,
  disabled?: boolean,
  pageNumber: number,
  children?: ReactNode,
  queryParams: Record<string, string>,
};

const PaginationLink = ({
  as: Link,
  disabled = false,
  pageNumber,
  children,
  queryParams,
}: PaginationLinkProps) => {
  const buildHref = (page: number) => {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(queryParams)) {
      searchParams.append(key, value);
    }
    if (page === 1) {
      searchParams.delete("page");
    } else {
      searchParams.set("page", page.toString());
    }
    return "?" + searchParams.toString();
  };

  return (
    <PageItem as={Link} href={buildHref(pageNumber)} disabled={disabled}>
      {children || pageNumber}
    </PageItem>
  );
};

export default PaginationLink;
