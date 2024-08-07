import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import CopyrightRange from "./CopyrightRange";
import type { LinkProps } from "../../types/link";
import type { ReactNode } from "react";

type LayoutProps = {
  logo: ReactNode,
  link: (props: LinkProps) => JSX.Element,
  brandName?: string,
  launchYear?: string,
  children: ReactNode,
};

const Layout = ({
  logo,
  link: Link,
  brandName,
  launchYear,
  children,
}: LayoutProps) => (
  <Container as="main">
    <Row className="justify-content-sm-center">
      <Col sm="9" md="7" lg="5" xxl="4">
        <div className="text-center my-4">
          <Link href="/" prefetch={false}>
            {logo}
          </Link>
        </div>
        <div className="card shadow-lg mb-5">
          <div className="card-body pt-5 px-4 px-sm-5 pb-0">
            {children}
          </div>
          <div className="card-footer py-3 border-0 text-center text-muted">
            {brandName || "Unknown Brand"}
            {" "}
            &copy;
            {" "}
            <CopyrightRange launchYear={launchYear} />
          </div>
        </div>
      </Col>
    </Row>
  </Container>
);

export default Layout;
