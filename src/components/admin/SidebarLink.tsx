import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { LinkProps } from "../../types/link";
import type { NavItem } from "../../types/navigation";
import type { ReactNode } from "react";

export type SidebarLinkProps<UserType> = {
  as: (props: LinkProps) => ReactNode,
  item: NavItem<UserType>,
};

const SidebarLink = <UT extends Record<string, unknown>>({
  as: Link,
  item,
}: SidebarLinkProps<UT>) => (
  <Link href={item.href} className="text-nowrap">
    <FontAwesomeIcon icon={item.icon} size="lg" className="fa-fw me-2" />
    {item.title}
  </Link>
);

export default SidebarLink;
