import Nav from "react-bootstrap/Nav";
import SidebarLink from "./SidebarLink";
import type { LinkProps } from "../../types/link";
import type { NavItem } from "../../types/navigation";
import type { ReactNode } from "react";

type SidebarListProps<UserType> = {
  navLink: (props: LinkProps) => ReactNode,
  items: NavItem<UserType>[],
  user?: UserType,
};

const SidebarList = <UT extends Record<string, unknown>>({
  navLink,
  items,
  user,
}: SidebarListProps<UT>) => (
  <div id="admin-sidebar" className="d-none d-md-block col-md-3 col-lg-2 py-3 bg-body-tertiary border-end">
    <div className="sticky-md-top">
      <Nav defaultActiveKey={items[0].href} className="flex-column">
        {items.filter(item => !item.isVisible || !user || item.isVisible(user)).map((item, index) => (
          <SidebarLink key={index} as={navLink} item={item} />
        ))}
      </Nav>
    </div>
  </div>
);

export default SidebarList;
