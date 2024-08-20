import PageItem from "react-bootstrap/PageItem";
import BootstrapPagination from "react-bootstrap/Pagination";
import PaginationLink from "./PaginationLink";
import type { LinkProps } from "../types/link";
import type { ReactNode } from "react";

type PaginationProps = {
  link: (props: LinkProps) => ReactNode,
  totalItems: number,
  itemsPerPage: number,
  currentPage: number,
  queryParams: Record<string, string>,
};

const Pagination = ({
  link: Link,
  totalItems,
  itemsPerPage,
  currentPage,
  queryParams,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <BootstrapPagination className="mt-3 mb-0 justify-content-center" size="sm">
      <PaginationLink as={Link} pageNumber={currentPage - 1} disabled={currentPage <= 1} queryParams={queryParams}>
        &laquo;
      </PaginationLink>
      {currentPage > 3 && (
        <PaginationLink as={Link} pageNumber={1} queryParams={queryParams} />
      )}
      {currentPage === 5 && (
        <PaginationLink as={Link} pageNumber={2} queryParams={queryParams} />
      )}
      {currentPage > 5 && (
        <PageItem disabled>&hellip;</PageItem>
      )}
      {currentPage > 2 && (
        <PaginationLink as={Link} pageNumber={currentPage - 2} queryParams={queryParams} />
      )}
      {currentPage > 1 && (
        <PaginationLink as={Link} pageNumber={currentPage - 1} queryParams={queryParams} />
      )}
      <PageItem active>{currentPage}</PageItem>
      {currentPage <= totalPages - 1 && (
        <PaginationLink as={Link} pageNumber={currentPage + 1} queryParams={queryParams} />
      )}
      {currentPage <= totalPages - 2 && (
        <PaginationLink as={Link} pageNumber={currentPage + 2} queryParams={queryParams} />
      )}
      {currentPage <= totalPages - 5 && (
        <PageItem disabled>&hellip;</PageItem>
      )}
      {currentPage === totalPages - 4 && (
        <PaginationLink as={Link} pageNumber={totalPages - 1} queryParams={queryParams} />
      )}
      {currentPage <= totalPages - 3 && (
        <PaginationLink as={Link} pageNumber={totalPages} queryParams={queryParams} />
      )}
      <PaginationLink as={Link} pageNumber={currentPage + 1} disabled={currentPage >= totalPages} queryParams={queryParams}>
        &raquo;
      </PaginationLink>
    </BootstrapPagination>
  );
};

export default Pagination;
