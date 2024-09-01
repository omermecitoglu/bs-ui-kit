import Nav from "react-bootstrap/Nav";
import SidebarLink from "./SidebarLink";
import type { LinkProps } from "../../types/link";
import type { NavItem } from "../../types/navigation";
import type { ReactNode } from "react";

type SidebarProps = {
  navLink: (props: LinkProps) => ReactNode,
  items: NavItem[],
};

const Sidebar = ({
  navLink,
  items,
}: SidebarProps) => (
  <div id="admin-sidebar" className="d-none d-md-block col-md-3 col-lg-2 py-3 bg-body-tertiary border-end">
    <div className="sticky-md-top">
      <Nav defaultActiveKey={items[0].href} className="flex-column">
        {items.map((item, index) => (
          <SidebarLink key={index} as={navLink} item={item} />
        ))}
      </Nav>
    </div>
  </div>
);

export default Sidebar;
