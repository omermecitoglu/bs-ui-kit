import classNames from "classnames";
import { type ReactNode } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Brand from "./Brand";
import HamburgerMenu from "./HamburgerMenu";
import HamburgerMenuPlaceholder from "./HamburgerMenuPlaceholder";
import LoginButton from "./LoginButton";
import UserMenu from "./UserMenu";
import UserPlaceholder from "./UserPlaceholder";
import UserShell from "./UserShell";
import type { LinkProps } from "../../types/link";
import type { NavItem } from "../../types/navigation";

type SiteHeaderProps<UserType, UserName extends keyof UserType> = {
  brandName: string,
  logo: ReactNode,
  link: (props: LinkProps) => ReactNode,
  logoHref?: string,
  dropdownLink: (props: LinkProps) => ReactNode,
  navItems?: NavItem<UserType>[],
  loadUser: () => Promise<UserType | null>,
  userNameField: UserName,
  loginPageURL: string,
  loginText: string,
  logoutAction: () => Promise<void>,
  logoutText: string,
  userMenuItems: NavItem<UserType>[],
  fluid?: boolean,
  breakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl",
};

const SiteHeader = <UT extends Record<string, unknown>, UN extends keyof UT>({
  brandName,
  logo,
  link,
  logoHref,
  dropdownLink,
  navItems,
  loadUser,
  userNameField,
  loginPageURL,
  loginText,
  logoutAction,
  logoutText,
  userMenuItems,
  fluid = false,
  breakpoint = "xs",
}: SiteHeaderProps<UT, UN>) => (
  <Navbar
    bg="dark"
    variant="dark"
    sticky="top"
    className={classNames("border-bottom border-success shadow", breakpoint !== "xs" && `d-none d-${breakpoint}-flex`)}
  >
    <Container fluid={fluid}>
      <div className="w-100 d-flex justify-content-between align-items-center gap-4 text-light text-nowrap">
        {navItems && (
          <div className="d-md-none">
            <UserShell
              loadUser={loadUser}
              pending={<HamburgerMenuPlaceholder />}
              success={user => (
                <HamburgerMenu dropdownLink={dropdownLink} items={navItems} user={user} />
              )}
              userCanBeIgnored
              items={navItems}
            />
          </div>
        )}
        <Brand name={brandName} logo={logo} link={link} href={logoHref} />
        <div className="w-100 d-none d-sm-block" />
        <UserShell
          loadUser={loadUser}
          pending={<UserPlaceholder />}
          success={user => (
            <UserMenu<UT, UN>
              user={user}
              nameField={userNameField}
              logoutAction={logoutAction}
              logoutText={logoutText}
              dropdownLink={dropdownLink}
              items={userMenuItems}
            />
          )}
          fallback={<LoginButton link={link} href={loginPageURL} text={loginText} />}
        />
      </div>
    </Container>
  </Navbar>
);

export default SiteHeader;
