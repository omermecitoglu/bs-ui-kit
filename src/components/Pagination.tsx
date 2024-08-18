"use client";
import BootstrapPagination from "react-bootstrap/Pagination";
import PageItem from "react-bootstrap/esm/PageItem";
import type { LinkProps } from "../types/link";

type PaginationProps = {
  link: (props: LinkProps) => JSX.Element,
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
    <BootstrapPagination className="mt-3 mb-0 justify-content-center" size="sm">
      <PageItem as={Link} href={buildHref(currentPage - 1)} scroll={false} disabled={currentPage <= 1}>
        &laquo;
      </PageItem>
      {currentPage > 3 && (
        <PageItem as={Link} href={buildHref(1)} scroll={false}>{1}</PageItem>
      )}
      {currentPage === 5 && (
        <PageItem as={Link} href={buildHref(2)} scroll={false}>{2}</PageItem>
      )}
      {currentPage > 5 && (
        <PageItem disabled>&hellip;</PageItem>
      )}
      {currentPage > 2 && (
        <PageItem as={Link} href={buildHref(currentPage - 2)} scroll={false}>{currentPage - 2}</PageItem>
      )}
      {currentPage > 1 && (
        <PageItem as={Link} href={buildHref(currentPage - 1)} scroll={false}>{currentPage - 1}</PageItem>
      )}
      <PageItem active>{currentPage}</PageItem>
      {currentPage <= totalPages - 1 && (
        <PageItem as={Link} href={buildHref(currentPage + 1)} scroll={false}>{currentPage + 1}</PageItem>
      )}
      {currentPage <= totalPages - 2 && (
        <PageItem as={Link} href={buildHref(currentPage + 2)} scroll={false}>{currentPage + 2}</PageItem>
      )}
      {currentPage <= totalPages - 5 && (
        <PageItem disabled>&hellip;</PageItem>
      )}
      {currentPage === totalPages - 4 && (
        <PageItem as={Link} href={buildHref(totalPages - 1)} scroll={false}>{totalPages - 1}</PageItem>
      )}
      {currentPage <= totalPages - 3 && (
        <PageItem as={Link} href={buildHref(totalPages)} scroll={false}>{totalPages}</PageItem>
      )}
      <PageItem as={Link} href={buildHref(currentPage + 1)} scroll={false} disabled={currentPage >= totalPages}>
        &raquo;
      </PageItem>
    </BootstrapPagination>
  );
};

export default Pagination;
