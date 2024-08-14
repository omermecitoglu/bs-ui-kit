import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import type { LinkProps } from "../../types/link";
import type { NavItem } from "../../types/navigation";

type HamburgerMenuProps = {
  dropdownLink: (props: LinkProps) => JSX.Element,
  items: NavItem[],
};

const HamburgerMenu = ({
  dropdownLink: Link,
  items,
}: HamburgerMenuProps) => (
  <Dropdown align="start" focusFirstItemOnShow="keyboard">
    <DropdownToggle variant="outline-success" className="d-flex align-items-center">
      <FontAwesomeIcon icon={faBars} size="lg" className="fa-fw" />
      <span className="d-sm-none">&nbsp;</span>
    </DropdownToggle>
    <DropdownMenu>
      {items.map((item, index) => (
        <Link key={index} href={item.href} className="dropdown-item">
          <FontAwesomeIcon icon={item.icon} className="fa-fw me-1" />
          {item.title}
        </Link>
      ))}
    </DropdownMenu>
  </Dropdown>
);

export default HamburgerMenu;