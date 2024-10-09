import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";

const HamburgerMenuPlaceholder = () => (
  <DropdownToggle variant="outline-success" className="d-flex align-items-center" disabled>
    <FontAwesomeIcon icon={faBars} size="lg" className="fa-fw fa-fade" />
    <span className="d-sm-none">&nbsp;</span>
  </DropdownToggle>
);

export default HamburgerMenuPlaceholder;
