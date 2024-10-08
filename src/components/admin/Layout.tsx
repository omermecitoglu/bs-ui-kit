import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Sidebar from "./Sidebar";
import SidebarList from "./SidebarList";
import SiteHeader from "./SiteHeader";
import UserShell from "./UserShell";
import type { LinkProps } from "../../types/link";
import type { NavItem } from "../../types/navigation";
import type { ReactNode } from "react";

type LayoutProps<UserType, UserName extends keyof UserType> = {
  brandName?: string,
  logo: ReactNode,
  link: (props: LinkProps) => ReactNode,
  logoHref?: string,
  navLink: (props: LinkProps) => ReactNode,
  dropdownLink: (props: LinkProps) => ReactNode,
  navItems: NavItem<UserType>[],
  loadUser: () => Promise<UserType | null>,
  userNameField: UserName,
  loginPageURL: string,
  loginText: string,
  logoutAction: () => Promise<void>,
  logoutText: string,
  userMenuItems: NavItem<UserType>[],
  children?: ReactNode,
};

const Layout = <UT extends Record<string, unknown>, UN extends keyof UT>({
  brandName = "",
  logo,
  link,
  logoHref,
  navLink,
  dropdownLink,
  navItems,
  loadUser,
  userNameField,
  loginPageURL,
  loginText,
  logoutAction,
  logoutText,
  userMenuItems,
  children,
}: LayoutProps<UT, UN>) => (
  <>
    <SiteHeader
      brandName={brandName}
      logo={logo}
      link={link}
      logoHref={logoHref}
      dropdownLink={dropdownLink}
      navItems={navItems}
      loadUser={loadUser}
      userNameField={userNameField}
      loginPageURL={loginPageURL}
      loginText={loginText}
      logoutAction={logoutAction}
      logoutText={logoutText}
      userMenuItems={userMenuItems}
      fluid
    />
    <Container as="main" fluid>
      <Row className="row-gap-3">
        <Sidebar>
          <UserShell
            loadUser={loadUser}
            pending={(
              <div className="text-center mt-3">
                <FontAwesomeIcon size="2x" icon={faSpinner} className="fa-fw fa-spin-pulse" />
              </div>
            )}
            success={user => (
              <SidebarList navLink={navLink} items={navItems} user={user} />
            )}
            userCanBeIgnored
            items={navItems}
          />
        </Sidebar>
        <Col md="9" lg="10" className="py-3">
          {children}
        </Col>
      </Row>
    </Container>
  </>
);

export default Layout;
