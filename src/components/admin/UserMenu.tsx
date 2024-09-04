import { faCircleUser } from "@fortawesome/free-solid-svg-icons/faCircleUser";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons/faRightFromBracket";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownDivider from "react-bootstrap/DropdownDivider";
import DropdownItem from "react-bootstrap/DropdownItem";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import Form from "react-bootstrap/Form";
import type { LinkProps } from "../../types/link";
import type { NavItem } from "../../types/navigation";
import type { ReactNode } from "react";

export type UserMenuProps<UserType, UserName extends keyof UserType> = {
  user: UserType,
  nameField: UserName,
  logoutAction: () => Promise<void>,
  logoutText: string,
  dropdownLink: (props: LinkProps) => ReactNode,
  items: NavItem<UserType>[],
};

const UserMenu = <UT extends Record<string, unknown>, UN extends keyof UT>({
  user,
  nameField,
  logoutAction,
  logoutText,
  dropdownLink: Link,
  items,
}: UserMenuProps<UT, UN>) => (
  <Dropdown align="end" focusFirstItemOnShow="keyboard">
    <DropdownToggle variant="outline-success" className="d-flex align-items-center">
      <FontAwesomeIcon icon={faCircleUser} size="lg" className="fa-fw" />
      <span className="mx-2 d-none d-sm-block">{user[nameField] as string}</span>
      <span className="d-sm-none">&nbsp;</span>
    </DropdownToggle>
    <DropdownMenu>
      {items.filter(item => !item.isVisible || item.isVisible(user)).map(item => (
        <Link key={item.href} href={item.href}>
          <FontAwesomeIcon icon={item.icon} className="fa-fw me-1" />
          {item.title}
        </Link>
      ))}
      <DropdownDivider />
      <Form action={logoutAction as unknown as string}>
        <DropdownItem as="button" type="submit">
          <FontAwesomeIcon icon={faRightFromBracket} className="fa-fw me-1" />
          {logoutText}
        </DropdownItem>
      </Form>
    </DropdownMenu>
  </Dropdown>
);

export default UserMenu;
